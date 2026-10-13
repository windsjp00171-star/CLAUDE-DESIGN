# Product

<!-- impeccable:product-schema 1 -->

## Platform

web

## Stack

Static single-page site on GitHub Pages (`index.html` at repo root, no build step). Rebuild target: plain HTML/CSS/JS split into maintainable files plus one project data file, so adding a project means editing data, not markup. Stack choice confirmed with the user as part of "全都重構".

## Users

- **接案客戶**：教會或小型組織的決策者，多半非技術背景，想知道「這個人做過什麼、能不能信任、怎麼聯絡」。
- **教會同工與同行**：想看見作者的專業，以及這份專業如何落實在教會事工上。作品集不是給長輩操作的介面（作者 2026-10-13 確認），長輩使用情境由各事工系統本身負責，不由本站承擔。
- 求職／招募方不是主要受眾；履歷（`resume.html`、`EMMARK-resume.pdf`）與 LinkedIn 文案（`linkedin-profile.md`）另供使用。

## Product Purpose

EMMARK（以馬內利 × 方舟）的個人作品集：展示「全端 × AI 協作」交付的教會事工系統與工具，讓潛在客戶與教會夥伴快速看懂成果並聯絡。成功 = 訪客看完能說出「他做過哪些真的在用的系統」、看見專業判斷背後的信仰如何具體落實（例如：日記提交後鎖定、聖經字句不可編輯、資安預設、離線可交接），並主動聯繫或進入課程。核心敘事：專業 × 信仰落實，最終指向傳福音（作者 2026-10-13 指定的終點）。

## Positioning

作品全是真實上線、服務教會的系統，且誠實聲明大量程式碼由 AI 實作、本人負責需求、UX、架構與驗收，並在資安與隱私上有可說明的具體做法（LINE OAuth 無密碼、CSRF、資料隔離、稽核日誌、數位遺囑備份）。

## Operating Context

- 作品集以單頁網站呈現，網址 https://windsjp00171-star.github.io/CLAUDE-DESIGN/
- 專案來源為作者 GitHub（windsjp00171-star）的公開與私有 repo；私有專案以摘要卡呈現。
- 配套檔：履歷頁與 PDF、LinkedIn 文案、OG 圖與品牌圖。

## Capabilities and Constraints

- 目前收錄 13 個專案（天父日記、活動報名／教會入口、小組回報、互動故事裝置、美食獵人、PitchPal、資料交換中心、教會財務、教會整合管理、Emmark 小秘書、聖經互動全書、群體共讀靈修 GROUP、Vibe Coding 實戰課）。
- 已偵測的過時內容（改版時更新）：整合管理系統已演進為 15 個模組（含差勤、代禱麥田、福音探索）；財務系統已是含傳票、預算、奉獻、權限矩陣、稽核、資產盤點的完整會計系統，非「純前端」；天父日記已具備一鍵匯出與離線閱讀器；教會入口已含門訓學程、行事曆、LIFF；小組回報步驟數（站上寫六步驟、README 寫三步驟）待作者確認。
- 站上統計數字（127K 行、500+ commits、13 專案）未經重新核算，改版前不得沿用為事實；待作者提供或以實際 repo 重算。
- 尚未決定：是否新增 sermon-assist-core（無 README）；bible-game、sprital-pets、ordersystem 為空 repo，不收錄。
- 不得改動既有對外連結（各專案 Live／原始碼連結）除非已確認失效。

## Brand Commitments

- 品牌名 EMMARK（以馬內利 × 方舟），經文「義人要發旺如棕樹」詩篇 92:12。
- 對 AI 協作的誠實聲明必須保留且位置明確：程式大量由 AI 實作，作者負責需求、UX、架構、驗收與「不做什麼」的決定。
- 資安與隱私區塊保留。
- Vibe Coding 實戰課入口在導覽中保持醒目。
- 私有專案只呈現功能與技術摘要，不放原始碼連結，不出現會友或教會具名資料。

## Evidence on Hand

- 真實可試用連結：PitchPal（HF Spaces）、聖經互動全書（Vercel）、Vibe Coding 實戰課（GitHub Pages）。
- 公開原始碼：zone-games、fooding-hunter、pitchpal、Church-Management-System-demo、bibile-actionbook、GROUP-Devotion、vibe-coding-course。
- 沒有可引用的客戶見證；不得捏造評價、客戶名或成效數字。

## Product Principles

1. 讓非技術訪客在首屏就能回答「他是誰、做過什麼、怎麼聯絡」。
2. 誠實優先：AI 協作與數字都要可追溯，寧可少寫也不誇大。
3. 安靜可預期：不依賴 hover、翻牌或動畫才能取得資訊。
4. 新增作品只改資料檔，不動版面。
5. 全站的終點是傳福音：專業是船，福音是航向；結尾要把作品對應到「把福音帶給人」，用作者自己的話（「傳神的榮耀國度　傳神美好的見證」）與經文，不寫說教式的呼召。
6. 專業與信仰同場：每個專案要能說出「專業判斷」與「信仰上的取捨」，不另闢說教區塊。
7. 離線可讀、可交接：網站內容不綁死單一維護者。

## Accessibility & Inclusion

- 受眾調整：本站主要用於展示作品，不以長輩與小字閱讀困難者為設計基準（作者確認，覆蓋全域 Rule 18 的預設受眾段落）；但訪客仍可能在畫面反應前連點。
- 重要資訊不得只靠 hover 或翻牌背面呈現；內文維持舒適可讀尺寸。
- 提供 `prefers-reduced-motion: reduce` 降級；動畫不得擋住操作（播放期間目標可點擊，不用遮罩或 pointer-events:none）。
- 繁體中文為主，技術名詞附白話解釋。
