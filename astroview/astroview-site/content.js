/* global React */
// AstroView landing page data, synced to upstream fitson changelog/release info.

const SITE_META = {
  latestVersion: '1.8.0',
  latestReleaseDate: '2026-07-25',
  installerName: 'AstroView_Setup_1.8.0.exe',
  installerSizeLabel: '50.9 MiB',
  installerSha256: 'bbb988ffb01af236b4a10543c2fd2bd5122fd30af9dd5872a84fa15c6cfa48b1',
  repoUrl: 'https://github.com/carryons6/fitson',
  releasesUrl: 'https://github.com/carryons6/fitson/releases/tag/v1.8.0',
  latestReleaseUrl: 'https://github.com/carryons6/fitson/releases/tag/v1.8.0',
  changelogUrl: 'https://github.com/carryons6/fitson/blob/main/CHANGELOG.md',
  environmentUrl: 'https://github.com/carryons6/fitson/blob/main/environment-win-64.conda.lock',
  installerUrl: 'https://github.com/carryons6/fitson/releases/download/v1.8.0/AstroView_Setup_1.8.0.exe',
  checksumUrl: 'https://github.com/carryons6/fitson/releases/download/v1.8.0/SHA256SUMS.txt',
};

const PAPERS = [
  {
    title: 'DOI: 10.3847/1538-3881/ae4c85',
    meta: 'The Astronomical Journal · IOPscience',
    url: 'https://iopscience.iop.org/article/10.3847/1538-3881/ae4c85',
  },
];

const item = (en, zh) => (zh ? { en, zh } : { en });

const I18N = {
  en: {
    nav: { features: 'Features', release: 'Release Notes', changelog: 'Changelog', download: 'Download', papers: 'Papers' },
    hero: {
      eyebrow: 'FITS viewer · PySide6',
      title_a: 'A fast, precise FITS viewer for',
      title_em: 'astronomical imaging',
      title_b: '.',
      desc: 'Measure ROIs and apertures, overlay an RA/Dec grid and Gaia DR3 sources, exchange DS9 Regions, and compare FITS frames without leaving a fast, bounded desktop workflow.',
      cta_download: 'Download v1.8.0',
      cta_github: 'View on GitHub',
      meta: [
        { v: '1.8.0', l: 'Current release' },
        { v: 'ROI + aperture', l: 'Measurement workbench' },
        { v: 'Gaia DR3', l: 'Bounded catalog overlay' },
        { v: SITE_META.installerSizeLabel, l: 'Windows installer' },
      ],
    },
    features: {
      eyebrow: 'Capabilities',
      title: 'Built around the real loop of observational work.',
      desc: 'AstroView now carries the workflow from first inspection through lightweight measurement, sky context, interoperable regions, and frame-to-frame comparison.',
      items: [
        {
          n: '01',
          t: 'Image Display',
          d: 'Load two-dimensional FITS image HDUs and bounded image cubes from single- or multi-HDU files, with four stretch modes, six interval presets, and all 8 persistent D4 orientation transforms.',
          list: ['Linear · Log · Asinh · Sqrt', 'ZScale · MinMax · 99.5% · 99% · 98% · 95%', 'Original / BKG / Residual views with on-canvas compass'],
        },
        {
          n: '02',
          t: 'Measurement & Photometry',
          d: 'Turn a selected ROI into bounded pixel statistics, then measure a circular aperture with an annular background estimate and immediate on-canvas feedback.',
          list: ['Min · max · mean · median · standard deviation · sum', 'Net flux · uncertainty · SNR', 'Centroid · FWHM · peak above background'],
        },
        {
          n: '03',
          t: 'WCS & Gaia DR3',
          d: 'Draw a projected RA/Dec grid on celestial-WCS frames and run a bounded Gaia DR3 cone search around the current field.',
          list: ['RA/Dec grid with sky-coordinate labels', 'Radius, row-count, and faint-G limits', 'Selectable Gaia markers projected onto the image'],
        },
        {
          n: '04',
          t: 'DS9 Region Interoperability',
          d: 'Import, inspect, overlay, and export bounded DS9 Region 4.1 documents, or capture the current ROI and aperture into the region list.',
          list: ['image · physical · fk5 · icrs', 'circle · box · ellipse · polygon · point', 'Labels, colors, include/exclude, and safe round-trip export'],
        },
        {
          n: '05',
          t: 'Image Comparison',
          d: 'Choose two loaded frames and compare them with shared display limits, either directly by pixel or after bounded nearest-neighbour WCS alignment.',
          list: ['Side by side · blink · A − B difference', 'Automatic, direct-pixel, or WCS alignment', 'Cancelable background comparison with output budgets'],
        },
        {
          n: '06',
          t: 'Source Extraction (SEP)',
          d: 'Run SEP on the whole image or a right-drag ROI, tune detection and background parameters, and inspect catalogs and cutouts without freezing the app.',
          list: ['Full-image and ROI extraction', 'Cancelable subprocess execution', 'Intensity · Background · Residual · Connected Region'],
        },
        {
          n: '07',
          t: 'Frames & Workspace',
          d: 'Play, loop, bounce, or step through an ordered FITS sequence while keeping dock layout, searchable headers, source tables, and session state close at hand.',
          list: ['Append frames to the current session', 'Preview-first background rendering', 'Versioned workspace and structured Header viewer'],
        },
        {
          n: '08',
          t: 'Performance & Safety',
          d: 'New analysis, catalog, region, and comparison paths keep explicit file, network, pixel, memory, row, geometry, and cancellation budgets.',
          list: ['Request-safe single-flight workers', 'Bounded remote and local inputs', 'Exact win-64 URL+SHA release environment lock'],
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
        '1.8.0': 'AstroView 1.8.0 adds a lightweight scientific-analysis layer: ROI statistics and aperture photometry, projected WCS grids with bounded Gaia DR3 overlays, safe DS9 Region import/export, and side-by-side, blink, or difference comparison between loaded frames.',
        '1.7.5': 'This security-focused release bounds FITS decoding before allocation, rejects unsafe whole-file compression wrappers and unsupported HDUs, prevents stale or canceled worker results from reaching the UI, and hardens reproducible Windows releases with exact locks and SHA-256 checksums.',
        '1.7.4': 'First-image loading and frame rendering are faster after removing redundant preview and interval passes. Frozen Windows builds now initialize multiprocessing correctly and package local modules reliably.',
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
          t: 'Create the exact release environment',
          d: 'The win-64 lock fixes every Conda artifact by URL, build, and SHA-256 for reproducible release builds.',
          code: '$ conda create -n astroview-release --file environment-win-64.conda.lock\n$ conda activate astroview-release',
        },
        {
          t: 'Launch AstroView',
          d: 'You can run from either the repository root or the parent directory of the `astroview/` package.',
          code: '$ python -m astroview\n$ python -m astroview image.fits\n$ python -m astroview image.fits --hdu 1',
        },
        {
          t: 'Or install the release build',
          d: 'The Windows installer and SHA256SUMS.txt come from the verified GitHub release workflow.',
          code: '$ .\\AstroView_Setup_1.8.0.exe\n# Verify SHA256SUMS.txt, then launch from Start menu.',
        },
      ],
    },
    specs: {
      eyebrow: 'Technical specs',
      title: 'Requirements & supported formats.',
      desc: '',
      rows: [
        { k: 'Runtime', v: 'Python 3.10+', tags: ['PySide6', 'astropy', 'numpy', 'sep (required)'] },
        { k: 'OS', v: 'Windows 10/11, macOS 12+, Linux (X11 / Wayland)', tags: [] },
        { k: 'File formats', v: 'FITS image HDUs (.fits, .fit, .fts): 2D images and bounded cubes in single- or multi-HDU files. Empty, table, and 1D HDUs are rejected. Interchange and export targets include:', tags: ['PNG', 'EPS', 'PDF', 'FITS', 'CSV', 'DS9 .reg'] },
        { k: 'Safety limits', v: 'Desktop defaults: 8192² total pixels, 512 MiB estimated decoded data, and 4096 frames.', tags: [] },
        { k: 'Compression', v: 'FITS tile compression (CompImageHDU) remains supported within the limits. Whole-file gzip/ZIP/bzip2/xz/LZW wrappers must be safely decompressed first.', tags: [] },
        { k: 'Stretch modes', v: '', tags: ['Linear', 'Log', 'Asinh', 'Sqrt'] },
        { k: 'Interval modes', v: '', tags: ['ZScale', 'MinMax', '99.5%', '99%', '98%', '95%', 'Manual'] },
        { k: 'Measurement', v: 'Bounded ROI statistics and circular-aperture photometry with an annular background, uncertainty, SNR, centroid, and FWHM.', tags: [] },
        { k: 'WCS & catalog', v: 'Projected RA/Dec grid plus a bounded Gaia DR3 cone search with configurable radius, result count, and faint-G limit.', tags: [] },
        { k: 'DS9 Regions', v: 'Safe Region 4.1 import/export for image, physical, fk5, and icrs coordinates; circle, box, ellipse, polygon, and point shapes.', tags: [] },
        { k: 'Image comparison', v: 'Side-by-side, blink, and A − B difference modes with direct-pixel or bounded nearest-neighbour WCS alignment.', tags: [] },
        { k: 'Coordinate input', v: 'Pixel (x, y) and WCS (RA, Dec), with single-entry and batch-paste workflows.', tags: [] },
        { k: 'Source extraction', v: 'SEP-based extraction with tunable threshold, min area, deblend, and background mesh. Supports full image or ROI.', tags: [] },
        { k: 'Architecture', v: 'Qt-agnostic `core/` domain logic plus `app/` UI layer; `MainWindow` stays the sole coordinator.', tags: [] },
        { k: 'License', v: 'MIT', tags: [] },
      ],
      download: {
        title: 'Download AstroView',
        sub: 'v1.8.0 · Released July 25, 2026',
        items: [
          { os: 'Win', title: SITE_META.installerName, meta: `Installer · x64 · ${SITE_META.installerSizeLabel}`, href: SITE_META.installerUrl },
          { os: 'SHA', title: 'SHA256SUMS.txt', meta: `SHA-256 · ${SITE_META.installerSha256}`, href: SITE_META.checksumUrl },
          { os: 'Rel', title: 'Release page', meta: 'GitHub release notes · checksums · assets', href: SITE_META.latestReleaseUrl },
          { os: 'Env', title: 'environment-win-64.conda.lock', meta: 'Exact Conda URLs · builds · SHA-256', href: SITE_META.environmentUrl },
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
      note: 'Built with PySide6. Landing-page release data synced through 1.8.0 on July 25, 2026.',
      links: [
        { t: 'GitHub', h: SITE_META.repoUrl },
        { t: 'Latest Release', h: SITE_META.latestReleaseUrl },
        { t: 'Releases', h: SITE_META.releasesUrl },
        { t: 'CHANGELOG.md', h: SITE_META.changelogUrl },
        { t: 'SHA256SUMS.txt', h: SITE_META.checksumUrl },
        { t: 'feedback@astroview.org', h: 'mailto:feedback@astroview.org' },
      ],
    },
    labels: { security: 'Security', added: 'Added', fixed: 'Fixed', changed: 'Changed', validated: 'Validated' },
  },
  zh: {
    nav: { features: '功能', release: '版本更新', changelog: '更新历史', download: '下载', papers: '论文' },
    hero: {
      eyebrow: 'FITS 查看器 · PySide6',
      title_a: '面向',
      title_em: '天文成像',
      title_b: '的快速精确 FITS 查看器。',
      desc: '在快速且有界的桌面工作流中完成 ROI 与孔径测量、WCS/盖亚 DR3 叠加、DS9 Region 互操作，以及 FITS 帧间比较。',
      cta_download: '下载 v1.8.0',
      cta_github: '查看 GitHub',
      meta: [
        { v: '1.8.0', l: '当前版本' },
        { v: 'ROI + 孔径', l: '测量工作台' },
        { v: '盖亚 DR3', l: '有界星表叠加' },
        { v: SITE_META.installerSizeLabel, l: 'Windows 安装包' },
      ],
    },
    features: {
      eyebrow: '能力概览',
      title: '围绕真实观测工作流设计。',
      desc: 'AstroView 现在将工作流从初步查看延伸到轻量测量、天空背景信息、可互操作区域与帧间比较。',
      items: [
        {
          n: '01',
          t: '图像显示',
          d: '支持单文件或多 HDU 文件中的二维 FITS 图像 HDU 与有界数据立方体，提供四种拉伸、六种区间预设，以及 8 种持久化 D4 图像方向变换。',
          list: ['Linear · Log · Asinh · Sqrt', 'ZScale · MinMax · 99.5% · 99% · 98% · 95%', '原图 / 背景 / 残差视图与画布指南针'],
        },
        {
          n: '02',
          t: '测量与孔径测光',
          d: '将选定 ROI 转换为有界像素统计，并通过背景环估计完成圆形孔径测光，同时在画布上即时显示测量范围。',
          list: ['最小值 · 最大值 · 均值 · 中位数 · 标准差 · 总和', '净流量 · 不确定度 · 信噪比', '质心 · FWHM · 背景以上峰值'],
        },
        {
          n: '03',
          t: 'WCS 与盖亚 DR3',
          d: '在包含天球 WCS 的帧上绘制投影后的 RA/Dec 网格，并围绕当前视场执行有界的盖亚 DR3 锥形检索。',
          list: ['带天球坐标标签的 RA/Dec 网格', '半径、返回数量与暗端 G 星等限制', '投影到图像且可选择的盖亚源标记'],
        },
        {
          n: '04',
          t: 'DS9 Region 互操作',
          d: '导入、检查、叠加和导出有界的 DS9 Region 4.1 文档，也可把当前 ROI 与孔径直接加入区域列表。',
          list: ['image · physical · fk5 · icrs', 'circle · box · ellipse · polygon · point', '标签、颜色、包含/排除与安全往返导出'],
        },
        {
          n: '05',
          t: '图像比较',
          d: '选择两个已加载帧，以共享显示区间进行比较；既可直接按像素，也可通过有界的最近邻 WCS 对齐。',
          list: ['并排 · 闪烁 · A − B 差分', '自动、直接像素或 WCS 对齐', '可取消的后台比较与输出预算'],
        },
        {
          n: '06',
          t: '源提取 (SEP)',
          d: '在全图或右键拖选 ROI 上运行 SEP，自定义检测与背景参数，并在保持界面响应的同时查看目录和切图。',
          list: ['全图与 ROI 提取', '可取消的子进程执行', 'Intensity · Background · Residual · Connected Region'],
        },
        {
          n: '07',
          t: '多帧与工作区',
          d: '播放、循环、往返或逐帧查看有序 FITS 序列，同时保留常用 dock 布局、可搜索 Header、源表和会话状态。',
          list: ['向当前会话追加帧', '后台优先生成预览', '版本化工作区与结构化 Header 查看器'],
        },
        {
          n: '08',
          t: '性能与安全',
          d: '新的测量、星表、区域和比较路径均设置明确的文件、网络、像素、内存、行数、几何与取消预算。',
          list: ['请求安全的 single-flight worker', '有界远程与本地输入', '精确的 win-64 URL+SHA 发布环境锁'],
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
        '1.8.0': 'AstroView 1.8.0 新增轻量科学分析层：ROI 统计与孔径测光、带有界盖亚 DR3 叠加的 WCS 网格、安全的 DS9 Region 导入/导出，以及已加载帧之间的并排、闪烁和差分比较。',
        '1.7.5': '这是一个以安全为重点的版本：在分配内存前限制 FITS 解码，拒绝不安全的整文件压缩和不受支持的 HDU，阻止过期或已取消的 worker 结果写回界面，并通过精确锁与 SHA-256 校验加固可复现的 Windows 发布。',
        '1.7.4': '通过移除重复的预览与区间计算，首图加载和逐帧渲染进一步提速；Windows 冻结构建现在能够正确初始化多进程并可靠收集本地模块。',
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
          t: '创建精确发布环境',
          d: 'win-64 锁文件按 URL、构建号和 SHA-256 固定每个 Conda 包，用于可复现的发布构建。',
          code: '$ conda create -n astroview-release --file environment-win-64.conda.lock\n$ conda activate astroview-release',
        },
        {
          t: '启动 AstroView',
          d: '既可以从仓库根目录运行，也可以从 `astroview/` 包的父目录运行。',
          code: '$ python -m astroview\n$ python -m astroview image.fits\n$ python -m astroview image.fits --hdu 1',
        },
        {
          t: '或直接安装发布版',
          d: 'Windows 安装包与 SHA256SUMS.txt 均由经过验证的 GitHub release 工作流生成。',
          code: '$ .\\AstroView_Setup_1.8.0.exe\n# 校验 SHA256SUMS.txt 后，从开始菜单启动。',
        },
      ],
    },
    specs: {
      eyebrow: '技术规格',
      title: '运行要求与支持格式。',
      desc: '',
      rows: [
        { k: '运行环境', v: 'Python 3.10+', tags: ['PySide6', 'astropy', 'numpy', 'sep（必需）'] },
        { k: '操作系统', v: 'Windows 10/11、macOS 12+、Linux（X11 / Wayland）', tags: [] },
        { k: '文件格式', v: '支持单文件或多 HDU 文件中的 FITS 图像 HDU（.fits / .fit / .fts）：二维图像与有界数据立方体；拒绝空、表格和一维 HDU。互操作与导出格式包括：', tags: ['PNG', 'EPS', 'PDF', 'FITS', 'CSV', 'DS9 .reg'] },
        { k: '安全限制', v: '桌面端默认限制：8192² 总像素、512 MiB 预计解码数据和 4096 帧。', tags: [] },
        { k: '压缩格式', v: '限制范围内继续支持 FITS 分块压缩（CompImageHDU）；整文件 gzip/ZIP/bzip2/xz/LZW 必须先安全解压。', tags: [] },
        { k: '拉伸模式', v: '', tags: ['Linear', 'Log', 'Asinh', 'Sqrt'] },
        { k: '区间模式', v: '', tags: ['ZScale', 'MinMax', '99.5%', '99%', '98%', '95%', 'Manual'] },
        { k: '测量', v: '有界 ROI 统计与圆形孔径测光，包含背景环、误差、信噪比、质心和 FWHM。', tags: [] },
        { k: 'WCS 与星表', v: '投影后的 RA/Dec 网格，以及可配置半径、返回数量与暗端 G 星等限制的有界盖亚 DR3 锥形检索。', tags: [] },
        { k: 'DS9 Region', v: '安全导入/导出 Region 4.1；支持 image、physical、fk5、icrs 坐标和 circle、box、ellipse、polygon、point 图形。', tags: [] },
        { k: '图像比较', v: '并排、闪烁与 A − B 差分，支持直接像素对齐或有界最近邻 WCS 对齐。', tags: [] },
        { k: '坐标输入', v: '支持像素坐标 (x, y) 与 WCS 坐标 (RA, Dec)，兼顾单条输入与批量粘贴。', tags: [] },
        { k: '源提取', v: '基于 SEP，可调阈值、最小面积、反混叠与背景网格；支持全图或 ROI。', tags: [] },
        { k: '架构', v: 'Qt 无关的 `core/` 领域层加 `app/` UI 层，由 `MainWindow` 统一协调。', tags: [] },
        { k: '许可证', v: 'MIT', tags: [] },
      ],
      download: {
        title: '下载 AstroView',
        sub: 'v1.8.0 · 发布于 2026 年 7 月 25 日',
        items: [
          { os: 'Win', title: SITE_META.installerName, meta: `安装包 · x64 · ${SITE_META.installerSizeLabel}`, href: SITE_META.installerUrl },
          { os: 'SHA', title: 'SHA256SUMS.txt', meta: `SHA-256 · ${SITE_META.installerSha256}`, href: SITE_META.checksumUrl },
          { os: 'Rel', title: 'Release 页面', meta: 'GitHub 版本说明 · 校验信息 · 资产文件', href: SITE_META.latestReleaseUrl },
          { os: 'Env', title: 'environment-win-64.conda.lock', meta: '精确 Conda URL · 构建号 · SHA-256', href: SITE_META.environmentUrl },
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
      note: '基于 PySide6 构建。页面版本数据已同步到 2026 年 7 月 25 日发布的 1.8.0。',
      links: [
        { t: 'GitHub', h: SITE_META.repoUrl },
        { t: '最新 Release', h: SITE_META.latestReleaseUrl },
        { t: 'Releases', h: SITE_META.releasesUrl },
        { t: 'CHANGELOG.md', h: SITE_META.changelogUrl },
        { t: 'SHA256SUMS.txt', h: SITE_META.checksumUrl },
        { t: 'feedback@astroview.org', h: 'mailto:feedback@astroview.org' },
      ],
    },
    labels: { security: '安全', added: '新增', fixed: '修复', changed: '变更', validated: '验证' },
  },
};

const VERSIONS = [
  {
    v: '1.8.0', date: '2026-07-25',
    groups: {
      security: [
        item(
          'Keeps every new workflow bounded: DS9 input and output have byte, line, region, attribute, diagnostic, and vertex budgets; Gaia uses a fixed HTTPS endpoint with response, row, and time limits; measurement and comparison reject unsafe pixel and memory workloads.',
          '为所有新工作流设置明确预算：DS9 输入与输出限制字节、行、区域、属性、诊断与顶点；盖亚使用固定 HTTPS 端点并限制响应、行数和时间；测量与比较会拒绝不安全的像素和内存工作量。'
        ),
      ],
      added: [
        item(
          'Added a Measurement Workbench with ROI finite/invalid counts, min/max, mean, median, standard deviation, and sum, plus circular-aperture photometry with an annular background, net flux, uncertainty, SNR, centroid, FWHM, and canvas overlays.',
          '新增测量工作台：提供 ROI 有限值/无效值计数、最小值/最大值、均值、中位数、标准差和总和，并支持带背景环的圆形孔径测光、净流量、不确定度、信噪比、质心、FWHM 与画布叠加。'
        ),
        item(
          'Added a projected RA/Dec WCS grid and a bounded Gaia DR3 cone-search panel with radius, result-count, and faint-G controls, selectable catalog rows, and image-projected source markers.',
          '新增投影后的 RA/Dec WCS 网格与有界盖亚 DR3 锥形检索面板，支持设置半径、返回数量与暗端 G 星等，并提供可选择目录行和投影到图像的源标记。'
        ),
        item(
          'Added safe DS9 Region 4.1 import, overlay, and round-trip export for image, physical, fk5, and icrs coordinates; circle, box, ellipse, polygon, and point shapes; common labels and colors; and capture of the current ROI or aperture.',
          '新增安全的 DS9 Region 4.1 导入、叠加与往返导出，支持 image、physical、fk5、icrs 坐标，circle、box、ellipse、polygon、point 图形，常用标签与颜色，并可捕获当前 ROI 或孔径。'
        ),
        item(
          'Added loaded-frame comparison with side-by-side, blink, and A − B difference modes, shared display limits, automatic direct-pixel or bounded nearest-neighbour WCS alignment, and cancelable background processing.',
          '新增已加载帧比较：支持并排、闪烁与 A − B 差分、共享显示区间、自动直接像素或有界最近邻 WCS 对齐，以及可取消的后台处理。'
        ),
      ],
      changed: [
        item(
          'Measurement, WCS, catalog, and DS9 overlays now track the active frame and persistent D4 orientation, while stale frame-specific analysis is cleared or recomputed during navigation.',
          '测量、WCS、星表与 DS9 叠加现在会跟随活动帧及持久化 D4 图像方向；切帧时会清除或重新计算过期的逐帧分析。'
        ),
      ],
      validated: [
        item(
          'Added focused core, dock, worker, canvas, and MainWindow integration regression coverage for all four new analysis workflows and their resource-limit failure paths.',
          '为四项新增分析工作流及其资源限制失败路径补充了核心、Dock、Worker、画布与 MainWindow 集成回归测试。'
        ),
      ],
    },
  },
  {
    v: '1.7.5', date: '2026-07-25',
    groups: {
      security: [
        item(
          'Rejects whole-file gzip/ZIP/bzip2/xz/LZW wrappers before decompression and enforces default pre-decode budgets of 8192² total pixels, 512 MiB, and 4096 frames while retaining bounded FITS tile-compression support.',
          '在解压前拒绝整文件 gzip/ZIP/bzip2/xz/LZW 外层压缩，并实施 8192² 总像素、512 MiB 解码数据和 4096 帧的默认预解码预算，同时继续支持预算范围内的 FITS 分块压缩。'
        ),
        item(
          'Moves generated theme icons to a randomized private cache and no longer overwrites the user’s default FITS file association during installation.',
          '将动态生成的主题图标移入随机化的进程私有缓存，并停止在安装时覆盖用户现有的默认 FITS 文件关联。'
        ),
        item(
          'Hardens releases with immutable Action SHAs, split permissions, an exact win-64 URL+SHA Conda lock, verified tool bootstraps, tag/version validation, SHA-256 checksums, and a frozen-executable smoke test.',
          '通过不可变 Action SHA、权限分离、精确 win-64 URL+SHA Conda 锁、工具引导程序校验、标签/版本校验、SHA-256 校验和及冻结 EXE smoke test 加固发布链。'
        ),
      ],
      fixed: [
        item(
          'Makes FITS loads and update checks request-safe so stale signals cannot mutate newer requests; every worker-to-window callback now reaches the GUI thread safely.',
          '使 FITS 加载与更新检查具备请求隔离，过期信号无法修改新请求；所有 worker 到窗口的回调都会安全进入 GUI 线程。'
        ),
        item(
          'Rejects empty, table, and one-dimensional HDUs with readable errors, renders all-NaN/Inf frames as black, continues after optional preview failures, and safely detaches memory-mapped uint8 data.',
          '以可读错误拒绝空、表格和一维 HDU，将全 NaN/Inf 帧渲染为黑色，在可选预览失败后继续加载，并安全分离内存映射的 uint8 数据。'
        ),
        item(
          'Prevents deferred SEP work and stale overlays from surviving cancellation, frame switches, file close, or application shutdown.',
          '防止延迟 SEP 任务和过期叠加层在取消、切帧、关闭文件或退出应用后继续落地。'
        ),
        item(
          'Keeps background and residual work valid across unrelated renders, redispatches invalidated cutout work, reports failures visibly, and delays window destruction until active work finishes.',
          '确保背景与残差任务不受无关渲染影响，为源切图重新派发已失效任务，明确显示失败，并在活动任务结束前延迟窗口销毁。'
        ),
        item(
          'Coalesces repeated FITS loads, frame renders, and background computations into bounded global single-flight workers and rejects queued results after cancellation.',
          '将重复 FITS 加载、帧渲染和背景计算合并为有界的全局 single-flight worker，并在取消后拒绝已排队结果。'
        ),
      ],
    },
  },
  {
    v: '1.7.4', date: '2026-05-11',
    groups: {
      changed: [
        item(
          'Reduced first-image load time by skipping redundant preview stages at or below the load-stage preview size.',
          '跳过尺寸不高于加载阶段预览的重复渲染步骤，缩短首张图像的加载时间。'
        ),
        item(
          'Computes the display interval once per frame and reuses it across preview and full-resolution passes.',
          '每帧只计算一次显示区间，并在预览与全分辨率渲染之间复用。'
        ),
      ],
      fixed: [
        item(
          'Fixed frozen Windows ROI SEP extraction by initializing multiprocessing before importing the GUI entry point.',
          '通过在导入 GUI 入口前初始化多进程，修复 Windows 冻结构建中的 ROI SEP 提取失败。'
        ),
        item(
          'Made source-tree imports and PyInstaller analysis reliable regardless of checkout directory name, and included the build tool in the Conda environment.',
          '使源码导入与 PyInstaller 分析不再依赖检出目录名称，并将构建工具纳入 Conda 环境。'
        ),
      ],
    },
  },
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
window.AV_PAPERS = PAPERS;
