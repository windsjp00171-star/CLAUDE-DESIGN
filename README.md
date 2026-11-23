# EMMARK 作品集

網址：https://windsjp00171-star.github.io/CLAUDE-DESIGN/

## 給接手的人（不需要會寫程式）

**直接看網站**：雙擊 `index.html` 就能在瀏覽器打開，不需要伺服器、不需要帳號。沒網路時字型會改用系統字，內容一樣完整。

**要改作品內容**：只編輯 `data/projects.js`，用記事本就能開。
- 每個作品是一塊 `{ ... }`：名稱 `name`、一句話 `tagline`、專業做法 `pro`、信仰取捨 `faith`。
- `weight` 是重要性：3 是主力作品（排在最前面，卡片多一行重點），2 中，1 小。
- `isPrivate: true` 的作品不會顯示原始碼連結。
- 新增作品：複製一塊現有的、改文字、放進對應類別（`decks`，類別名稱會顯示成篩選按鈕）。
- 存檔後重新整理網頁就能看到。

**要發布**：把檔案推到 GitHub 的 `main` 分支，GitHub Pages 會自動更新。

## 自動更新（不用再開對話來改作品集）

每小時 GitHub Actions 會跑 `scripts/update_live.py`，從 GitHub 抓各作品的最新狀態，寫進 `data/live.js`：

- 每個作品的 commit 數與最近更新日期（作品要在 `data/projects.js` 寫上 `repo: "repo 名稱"`）
- 公開 repo 的 CHANGELOG 最上面三條（網頁上的「最近的更新」與「航行日誌」）
- 全部 repo 加總的 commit 數（頁首「紀錄」那一格）

**私有 repo 只公開數字與日期，一個字都不公開**（CHANGELOG 常寫到內部細節）。判斷依據是 GitHub 回報的公開／私有，不是手寫的 `isPrivate`。

想馬上更新：GitHub → Actions →「更新作品集的即時數字」→ Run workflow。

### 一次性設定：讓它看得到私有 repo

沒設的話照樣會跑，但只看得到公開 repo：私有作品不會有日期，頁首的總 commit 數維持手寫的「近 2,000 次」。

1. GitHub → Settings → Developer settings → Fine-grained tokens → Generate new token
2. Repository access 選 **All repositories**；Permissions 只開 **Contents: Read-only**（Metadata 會自動是 Read-only）
3. 到這個 repo 的 Settings → Secrets and variables → Actions → New repository secret，名稱填 `PORTFOLIO_TOKEN`，貼上 token
4. token 有期限，到期前 GitHub 會寄信；換新的貼回同一個 secret 即可

文字內容（作品介紹、專業與信仰）仍然是人寫的，改 `data/projects.js`。

**要匯出全部資料**：`data/projects.js` 就是全部作品資料，複製一份即是備份（內容是純文字）。

## 檔案說明

| 檔案 | 用途 |
|---|---|
| `index.html` | 頁面結構與文案（介紹、分工、資安、結尾等） |
| `css/style.css` | 版面與配色 |
| `js/app.js` | 作品卡片、類別篩選、點開詳細內容、載入資料 |
| `data/projects.js` | 所有作品、技術、資安資料（人寫的） |
| `data/live.js` | commit 數、更新日期、公開專案的更新日誌（自動產生，不要手改） |
| `scripts/update_live.py`、`.github/workflows/live-data.yml` | 每小時產生 `data/live.js` |
| `tests/` | `python -m unittest discover -s tests` |
| `PRODUCT.md` / `DESIGN.md` | 這個網站要做什麼、長什麼樣（給設計工具與日後維護者看） |
| `resume.html`、`EMMARK-resume.pdf` | 履歷 |
| `linkedin-profile.md` | LinkedIn 文案 |
| `CHANGELOG.md` | 變更紀錄 |

## 尚待確認

- commit 總數設好 `PORTFOLIO_TOKEN` 後由程式自動算；沒設時顯示手寫的「近 2,000 次」（2026-10 重算：13 個 repo 加總 1,944）。程式碼行數因專案間可能重複計算，先不寫。
- 履歷 `resume.html`／PDF 與 `linkedin-profile.md` 寫 13 個專案，網站是 14 個（加了宣教之路）。2026-11-23 使用者決定履歷與 LinkedIn 不跟著更新。
