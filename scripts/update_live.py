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
    if sees_private and counts:
        data['totals'] = {'repos': len(counts), 'commits': sum(c for c, _ in counts.values())}
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


def main():
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
    print(f'已更新：{len(data["projects"])} 個作品', '，含全部 repo 加總' if 'totals' in data else '（token 看不到私有 repo，不算總數）')
    return 0


if __name__ == '__main__':
    sys.exit(main())
