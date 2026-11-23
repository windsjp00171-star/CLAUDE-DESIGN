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


if __name__ == '__main__':
    unittest.main()
