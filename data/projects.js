/* 作品資料檔：新增作品只需在 decks 對應類別加一筆，不必動版面。
   decks 是作品類別（label 會顯示成篩選按鈕）。
   weight：3 = 主力作品（大卡片）、2 = 中、1 = 小。卡片大小即重要性。
   pro = 專業做法；faith = 因信仰而做的取捨（誠實寫，沒有就寫沒有）。
   isPrivate：true 時不顯示原始碼連結。
   repo：這個作品對應的 GitHub repo 名稱。每小時自動抓它的 commit 數與最近更新日期，
         寫進 data/live.js（scripts/update_live.py，見 README）。
         公開 repo 另外會抓 CHANGELOG 最上面幾條；私有 repo 只公開數字，不公開任何文字。 */
window.PORTFOLIO = {
  email: "emmark19890901@gmail.com",
  github: "https://github.com/windsjp00171-star",
  course: "https://windsjp00171-star.github.io/vibe-coding-course/",
  decks: [
    {
      id: "ministry",
      label: "教會事工系統",
      projects: [
        {
          id: "church-ms", weight: 3, name: "教會整合管理系統", kind: "整合平台", isPrivate: true, repo: "Church-Management-System-demo",
          tagline: "一套 LINE 登入的教會行政系統，二十個可選模組，每間教會自己決定要開哪些、各自獨立部署。",
          tags: ["Flask", "Supabase", "Cloudflare R2", "Groq / Gemini", "LINE Login"],
          pro: ["二十個可選模組：活動報名與簽到、門訓學程、聚會點名、小組回報、天父日記、聖經速讀、主日信息、代禱牆、福音探索、留名單、週報、行事曆、檔案分享、同工差勤、禱讀本訂購等", "超管在後台開關模組：關掉的整塊消失（網址、首頁、權限欄位一起），資料照常保留與備份", "後台權限矩陣：權限一份判定，降權或封鎖五分鐘內生效，不必等對方重新登入", "聚會點名的修改紀錄只許追加；場次鎖定後的修改必須附原因", "新教會部署精靈與給非技術同工的交接文件"],
          faith: "模組名稱都來自事工現場：代禱牆、福音探索、留名單。每間教會用自己的資料庫與登入頻道，我只維護程式碼，不接觸會友資料；要開哪些事工，由教會自己決定。",
          demoUrl: "https://github.com/windsjp00171-star/Church-Management-System-demo", demoLabel: "看公開 Demo 原始碼"
        },
        {
          id: "event-portal", weight: 2, name: "教會入口與活動報名", kind: "服務入口", isPrivate: true, repo: "event-registration-",
          tagline: "活動報名、門訓學程、聖經速讀、主日信息、手機推播，用 LINE 一鍵進入。",
          tags: ["Flask", "Supabase", "LINE Login + LIFF", "Web Push", "原生 HTML / CSS / JS"],
          pro: ["活動自訂報名欄位與跳題，依生日自動判定身分別與監護人欄位；伺服器重算，名額不超收", "QR Code 電子簽到、門訓學程堂次與出席、結業證書", "365 天聖經速讀與每日推播；主日信息自動從 YouTube 播放清單按週整理", "手機推播（Web Push，免費、不經第三方帳號），每一則同時留在站內通知", "小舟 AI 助手照使用手冊回答，只帶路、不代為送出任何資料", "從入口點到天父日記、小組回報、資料交換中心，不必再登入一次"],
          faith: "沒有 LINE 的外部朋友填姓名就能報名，不讓新朋友被門檻擋在外面。系統不主動催繳費用、讀經不顯示「落後幾天」：紙本不會罵人，系統也不該。授權條款寫明教會有永久、無償、不可撤銷的使用權。"
        },
        {
          id: "tianfu-diary", weight: 3, name: "天父日記", kind: "靈修 App", isPrivate: true, repo: "tianfu-diary",
          tagline: "依讀經進度顯示當日經文，安靜書寫，提交後鎖定。",
          tags: ["Flask", "Supabase", "Groq llama-3.3-70b", "LINE Login", "PWA"],
          pro: ["讀經進度在後台用像 Excel 的表格直接編輯，書卷簡稱與章節範圍即時檢查", "AI 依當日經文產生反思問題與段落背景", "串接聖經互動全書的標註引擎，專名與地名可點開", "牧者總覽頁一次看所有授權組員的當日日記與當月完成狀況", "後台一鍵匯出全部資料，壓縮檔內附免網路的離線閱讀器與給非工程師的交接說明"],
          faith: "日記提交後永久鎖定，這是刻意不做的功能：不能事後修改，記錄才誠實。牧者要看，必須會友授權，且可隨時撤銷。系統不替日記打分：不算字數、不標「太短」，由牧者自己讀。"
        },
        {
          id: "finance", weight: 2, name: "教會帳務系統", kind: "財務", isPrivate: true, repo: "Church-Financial-Statements",
          tagline: "會計輸入傳票，報表自動產生；補上 Excel 做不到的權限、稽核與奉獻管理。",
          tags: ["React", "TypeScript", "Vite", "Tailwind CSS", "Supabase RLS"],
          pro: ["轉帳傳票借貸相等才能送出；更正一律用沖銷，原傳票永不修改或刪除", "科目 × 十二個月報表，金額可下鑽逐筆明細；預算編列、報稅科目彙總", "法人大會的收支決算表一鍵產出；代轉奉獻另行登記", "模組 × 角色的權限矩陣，不可竄改的稽核日記與登入日誌", "資產盤點：財產清冊與 QR 貼紙掃碼"],
          faith: "管錢的系統先防「開發者自己」：維運角色在資料庫層就看不到逐筆明細與奉獻資料，連自我授權都擋。奉獻者姓名中間打碼（王O明）。"
        },
        {
          id: "cell-reporter", weight: 1, name: "小組回報系統", kind: "週報", isPrivate: true, repo: "cell_reporter",
          tagline: "小組長用 LINE 交週報，牧者看到全貌。",
          tags: ["Django", "LINE Login", "Jazzmin"],
          pro: ["小組長、同工、牧者三種視角各自的介面", "填錯隨時重填，系統只保留最新一次", "空白不會被當成 0：沒填就提醒，不默默存成「沒有人來」", "週報可存成圖片；聚焦式教學導覽有防呆與閒置自動關閉"],
          faith: "目的只有一個：讓小組長少花時間在行政，多留給組員。"
        },
        {
          id: "data-hub", weight: 1, name: "教會資料交換中心", kind: "檔案", isPrivate: true, repo: "church-data-hub",
          tagline: "同工之間安全分享檔案，每間教會獨立部署。",
          tags: ["Flask", "Supabase", "Cloudflare R2", "Flask-Limiter"],
          pro: ["可見範圍：只有我、所有同工、指定分組、指定使用者、指定角色", "分享連結可一鍵全部停用；整個資料夾可產生公開的教材連結", "批次上傳與手機拍照上傳", "曾診斷並修復免費主機的記憶體不足問題"],
          faith: "開發者只維護程式碼，不持有、不接觸教會的檔案與會友資料。"
        },
        {
          id: "bible-book", weight: 3, name: "聖經互動全書", kind: "聖經閱讀器", isPrivate: false, repo: "bibile-actionbook",
          tagline: "讀經時看不懂的專名、世系，點開就懂。",
          tags: ["Flask", "Supabase", "Leaflet.js", "Groq / Gemini", "Vercel"],
          pro: ["脈絡感知標註引擎，四層消歧義自動判斷同名不同人（例如兩位約蘭王）", "本章世系 SVG 樹狀圖，地名卡片內嵌互動地圖", "三層快取（字典、資料庫、AI）壓低成本", "改動前後跑全本標註回歸檢查，只列出真正消失的標註"],
          faith: "對聖經不能含糊：準確優先於數量。三千三百多個詞條都對著經文原字核對；位置不詳、關係不確定的，寧可不標，不亂猜。",
          repoUrl: "https://github.com/windsjp00171-star/bibile-actionbook", liveUrl: "https://bibile-actionbook.vercel.app/", liveLabel: "開始讀經"
        },
        {
          id: "group", weight: 2, name: "群體共讀靈修 GROUP", kind: "共讀靈修", isPrivate: false, repo: "GROUP-Devotion",
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
      label: "工具與教學",
      projects: [
        {
          id: "course", weight: 3, name: "Vibe Coding 實戰課", kind: "線上課程", isPrivate: false, repo: "vibe-coding-course",
          tagline: "我開的課：帶非工程師用 Claude Code 做出自己的網站。",
          tags: ["Vanilla JS", "Supabase", "Google OAuth", "GitHub Pages", "node:test"],
          pro: ["二十多個單元，從 AI 基礎、安裝、Git、上線，一路到資料庫、LINE 登入、推播、交接與成本", "每單元有互動練習：Git 存檔點模擬器、個資遮罩、程式碼體檢", "學員、講師雙模式與投影模式，一鍵印出紙本學習單", "Google 登入、班級加入碼、講師後台看全班進度", "網頁是教材唯一來源，簡報與 Kahoot 題庫由程式自動產生；講師內容放在另一個私有 repo，不進公開站"],
          faith: "我把自己真實踩過的二十多個坑寫成踩坑圖鑑，讓學員不必再踩一次。",
          repoUrl: "https://github.com/windsjp00171-star/vibe-coding-course", liveUrl: "https://windsjp00171-star.github.io/vibe-coding-course/", liveLabel: "進入課程"
        },
        {
          id: "pitchpal", weight: 2, name: "PitchPal 音樂 Key 工具", kind: "音樂工具", isPrivate: false, repo: "pitchpal",
          tagline: "為敬拜帶領者偵測歌曲 Key 並移調。",
          tags: ["Python", "librosa", "FastAPI", "React", "HF Spaces"],
          pro: ["Krumhansl–Schmuckler 音調輪廓法偵測 Key", "正負十二個半音滑桿移調、簡譜轉錄（旋律度數加和弦名稱）", "六種音色試音，草稿存在瀏覽器"],
          faith: "為敬拜團隊而做，公開免費使用。",
          repoUrl: "https://github.com/windsjp00171-star/pitchpal", liveUrl: "https://winds00171-pitchpal.hf.space/", liveLabel: "立即體驗"
        },
        {
          id: "secretary", weight: 1, name: "Emmark 小秘書", kind: "LINE Bot", isPrivate: true, repo: "emmask-secret",
          tagline: "用一句話記行程、待辦和帳，到點自動提醒，也能查服事表。",
          tags: ["LINE Messaging API", "Node.js", "Supabase", "Vercel", "Webhook"],
          pro: ["自然語言記錄行程與待辦，到點主動推播；每天早上一份簡報", "服事表 PDF 自動排班，查詢敬拜團哪一週誰服事", "「午餐 150」這類句子直接記成一筆帳，不必等 AI", "Vercel Serverless 部署與管理 Dashboard"],
          faith: "把瑣碎的提醒交給系統，人留給服事本身。"
        }
      ]
    },
    {
      id: "play",
      label: "互動與遊戲",
      projects: [
        {
          id: "acts-survivors", weight: 3, name: "宣教之路", kind: "像素 roguelite 遊戲", isPrivate: false, repo: "acts-survivors",
          tagline: "使徒行傳背景的像素風生存遊戲：敵人是黑暗的勢力，人從來不是敵人。",
          tags: ["Godot 4.4", "GDScript", "JSON 資料驅動", "網頁 / Windows / Android", "itch.io"],
          pro: ["劇情照使徒行傳的時間順序，從五旬節的耶路撒冷走到拔摩海島；最後一章是 1865 年的台南府城", "關卡、同伴、劇情都寫在 JSON，不會寫程式的人也能改", "同一份專案匯出網頁、Windows、Android；存檔碼可跨裝置搬移", "通過劇情後開放自由模式：選主角、組隊、組流派，挑戰信心等級與無盡模式"],
          faith: "每個黑暗的勢力背後都捆綁著一個人，爭戰是為了把人贏回來（弗 6:12、徒 26:18）。心願是讓人喜歡上遊戲的同時，也有機會認識這份信仰。",
          liveUrl: "https://windsjp00171-star.github.io/acts-survivors/", liveLabel: "在瀏覽器玩",
          demoUrl: "https://emmark1989.itch.io/actsurvivors", demoLabel: "itch.io 介紹與下載"
        },
        {
          id: "zone-games", weight: 2, name: "互動故事裝置", kind: "互動裝置", isPrivate: false, repo: "-zone-games",
          tagline: "教會活動用的手勢互動故事與大螢幕搶答遊戲。",
          tags: ["Python", "OpenCV", "DALL·E 3", "PyInstaller", "Inno Setup"],
          pro: ["手部追蹤手勢偵測，WebSocket 即時傳送", "DALL·E 3 與 Gemini 自動生成故事場景圖", "三種主題、雙隊搶答模式", "一週完成 Windows 安裝檔、macOS dmg 與 GitHub Actions 自動發佈"],
          faith: "為教會營隊與活動而做；速度是這個專案想證明的事。",
          repoUrl: "https://github.com/windsjp00171-star/-zone-games"
        },
        {
          id: "fooding-hunter", weight: 2, name: "美食獵人", kind: "RPG 遊戲", isPrivate: false, repo: "fooding-hunter",
          tagline: "把吃飯變成 RPG：用懸賞令決定今天吃什麼。",
          tags: ["Flask", "Supabase", "Google Places API", "Canvas API"],
          pro: ["S / A / B / C 等級懸賞令（C 級經驗值最高，是設計上的笑點）", "Places API 加三十天快取，每日重抽機制", "Canvas 拍立得分享卡，不上傳伺服器"],
          faith: "這個專案和信仰沒有直接關係，但做它的人就是基督徒，做事的態度沒有兩樣。我把它留在這裡，也是因為它證明了速度：三十六小時從空 repo 到正式部署。",
          repoUrl: "https://github.com/windsjp00171-star/fooding-hunter"
        }
      ]
    }
  ],
  owner: ["需求定義與產品設計", "UX 判斷與使用者研究", "架構決策與技術選型", "測試驗收與上線把關", "「這個功能不做」的決定"],
  ai: ["程式碼實作（約八成）", "邊界案例偵測與資安檢查", "跨專案知識複用", "Debug 根因分析", "文件與測試生成"],
  stack: [
    ["後端框架", "網站的大腦，處理運算與資料流動。", "Flask · Django · FastAPI · Node.js"],
    ["前端介面", "使用者看到、點到的畫面。", "React · TypeScript · Tailwind CSS · Jinja2"],
    ["資料庫", "把會員、報名、紀錄安全存起來。", "Supabase PostgreSQL · SQLite"],
    ["雲端檔案儲存", "存圖片、音檔、文件，不佔伺服器空間。", "Cloudflare R2"],
    ["登入身分", "用 LINE 一鍵登入，不必再記密碼；各系統之間免重複登入。", "LINE Login OAuth2 · 簽章 token 單一登入"],
    ["手機通知", "不用打開網站，事情會自己跳到手機上。", "Web Push（VAPID）· LINE Messaging API"],
    ["AI 整合", "請 AI 生成文字、畫圖、判讀內容。", "Groq · Gemini · Claude · DALL·E 3 · GPT-Image-1"],
    ["聲音與影像", "讓程式聽得到、看得見。", "librosa · OpenCV · MediaPipe"],
    ["遊戲引擎", "做可以在網頁、電腦、手機上玩的遊戲。", "Godot 4"],
    ["上線部署", "把作品送上網，含電腦安裝檔。", "Render · Vercel · PythonAnywhere · HF Spaces · GitHub Pages · itch.io · Windows 安裝檔 · macOS dmg"],
    ["自動化測試", "改完自動檢查、自動發佈。", "GitHub Actions · pytest · node:test · Playwright"]
  ],
  security: [
    ["無密碼登入", "全系統以 LINE OAuth2 為唯一登入，不自建、不儲存密碼；錯誤監控關閉個資蒐集（send_default_pii=False）。"],
    ["CSRF 防護與速率限制", "所有寫入請求強制驗證 token，hmac 常數時間比對；搭配 flask-limiter 防濫用。"],
    ["安全 Session Cookie", "HttpOnly 防 XSS 竊取、SameSite=Lax 防 CSRF、正式環境僅走 HTTPS。"],
    ["金鑰只在後端", "service_role 與各種 secret 全走環境變數，不進版控、不暴露前端。"],
    ["精細存取控管", "檔案可見範圍分個人、全體、指定分組、指定使用者，並過濾已封鎖帳號，最小權限。"],
    ["可撤銷的分享連結", "分享出去的連結可一鍵全部停用；下載連結有時效，逾期自動失效。"],
    ["資料不可竄改", "靈修日記提交後永久鎖定；帳務傳票只能沖銷，不能修改或刪除；點名修改紀錄只許追加。"],
    ["授權式查閱與稽核", "牧者看個人日記須當事人授權、可隨時撤銷；關鍵操作留稽核日誌。"],
    ["權限撤銷立即生效", "登入一次可以用一年，但降權、封鎖、刪帳號在五分鐘內生效，不必等對方登出。"],
    ["多教會資料隔離", "每間教會各自的資料庫、物件儲存與登入頻道；開發者不持有教會用戶資料。"],
    ["可交接、可備份", "系統提供一鍵匯出全部資料、免網路的離線閱讀器，以及給非工程師的交接說明。"]
  ]
};
