# AstroView 示意截图生成提示词

用于本地 agent（或任何图像生成/模拟工具）生成 6 张用于官网的示意图。

**目标规格**
- 长宽比：1.44:1
- 建议分辨率：1440×1000 px（或至少 1160×808）
- 输出格式：PNG
- 风格：真实科研桌面 app 截图，扁平 UI，无阴影、无卡通化、无 AI 水印

---

## 通用基线提示词（每张都复用）

```
Screenshot of "AstroView", a desktop FITS astronomical image viewer built with PySide6/Qt.
Aspect ratio 1.44:1, 1440×1000 px. Clean scientific-tool aesthetic.
Window chrome: dark slate title bar, "AstroView — NGC_0253_r_band_00042.fits" title,
menu bar with: File / Edit / View / Tools / Help.
Main canvas on the left (~75% width) displaying a grayscale astronomical image
(deep sky field, ~200+ faint stars, some diffuse galaxy structure, subtle gradient background).
Right dock (~25% width), dark background (#1a1c22), vertically stacked panels.
Bottom status bar: "Frame 42/128 · 100% · 4096×4096 · memmap" and a mode badge.
Typography: JetBrains Mono for numbers/params, system sans for labels. No stock UI chrome.
Realistic tabular data. High detail, flat-UI, no drop shadows, no cartoon style.
```

---

## 1. 主视图 — SEP 源叠加（Hero 主图）

**文件名建议**：`01-main-sep.png`

```
Extend base prompt. State: original view mode, ZScale interval, Asinh stretch.
~80 small orange ellipse overlays on detected stars, one source highlighted in cyan.
Top-right corner of canvas: small circular compass widget with +X (blue) +Y (amber) axes.
Top-left of canvas: small badge "ORIGINAL" in blue outline.
Right dock panels from top to bottom:
 - "SEP Parameters": Threshold 1.5σ, Min Area 5, Deblend 0.005, Bkg Box 64
 - "Source Table": columns ID | X | Y | Flux | A | B | Theta | NPix, 12 visible rows
 - "Cutout Preview": a 140×140 zoomed patch of one star with crosshair
```

---

## 2. 背景视图（F1 切换）

**文件名建议**：`02-background.png`

```
Same field, view mode = "SEP Background".
Canvas shows smooth low-frequency gradient, no stars.
Top-left badge "BKG" in blue.
Status bar includes "[BKG]" suffix in window title.
Right panel: Cutout set to "Background" tab.
```

---

## 3. 残差视图（F2 切换）

**文件名建议**：`03-residual.png`

```
Same field, view mode = "SEP Residual".
Canvas shows stars on a near-flat black background, gradient removed.
Top-left badge "RESIDUAL" in amber/orange.
Histogram dock visible showing tight narrow distribution around zero.
```

---

## 4. 多帧播放器 + 进度

**文件名建议**：`04-frame-player.png`

```
Same UI, but with Frame Player dock expanded at bottom-right:
play button (pause icon currently), FPS slider at 12,
thumbnail strip of 8 frames with frame 42 highlighted,
loop/bounce toggle. Status bar shows "Rendering frame 43/128 …" with a progress bar.
```

---

## 5. Header 查看器对话框

**文件名建议**：`05-header-dialog.png`

```
Modal dialog centered over canvas titled "FITS Header — HDU 0".
Three columns: Keyword | Value | Comment.
Filled with realistic FITS cards: SIMPLE=T, BITPIX=-32, NAXIS=2, NAXIS1=4096, NAXIS2=4096,
CTYPE1='RA---TAN', CTYPE2='DEC--TAN', CRVAL1=11.888, CRVAL2=-25.288,
EXPTIME=300.0, FILTER='r', DATE-OBS='2026-04-18T21:14:07', TELESCOP='LSST',
INSTRUME='ComCam', AIRMASS=1.23, SEEING=0.87, GAIN=1.5, ...
Search box at top with "CRVAL" typed in, two rows highlighted.
HDU switcher tabs: [0: PRIMARY] [1: SCI] [2: VAR] [3: DQ]
```

---

## 6. 深色主题变体（画廊用）

**文件名建议**：`06-dark-theme.png`

```
Same as screenshot #1 but dark theme: app background #16181f, text #eaeaea.
Canvas unchanged (astronomy image always dark).
Accent color blue oklch(68% 0.14 250) on buttons and selected rows.
```

---

## 生成注意事项

1. **严格保持窗口结构一致** — 同一窗口 chrome 尺寸、dock 宽度、状态栏高度，6 张看起来像同一个 app 的不同状态。
2. **数据要真实** — 源表里的数字要像真实光度值（Flux 在 100–50000 区间，X/Y 在 0–4096）。
3. **星场图像** — 不要画卡通星星；应是真实天文图像观感：大部分为细小的点，少量亮星带衍射十字，背景有微弱梯度和噪声。
4. **不要加任何 AI 水印、logo、装饰性渐变**。
5. **输出 PNG**，1440×1000（或至少 1160×808）。

---

## 生成完之后

把 6 张 PNG 上传到聊天，我会：
1. 放到 `astroview-site/screenshots/` 目录
2. 把 Hero 右侧的模拟 canvas 替换为可切换真实截图画廊（tab 切换 原图 / BKG / 残差 / Header / Frame Player）
3. 重新打包离线版 HTML
