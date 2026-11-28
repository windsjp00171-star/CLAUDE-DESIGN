#!/usr/bin/env python3
"""每小時由 GitHub Actions 跑一次：從 GitHub 抓各作品的最新狀態，寫進 data/live.js。

作品集的「文字」寫在 data/projects.js（人寫的）；「數字與最近更新」由這支程式產生，
所以每次在各個 repo 做完事，不必再開一個對話來改作品集。

抓什麼：
- 每個作品（projects.js 裡有 repo 的）：預設分支 commit 數、最後一次 commit 日期
- 公開 repo 另外抓 CHANGELOG.md 最上面幾條，與那份檔案最後更新的日期
- 全部 repo 加總的 commit 數（只在 token 看得到私有 repo 時才算，不然數字會偏低）

★ 隱私：私有 repo 一個字都不公開（CHANGELOG 會寫到內部細節），只公開數字與日期。
  判斷依據是 GitHub API 回的 private 欄位，不是 projects.js 的 isPrivate —— 手寫的旗標會漏。

只用標準函式庫。環境變數：
  GH_TOKEN     讀 GitHub 的 token（沒設也能跑，但只看得到公開 repo）
  GH_OWNER     預設 windsjp00171-star
"""
import json
import os
import re
import sys
import urllib.error
import urllib.request
from datetime import datetime, timezone
from html import escape
from pathlib import Path

ROOT = Path(__file__).resolve().parent.parent
PROJECTS = ROOT / 'data' / 'projects.js'
OUT = ROOT / 'data' / 'live.js'
OWNER = os.environ.get('GH_OWNER', 'windsjp00171-star')
API = 'https://api.github.com'
NOTES_MAX = 3
NOTE_LEN = 60

HEADER = ('/* 自動產生，請不要手改：scripts/update_live.py 每小時由 GitHub Actions 更新。\n'
          '   沒有這個檔、或內容是 null 時，網頁照樣顯示 data/projects.js 的內容。 */\n')


class Http:
    """GitHub API 的薄包裝。測試時換成假的。"""

    def __init__(self, token=None):
        self.token = token

    def get(self, path, raw=False):
        req = urllib.request.Request(API + path)
        req.add_header('Accept', 'application/vnd.github.raw' if raw else 'application/vnd.github+json')
        req.add_header('User-Agent', 'portfolio-live-updater')
        req.add_header('X-GitHub-Api-Version', '2022-11-28')
        if self.token:
            req.add_header('Authorization', 'Bearer ' + self.token)
        try:
            with urllib.request.urlopen(req, timeout=30) as r:
                body = r.read().decode('utf-8', 'replace')
                return r.status, dict(r.headers), body
        except urllib.error.HTTPError as e:
            return e.code, dict(e.headers or {}), ''


def project_repos(src):
    """projects.js 裡每個作品的 (id, repo)。一個作品一塊 {...}，裡面沒有巢狀大括號。"""
    pairs = []
    for block in re.findall(r'\{[^{}]*\}', src):
        m_id = re.search(r'\bid:\s*"([^"]+)"', block)
        m_repo = re.search(r'\brepo:\s*"([^"]+)"', block)
        if m_id and m_repo:
            pairs.append((m_id.group(1), m_repo.group(1)))
    return pairs


def commit_stats(http, full):
    """(commit 數, 最後 commit 日期)。空 repo 回 (0, None)；查不到回 None。"""
    status, headers, body = http.get(f'/repos/{full}/commits?per_page=1')
    if status == 409:            # 空 repo
        return 0, None
    if status != 200:
        return None
    rows = json.loads(body or '[]')
    if not rows:
        return 0, None
    date = rows[0]['commit']['committer']['date'][:10]
    link = headers.get('Link') or headers.get('link') or ''
    m = re.search(r'[?&]page=(\d+)>;\s*rel="last"', link)
    return (int(m.group(1)) if m else len(rows)), date


def clean_note(line):
    """把一條 CHANGELOG 項目整理成一句短標題。"""
    t = line.strip()[2:].strip()
    bold = re.match(r'\*\*(.+?)\*\*', t)
    if bold:
        t = bold.group(1)
    t = re.sub(r'\[([^\]]+)\]\([^)]*\)', r'\1', t)
    t = t.replace('**', '').replace('`', '')
    for sep in ('：', ':'):
        i = t.find(sep)
        if i >= 6:
            t = t[:i]
            break
    t = t.strip(' 。；;，,')
    if len(t) > NOTE_LEN:
        t = t[:NOTE_LEN - 1] + '…'
    return t


def changelog_notes(text, limit=NOTES_MAX):
    """CHANGELOG 最上面的幾條（只看頂層項目，跳過說明段落與子項目）。"""
    notes = []
    for line in text.splitlines():
        if re.match(r'^[-*] \S', line):
            n = clean_note(line)
            if n and n not in notes:
                notes.append(n)
            if len(notes) >= limit:
                break
    return notes


def file_date(http, full, path):
    status, _, body = http.get(f'/repos/{full}/commits?per_page=1&path={path}')
    if status != 200:
        return None
    rows = json.loads(body or '[]')
    return rows[0]['commit']['committer']['date'][:10] if rows else None


def owner_repos(http):
    """(repo 清單, 是否含私有)。token 看得到私有 repo 才算「全部」。"""
    repos, page, private_scope = [], 1, True
    while True:
        status, _, body = http.get(f'/user/repos?affiliation=owner&per_page=100&page={page}')
        if status != 200:
            private_scope = False
            break
        rows = json.loads(body or '[]')
        repos += rows
        if len(rows) < 100:
            break
        page += 1
    if not private_scope:
        repos, page = [], 1
        while True:
            status, _, body = http.get(f'/users/{OWNER}/repos?type=owner&per_page=100&page={page}')
            if status != 200:
                return [], False
            rows = json.loads(body or '[]')
            repos += rows
            if len(rows) < 100:
                break
            page += 1
    repos = [r for r in repos if not r.get('fork') and r.get('owner', {}).get('login', OWNER) == OWNER]
    return repos, private_scope and any(r.get('private') for r in repos)


def build(http, src):
    repos, sees_private = owner_repos(http)
    by_name = {r['name']: r for r in repos}
    counts = {}
    for r in repos:
        st = commit_stats(http, r['full_name'])
        if st is not None:
            counts[r['name']] = st

    projects = {}
    for pid, name in project_repos(src):
        info = by_name.get(name)
        if info is None:
            status, _, body = http.get(f'/repos/{OWNER}/{name}')
            if status != 200:
                continue          # 看不到這個 repo：網頁就只顯示手寫內容
            info = json.loads(body)
        st = counts.get(name) or commit_stats(http, info['full_name'])
        if not st:
            continue
        entry = {'commits': st[0], 'updated': st[1], 'public': not info.get('private', True)}
        if entry['public']:
            status, _, text = http.get(f'/repos/{info["full_name"]}/contents/CHANGELOG.md', raw=True)
            if status == 200 and text:
                notes = changelog_notes(text)
                if notes:
                    entry['notes'] = notes
                    entry['notesDate'] = file_date(http, info['full_name'], 'CHANGELOG.md')
        projects[pid] = entry

    data = {'generatedAt': datetime.now(timezone.utc).strftime('%Y-%m-%dT%H:%MZ'), 'projects': projects}
    used = [c for c, _ in counts.values() if c > 0]   # 空 repo 不算（開了但沒寫任何東西）
    if sees_private and used:
        data['totals'] = {'repos': len(used), 'commits': sum(used)}
    return data


def read_current():
    if not OUT.exists():
        return None
    m = re.search(r'window\.PORTFOLIO_LIVE\s*=\s*(.*);\s*$', OUT.read_text(encoding='utf-8'), re.S)
    try:
        return json.loads(m.group(1)) if m else None
    except ValueError:
        return None


def same(a, b):
    """generatedAt 以外都一樣就不寫檔，免得每小時多一個沒有內容的 commit。"""
    strip = lambda d: {k: v for k, v in (d or {}).items() if k != 'generatedAt'}
    return strip(a) == strip(b)


def write(data):
    OUT.write_text(HEADER + 'window.PORTFOLIO_LIVE = ' +
                   json.dumps(data, ensure_ascii=False, indent=1, sort_keys=True) + ';\n', encoding='utf-8')


LLMS = ROOT / 'llms.txt'
SITE = 'https://windsjp00171-star.github.io/CLAUDE-DESIGN/'
_STR = r'"((?:[^"\\]|\\.)*)"'


def _s(block, key):
    m = re.search(rf'\b{key}:\s*{_STR}', block)
    return json.loads(f'"{m.group(1)}"') if m else ''


def _entries(src):
    """projects.js 依序吐出類別名稱（str）或作品（dict）。只取網頁上已公開的欄位。"""
    for m in re.finditer(rf'\blabel:\s*{_STR}|\{{[^{{}}]*\}}', src):
        if m.group(1) is not None:
            yield json.loads(f'"{m.group(1)}"')
            continue
        b = m.group(0)
        if not _s(b, 'name'):
            continue
        pro = [json.loads(f'"{x}"') for x in re.findall(_STR, (re.search(r'\bpro:\s*\[(.*?)\]', b, re.S) or [None, ''])[1])]
        yield {k: _s(b, k) for k in ('id', 'name', 'kind', 'tagline', 'faith', 'demoUrl', 'demoLabel')} | {
            'pro': pro, 'private': bool(re.search(r'\bisPrivate:\s*true', b))}


def build_llms(src):
    """projects.js → llms.txt。只用網頁上已經公開的文字；私有 repo 不放原始碼連結（同網頁的 isPrivate）。"""
    out = ['# EMMARK 作品集', '',
           '> 全端 × AI 協作開發者 EMMARK（以馬內利 × 方舟）的作品：真實上線、服務教會的系統與工具。'
           '程式大量由 AI 實作，作者負責需求、UX、架構、驗收與「不做什麼」的決定。', '',
           f'- 作品集：{SITE}', f'- 履歷：{SITE}resume.html', f'- Vibe Coding 實戰課：{_s(src, "course")}',
           f'- GitHub：{_s(src, "github")}', f'- 聯絡：{_s(src, "email")}']
    for e in _entries(src):
        if isinstance(e, str):
            out += ['', f'## {e}']
            continue
        out += ['', f'### {e["name"]}（{e["kind"]}）', e['tagline']]
        out += [f'- 專業做法：{"；".join(e["pro"])}'] if e['pro'] else []
        out += [f'- 信仰上的取捨：{e["faith"]}'] if e['faith'] else []
        out += [f'- {e["demoLabel"] or "連結"}：{e["demoUrl"]}'] if e['demoUrl'] else []
        out += ['- 私有專案：只公開功能摘要'] if e['private'] else []
    return '\n'.join(out) + '\n'


INDEX = ROOT / 'index.html'
_MARK = re.compile(r'(<!-- static-projects:start -->).*?(<!-- static-projects:end -->)', re.S)


def build_static(src):
    """projects.js → 給不跑 JavaScript 的爬蟲（搜尋引擎、AI）看的作品 HTML，放在 index.html 的 noscript 裡。"""
    out = ['<p class="muted">此頁的互動作品清單需要 JavaScript，以下是純文字版。</p>']
    for e in _entries(src):
        if isinstance(e, str):
            out.append(f'<h3>{escape(e)}</h3>')
            continue
        out.append(f'<article id="static-{escape(e["id"])}"><h4>{escape(e["name"])}（{escape(e["kind"])}）</h4>'
                   f'<p>{escape(e["tagline"])}</p>')
        out += [f'<p>專業做法：{escape("；".join(e["pro"]))}</p>'] if e['pro'] else []
        out += [f'<p>信仰上的取捨：{escape(e["faith"])}</p>'] if e['faith'] else []
        out += [f'<p><a href="{escape(e["demoUrl"])}">{escape(e["demoLabel"] or "連結")}</a></p>'] if e['demoUrl'] else []
        out.append('</article>')
    return '\n'.join(out)


_LD_MARK = re.compile(r'(<!-- projects-ld:start -->).*?(<!-- projects-ld:end -->)', re.S)


def build_ld(src):
    """projects.js → ItemList JSON-LD，讓搜尋引擎與 AI 知道哪些是 EMMARK 的作品。"""
    items = [e for e in _entries(src) if isinstance(e, dict)]
    ld = {'@context': 'https://schema.org', '@type': 'ItemList', 'name': 'EMMARK 作品集',
          'itemListElement': [{'@type': 'ListItem', 'position': i, 'item': {
              '@type': 'CreativeWork', 'name': e['name'], 'genre': e['kind'], 'description': e['tagline'],
              'creator': {'@id': f'{SITE}#person'}} | ({'url': e['demoUrl']} if e['demoUrl'] else {})}
              for i, e in enumerate(items, 1)]}
    return _ld_script(ld)


def _ld_script(ld):
    # 文字裡若有 </script> 會提早結束 script 標籤
    body = json.dumps(ld, ensure_ascii=False, indent=1).replace('</', '<\\/')
    return f'<script type="application/ld+json">\n{body}\n</script>'


FAQ = ROOT / 'data' / 'faq.json'
_FAQ_MARK = re.compile(r'(<!-- faq:start -->).*?(<!-- faq:end -->)', re.S)
_FAQ_LD_MARK = re.compile(r'(<!-- faq-ld:start -->).*?(<!-- faq-ld:end -->)', re.S)


def build_faq(faq):
    """faq.json → 頁面上看得到的問答。Google 規定 FAQPage 的內容必須在頁面上看得到，所以兩者同源。"""
    return '\n'.join(f'<div class="faq-item"><dt>{escape(f["q"])}</dt><dd>{escape(f["a"])}</dd></div>' for f in faq)


def build_faq_ld(faq):
    return _ld_script({'@context': 'https://schema.org', '@type': 'FAQPage', 'mainEntity': [
        {'@type': 'Question', 'name': f['q'], 'acceptedAnswer': {'@type': 'Answer', 'text': f['a']}} for f in faq]})


_LOG_MARK = re.compile(r'(<!-- static-log:start -->).*?(<!-- static-log:end -->)', re.S)


def build_log(src, live):
    """live.js → 「最近的更新」純文字版，規則同 js/app.js：只列網頁上的作品、新到舊、最多 8 筆。"""
    names = {e['id']: e['name'] for e in _entries(src) if isinstance(e, dict)}
    rows = sorted(((k, v) for k, v in ((live or {}).get('projects') or {}).items() if k in names and v.get('updated')),
                  key=lambda r: r[1]['updated'], reverse=True)[:8]
    if not rows:
        return ''
    note = lambda v: (v.get('notes') or [''])[0] if v.get('public') else '私有專案，只公開更新日期'
    li = [f'<li>{escape(v["updated"])} {escape(names[k])}{"：" + escape(note(v)) if note(v) else ""}</li>' for k, v in rows]
    return '<h2>最近的更新</h2>\n<ol>\n' + '\n'.join(li) + '\n</ol>'


def render_index(html, src, faq=None, live=None):
    faq = json.loads(FAQ.read_text(encoding='utf-8')) if faq is None else faq
    live = read_current() if live is None else live
    for mark, body in ((_MARK, lambda: build_static(src)), (_LD_MARK, lambda: build_ld(src)),
                       (_FAQ_MARK, lambda: build_faq(faq)), (_FAQ_LD_MARK, lambda: build_faq_ld(faq)),
                       (_LOG_MARK, lambda: build_log(src, live))):
        if not mark.search(html):
            raise ValueError(f'index.html 找不到 {mark.pattern[6:mark.pattern.index(":")]} 標記')
        html = mark.sub(lambda m: f'{m.group(1)}\n{body()}\n{m.group(2)}', html, count=1)
    return html


def main():
    LLMS.write_text(build_llms(PROJECTS.read_text(encoding='utf-8')), encoding='utf-8', newline='\n')  # 不靠 API，先寫
    INDEX.write_text(render_index(INDEX.read_text(encoding='utf-8'), PROJECTS.read_text(encoding='utf-8')),
                     encoding='utf-8', newline='')
    http = Http(os.environ.get('GH_TOKEN') or None)
    data = build(http, PROJECTS.read_text(encoding='utf-8'))
    if not data['projects']:
        # 一個都抓不到多半是 token 或 API 出問題；寫進去等於把整頁的數字清空
        print('一個作品都抓不到，保留原本的 data/live.js', file=sys.stderr)
        return 1
    if same(read_current(), data):
        print('沒有變化')
        return 0
    write(data)
    INDEX.write_text(render_index(INDEX.read_text(encoding='utf-8'), PROJECTS.read_text(encoding='utf-8'), live=data),
                     encoding='utf-8', newline='')  # 「最近的更新」跟著新數字走
    print(f'已更新：{len(data["projects"])} 個作品', '，含全部 repo 加總' if 'totals' in data else '（token 看不到私有 repo，不算總數）')
    return 0


if __name__ == '__main__':
    sys.exit(main())
