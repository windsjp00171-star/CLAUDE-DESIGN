---
name: EMMARK 作品集（改版前基準）
description: 深色底、琥珀金強調、極光背景的單頁開發者作品集；改版前現況快照。
colors:
  night-ink: "#0f1117"
  panel-ink: "#14161d"
  popover-ink: "#1b1e26"
  parchment: "#e8e6e1"
  mist: "#9aa0ac"
  slate-muted: "#6b7280"
  amber: "#f5a623"
  amber-light: "#ffd488"
  ember: "#ef6c3a"
  violet-glow: "#7c6cf0"
  sky-glow: "#3aa0ef"
  rose-alert: "#e0556e"
typography:
  display:
    fontFamily: "'Noto Serif TC', serif"
    fontWeight: 700
  body:
    fontFamily: "'Noto Sans TC', sans-serif"
    fontWeight: 400
  label:
    fontFamily: "'JetBrains Mono', monospace"
    fontWeight: 500
rounded:
  chip: "99px"
  card: "16px"
  modal: "20px"
  icon: "12px"
components:
  button-demo:
    backgroundColor: "{colors.amber}"
    textColor: "{colors.night-ink}"
    rounded: "11px"
    padding: "12px 16px"
  chip-filter:
    backgroundColor: "#ffffff0a"
    textColor: "{colors.mist}"
    rounded: "{rounded.chip}"
    padding: "9px 18px"
  chip-filter-active:
    backgroundColor: "{colors.amber}"
    textColor: "{colors.night-ink}"
---

# Design System: EMMARK 作品集（改版前基準）

> 本檔記錄 2026-10 改版前的現況，作為重構的對照基準。改版後會被新的視覺方向取代。

## Overview

**Creative North Star: "夜間工作台上的琥珀燈"**

深色底上以單一琥珀金作為唯一的聲音，背景有三團緩慢漂移的極光（琥珀、紫、天藍）。整體偏「開發者酷炫感」：卡片 3D 傾斜、滑鼠光暈、標題漸層流動、打字游標、棕樹落葉彩蛋、翻轉技術卡。

**Key Characteristics:**
- 單一強調色（琥珀）搭配暖白文字，氣質靠漸層與光暈撐起
- 動效密度高：極光、游標光暈、卡片傾斜、捲動進度條、翻牌
- 樣式全部內嵌於 Artifact 打包檔，無獨立 CSS 檔
- 已提供 `prefers-reduced-motion` 降級（極光、標題流動、翻牌）

## Colors

深藍黑底、暖白字、琥珀強調；紫與天藍只出現在背景光與少數分類色。

### Primary
- **琥珀金** (#f5a623)：連結、按鈕、選取、圖示底、進度條。出現頻率最高的色（約 50 處）。
- **淡琥珀** (#ffd488)：標題漸層高光與 hover。

### Secondary
- **餘燼橙** (#ef6c3a)：與琥珀組成漸層（logo、按鈕、標題流動）。

### Tertiary
- **紫光** (#7c6cf0)、**天藍光** (#3aa0ef)：極光背景與專案分類色。

### Neutral
- **夜墨** (#0f1117)：頁面底色。
- **面板墨** (#14161d)、**浮層墨** (#1b1e26)：modal 與術語 popover。
- **羊皮白** (#e8e6e1)：主要文字。
- **霧灰** (#9aa0ac)：次要文字與導覽。
- **石板灰** (#6b7280)：提示與註腳，對比偏低。

### Named Rules
**The Amber Voice Rule.** 琥珀是唯一的行動色；其他色相只作背景光或分類，不作按鈕。

## Typography

**Display Font:** Noto Serif TC（serif 後備）
**Body Font:** Noto Sans TC（sans-serif 後備）
**Label/Mono Font:** JetBrains Mono

**Character:** 襯線標題帶人文與靈修氣，等寬字用於標籤、技術名詞與提示，有「終端機」感。

### Hierarchy
- **Display**（700–900、clamp 縮放）：Hero 標題，含漸層流動。
- **Title**（700、17–18px）：專案名、技術卡標題。
- **Body**（400、13.5–16px、行高 1.6–1.7）：內文；卡片內多為 13–14px。
- **Label**（500、11–13px、mono）：標籤、hint、popover 名詞。

### Named Rules
**The Small Print Problem.** 大量說明文字落在 11–13px 且用霧灰／石板灰，對長輩與弱視讀者偏吃力。

## Layout

單頁縱向捲動，導覽固定頂部（毛玻璃）。區塊：Hero、關於我、作品（可篩選卡片格）、數據、技術、資安、聯絡。內容寬度隨 `clamp()` 邊距縮放。專案卡點擊開 modal。

## Elevation & Depth

混合：毛玻璃導覽與 modal（`backdrop-filter: blur`）、琥珀光暈陰影（按鈕 hover `0 10px 26px rgba(245,166,35,.42)`）、卡片 3D 傾斜與高光（sheen）。深度主要靠光，不靠實體陰影。

## Shapes

大量圓角：膠囊（99px）用於 chip 與標籤，卡片 16–18px，modal 20px，圖示底 12px。邊框為 1px 低透明度白線。

## Components

### Buttons
- **Shape:** 11px 圓角
- **Primary（demo-btn）:** 琥珀→餘燼 135° 漸層、夜墨字、粗體；hover 上移 2px 並出現琥珀光暈。

### Chips
- **Filter chip:** 膠囊、半透明白底、霧灰字；選取時整顆填琥珀。

### Cards / Containers
- 專案卡：16–18px 圓角、低透明邊框、3D 傾斜與滑鼠高光。
- 技術卡：翻牌（正面圖示＋名稱，背面白話解釋＋工具標籤）。

### Navigation
- 固定頂部、毛玻璃；當前區塊以琥珀標示；右側有醒目的「課程」入口。

### Signature Components
- **術語 popover：** 技術標籤 hover 顯示白話解釋（`cursor: help`）。
- **棕樹落葉彩蛋 / console 彩蛋：** 呼應詩篇 92:12。

## Do's and Don'ts

### Do:
- **Do** 保留琥珀作為單一行動色。
- **Do** 保留 `prefers-reduced-motion` 降級。

### Don't:
- **Don't** 把關鍵資訊放在 hover 或翻牌背面才看得到（觸控與連點使用者會漏掉）。
- **Don't** 用 11–13px 灰字承載重要說明。
