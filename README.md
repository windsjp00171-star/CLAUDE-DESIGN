# CLAUDE-DESIGN

EMMARK · 全端 × AI 協作 — 作品集官網。

從 Claude.ai Artifact 匯出後瘦身的單頁網站（`index.html`）：

- 內嵌的 Noto Serif TC / Noto Sans TC / JetBrains Mono base64 字型 → 改用 Google Fonts CDN
- 內嵌的 runtime 與外部依賴（React / ReactDOM）→ 改用 unpkg CDN
- 檔案大小由 ~14MB 降到 ~86KB

## 部署

GitHub Pages — `index.html` 位於 repo 根目錄，直接 serve。
