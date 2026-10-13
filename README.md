# EMMARK 作品集

網址：https://windsjp00171-star.github.io/CLAUDE-DESIGN/

## 給接手的人（不需要會寫程式）

**直接看網站**：雙擊 `index.html` 就能在瀏覽器打開，不需要伺服器、不需要帳號。沒網路時字型會改用系統字，內容一樣完整。

**要改作品內容**：只編輯 `data/projects.js`，用記事本就能開。
- 每個作品是一塊 `{ ... }`：名稱 `name`、一句話 `tagline`、專業做法 `pro`、信仰取捨 `faith`。
- `weight` 是艙室大小：3 最大、2 中、1 小，大小代表重要性。
- `isPrivate: true` 的作品不會顯示原始碼連結。
- 新增作品：複製一塊現有的、改文字、放進對應甲板（`decks`）。
- 存檔後重新整理網頁就能看到。

**要發布**：把檔案推到 GitHub 的 `main` 分支，GitHub Pages 會自動更新。

**要匯出全部資料**：`data/projects.js` 就是全部作品資料，複製一份即是備份（內容是純文字）。

## 檔案說明

| 檔案 | 用途 |
|---|---|
| `index.html` | 頁面結構與文案（艦橋、航向等） |
| `css/style.css` | 版面與配色 |
| `js/app.js` | 艙室點開、載入資料 |
| `data/projects.js` | 所有作品、技術、資安資料 |
| `PRODUCT.md` / `DESIGN.md` | 這個網站要做什麼、長什麼樣（給設計工具與日後維護者看） |
| `resume.html`、`EMMARK-resume.pdf` | 履歷 |
| `linkedin-profile.md` | LinkedIn 文案 |
| `CHANGELOG.md` | 變更紀錄 |

## 尚待確認

- 履歷與 LinkedIn 文案裡的統計（程式碼行數、commit 數、專案數）尚未重新核算。
