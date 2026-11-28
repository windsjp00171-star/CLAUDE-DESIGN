/* 自動產生，請不要手改：scripts/update_live.py 每小時由 GitHub Actions 更新。
   沒有這個檔、或內容是 null 時，網頁照樣顯示 data/projects.js 的內容。 */
window.PORTFOLIO_LIVE = {
 "generatedAt": "2026-11-28T04:34Z",
 "projects": {
  "acts-survivors": {
   "commits": 204,
   "notes": [
    "會合合擊（分頭行動）",
    "搭檔合擊（同行合擊）要兩人在 90 以內才發動（bond_rules.near），分頭行動時不會隔空合擊",
    "敵人被驅散時的消散效果畫成整張走路圖（四個方向、每格都畫），畫面上冒出一整片半透明的蝙蝠、蜘蛛殘影，也拖慢畫面；改成只…"
   ],
   "notesDate": "2026-11-27",
   "public": true,
   "updated": "2026-11-27"
  },
  "bible-book": {
   "commits": 257,
   "notes": [
    "詞條庫新增約 900 個詞條，涵蓋創世記到啟示錄",
    "tools/sparks_diff.py",
    "單字詞「艾」可標（全經搜尋確認用法唯一）"
   ],
   "notesDate": "2026-10-31",
   "public": true,
   "updated": "2026-11-27"
  },
  "cell-reporter": {
   "commits": 152,
   "public": false,
   "updated": "2026-11-28"
  },
  "church-ms": {
   "commits": 322,
   "notes": [
    "牧者、小組長用 LINE 登入後不能查閱日記",
    "查閱日記頁的成員頭像太大、排成一直排",
    "教材庫存永遠是 0、登記銷售永遠「庫存不足」"
   ],
   "notesDate": "2026-11-22",
   "public": true,
   "updated": "2026-11-27"
  },
  "course": {
   "commits": 138,
   "notes": [
    "講師作品數跟作品集一致",
    "課程地圖的「17 個講師真實專案」改為 19；首頁「為什麼是我來教」的統計格 13 改為 14",
    "「14 個正常使用中」改成「14 個收進作品集」"
   ],
   "notesDate": "2026-11-23",
   "public": true,
   "updated": "2026-11-27"
  },
  "data-hub": {
   "commits": 46,
   "public": false,
   "updated": "2026-11-01"
  },
  "event-portal": {
   "commits": 692,
   "public": false,
   "updated": "2026-11-27"
  },
  "finance": {
   "commits": 209,
   "public": false,
   "updated": "2026-11-28"
  },
  "fooding-hunter": {
   "commits": 49,
   "public": true,
   "updated": "2026-11-27"
  },
  "group": {
   "commits": 66,
   "notes": [
    "自動化測試套件（pytest，tests/）",
    "關鍵設計：tests/conftest.py 在 import app 之前清空 SUPABASE_URL，強制整套跑在",
    "GitHub Actions（.github/workflows/tests.yml）"
   ],
   "notesDate": "2026-07-19",
   "public": true,
   "updated": "2026-11-27"
  },
  "pitchpal": {
   "commits": 65,
   "notes": [
    "BPM 加入敬拜歌的「慢拍先驗」",
    "代價：在電子舞曲（本來就 110 以上）上嚴格命中從 85.5% 降到約 20%；真實是快歌的敬拜歌（約 110–14…",
    "新增「速度 ÷2」「速度 ×2」按鈕"
   ],
   "notesDate": "2026-10-31",
   "public": true,
   "updated": "2026-11-27"
  },
  "repodoctor": {
   "commits": 20,
   "notes": [
    "「只測試 AI 金鑰」拿 Groq 的模型名稱去測 Anthropic，一律回 HTTP 404；現在每家用自己的模型…",
    "AI 分析可以同時串兩家",
    "Groq 撞到每分鐘上限時會等一下再試；這兩項單次送出壓在約 12,000 字以符合免費額度，送不下的規範會在報告上寫明"
   ],
   "notesDate": "2026-11-28",
   "public": true,
   "updated": "2026-11-28"
  },
  "secretary": {
   "commits": 32,
   "notes": [
    "Dashboard 與服事表全面改版為「LINE 對話原生」風格",
    "Dashboard 新增改成底部的聊天式輸入列，可直接打字送出；時間與專案可以展開填寫",
    "編輯改成底部滑出面板，刪除移到面板內；可按 Esc 或點背景關閉"
   ],
   "notesDate": "2026-10-01",
   "public": true,
   "updated": "2026-11-27"
  },
  "tianfu-diary": {
   "commits": 216,
   "public": false,
   "updated": "2026-11-07"
  },
  "zone-games": {
   "commits": 76,
   "public": true,
   "updated": "2026-11-27"
  }
 },
 "totals": {
  "commits": 3177,
  "repos": 27
 }
};
