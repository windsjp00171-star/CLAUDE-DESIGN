/* 作品資料檔：新增作品只需在 decks 對應甲板加一筆，不必動版面。
   weight：3 = 大艙（主力作品）、2 = 中艙、1 = 小艙。大小即重要性。
   pro = 專業做法；faith = 因信仰而做的取捨（誠實寫，沒有就寫沒有）。
   isPrivate：true 時不顯示原始碼連結。 */
window.PORTFOLIO = {
  email: "emmark19890901@gmail.com",
  github: "https://github.com/windsjp00171-star",
  course: "https://windsjp00171-star.github.io/vibe-coding-course/",
  decks: [
    {
      id: "ministry",
      name: "上層甲板",
      label: "教會事工系統",
      projects: [
        {
          id: "church-ms", weight: 3, name: "教會整合管理系統", kind: "整合平台", isPrivate: true,
          tagline: "一套 LINE 登入的教會行政系統，十五個事工模組，各教會獨立部署。",
          tags: ["Flask", "Supabase", "Cloudflare R2", "Groq / Gemini", "LINE Login"],
          pro: ["十五個模組：活動報名、電子簽到、牧養小組、小組回報、門訓學程、天父日記、代禱麥田、行事曆、週報、福音探索、留名單、檔案分享、差勤管理、站內通知、系統更新通知", "差勤依勞基法計算特休、補休與加班", "八種角色權限，從訪客到超級管理員", "內建 /setup-wizard 驗證設定、可選 Sentry 錯誤監控"],
          faith: "模組名稱都來自事工現場：代禱麥田、福音探索、留名單。牧者查看日記必須經會友授權；每間教會自己的資料庫與登入頻道，我只維護程式碼。",
          demoUrl: "https://github.com/windsjp00171-star/Church-Management-System-demo", demoLabel: "看早期公開 Demo ↗"
        },
        {
          id: "event-portal", weight: 2, name: "教會入口與活動報名", kind: "服務入口", isPrivate: true,
          tagline: "活動報名、QR 電子簽到、門訓學程、教會行事曆，用 LINE 一鍵進入。",
          tags: ["Flask", "Supabase", "LINE Login + LIFF", "原生 HTML / CSS / JS"],
          pro: ["活動自訂報名欄位與跳題邏輯，名單可匯出 Excel", "QR Code 電子簽到，現場有即時簽到展示頁", "門訓學程：堂次、出席追蹤、完訓認證批次錄入", "第一位管理員在網頁上點一下就設定完，設完頁面自動關閉"],
          faith: "沒有 LINE 的外部朋友填姓名就能報名，不讓新朋友被門檻擋在外面。授權條款寫明教會有永久、無償、不可撤銷的使用權，不因我是否仍在該會服事而改變。"
        },
        {
          id: "tianfu-diary", weight: 3, name: "天父日記", kind: "靈修 App", isPrivate: true,
          tagline: "依讀經進度顯示當日經文，安靜書寫，提交後鎖定。",
          tags: ["Flask", "Supabase", "Groq llama-3.3-70b", "LINE Login", "PWA"],
          pro: ["讀經進度表上傳後立即生效，經文為和合本全文", "AI 依當日經文產生反思問題與段落背景", "串接聖經互動全書的標註引擎，專名與地名可點開", "後台一鍵匯出全部資料，壓縮檔內附免網路的離線閱讀器與給非工程師的交接說明"],
          faith: "日記提交後永久鎖定，這是刻意不做的功能：不能事後修改，記錄才誠實。牧者要看，必須會友授權，且可隨時撤銷。"
        },
        {
          id: "finance", weight: 2, name: "教會帳務系統", kind: "財務", isPrivate: true,
          tagline: "會計輸入傳票，報表自動產生；補上 Excel 做不到的權限、稽核與奉獻管理。",
          tags: ["React", "TypeScript", "Vite", "Tailwind CSS", "Supabase RLS"],
          pro: ["轉帳傳票借貸相等才能送出；更正一律用沖銷，原傳票永不修改或刪除", "科目 × 十二個月報表，金額可下鑽逐筆明細；預算編列、報稅科目彙總", "模組 × 角色的權限矩陣，不可竄改的稽核日記與登入日誌", "資產盤點：財產清冊與 QR 貼紙掃碼"],
          faith: "管錢的系統先防「開發者自己」：維運角色在資料庫層就看不到逐筆明細與奉獻資料，連自我授權都擋。奉獻者姓名中間打碼（王O明）。"
        },
        {
          id: "cell-reporter", weight: 1, name: "小組回報系統", kind: "週報", isPrivate: true,
          tagline: "小組長用 LINE 交週報，牧者看到全貌。",
          tags: ["Django 6", "LINE Login", "Jazzmin"],
          pro: ["小組長、同工、牧者三種視角各自的介面", "填錯隨時重填，系統只保留最新一次", "週報可存成圖片；聚焦式教學導覽有防呆與閒置自動關閉"],
          faith: "目的只有一個：讓小組長少花時間在行政，多留給組員。"
        },
        {
          id: "data-hub", weight: 1, name: "教會資料交換中心", kind: "檔案", isPrivate: true,
          tagline: "同工之間安全分享檔案，每間教會獨立部署。",
          tags: ["Flask", "Supabase", "Cloudflare R2", "Flask-Limiter"],
          pro: ["可見範圍：只有我、所有同工、指定分組、指定使用者、指定角色", "限時分享連結（1 小時、24 小時、7 天）", "批次上傳與手機拍照上傳", "曾診斷並修復免費主機的記憶體不足問題"],
          faith: "開發者只維護程式碼，不持有、不接觸教會的檔案與會友資料。"
        },
        {
          id: "bible-book", weight: 3, name: "聖經互動全書", kind: "聖經閱讀器", isPrivate: false,
          tagline: "讀經時看不懂的專名、世系，點開就懂。",
          tags: ["Flask", "Supabase", "Leaflet.js", "Groq / Gemini", "Vercel"],
          pro: ["脈絡感知標註引擎，四層消歧義自動判斷同名不同人（例如兩位約蘭王）", "本章世系 SVG 樹狀圖，地名卡片內嵌互動地圖", "三層快取（字典、資料庫、AI）壓低成本", "讀者回報驅動的詞條精修流程"],
          faith: "對聖經不能含糊：準確優先於數量。五百八十六條精修詞條，寧可少，不亂猜。",
          repoUrl: "https://github.com/windsjp00171-star/bibile-actionbook", liveUrl: "https://bibile-actionbook.vercel.app/", liveLabel: "開始讀經 ↗"
        },
        {
          id: "group", weight: 2, name: "群體共讀靈修 GROUP", kind: "共讀靈修", isPrivate: false,
          tagline: "學青小組每天讀同一段經文、留下領受、非同步看見彼此。",
          tags: ["Flask", "Supabase", "LINE Login", "PWA", "pytest / CI"],
          pro: ["四十二個 pytest 強制跑在記憶體示範模式，絕不碰正式資料庫", "session 偽造保險與 CSV 公式注入防護，加上 CI", "金句圖卡由前端 canvas 生成，一鍵分享"],
          faith: "聖經的字句不能被動：我親手移除了讓輔導自由打經文的功能，經文一律從和合本帶出。禁言只擋文字、不擋貼圖；輔導可安靜移除不當內容，不公審。",
          repoUrl: "https://github.com/windsjp00171-star/GROUP-Devotion"
        }
      ]
    },
    {
      id: "tools",
      name: "中層甲板",
      label: "工具與教學",
      projects: [
        {
          id: "course", weight: 3, name: "Vibe Coding 實戰課", kind: "線上課程", isPrivate: false,
          tagline: "我開的課：帶非工程師用 Claude Code 做出自己的網站。",
          tags: ["Vanilla JS", "Supabase", "Google OAuth", "GitHub Pages", "node:test"],
          pro: ["十五個單元，每單元有互動練習：Git 存檔點模擬器、個資遮罩、程式碼體檢", "學員、講師雙模式與投影模式，一鍵印出紙本學習單", "Google 登入、班級加入碼、講師後台看全班進度", "網頁是教材唯一來源，簡報與 Kahoot 題庫由程式自動產生；講師內容放在另一個私有 repo，不進公開站"],
          faith: "我踩過二十五個坑，寫成教材，讓學員不必再踩一次。",
          repoUrl: "https://github.com/windsjp00171-star/vibe-coding-course", liveUrl: "https://windsjp00171-star.github.io/vibe-coding-course/", liveLabel: "進入課程 ↗"
        },
        {
          id: "pitchpal", weight: 2, name: "PitchPal 音樂 Key 工具", kind: "音樂工具", isPrivate: false,
          tagline: "為敬拜帶領者偵測歌曲 Key 並移調。",
          tags: ["Python", "librosa", "FastAPI", "React", "HF Spaces"],
          pro: ["Krumhansl–Schmuckler 音調輪廓法偵測 Key", "正負十二個半音滑桿移調、簡譜轉錄（旋律度數加和弦名稱）", "六種音色試音，草稿存在瀏覽器"],
          faith: "為敬拜團隊而做，公開免費使用。",
          repoUrl: "https://github.com/windsjp00171-star/pitchpal", liveUrl: "https://winds00171-pitchpal.hf.space/", liveLabel: "立即體驗 ↗"
        },
        {
          id: "secretary", weight: 1, name: "Emmark 小秘書", kind: "LINE Bot", isPrivate: true,
          tagline: "用一句話記行程，到點自動提醒，也能查服事表。",
          tags: ["LINE Messaging API", "Python", "Vercel", "Webhook"],
          pro: ["自然語言記錄行程並主動推播提醒", "對訊息設定回覆型提醒", "查詢敬拜團哪一週誰服事", "Vercel Serverless 部署與管理 Dashboard"],
          faith: "把瑣碎的提醒交給系統，人留給服事本身。"
        }
      ]
    },
    {
      id: "play",
      name: "下層甲板",
      label: "互動與遊戲",
      projects: [
        {
          id: "zone-games", weight: 2, name: "互動故事裝置", kind: "互動裝置", isPrivate: false,
          tagline: "教會活動用的手勢互動故事與大螢幕搶答遊戲。",
          tags: ["Python", "OpenCV", "DALL·E 3", "PyInstaller", "Inno Setup"],
          pro: ["手部追蹤手勢偵測，WebSocket 即時傳送", "DALL·E 3 與 Gemini 自動生成故事場景圖", "三種主題、雙隊搶答模式", "一週完成 Windows 安裝檔、macOS dmg 與 GitHub Actions 自動發佈"],
          faith: "為教會營隊與活動而做；速度是這個專案想證明的事。",
          repoUrl: "https://github.com/windsjp00171-star/-zone-games"
        },
        {
          id: "fooding-hunter", weight: 2, name: "美食獵人", kind: "RPG 遊戲", isPrivate: false,
          tagline: "把吃飯變成 RPG：用懸賞令決定今天吃什麼。",
          tags: ["Flask", "Supabase", "Google Places API", "Canvas API"],
          pro: ["S / A / B / C 等級懸賞令（C 級經驗值最高，是設計上的笑點）", "Places API 加三十天快取，每日重抽機制", "Canvas 拍立得分享卡，不上傳伺服器"],
          faith: "這個專案沒有信仰命題。我把它留在這裡，是因為它證明了速度：三十六小時從空 repo 到正式部署。",
          repoUrl: "https://github.com/windsjp00171-star/fooding-hunter"
        }
      ]
    }
  ],
  owner: ["需求定義與產品設計", "UX 判斷與使用者研究", "架構決策與技術選型", "測試驗收與上線把關", "「這個功能不做」的決定"],
  ai: ["程式碼實作（約八成）", "邊界案例偵測與資安檢查", "跨專案知識複用", "Debug 根因分析", "文件與測試生成"],
  stack: [
    ["後端框架", "網站的大腦，處理運算與資料流動。", "Flask · Django 6 · FastAPI"],
    ["前端介面", "使用者看到、點到的畫面。", "React · TypeScript · Tailwind CSS · Jinja2"],
    ["資料庫", "把會員、報名、紀錄安全存起來。", "Supabase PostgreSQL · SQLite"],
    ["雲端檔案儲存", "存圖片、音檔、文件，不佔伺服器空間。", "Cloudflare R2"],
    ["登入身分", "用 LINE 一鍵登入，不必再記密碼。", "LINE Login OAuth2"],
    ["AI 整合", "請 AI 生成文字、畫圖、判讀內容。", "Groq · Gemini · DALL·E 3 · GPT-Image-1"],
    ["聲音與影像", "讓程式聽得到、看得見。", "librosa · OpenCV · MediaPipe"],
    ["上線部署", "把作品送上網，含電腦安裝檔。", "Render · Vercel · HF Spaces · GitHub Pages · Windows 安裝檔 · macOS dmg"],
    ["自動化測試", "改完自動檢查、自動發佈。", "GitHub Actions · pytest"]
  ],
  security: [
    ["無密碼登入", "全系統以 LINE OAuth2 為唯一登入，不自建、不儲存密碼；錯誤監控關閉個資蒐集（send_default_pii=False）。"],
    ["CSRF 防護與速率限制", "所有寫入請求強制驗證 token，hmac 常數時間比對；搭配 flask-limiter 防濫用。"],
    ["安全 Session Cookie", "HttpOnly 防 XSS 竊取、SameSite=Lax 防 CSRF、正式環境僅走 HTTPS。"],
    ["金鑰只在後端", "service_role 與各種 secret 全走環境變數，不進版控、不暴露前端。"],
    ["精細存取控管", "檔案可見範圍分個人、全體、指定分組、指定使用者，並過濾已封鎖帳號，最小權限。"],
    ["限時分享連結", "presigned URL 可設一小時、二十四小時、七天到期，逾期自動失效。"],
    ["資料不可竄改", "靈修日記提交後永久鎖定；帳務傳票只能沖銷，不能修改或刪除。"],
    ["授權式查閱與稽核", "牧者看個人日記須當事人授權、可隨時撤銷；關鍵操作留稽核日誌。"],
    ["多教會資料隔離", "每間教會各自的資料庫、物件儲存與登入頻道；開發者不持有教會用戶資料。"],
    ["可交接、可備份", "系統提供一鍵匯出全部資料、免網路的離線閱讀器，以及給非工程師的交接說明。"]
  ]
};
