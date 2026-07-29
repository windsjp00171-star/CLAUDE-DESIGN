# 專案總覽清冊

12 個專案的權威清單。**這份檔案存在的目的是取代記憶**——專案一多，
「哪個跑在哪、網址是什麼、有沒有人在用」靠腦袋記一定會出事。

> 維護規則見 `CLAUDE.md`。**開新專案、換平台、換網址時務必回來更新**，
> 並同步更新 `emmask-secret/lib/classifier.js` 的已知專案清單。
> 不一致的清冊比沒有清冊更危險，因為你會相信它。

最後更新：2026-07-29

---

## 一覽表

| # | 專案 | 用途 | 技術棧 | 部署 | 狀態 |
|---|------|------|--------|------|------|
| 1 | **event-registration-** | 教會一站式服務（活動報名／簽到／門訓／行事曆／會友／禱讀本） | Flask + Supabase + LINE | Render | 🔴 **正式站，真實會友在用** |
| 2 | **Church-Management-System-demo** | 四子系統整合版（對外展示用） | Flask + Supabase + LINE + R2 | Render | 🟢 Demo |
| 3 | **church-data-hub** | 教會內部檔案分享 | Flask + Supabase + R2 + LINE | Render | 🟡 部署中，網址待補 |
| 4 | **tianfu-diary** | 個人靈修日記 + AI 反思引導 | Flask + Supabase + LINE | Render | 🟡 部署中，網址待補 |
| 5 | **GROUP-Devotion** | 學青小組群體共讀靈修 | Flask + Supabase + LINE | Railway | 🟢 上線中 |
| 6 | **bibile-actionbook** | 互動聖經閱讀（context-aware 標註引擎） | Flask + Supabase | Railway | 🟢 上線中 |
| 7 | **cell_reporter** | 小組週報回報 | Django 5 + SQLite | ⚠️ **無部署設定** | 🟡 開發中 |
| 8 | **Church-Financial-Statements** | 教會財務／奉獻／稽核 | React + TS + Vite + Supabase | Vercel | 🔴 **正式站，真實金流** |
| 9 | **fooding-hunter** | 美食狩獵 RPG（單機） | Flask + Supabase | Render | 🟢 上線中 |
| 10 | **pitchpal** | 音樂 Key 偵測與移調 | Gradio + librosa | HF Spaces | 🟢 上線中 |
| 11 | **emmask-secret** | LINE Bot 個人助理（**管理其他 11 個專案**） | Node + Claude + Supabase | Vercel | 🟢 上線中 |
| 12 | **CLAUDE-DESIGN** | 作品集官網 ＋ 本清冊 | 靜態 HTML | GitHub Pages | 🟢 上線中 |

🔴 = 有真實使用者／真實資料，改動要格外小心　🟢 = 上線中　🟡 = 資訊待補或開發中

---

## 正式網址

| 專案 | 網址 |
|------|------|
| event-registration- | https://event-registratiochurch-event-reg.onrender.com |
| Church-Management-System-demo | https://church-management-system-demo.onrender.com |
| church-data-hub | ⚠️ 待補 |
| tianfu-diary | ⚠️ 待補 |
| GROUP-Devotion | https://web-production-c1d3c.up.railway.app |
| bibile-actionbook | https://web-production-68aee1.up.railway.app |
| cell_reporter | ⚠️ 尚未部署 |
| Church-Financial-Statements | ⚠️ 待補（Vercel）|
| fooding-hunter | https://fooding-hunter.onrender.com |
| pitchpal | https://winds00171-pitchpal.hf.space |
| emmask-secret | https://emmask-secret.vercel.app（LINE Bot，無前台）|
| CLAUDE-DESIGN | https://windsjp00171-star.github.io/CLAUDE-DESIGN/ |

> Railway 那兩個是自動產生的 `web-production-xxxxx` 網址，看不出是哪個專案。
> 之後設自訂網域時記得回來改，順便改 `index.html` 的 `demos` 物件。

---

## 文件與測試覆蓋

| 專案 | CLAUDE.md | 測試 | 備註 |
|------|:---------:|:----:|------|
| event-registration- | ✅ | ✅ pytest | |
| Church-Management-System-demo | ✅ | ⚠️ 只有 1 檔 | 只測 attendance 計算 |
| church-data-hub | ✅ | ✅ pytest | |
| tianfu-diary | ✅ | ❌ | 全部邏輯在單一 `app.py` |
| GROUP-Devotion | ✅ | ✅ pytest + CI | 測試強制跑記憶體模式，碰不到正式 DB |
| bibile-actionbook | ✅ | ❌ | 靠 `tools/bible_query.py` 人工核對 |
| cell_reporter | ✅ | ❌ | Django test 未建立 |
| Church-Financial-Statements | ✅ | ❌ | 安全性靠 Supabase RLS |
| fooding-hunter | ✅ | ✅ pytest | |
| pitchpal | ✅ | ✅ | |
| emmask-secret | ✅ | ❌ | 改 prompt 後只能實測 |
| CLAUDE-DESIGN | ✅ | — | 靜態網站 |

---

## 共用資產與已知重複

### `cuv.json`（和合本全文，3.4MB）存在 **4 份副本**

`tianfu-diary/scripture/` · `GROUP-Devotion/scripture/` ·
`bibile-actionbook/` · `Church-Management-System-demo/scripture/`

改任何一份之前，先想其他三份要不要一起改。**目前沒有同步機制。**

### LINE Login 有 8 份各自獨立的實作

event-registration- · Church-Management-System-demo · church-data-hub ·
tianfu-diary · GROUP-Devotion · cell_reporter · fooding-hunter · emmask-secret

OAuth 流程本身幾乎相同，分岔在「登入後寫哪些 session key、導去哪」。
**GROUP-Devotion 的是刻意獨立的**（MIT 開源給人接手，可讀性優先），不要動它。

### event-registration- 與 Church-Management-System-demo 已經分家

同名 route 檔的差異行數（2026-07 實測）：

| 檔案 | 差異 | 判讀 |
|------|-----:|------|
| `bulletin.py` | 14 行 | 幾乎相同 |
| `checkin.py` | 18 行 | 幾乎相同 |
| `gospel.py` | 102 行 | 小幅分岔 |
| `event.py` | 931 行 | 明顯分岔 |
| `admin.py` | 1589 行 | 已是兩套 |
| `courses.py` | 2582 行 | 已是兩套 |

**方針（2026-07 決定）：兩者視為兩個獨立產品，各自演化，不做同步。**
未來若要共用，只抽 auth / db / notifications / csrf 這類無業務邏輯的核心，
其餘各自保留。改一邊時**不需要**同步到另一邊。

---

## 各專案的隱藏地雷（跨專案共通）

這幾條在多個專案都會踩到，寫在這裡是為了讓任何一個專案的 session 都查得到。

### iOS LINE 內建瀏覽器的檔案上傳
影響：所有有上傳功能又從 LINE 進入的專案

1. **不要加 `capture="environment"`** —— 加了反而相機／相簿都叫不出來
2. **不能用 JS 觸發 `input.click()`** —— 必須用 `<label for="...">` 直接關聯

```html
<label for="f">點擊上傳</label>
<input id="f" type="file" accept="image/*" style="display:none;">
```

### LINE 內建瀏覽器不能安裝 PWA
現場推廣的 QR Code 網址加 `?openExternalBrowser=1`，LINE 會直接跳系統瀏覽器，
使用者照舊用 LINE 掃碼即可，不必改變習慣。

### iOS PWA 的 cookie 容器獨立 → 裝完變成未登入
且 LINE 會退回要求 email + 密碼（幾乎沒人記得）。
解法見 `event-registration-/routes/pwa_session.py`（獨立模組，可移植）。
**最容易漏的一步**：`<link rel="manifest" crossorigin="use-credentials">`，
少了它整套靜默失效、沒有任何錯誤訊息。

### supabase-py 的 `maybe_single()`
某些版本在 0 筆時回 HTTP 406 並丟例外，把「查無資料」變成 500。
曾導致 fooding-hunter 所有新用戶登入 500。改用自己的 `fetch_one()`。

### Render 免費方案會休眠
首訪冷啟動 30～60 秒。加一條極輕量的 `/ping` 或 `/health`（不查 DB、不打 API），
用 cron-job.org 或 UptimeRobot 每 10 分鐘打一次保溫。
⚠️ 常駐會吃滿免費的 750 instance hours/月，**單一服務剛好用滿**——
多個服務同時保溫額度會不夠。

---

## 待辦

- [ ] 補上 church-data-hub / tianfu-diary / Church-Financial-Statements 的正式網址
- [ ] cell_reporter：決定是否部署，或標記為純本機工具
- [ ] GROUP-Devotion：Fly.io 搬遷完成後更新此表，並清掉 Railway 設定
- [ ] Railway 兩個專案設自訂網域（現在的網址看不出是哪個專案）
- [ ] `cuv.json` 四份副本的同步機制
