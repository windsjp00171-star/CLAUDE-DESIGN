# CLAUDE-DESIGN

EMMARK 作品集官網（`index.html`）＋ **12 個專案的總覽清冊（`PROJECTS.md`）**。

這個 repo 有兩個身分：

1. **對外**：作品集網站，部署在 GitHub Pages
2. **對內**：所有專案的 hub —— `PROJECTS.md` 是「我到底有哪些東西在線上跑」的唯一
   權威清單。專案一多，記憶會出事，這份清冊就是為了取代記憶而存在的。

## 部署

GitHub Pages，`index.html` 在 repo 根目錄直接 serve。
網址：https://windsjp00171-star.github.io/CLAUDE-DESIGN/

推到預設分支就會自動更新，沒有 build 步驟。

## ⚠️ index.html 是 Artifact 匯出檔，不能當普通 HTML 編輯

這個檔案是從 Claude.ai Artifact 匯出後**手動瘦身**的產物（~14MB → ~115KB）：

- 內嵌的 base64 字型（Noto Serif TC / Noto Sans TC / JetBrains Mono）→ 改成 Google Fonts CDN
- 內嵌的 runtime 與 React / ReactDOM → 改成 CDN

**結構上的陷阱**：實際的頁面內容**不是**直接寫在 HTML body 裡，而是以
**JSON 字串**的形式存在這三個 script 標籤裡：

```
<script type="__bundler/manifest">      # UUID → 內容片段的對照表
<script type="__bundler/ext_resources"> # 外部資源
<script type="__bundler/template">      # ★ 頁面主體（JSON 編碼的 HTML 字串）
```

頁面載入時由一小段 runtime 把 manifest 的片段代換進 template 再塞進 DOM。

所以：

- **改文案或加專案卡片，要動的是 `__bundler/template` 裡那串 JSON 編碼的 HTML**，
  不能用一般的 HTML 編輯思路直接找標籤改
- 用 Python 讀進來、`json.loads` 解出 template、改完再 `json.dumps` 寫回去，
  不要手工處理跳脫字元
- 改完一定要**在瀏覽器實際開一次**確認沒壞——這個結構壞掉的話畫面會整片空白，
  而且 console 只會說 `[bundler] Missing script tags`，看不出是哪裡改壞的

### 絕對不要重新從 Artifact 匯出覆蓋

重新匯出會把 14MB 的 base64 內嵌字型全部帶回來，瘦身的工作要重做一次。
要改內容就在現有檔案上改。

## 專案卡片的 Demo 連結

各專案的「進入示範系統」按鈕網址寫在 template 裡的 `demos` 物件：

```js
const demos = {
  'pitchpal': { url: '...', label: '🎵 ...' },
  'Church-Management-System-demo': { url: '...', label: '🏛 進入示範系統 ↗' },
  'fooding-hunter': { url: '...', label: '🍜 開始狩獵 ↗' },
  'bibile-actionbook': { url: '...', label: '📖 開始讀經 ↗' },
  'group-devotion': { url: '...', label: '🌼 ...' },
};
```

**專案換部署平台（例如 Railway 搬到 Fly.io）時，這裡的網址要跟著改**，
同時更新 `PROJECTS.md`。這是最容易忘記同步的地方——網站上掛著死連結不會有人通知你。

## PROJECTS.md 的維護規則

`PROJECTS.md` 是 12 個專案的總覽清冊。**以下情況必須回來更新它**：

| 觸發事件 | 要改什麼 |
|---------|---------|
| 開了新專案 | 加一列；同時到 `emmask-secret/lib/classifier.js` 的已知專案清單加一行 |
| 換部署平台 / 換網址 | 改「部署」「網址」欄；同時改 `index.html` 的 `demos` 物件 |
| 某專案停用 / 封存 | 標記狀態，不要直接刪掉那一列（要看得出來曾經有過） |
| 補了 CLAUDE.md 或測試 | 更新對應欄位 |

清冊的價值來自「跟現實一致」。不一致的清冊比沒有清冊更危險，
因為你會相信它。

## 其他檔案

| 檔案 | 說明 |
|------|------|
| `resume.html` | 履歷頁（13KB，一般 HTML，可直接編輯）|
| `linkedin-profile.md` | LinkedIn 個人簡介文案 |
| `EMMARK-resume.pdf` | 履歷 PDF |
| `og-image.png` / `emmark_*.png` | OG 分享圖與各式圖示 |
| `avatar.jpg` | 頭像 |

`resume.html` 跟 `index.html` **不一樣**，它是正常的 HTML，可以直接編輯。

## SEO / 分享圖

`index.html` 的 `<head>` 有完整的 OG 與 Twitter Card meta。
改標題或描述時記得四個地方一起改：`<title>`、`og:title`、`twitter:title`、
以及 `<meta name="description">` / `og:description` / `twitter:description`。
