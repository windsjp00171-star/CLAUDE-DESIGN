# EMMARK · LinkedIn 個人檔案文案（繁體中文）

> 定位：**全端工程師 × AI 協作**
> 以下每一區塊都可直接複製貼到 LinkedIn 對應欄位。括號內的字數提示，是 LinkedIn 各欄位的上限。

---

## 1. 標題 Headline（上限 220 字）

> 顯示在姓名下方，最重要的一行。挑一個用。

**版本 A（最推薦・成果導向）**
```
全端工程師 × AI 協作｜6 個月內以 PM + Tech Lead 模式交付 10 個部署專案、117K 行程式碼｜Flask / Django / React / Supabase / LINE OAuth｜用程式碼解決真實問題
```

**版本 B（精簡）**
```
全端開發者 × AI 協作｜把需求、架構到上線一手包辦｜Flask · React · Supabase · AI 整合
```

**版本 C（價值主張）**
```
我把自己當產品負責人，AI 是我 10 倍速的工程師夥伴｜全端 × AI 協作｜10 個落地專案
```

---

## 2. 關於 About（上限 2,600 字）

```
我是一名全端開發者，擅長把模糊的需求，變成真正有人在用的產品。

過去 6 個月，我以「產品負責人 + 技術主導」的模式，搭配 AI 作為 10 倍速的工程師夥伴，從零交付了 10 個已部署的專案、累積 117,000+ 行程式碼與 444+ 次 commit，涵蓋教會管理系統、即時互動裝置、RPG 遊戲與音樂工具。

我的工作方式很明確：所有需求定義、UX 判斷、架構決策與上線把關都是我的責任；AI 負責約 80% 的程式碼實作、邊界案例偵測與跨專案知識複用。我做的不只是「把功能做出來」，而是對每一個產品判斷負責——包含「這個功能不做」的決定。

技術上，我做的是真正端到端的東西：
• 後端：Flask、Django 6、FastAPI
• 前端：React、TypeScript、Tailwind CSS、Jinja2
• 資料與雲端：Supabase (PostgreSQL)、Cloudflare R2、Render、Vercel、Hugging Face Spaces
• 身分與資安：LINE OAuth2 無密碼登入、CSRF (hmac 常數時間比對)、flask-limiter、HttpOnly/SameSite/Secure cookie、presigned URL、多租戶資料隔離
• AI 整合：Groq LLM、Google Gemini、DALL·E 3、librosa、OpenCV、MediaPipe
• 交付：GitHub Actions CI、pytest、Windows 安裝包與 macOS DMG 跨平台打包

我特別在意資安與隱私——因為我處理的是教會與會友的敏感資料，所以從第一行程式碼就把資安當成預設，而不是事後補丁。

我的初衷是「用程式碼服事」：讓教會的同工少一點行政重擔、多一點時間陪伴人。我相信好的工具應該是安靜的——它不搶戲，只是讓對的人、在對的時間，把事情做好。

作品集：https://windsjp00171-star.github.io/CLAUDE-DESIGN/
聯絡：emmark19890901@gmail.com
```

---

## 3. 工作經歷 Experience

> LinkedIn 經歷區。獨立開發者可用以下方式呈現。

**職稱**：全端開發者 × AI 協作（獨立開發 / 自由接案）
**公司/品牌**：EMMARK（個人開發品牌）
**期間**：2025 – 至今
**地點**：可遠端

**描述（上限 2,000 字）**
```
以「產品負責人 + 技術主導 × AI」的模式，獨立設計並交付 10 個從零到上線的全端專案。

成果亮點：
• 6 個月內交付 10 個已部署專案、117,124 行程式碼、444+ commits
• 最大規模專案達 43,795 行，整合靈修日記、小組回報、檔案分享、活動報名 4 個子系統，採多教會獨立環境部署架構
• 活動報名系統含 13 個 Blueprint 模組（活動 / 簽到 / 課程 / 週報 / 代禱等），LINE 身分即通行證，全系統零帳號摩擦
• 36 小時內把一個 RPG 概念從空 repo 推上 Render 正式部署
• 1 週完成 Windows .exe 安裝包 + macOS .dmg + GitHub Actions 自動 Release 的跨平台桌面裝置

技術範疇：後端 (Flask / Django / FastAPI)、前端 (React / TypeScript / Tailwind)、資料 (Supabase / Cloudflare R2)、身分 (LINE OAuth2)、AI 整合 (Groq / Gemini / DALL·E 3)、影音處理 (librosa / OpenCV / MediaPipe)、部署與 CI (Render / Vercel / HF Spaces / GitHub Actions)。

資安實踐：全系統 LINE OAuth2 無密碼登入、CSRF token (hmac 常數時間比對) + flask-limiter 速率限制、HttpOnly/SameSite/Secure cookie、presigned URL 限時分享、service_role 金鑰僅在後端、多教會租戶資料隔離。
```

---

## 4. 精選專案 Featured Projects

> 可放在「精選 Featured」或「專案 Projects」區。建議精選 4–5 個。原始碼為私有倉庫。

### 天父日記 — AI 輔助靈修日記 App
```
讀經計畫自動對應每日經文、Groq llama-3.3-70b 生成反思引導問題、日記提交後永久鎖定（刻意設計的「記錄誠信」功能）、牧者授權分享機制。
技術：Flask · Supabase · Groq LLM · LINE Login
```

### 活動報名系統 — 教會一站式服務入口（最大規模・100 commits）
```
13 個 Blueprint 模組、QR Code 電子簽到、禱讀本訂購與列印簽收條。全系統零帳號摩擦——LINE 身分即是通行證。
技術：Flask · Supabase · LINE OAuth · CSRF
```

### 互動故事裝置 — 沉浸式手勢互動 + 大螢幕遊戲
```
手部追蹤手勢偵測 (WebSocket)、DALL·E 3 / Gemini 自動生成故事場景、三主題系統、雙隊搶答遊戲。1 週完成 Windows .exe + macOS .dmg + GitHub Actions 自動 Release。
技術：Python · OpenCV · DALL·E 3 · PyInstaller · Inno Setup
```

### PitchPal — 敬拜帶領者的 Key 偵測與移調工具
```
Krumhansl–Schmuckler 音調輪廓法偵測 Key、±12 半音移調、簡譜轉錄（旋律度數 + 和弦名稱）、6 種音色試音。部署於 Hugging Face Spaces，公開免費使用。
技術：Python · librosa · FastAPI · React · HF Spaces
```

### 教會整合管理系統 — 企業級多租戶整合平台
```
整合天父日記、小組回報、檔案分享、活動報名 4 個子系統，多教會獨立環境部署架構。最大規模專案（43,795 行），展示企業級整合能力。
技術：Flask · Supabase · Cloudflare R2 · Groq · DALL·E
```

---

## 5. 技能 Skills

> LinkedIn 技能區建議精選 25–50 個。以下依重要性排序，前幾項記得設為「置頂技能」。

**置頂（Top Skills，選 3 個）**
- Full-Stack Development（全端開發）
- AI Integration（AI 整合）
- Python

**後端 & 框架**
Flask · Django · FastAPI · Python · RESTful API · Blueprint 架構

**前端**
React · TypeScript · Tailwind CSS · JavaScript · Jinja2 · Canvas API · 響應式設計

**資料與雲端**
Supabase · PostgreSQL · SQLite · Cloudflare R2 · Render · Vercel · Hugging Face Spaces

**AI / 機器感知**
Groq LLM · Google Gemini · DALL·E 3 · OpenCV · MediaPipe · librosa · Prompt Engineering

**身分與資安**
OAuth2 · LINE Login · CSRF 防護 · Session 安全 · 資料隔離 · 應用程式安全

**DevOps & 交付**
GitHub Actions · CI/CD · pytest · PWA · PyInstaller · 跨平台打包（Windows / macOS）

**協作模式**
產品管理 · 技術主導 · AI 輔助開發 · 系統架構設計

---

## 6. 補充建議

- **開放工作 (Open to work)**：在頭像開啟「#OpenToWork」綠框，職務填「全端工程師 / 軟體工程師 / AI 工程師」。
- **個人化網址**：把 LinkedIn 公開網址改成 `linkedin.com/in/emmark` 之類的簡潔形式。
- **作品集連結**：在「聯絡資訊」的「網站」欄位加上 https://windsjp00171-star.github.io/CLAUDE-DESIGN/
- **語言**：在 Languages 區加上中文（母語）、英文（依實際程度）。
- **大頭貼 / 背景圖**：可沿用作品集的 EMMARK 棕樹品牌視覺，維持一致性。
