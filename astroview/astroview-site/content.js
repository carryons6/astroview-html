/* global React */
// AstroView landing page data, synced to upstream fitson changelog/release info.

const SITE_META = {
  latestVersion: '1.7.3',
  latestReleaseDate: '2026-04-21',
  installerName: 'AstroView_Setup_1.7.3.exe',
  installerSizeLabel: '47 MB',
  repoUrl: 'https://github.com/carryons6/fitson',
  releasesUrl: 'https://github.com/carryons6/fitson/releases',
  latestReleaseUrl: 'https://github.com/carryons6/fitson/releases/tag/v1.7.3',
  changelogUrl: 'https://github.com/carryons6/fitson/blob/main/CHANGELOG.md',
  environmentUrl: 'https://github.com/carryons6/fitson/blob/main/environment.yml',
  installerUrl: 'https://github.com/carryons6/fitson/releases/download/v1.7.3/AstroView_Setup_1.7.3.exe',
};

const item = (en, zh) => (zh ? { en, zh } : { en });

const I18N = {
  en: {
    nav: { features: 'Features', release: 'Release Notes', changelog: 'Changelog', download: 'Download' },
    hero: {
      eyebrow: 'FITS viewer · PySide6',
      title_a: 'A fast, precise FITS viewer for',
      title_em: 'astronomical imaging',
      title_b: '.',
      desc: 'Open single-frame or multi-HDU FITS files, inspect SEP background and residual views, mark pixel or WCS coordinates, and stay responsive on large datasets with memory-mapped loading plus background rendering.',
      cta_download: 'Download v1.7.3',
      cta_github: 'View on GitHub',
      meta: [
        { v: '1.7.3', l: 'Current release' },
        { v: '8x', l: 'D4 orientation transforms' },
        { v: '~300 ms', l: 'Cold-start startup' },
        { v: '47 MB', l: 'Windows installer' },
      ],
    },
    features: {
      eyebrow: 'Capabilities',
      title: 'Built around the real loop of observational work.',
      desc: 'The page focuses on the sequence users actually repeat: open FITS, inspect pixels, extract sources, step frames, and export what matters.',
      items: [
        {
          n: '01',
          t: 'Image Display',
          d: 'Single-file and multi-HDU FITS loading, four stretch modes, six interval presets, fit / 100% view, wheel zoom, drag pan, and all 8 persistent D4 orientation transforms.',
          list: ['Linear · Log · Asinh · Sqrt', 'ZScale · MinMax · 99.5% · 99% · 98% · 95%', 'Original / BKG / Residual views with on-canvas compass'],
        },
        {
          n: '02',
          t: 'Source Extraction (SEP)',
          d: 'Run SEP on the whole image or on a right-drag ROI, tune threshold / min area / deblend / background mesh, and inspect results without freezing the app.',
          list: ['Full-image and ROI extraction', 'Cancelable subprocess execution', 'Intensity · Background · Residual · Connected Region'],
        },
        {
          n: '03',
          t: 'Coordinate Markers',
          d: 'Place markers from pixel coordinates or WCS coordinates, add one by one or batch paste, and keep imported markers visually distinct from detected sources.',
          list: ['Pixel and WCS input', 'Batch paste with line-level validation', 'Independent styling for imported vs detected markers'],
        },
        {
          n: '04',
          t: 'Multi-Frame Playback',
          d: 'Treat a folder or selection of FITS files as an ordered sequence, then play, loop, bounce, or step frames while a background render queue fills the cache.',
          list: ['Append frames to the current session', '[ and ] keyboard stepping', 'Preview-first rendering for large frames'],
        },
        {
          n: '05',
          t: 'Workspace & Header Viewer',
          d: 'Every dock can float or dock cleanly, and the header dialog now supports HDU switching, search, raw-text fallback, and copy actions.',
          list: ['Versioned, resettable workspace layout', 'Searchable FITS header dialog', 'Dock/undock title bars with native floating-window controls'],
        },
        {
          n: '06',
          t: 'Performance',
          d: 'AstroView leans on memmap loading, deferred heavy imports, subsampled interval calculation, and background workers to keep interaction responsive.',
          list: ['memmap=True FITS loading', 'Subsample to ~1000x1000 for interval estimation', 'OpenBLAS-based Windows packaging for smaller installers'],
        },
      ],
    },
    viewer: {
      eyebrow: 'Interactive preview',
      title: 'A browser-side simulation of the desktop viewer.',
      desc: 'This demo uses a real FITS-derived crop plus real extracted-source rows so the controls feel close to the desktop app, even though it runs entirely in the page.',
      controls: { stretch: 'Stretch', interval: 'Interval', viewmode: 'View', zoom: 'Zoom', sources: 'SEP Sources' },
      badge: 'ORIGINAL',
    },
    release: {
      eyebrow: "What's New",
      title: 'Release notes',
      desc: 'Select a recent version for a quick summary, then scroll for the longer condensed history below.',
      summaryByVersion: {
        '1.7.3': 'Windows packaging now prefers OpenBLAS and auto-detects the active BLAS backend, cutting the installer to roughly 47 MB. It also fixes a Windows-only empty-window bug when `python -m astroview` is launched from inside the package directory.',
        '1.7.2': 'SEP ROI extraction is back on the fast path for normal selections, cancel/shutdown behavior is stable again, and a Chinese blank-label issue in Target Info Fields is fixed.',
        '1.7.1': 'The header viewer graduated into a structured FITS-header workflow with per-HDU switching, search, raw-text fallback, copy actions, and persistent UI state.',
        '1.7.0': 'AstroView gained bilingual UI support with runtime language switching, locale-aware defaults, and Qt `.qm` translation bundles.',
        '1.6.0': 'SEP extraction became cancelable, crowded-field runs now show a density-based warning pre-pass, and cold-import time dropped sharply thanks to deferred heavy imports.',
      },
    },
    quickstart: {
      eyebrow: 'Getting started',
      title: 'Three commands to first image.',
      desc: '',
      steps: [
        {
          t: 'Create the environment',
          d: 'The repository ships `environment.yml` with an OpenBLAS-oriented stack so Windows bundles stay small and reproducible.',
          code: '$ conda env create -f environment.yml\n$ conda activate astroview',
        },
        {
          t: 'Launch AstroView',
          d: 'You can run from either the repository root or the parent directory of the `astroview/` package.',
          code: '$ python -m astroview\n$ python -m astroview image.fits\n$ python -m astroview image.fits --hdu 1',
        },
        {
          t: 'Or install the release build',
          d: 'The latest Windows installer comes from the GitHub release workflow and matches the current landing-page release metadata.',
          code: '$ .\\AstroView_Setup_1.7.3.exe\n# Then launch from Start menu.',
        },
      ],
    },
    specs: {
      eyebrow: 'Technical specs',
      title: 'Requirements & supported formats.',
      desc: '',
      rows: [
        { k: 'Runtime', v: 'Python 3.10+', tags: ['PySide6', 'astropy', 'numpy', 'sep (optional)'] },
        { k: 'OS', v: 'Windows 10/11, macOS 12+, Linux (X11 / Wayland)', tags: [] },
        { k: 'File formats', v: 'FITS (.fits, .fit, .fts) with multi-HDU support. Export targets include:', tags: ['PNG', 'EPS', 'PDF', 'FITS', 'CSV'] },
        { k: 'Stretch modes', v: '', tags: ['Linear', 'Log', 'Asinh', 'Sqrt'] },
        { k: 'Interval modes', v: '', tags: ['ZScale', 'MinMax', '99.5%', '99%', '98%', '95%', 'Manual'] },
        { k: 'Coordinate input', v: 'Pixel (x, y) and WCS (RA, Dec), with single-entry and batch-paste workflows.', tags: [] },
        { k: 'Source extraction', v: 'SEP-based extraction with tunable threshold, min area, deblend, and background mesh. Supports full image or ROI.', tags: [] },
        { k: 'Architecture', v: 'Qt-agnostic `core/` domain logic plus `app/` UI layer; `MainWindow` stays the sole coordinator.', tags: [] },
        { k: 'License', v: 'MIT', tags: [] },
      ],
      download: {
        title: 'Download AstroView',
        sub: 'v1.7.3 · Released April 21, 2026',
        items: [
          { os: 'Win', title: 'AstroView_Setup_1.7.3.exe', meta: 'Installer · x64 · ~47 MB', href: SITE_META.installerUrl },
          { os: 'Rel', title: 'Release page', meta: 'GitHub release notes · checksums · assets', href: SITE_META.latestReleaseUrl },
          { os: 'Env', title: 'environment.yml', meta: 'conda-forge · OpenBLAS-oriented env', href: SITE_META.environmentUrl },
        ],
      },
    },
    changelog: {
      eyebrow: 'Version history',
      title: 'Condensed history since 1.2.6.',
      desc: 'Summarized from upstream `CHANGELOG.md` and synced to the current GitHub release metadata.',
    },
    footer: {
      license: 'MIT License',
      note: 'Built with PySide6. Landing-page release data synced through 1.7.3 on April 21, 2026.',
      links: [
        { t: 'GitHub', h: SITE_META.repoUrl },
        { t: 'Latest Release', h: SITE_META.latestReleaseUrl },
        { t: 'Releases', h: SITE_META.releasesUrl },
        { t: 'CHANGELOG.md', h: SITE_META.changelogUrl },
      ],
    },
    labels: { added: 'Added', fixed: 'Fixed', changed: 'Changed', validated: 'Validated' },
  },
  zh: {
    nav: { features: '功能', release: '版本更新', changelog: '更新历史', download: '下载' },
    hero: {
      eyebrow: 'FITS 查看器 · PySide6',
      title_a: '面向',
      title_em: '天文成像',
      title_b: '的快速精确 FITS 查看器。',
      desc: '支持单文件与多 HDU FITS、SEP 背景/残差视图、像素与 WCS 坐标标记，以及面向大数据集的内存映射加载与后台渲染。',
      cta_download: '下载 v1.7.3',
      cta_github: '查看 GitHub',
      meta: [
        { v: '1.7.3', l: '当前版本' },
        { v: '8x', l: 'D4 图像方向变换' },
        { v: '~300 ms', l: '冷启动时间' },
        { v: '47 MB', l: 'Windows 安装包' },
      ],
    },
    features: {
      eyebrow: '能力概览',
      title: '围绕真实观测工作流设计。',
      desc: '页面强调 AstroView 最常被重复使用的那条路径：打开 FITS、检查像素、提取源、浏览序列、导出结果。',
      items: [
        {
          n: '01',
          t: '图像显示',
          d: '支持单文件与多 HDU FITS，提供四种拉伸、六种区间预设、适应窗口/100% 视图、滚轮缩放、拖拽平移，以及 8 种持久化 D4 图像方向变换。',
          list: ['Linear · Log · Asinh · Sqrt', 'ZScale · MinMax · 99.5% · 99% · 98% · 95%', '原图 / 背景 / 残差视图与画布指南针'],
        },
        {
          n: '02',
          t: '源提取 (SEP)',
          d: '可在全图或右键拖选 ROI 上运行 SEP，自定义阈值、最小面积、反混叠与背景网格参数，并保持交互响应。',
          list: ['全图与 ROI 提取', '可取消的子进程执行', 'Intensity · Background · Residual · Connected Region'],
        },
        {
          n: '03',
          t: '坐标标记',
          d: '支持像素坐标与 WCS 坐标，既能逐条添加，也能批量粘贴，并可将导入标记与检测源分开设定样式。',
          list: ['像素与 WCS 输入', '逐行校验的批量粘贴', '导入标记 / 检测源独立样式'],
        },
        {
          n: '04',
          t: '多帧播放',
          d: '将多张 FITS 组成有序序列，播放、循环、往返或逐帧切换，同时后台渲染队列持续填充缓存。',
          list: ['向当前会话追加帧', '[ 与 ] 键盘切帧', '大图优先预览后补全渲染'],
        },
        {
          n: '05',
          t: '工作区与 Header 查看器',
          d: '各个 dock 既可停靠也可浮动；FITS Header 对话框支持 HDU 切换、搜索、原始文本回退与复制动作。',
          list: ['可重置、带版本号的工作区布局', '可搜索的 FITS Header 对话框', '自定义 dock 标题栏与原生浮动窗口控件'],
        },
        {
          n: '06',
          t: '性能',
          d: 'AstroView 依靠 memmap 加载、延迟重型依赖导入、子采样区间估计与后台 worker 维持大数据下的流畅体验。',
          list: ['memmap=True FITS 加载', '区间估计子采样到约 1000x1000', '基于 OpenBLAS 的 Windows 打包，安装包更小'],
        },
      ],
    },
    viewer: {
      eyebrow: '交互预览',
      title: '浏览器中的桌面查看器模拟。',
      desc: '这个演示使用真实 FITS 裁剪图和真实源表行，所以即使运行在网页里，交互感受也尽量贴近桌面应用。',
      controls: { stretch: '拉伸', interval: '区间', viewmode: '视图', zoom: '缩放', sources: 'SEP 源' },
      badge: '原图',
    },
    release: {
      eyebrow: '最近更新',
      title: '版本说明',
      desc: '先看最近版本的摘要，再向下浏览按版本整理的精简更新历史。',
      summaryByVersion: {
        '1.7.3': 'Windows 打包改为优先使用 OpenBLAS，并在打包阶段自动识别当前 BLAS 后端，使安装包缩小到约 47 MB。同时修复了在包目录内运行 `python -m astroview` 时 Windows 上额外弹出空窗口的问题。',
        '1.7.2': 'SEP 的 ROI 提取恢复到正常速度，取消/退出流程重新稳定，同时修复了中文环境下 Target Info Fields 空白标签的问题。',
        '1.7.1': 'Header 查看器升级为结构化 FITS Header 工作流，支持按 HDU 切换、搜索、原始文本回退、复制动作与持久化界面状态。',
        '1.7.0': 'AstroView 新增中英双语界面，支持运行时切换语言、按系统区域设置选择默认语言，并以 Qt `.qm` 文件分发翻译。',
        '1.6.0': 'SEP 提取支持取消；拥挤场的提取前会先做一次密度估算预警；同时通过延迟重型依赖导入显著降低了冷启动导入时间。',
      },
    },
    quickstart: {
      eyebrow: '快速开始',
      title: '三步进入第一张图。',
      desc: '',
      steps: [
        {
          t: '创建环境',
          d: '仓库提供了带 OpenBLAS 倾向的 `environment.yml`，便于复现环境并保持 Windows 安装包体积更小。',
          code: '$ conda env create -f environment.yml\n$ conda activate astroview',
        },
        {
          t: '启动 AstroView',
          d: '既可以从仓库根目录运行，也可以从 `astroview/` 包的父目录运行。',
          code: '$ python -m astroview\n$ python -m astroview image.fits\n$ python -m astroview image.fits --hdu 1',
        },
        {
          t: '或直接安装发布版',
          d: '最新 Windows 安装包由 GitHub release 工作流生成，与当前页面展示的版本保持一致。',
          code: '$ .\\AstroView_Setup_1.7.3.exe\n# 然后从开始菜单启动。',
        },
      ],
    },
    specs: {
      eyebrow: '技术规格',
      title: '运行要求与支持格式。',
      desc: '',
      rows: [
        { k: '运行环境', v: 'Python 3.10+', tags: ['PySide6', 'astropy', 'numpy', 'sep（可选）'] },
        { k: '操作系统', v: 'Windows 10/11、macOS 12+、Linux（X11 / Wayland）', tags: [] },
        { k: '文件格式', v: '支持多 HDU 的 FITS（.fits / .fit / .fts），并可导出为：', tags: ['PNG', 'EPS', 'PDF', 'FITS', 'CSV'] },
        { k: '拉伸模式', v: '', tags: ['Linear', 'Log', 'Asinh', 'Sqrt'] },
        { k: '区间模式', v: '', tags: ['ZScale', 'MinMax', '99.5%', '99%', '98%', '95%', 'Manual'] },
        { k: '坐标输入', v: '支持像素坐标 (x, y) 与 WCS 坐标 (RA, Dec)，兼顾单条输入与批量粘贴。', tags: [] },
        { k: '源提取', v: '基于 SEP，可调阈值、最小面积、反混叠与背景网格；支持全图或 ROI。', tags: [] },
        { k: '架构', v: 'Qt 无关的 `core/` 领域层加 `app/` UI 层，由 `MainWindow` 统一协调。', tags: [] },
        { k: '许可证', v: 'MIT', tags: [] },
      ],
      download: {
        title: '下载 AstroView',
        sub: 'v1.7.3 · 发布于 2026 年 4 月 21 日',
        items: [
          { os: 'Win', title: 'AstroView_Setup_1.7.3.exe', meta: '安装包 · x64 · 约 47 MB', href: SITE_META.installerUrl },
          { os: 'Rel', title: 'Release 页面', meta: 'GitHub 版本说明 · 校验信息 · 资产文件', href: SITE_META.latestReleaseUrl },
          { os: 'Env', title: 'environment.yml', meta: 'conda-forge · 偏向 OpenBLAS 的环境定义', href: SITE_META.environmentUrl },
        ],
      },
    },
    changelog: {
      eyebrow: '版本历史',
      title: '自 1.2.6 以来的精简记录。',
      desc: '内容基于上游 `CHANGELOG.md` 汇总，并同步到当前 GitHub release 元数据。',
    },
    footer: {
      license: 'MIT 许可证',
      note: '基于 PySide6 构建。页面版本数据已同步到 2026 年 4 月 21 日发布的 1.7.3。',
      links: [
        { t: 'GitHub', h: SITE_META.repoUrl },
        { t: '最新 Release', h: SITE_META.latestReleaseUrl },
        { t: 'Releases', h: SITE_META.releasesUrl },
        { t: 'CHANGELOG.md', h: SITE_META.changelogUrl },
      ],
    },
    labels: { added: '新增', fixed: '修复', changed: '变更', validated: '验证' },
  },
};

const VERSIONS = [
  {
    v: '1.7.3', date: '2026-04-21',
    groups: {
      changed: [
        item(
          'Changed Windows packaging to prefer the OpenBLAS runtime and auto-detect the active BLAS backend during bundling, shrinking the installer from roughly 101 MB to about 47 MB.',
          'Windows 打包改为优先使用 OpenBLAS 运行时，并在打包阶段自动识别当前激活的 BLAS 后端，使安装包从约 101 MB 缩减到约 47 MB。'
        ),
      ],
      fixed: [
        item(
          'Fixed `python -m astroview` launched from inside the package directory spawning a second empty window during ROI SEP extraction on Windows.',
          '修复在包目录内运行 `python -m astroview` 时，ROI SEP 提取会在 Windows 上额外弹出一个空窗口的问题。'
        ),
      ],
    },
  },
  {
    v: '1.7.2', date: '2026-04-21',
    groups: {
      fixed: [
        item(
          'Fixed ROI SEP extraction feeling much slower than before by skipping the count-estimate pre-pass for normal-sized selections and reducing Windows subprocess handoff overhead.',
          '通过跳过普通 ROI 的计数预估预处理并减少 Windows 子进程切换开销，修复了 ROI SEP 提取明显变慢的问题。'
        ),
        item(
          'Fixed SEP cancellation staying unresponsive and app shutdown hanging after Cancel by tightening worker subprocess teardown for aborted ROI extractions.',
          '通过收紧已取消 ROI 提取的 worker 子进程清理流程，修复了 SEP 取消后界面无响应与退出卡住的问题。'
        ),
        item(
          'Fixed `Tools > Target Info Fields...` showing blank field labels in Chinese when a field name did not have an explicit translation entry.',
          '修复 `Tools > Target Info Fields...` 在中文环境下遇到未显式翻译的字段名时显示空白标签的问题。'
        ),
      ],
    },
  },
  {
    v: '1.7.1', date: '2026-04-20',
    groups: {
      added: [
        item(
          'Added a structured FITS header viewer with per-HDU switching, scoped or regex search, raw-text fallback, and copy actions; UI state persists via `QSettings`.',
          '新增结构化 FITS Header 查看器，支持按 HDU 切换、范围/正则搜索、原始文本回退与复制操作，并通过 `QSettings` 持久化界面状态。'
        ),
      ],
    },
  },
  {
    v: '1.7.0', date: '2026-04-20',
    groups: {
      added: [
        item(
          'Added bilingual UI support (English / 简体中文) with a runtime language switcher persisted in `QSettings` and locale-aware defaults.',
          '新增中英双语 UI（English / 简体中文），支持运行时切换语言，并通过 `QSettings` 持久化，默认语言跟随系统区域设置。'
        ),
      ],
    },
  },
  {
    v: '1.6.0', date: '2026-04-20',
    groups: {
      added: [
        item(
          'Added cancellation for SEP Extract so crowded or large-image runs can be aborted without killing the app.',
          '新增 SEP 提取取消能力，拥挤场或大图上的提取任务无需退出应用即可中止。'
        ),
        item(
          'Added a SEP count-estimate pre-pass that warns before crowded or high-count runs.',
          '新增 SEP 数量预估预处理，在拥挤场或高计数任务开始前给出提示。'
        ),
      ],
      changed: [
        item(
          'Deferred heavy `astropy` and `sep` imports in `core/`, reducing `MainWindow` cold-import time from ~780 ms to ~170 ms and startup to roughly 300 ms.',
          '将 `core/` 中较重的 `astropy` 与 `sep` 导入延迟到首次使用，使 `MainWindow` 冷导入时间从约 780 ms 降到约 170 ms，整体启动约 300 ms。'
        ),
      ],
      fixed: [
        item(
          'Fixed image drift during multi-frame playback by skipping a view-state round-trip when the next frame has the same pixmap size.',
          '通过在下一帧与当前帧尺寸一致时跳过一次视图状态往返，修复了多帧播放中图像逐步向右下漂移的问题。'
        ),
      ],
    },
  },
  {
    v: '1.5.0', date: '2026-04-16',
    groups: {
      added: [
        item(
          'Added `File > Export Image` and `Export Raw Image` (PNG/EPS/PDF/FITS), with annotated export baking overlays through scene rendering.',
          '新增 `File > Export Image` 与 `Export Raw Image`（PNG/EPS/PDF/FITS），标注导出会通过场景渲染烘焙 ROI 与 marker 叠加层。'
        ),
        item(
          'Added separate styling for Imported Markers vs Detected Sources.',
          '新增导入标记与检测源的独立样式配置。'
        ),
      ],
      changed: [
        item(
          'Histogram now targets the active interval range and keeps the axis anchored while dragging Manual handles.',
          '直方图改为围绕当前区间范围工作，拖动 Manual 手柄时保持坐标轴锚定。'
        ),
        item(
          'Larger, higher-contrast histogram handles with dual-sided triangular grips.',
          '直方图手柄变得更大、对比度更高，并加入双侧三角抓手。'
        ),
        item(
          'Tiled multi-frame layout now uses a single horizontal row.',
          '平铺多帧布局调整为单行横向排列。'
        ),
      ],
      fixed: [
        item(
          'Fixed `View > Fit` errors on tiled composites by passing `aspectRatioMode` explicitly.',
          '通过显式传入 `aspectRatioMode`，修复了平铺合成图上的 `View > Fit` 错误。'
        ),
      ],
    },
  },
  {
    v: '1.4.2', date: '2026-04-15',
    groups: {
      added: [
        item('Added a `平滑渲染` toggle in the View menu so smooth interpolation can be switched at any zoom level.'),
        item('Added draggable low/high histogram handles with shaded outside regions for direct contrast adjustment.'),
        item('Added clearer triangular grip indicators on histogram handles.'),
      ],
      fixed: [
        item('Fixed canvas feedback text scaling with image zoom by setting `ItemIgnoresTransformations` on feedback items.'),
      ],
    },
  },
  {
    v: '1.4.1', date: '2026-04-15',
    groups: {
      fixed: [
        item('Fixed UI freezes during multi-frame playback on large files by deferring synchronous SEP cancellation, histogram work, session persistence, and panel refreshes until playback stops.'),
      ],
    },
  },
  {
    v: '1.4.0', date: '2026-04-15',
    groups: {
      added: [
        item('Added a resettable, versioned workspace layout with safer screen-geometry restore across displays.'),
        item('Added richer source inspection with a dedicated `Cutout` tab, compact detail panel, and stronger empty states.'),
        item('Added a custom magnifier cursor plus subpixel coordinate sampling.'),
      ],
      changed: [
        item('Reworked the default dock arrangement to use space better on narrower and 3:2 displays.'),
        item('Changed the source-table inspector layout to adapt by dock area.'),
        item('Improved canvas and cutout placeholder messaging for dark imagery and dark-theme panels.'),
      ],
      fixed: [
        item('Fixed blurry cutout previews after the dock refactor.'),
        item('Fixed repeated `QWindowsWindow::setGeometry` restore warnings on Windows.'),
        item('Fixed low-visibility onboarding and rendering guidance on dark backgrounds.'),
        item('Fixed packaged Windows builds missing `FileVersion` / `ProductVersion` metadata.'),
        item('Fixed packaged startup failures caused by missing NumPy/MKL runtime DLLs.'),
      ],
      validated: [
        item('Verified updated canvas, source-table, and main-window workflows with `97` passing tests.'),
        item('Verified Windows packaging with `build_windows.ps1 -SkipTests`, producing `AstroView_Setup_1.4.0.exe`.'),
      ],
    },
  },
  {
    v: '1.3.1', date: '2026-04-11',
    groups: {
      added: [
        item('Added FITS drag-and-drop open support plus a more actionable empty-canvas onboarding state.'),
        item('Added a persistent status-task area for long-running work.'),
        item('Added recent-file history and a `Reopen Last Session` action.'),
      ],
      changed: [
        item('Changed source-table selection to recenter the canvas automatically and clarified cutout recenter affordances.'),
        item('Changed frame-player display numbers to 1-based while keeping internal indexing 0-based.'),
        item('Changed source-table sorting to typed numeric ordering and expanded filtering with `field:value` queries.'),
      ],
      fixed: [
        item('Fixed stale-looking SEP result views after parameter edits.'),
        item('Fixed batch marker parsing silently dropping invalid rows by surfacing line-level errors.'),
        item('Fixed repeated recentering workflows that previously required selecting another source first.'),
      ],
      validated: [
        item('Verified the updated UI workflow with `100` passing tests in the `astro` environment.'),
      ],
    },
  },
  {
    v: '1.3.0', date: '2026-04-10',
    groups: {
      fixed: [
        item('Fixed a critical crash during multi-frame playback caused by unbounded render-thread accumulation.'),
        item('Fixed the `Rendering Full Frame` indicator staying visible indefinitely during playback.'),
      ],
      added: [
        item('Added a background render queue so playback can show fast previews first and then run entirely from cache once full renders complete.'),
      ],
    },
  },
  {
    v: '1.2.9', date: '2026-04-10',
    groups: {
      added: [
        item('Added a magnifier overlay (`F1` toggle): a floating lens with crosshair, coordinates, and zoom relative to current canvas scale.'),
      ],
      changed: [
        item('Unified background/residual switching into a single `Tab` cycle through original → background → residual.'),
      ],
      fixed: [
        item('Fixed `Tools > SEP Extract` unexpectedly opening the Histogram dock and freezing the UI.'),
        item('Fixed hidden histogram refresh work from running full-image passes while the dock was closed.'),
        item('Fixed the title bar not showing a computing indicator while BKG/Residual data was still being generated.'),
      ],
    },
  },
  {
    v: '1.2.8', date: '2026-04-08',
    groups: {
      added: [
        item('Added SEP background / residual view toggles with per-frame cache for instant switching after first compute.'),
        item('Added asynchronous background computation through `app/frame_bkg_worker.py`.'),
        item('Added persistent BKG / RESIDUAL badges in the status bar and window title.'),
        item('Added all 8 D4 image-orientation transforms under `View → Image Orientation`, plus a compass overlay.'),
      ],
      changed: [
        item('Made `_render_data_for_index()` cache-only so background work never blocks the UI thread.'),
        item('Centralized background/residual cache invalidation and re-render scheduling.'),
        item('Updated overlay, cursor, ROI, and sampling logic to map between displayed orientation and original image coordinates correctly.'),
      ],
      fixed: [
        item('Fixed PySide6 crashes triggered by orientation changes through a Qt-compatible transform path.'),
        item('Fixed display/coordinate mismatches across all 8 supported D4 orientations.'),
      ],
    },
  },
  {
    v: '1.2.7', date: '2026-04-07',
    groups: {
      added: [
        item('Added `app/theme.py` with Fusion-based light and dark themes plus broad QSS coverage.'),
        item('Added a `View → Theme` submenu with persistent light / dark selection.'),
        item('Added a `Connected Region` cutout-review mode.'),
      ],
      changed: [
        item('Applied the saved theme immediately after creating the `QApplication`.'),
        item('Removed the hard-coded global font size so fonts follow system settings on high-DPI displays.'),
        item('Widened spinbox controls and improved their hover / pressed states.'),
      ],
      fixed: [
        item('Fixed packaged app version reporting so rebuilt installers no longer ship an older bundled version.'),
        item('Fixed Windows packaged startup failures by collecting required PySide6 / Shiboken / NumPy runtime pieces.'),
      ],
      validated: [
        item('Verified source-table, SEP, and main-window tests for the connected-region workflow and the rebuilt frozen app startup path.'),
      ],
    },
  },
  {
    v: '1.2.6', date: '2026-04-06',
    groups: {
      added: [
        item('Added `VERSION`, packaging metadata files, and `environment.yml` for reproducible builds.'),
        item('Added `scripts/build_windows.ps1` plus GitHub Actions workflows for tests and Windows releases.'),
        item('Added runtime logging and unhandled-exception hooks for GUI diagnostics.'),
        item('Added background workers for file loading, frame rendering, SEP extraction, and histogram UI.'),
        item('Added a `Check for Updates...` action and targeted worker / loading tests.'),
      ],
      changed: [
        item('Moved versioning to the repository `VERSION` file.'),
        item('Changed test and build workflows to prefer the active Python environment.'),
        item('Moved multi-file FITS loading and dirty-frame rendering off the UI thread.'),
        item('Changed new-file defaults to `Stretch=Linear` and `Interval=ZScale`.'),
        item('Standardized source export on CSV and expanded source-table metrics.'),
        item('Updated the window title to show the current app version and improved packaged FITS loading behavior.'),
      ],
      validated: [
        item('Verified the test suite with `python -m unittest discover -s tests -v`.'),
        item('Verified responsiveness on larger samples with background loading and progressive rendering.'),
      ],
    },
  },
];

window.AV_SITE_META = SITE_META;
window.AV_I18N = I18N;
window.AV_VERSIONS = VERSIONS;
