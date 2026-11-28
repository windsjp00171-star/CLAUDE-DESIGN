"""scripts/update_live.py 的測試。不連網：GitHub API 換成假的。

跑法：python -m unittest discover -s tests -v
"""
import json
import sys
import unittest
from pathlib import Path

sys.path.insert(0, str(Path(__file__).resolve().parent.parent / 'scripts'))
import update_live as U  # noqa: E402

OWNER = U.OWNER


def commits(date, last_page=None):
    headers = {}
    if last_page:
        headers['Link'] = f'<https://api.github.com/x?per_page=1&page=2>; rel="next", <https://api.github.com/x?per_page=1&page={last_page}>; rel="last"'
    return 200, headers, json.dumps([{'commit': {'committer': {'date': date + 'T01:02:03Z'}}}])


class FakeHttp:
    def __init__(self, routes, sees_private=True):
        self.routes = routes
        self.sees_private = sees_private
        self.calls = []

    def get(self, path, raw=False):
        self.calls.append(path)
        if path.startswith('/user/repos') and not self.sees_private:
            return 403, {}, ''
        for prefix, resp in self.routes.items():
            if path.startswith(prefix):
                return resp
        return 404, {}, ''


def repo(name, private):
    return {'name': name, 'full_name': f'{OWNER}/{name}', 'private': private, 'fork': False, 'owner': {'login': OWNER}}


SRC = '''window.PORTFOLIO = { decks: [ { id: "d", projects: [
  { id: "pub", name: "公開", repo: "pub-repo", pro: ["a"] },
  { id: "priv", name: "私有", repo: "priv-repo" },
  { id: "norepo", name: "沒有 repo" },
  { id: "gone", repo: "deleted-repo" }
] } ] };'''

CHANGELOG = '''# Changelog

說明段落，不是項目。

## [Unreleased]

### 新增
- **首頁加上搜尋**：可以找人名
  - 子項目不要
- 單一檔案的「分享」連結改為永久有效（拿掉 1 小時／24 小時／7 天選項）
- [連結](https://x) 與 `程式碼` 會被拿掉
- 第四條不要
'''


def routes(private_changelog=True):
    r = {
        f'/repos/{OWNER}/empty-repo/commits': (409, {}, ''),
        '/user/repos': (200, {}, json.dumps([repo('pub-repo', False), repo('priv-repo', True), repo('empty-repo', True),
                                             dict(repo('forked', False), fork=True)])),
        f'/users/{OWNER}/repos': (200, {}, json.dumps([repo('pub-repo', False)])),
        f'/repos/{OWNER}/pub-repo/commits?per_page=1&path=': commits('2026-11-20'),
        f'/repos/{OWNER}/pub-repo/commits': commits('2026-11-21', last_page=120),
        f'/repos/{OWNER}/priv-repo/commits': commits('2026-11-22', last_page=900),
        f'/repos/{OWNER}/pub-repo/contents/CHANGELOG.md': (200, {}, CHANGELOG),
    }
    if private_changelog:
        r[f'/repos/{OWNER}/priv-repo/contents/CHANGELOG.md'] = (200, {}, '- **內部細節不可公開**')
    return r


class BuildTest(unittest.TestCase):
    def test_counts_dates_and_totals(self):
        d = U.build(FakeHttp(routes()), SRC)
        self.assertEqual(d['projects']['pub']['commits'], 120)
        self.assertEqual(d['projects']['pub']['updated'], '2026-11-21')
        self.assertEqual(d['projects']['priv']['commits'], 900)
        self.assertEqual(d['totals'], {'repos': 2, 'commits': 1020})   # fork 與空 repo 不算

    def test_private_repo_never_publishes_text(self):
        http = FakeHttp(routes())
        d = U.build(http, SRC)
        self.assertNotIn('notes', d['projects']['priv'])
        self.assertFalse(d['projects']['priv']['public'])
        self.assertFalse(any('priv-repo/contents' in c for c in http.calls), '私有 repo 的 CHANGELOG 連讀都不該讀')
        self.assertNotIn('內部細節', json.dumps(d, ensure_ascii=False))

    def test_public_notes(self):
        d = U.build(FakeHttp(routes()), SRC)
        self.assertEqual(d['projects']['pub']['notes'],
                         ['首頁加上搜尋', '單一檔案的「分享」連結改為永久有效（拿掉 1 小時／24 小時／7 天選項）', '連結 與 程式碼 會被拿掉'])
        self.assertEqual(d['projects']['pub']['notesDate'], '2026-11-20')

    def test_without_private_access_no_totals(self):
        # 只看得到公開 repo 時，總數會偏低 —— 寧可不寫，網頁維持手寫的數字
        d = U.build(FakeHttp(routes(), sees_private=False), SRC)
        self.assertNotIn('totals', d)
        self.assertIn('pub', d['projects'])
        self.assertNotIn('priv', d['projects'])

    def test_missing_repo_is_skipped(self):
        d = U.build(FakeHttp(routes()), SRC)
        self.assertNotIn('gone', d['projects'])
        self.assertNotIn('norepo', d['projects'])


class HelpersTest(unittest.TestCase):
    def test_project_repos_reads_the_real_file(self):
        pairs = dict(U.project_repos(U.PROJECTS.read_text(encoding='utf-8')))
        self.assertEqual(pairs['tianfu-diary'], 'tianfu-diary')
        self.assertEqual(pairs['event-portal'], 'event-registration-')
        self.assertGreaterEqual(len(pairs), 14)

    def test_long_note_truncated(self):
        n = U.clean_note('- ' + '字' * 100)
        self.assertEqual(len(n), U.NOTE_LEN)
        self.assertTrue(n.endswith('…'))

    def test_empty_repo(self):
        http = FakeHttp({f'/repos/{OWNER}/x/commits': (409, {}, '')})
        self.assertEqual(U.commit_stats(http, f'{OWNER}/x'), (0, None))

    def test_same_ignores_timestamp(self):
        a = {'generatedAt': '1', 'projects': {'p': {'commits': 1}}}
        b = {'generatedAt': '2', 'projects': {'p': {'commits': 1}}}
        self.assertTrue(U.same(a, b))
        self.assertFalse(U.same(a, {'generatedAt': '2', 'projects': {'p': {'commits': 2}}}))

    def test_live_file_round_trips(self):
        # 網頁讀的是這個檔：格式壞掉的話整頁的即時數字會不見
        cur = U.read_current()
        self.assertTrue(cur is None or 'projects' in cur)


class LlmsTest(unittest.TestCase):
    """llms.txt：給 AI 讀的作品清單。網頁的作品要跑 JavaScript 才看得到，大多數 AI 爬蟲不跑。"""

    SRC = U.PROJECTS.read_text(encoding='utf-8')

    def test_every_project_on_the_page_is_listed(self):
        text = U.build_llms(self.SRC)
        names = U.re.findall(r'\bname:\s*"([^"]+)"', self.SRC)
        self.assertGreater(len(names), 10)
        for n in names:
            self.assertIn(n, text)

    def test_private_projects_never_get_a_source_link(self):
        src = 'decks: [{ id: "d", label: "類別", projects: [\n{ id: "a", name: "私有作品", kind: "系統", isPrivate: true, repo: "secret-repo", tagline: "一句話", pro: ["做法一", "做法二"], faith: "取捨" },\n{ id: "b", name: "公開作品", kind: "工具", repo: "open", tagline: "說明 \\"引號\\"", demoUrl: "https://x.test/" }\n] }]'
        text = U.build_llms(src)
        self.assertNotIn('secret-repo', text)
        self.assertIn('私有作品', text)
        self.assertIn('做法一；做法二', text)
        self.assertIn('說明 "引號"', text)
        self.assertIn('https://x.test/', text)
        self.assertIn('## 類別', text)

    def test_file_on_disk_is_current(self):
        # 改了 projects.js 卻沒重跑，AI 讀到的就是舊作品
        self.assertEqual((U.ROOT / 'llms.txt').read_text(encoding='utf-8'), U.build_llms(self.SRC))


class StaticProjectsTest(unittest.TestCase):
    """index.html 的 noscript 純文字作品：Google 以外的搜尋引擎與 AI 爬蟲不跑 JavaScript，沒這段就只看到空網格。"""

    SRC = LlmsTest.SRC

    def test_index_on_disk_has_every_project(self):
        html = U.INDEX.read_text(encoding='utf-8')
        self.assertEqual(html, U.render_index(html, self.SRC))  # 改了 projects.js 沒重跑就會失敗
        for n in U.re.findall(r'\bname:\s*"([^"]+)"', self.SRC):
            self.assertIn(U.escape(n), html)

    def test_text_is_escaped_and_private_repo_not_leaked(self):
        src = 'decks: [{ id: "d", label: "類別", projects: [\n{ id: "a", name: "<b>壞</b>", kind: "系統", isPrivate: true, repo: "secret-repo", tagline: "一句", pro: ["做法"] }\n] }]'
        out = U.build_static(src)
        self.assertNotIn('<b>壞</b>', out)
        self.assertIn('&lt;b&gt;', out)
        self.assertNotIn('secret-repo', out)

    def test_itemlist_has_every_project_and_cannot_break_out_of_script(self):
        # AI 靠 ItemList 判斷哪些是作品；少一件就等於沒做過那件
        ld = U.json.loads(U.build_ld(self.SRC).split('\n', 1)[1].rsplit('\n', 1)[0])
        names = U.re.findall(r'\bname:\s*"([^"]+)"', self.SRC)
        self.assertEqual([i['item']['name'] for i in ld['itemListElement']], names)
        evil = 'decks: [{ id: "d", label: "類別", projects: [\n{ id: "a", name: "</script><b>", kind: "系統", tagline: "一句" }\n] }]'
        self.assertEqual(U.build_ld(evil).count('</script>'), 1)

    def test_faq_visible_and_schema_match(self):
        # Google 規定 FAQPage 的問答必須在頁面上看得到；兩邊不一致會被當成垃圾結構化資料
        faq = [{'q': '問<b>', 'a': '答 </script>'}]
        html = U.build_faq(faq)
        self.assertIn('問&lt;b&gt;', html)
        self.assertNotIn('</script>', html)
        ld = U.json.loads(U.build_faq_ld(faq).split('\n', 1)[1].rsplit('\n', 1)[0])
        self.assertEqual(ld['mainEntity'][0]['acceptedAnswer']['text'], '答 </script>')
        self.assertEqual(U.build_faq_ld(faq).count('</script>'), 1)

    def test_faq_on_disk_has_every_question(self):
        html = U.INDEX.read_text(encoding='utf-8')
        for f in U.json.loads(U.FAQ.read_text(encoding='utf-8')):
            self.assertIn(U.escape(f['q']), html)
            self.assertIn(U.escape(f['a']), html)

    def test_static_log_matches_what_the_page_shows(self):
        # 「最近的更新」原本只靠 JS 填，爬蟲看到空白；純文字版必須和網頁同規則：新到舊、最多 8 筆、私有不露文字
        src = 'decks: [{ id: "d", label: "類別", projects: [\n' + '\n'.join(
            f'{{ id: "p{i}", name: "作品{i}", kind: "系統", tagline: "一句" }}' for i in range(10)) + '\n] }]'
        live = {'projects': {f'p{i}': {'updated': f'2026-11-{10 + i:02d}', 'public': True, 'notes': [f'<b>改{i}</b>']}
                             for i in range(10)} | {'ghost': {'updated': '2026-12-31', 'public': True}}}
        live['projects']['p9'] = {'updated': '2026-11-19', 'public': False}
        out = U.build_log(src, live)
        self.assertEqual(U.re.findall(r'作品(\d)', out), ['9', '8', '7', '6', '5', '4', '3', '2'])
        self.assertNotIn('ghost', out)  # 網頁上沒有的作品不列
        self.assertIn('私有專案，只公開更新日期', out)
        self.assertIn('&lt;b&gt;改8', out)
        self.assertEqual(U.build_log(src, None), '')

    def test_missing_markers_fail_loud(self):
        with self.assertRaises(ValueError):
            U.render_index('<html></html>', self.SRC)


if __name__ == '__main__':
    unittest.main()
