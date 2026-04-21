/* global React, AV_SITE_META */
const {
  useState: useStateV,
  useEffect: useEffectV,
  useRef: useRefV,
  useMemo: useMemoV,
} = React;

const REAL_SOURCES = [
  { id: 1, x: 49.302, y: 59.46, flux: 7276.769, a: 1.28, b: 1.193, theta: 1.5694 },
  { id: 2, x: 437.686, y: 39.417, flux: 23852454.0, a: 6.754, b: 5.901, theta: 0.1668 },
  { id: 3, x: 167.009, y: 86.346, flux: 634522.062, a: 2.064, b: 1.911, theta: 0.3635 },
  { id: 4, x: 166.696, y: 147.575, flux: 1765.38, a: 0.972, b: 0.953, theta: 1.0623 },
  { id: 5, x: 299.831, y: 157.953, flux: 8693.799, a: 1.273, b: 1.248, theta: -1.5284 },
  { id: 6, x: 482.703, y: 186.584, flux: 1863.21, a: 1.092, b: 1.014, theta: -0.4169 },
  { id: 7, x: 506.308, y: 200.241, flux: 2308.966, a: 1.163, b: 0.957, theta: 1.5481 },
  { id: 8, x: 438.06, y: 224.533, flux: 870.923, a: 1.081, b: 0.732, theta: -0.6179 },
  { id: 9, x: 144.021, y: 245.812, flux: 613.59, a: 0.818, b: 0.648, theta: 0.7119 },
  { id: 10, x: 35.728, y: 318.027, flux: 1293.011, a: 0.923, b: 0.904, theta: 0.0223 },
  { id: 11, x: 123.004, y: 319.033, flux: 543.809, a: 0.847, b: 0.533, theta: 0.7879 },
  { id: 12, x: 433.988, y: 381.511, flux: 354.088, a: 0.79, b: 0.497, theta: -0.083 },
  { id: 13, x: 310.352, y: 412.071, flux: 2045.206, a: 1.115, b: 0.992, theta: 0.7485 },
];

const IMG_SIZE = 512;
const DASH = '-';

function applyStretch(v, mode) {
  const x = Math.max(0, Math.min(1, v));
  switch (mode) {
    case 'log':
      return Math.log10(1 + 9 * x);
    case 'asinh':
      return Math.asinh(10 * x) / Math.asinh(10);
    case 'sqrt':
      return Math.sqrt(x);
    default:
      return x;
  }
}

function computeInterval(lumArr, mode) {
  const n = lumArr.length;
  const sorted = Float32Array.from(lumArr).sort();
  const pick = (p) => sorted[Math.max(0, Math.min(n - 1, Math.floor(n * p)))];

  switch (mode) {
    case 'zscale':
      return [pick(0.25), pick(0.985)];
    case 'minmax':
      return [sorted[0], sorted[n - 1]];
    case '995':
      return [pick(0.005), pick(0.995)];
    case '99':
      return [pick(0.01), pick(0.99)];
    case '98':
      return [pick(0.02), pick(0.98)];
    case '95':
      return [pick(0.05), pick(0.95)];
    default:
      return [sorted[0], sorted[n - 1]];
  }
}

function getViewerCopy(lang) {
  if (lang === 'zh') {
    return {
      headerButtonTitle: '查看 FITS 头信息',
      sourceTableTitle: `源表 (${REAL_SOURCES.length})`,
      cursorTitle: '光标',
      nearTitle: '最近源',
      sourcesOn: `显示源标记 (${REAL_SOURCES.length})`,
      sourcesOff: '隐藏源标记',
      cropLabel: '真实 FITS 裁剪',
      searchPlaceholder: '搜索关键词...',
      cardsLabel: (shown, total) => `显示 ${shown} / ${total} 张卡片`,
      closeLabel: '关闭',
    };
  }

  return {
    headerButtonTitle: 'View FITS header',
    sourceTableTitle: `Source Table (${REAL_SOURCES.length})`,
    cursorTitle: 'Cursor',
    nearTitle: 'Near',
    sourcesOn: `${REAL_SOURCES.length} sources ON`,
    sourcesOff: 'Sources OFF',
    cropLabel: 'real FITS crop',
    searchPlaceholder: 'Search keywords...',
    cardsLabel: (shown, total) => `${shown} / ${total} cards`,
    closeLabel: 'close',
  };
}

function ViewerDemo({ t, lang }) {
  const copy = getViewerCopy(lang);
  const canvasRef = useRefV(null);
  const [stretch, setStretch] = useStateV('asinh');
  const [intervalMode, setIntervalMode] = useStateV('zscale');
  const [showSources, setShowSources] = useStateV(true);
  const [hoverSrc, setHoverSrc] = useStateV(null);
  const [selSrc, setSelSrc] = useStateV(2);
  const [rawLum, setRawLum] = useStateV(null);
  const [hoverPx, setHoverPx] = useStateV(null);
  const [showHeader, setShowHeader] = useStateV(false);

  useEffectV(() => {
    if (!showHeader) return undefined;
    const onKey = (e) => {
      if (e.key === 'Escape') setShowHeader(false);
    };
    window.addEventListener('keydown', onKey);
    return () => window.removeEventListener('keydown', onKey);
  }, [showHeader]);

  useEffectV(() => {
    const img = new Image();
    img.crossOrigin = 'anonymous';
    img.onload = () => {
      const off = document.createElement('canvas');
      off.width = IMG_SIZE;
      off.height = IMG_SIZE;
      const octx = off.getContext('2d');
      octx.drawImage(img, 0, 0, IMG_SIZE, IMG_SIZE);
      const id = octx.getImageData(0, 0, IMG_SIZE, IMG_SIZE);
      const lum = new Float32Array(IMG_SIZE * IMG_SIZE);
      for (let i = 0, j = 0; i < id.data.length; i += 4, j += 1) {
        lum[j] = id.data[i] / 255;
      }
      setRawLum(lum);
    };
    img.src = (window.__resources && window.__resources.cropImg) || 'data/crop.png';
  }, []);

  useEffectV(() => {
    if (!rawLum || !canvasRef.current) return;

    const cv = canvasRef.current;
    cv.width = IMG_SIZE;
    cv.height = IMG_SIZE;
    const ctx = cv.getContext('2d');
    const out = ctx.createImageData(IMG_SIZE, IMG_SIZE);
    const [lo, hi] = computeInterval(rawLum, intervalMode);
    const span = Math.max(1e-6, hi - lo);

    for (let j = 0; j < rawLum.length; j += 1) {
      const n = (rawLum[j] - lo) / span;
      const v = applyStretch(n, stretch);
      const g = Math.max(0, Math.min(255, Math.round(v * 255)));
      out.data[j * 4] = g;
      out.data[j * 4 + 1] = g;
      out.data[j * 4 + 2] = g;
      out.data[j * 4 + 3] = 255;
    }

    ctx.putImageData(out, 0, 0);
  }, [rawLum, stretch, intervalMode]);

  const handleMove = (e) => {
    const rect = e.currentTarget.getBoundingClientRect();
    const nx = (e.clientX - rect.left) / rect.width;
    const ny = (e.clientY - rect.top) / rect.height;
    const px = Math.floor(nx * IMG_SIZE);
    const py = Math.floor(ny * IMG_SIZE);
    setHoverPx({ x: px, y: py });

    let best = null;
    let bd = 400;
    REAL_SOURCES.forEach((s) => {
      const d = Math.hypot(s.x - px, s.y - py);
      if (d < bd) {
        bd = d;
        best = s.id;
      }
    });
    setHoverSrc(best);
  };

  const intervalLabels = [
    ['ZScale', 'zscale'],
    ['MinMax', 'minmax'],
    ['99.5%', '995'],
    ['99%', '99'],
    ['98%', '98'],
    ['95%', '95'],
  ];
  const fmt = (n, d = 2) => Number(n).toFixed(d);
  const fmtFlux = (n) => (n >= 1e6 ? `${(n / 1e6).toFixed(2)}M` : n >= 1e3 ? `${(n / 1e3).toFixed(1)}k` : n.toFixed(0));

  return React.createElement(
    'div',
    { className: 'viewer' },
    React.createElement(
      'div',
      { className: 'viewer-top' },
      React.createElement(
        'div',
        { className: 'viewer-appbadge', 'aria-hidden': 'true' },
        React.createElement('span', { className: 'viewer-appbadge-mark' }, 'A'),
        React.createElement('span', { className: 'viewer-appbadge-label' }, 'Preview'),
      ),
      React.createElement(
        'span',
        { className: 'title' },
        React.createElement('span', { className: 'prefix' }, 'AstroView'),
        React.createElement('span', { className: 'fname mono' }, 'first_light_no_cry.fits'),
        React.createElement('span', { className: 'fmeta mono' }, '[HDU 0 | 512x512 | float32]'),
      ),
      React.createElement(
        'button',
        {
          className: 'viewer-header-btn',
          onClick: () => setShowHeader(true),
          title: copy.headerButtonTitle,
        },
        React.createElement(
          'svg',
          { width: 11, height: 11, viewBox: '0 0 11 11', fill: 'none', stroke: 'currentColor', strokeWidth: 1.3 },
          React.createElement('path', { d: 'M2 2h7v7H2zM2 4h7M4 2v7' }),
        ),
        React.createElement('span', null, 'Header'),
      ),
    ),
    showHeader && React.createElement(HeaderDialog, { onClose: () => setShowHeader(false), lang }),
    React.createElement(
      'div',
      { className: 'viewer-body' },
      React.createElement(
        'div',
        {
          className: 'viewer-canvas',
          onMouseMove: handleMove,
          onMouseLeave: () => {
            setHoverSrc(null);
            setHoverPx(null);
          },
        },
        React.createElement('canvas', {
          ref: canvasRef,
          style: { width: '100%', height: '100%', display: 'block', imageRendering: 'pixelated' },
        }),
        showSources &&
          React.createElement(
            'svg',
            {
              viewBox: `0 0 ${IMG_SIZE} ${IMG_SIZE}`,
              preserveAspectRatio: 'none',
              style: { position: 'absolute', inset: 0, width: '100%', height: '100%', pointerEvents: 'none' },
            },
            REAL_SOURCES.map((s) => {
              const isSel = selSrc === s.id;
              const isHover = hoverSrc === s.id;
              return React.createElement(
                'g',
                { key: s.id, transform: `translate(${s.x} ${s.y}) rotate(${(s.theta * 180) / Math.PI})` },
                React.createElement('ellipse', {
                  cx: 0,
                  cy: 0,
                  rx: Math.max(4, s.a * 3.5),
                  ry: Math.max(3, s.b * 3.5),
                  fill: 'none',
                  stroke: isSel ? 'oklch(75% 0.18 60)' : isHover ? 'oklch(80% 0.15 200)' : 'oklch(70% 0.18 25 / 0.85)',
                  strokeWidth: isSel ? 2 : 1.2,
                }),
              );
            }),
            selSrc &&
              (() => {
                const s = REAL_SOURCES.find((x) => x.id === selSrc);
                if (!s) return null;
                return React.createElement(
                  'g',
                  null,
                  React.createElement('line', { x1: s.x - 14, y1: s.y, x2: s.x - 6, y2: s.y, stroke: 'oklch(80% 0.18 60)', strokeWidth: 1.5 }),
                  React.createElement('line', { x1: s.x + 6, y1: s.y, x2: s.x + 14, y2: s.y, stroke: 'oklch(80% 0.18 60)', strokeWidth: 1.5 }),
                  React.createElement('line', { x1: s.x, y1: s.y - 14, x2: s.x, y2: s.y - 6, stroke: 'oklch(80% 0.18 60)', strokeWidth: 1.5 }),
                  React.createElement('line', { x1: s.x, y1: s.y + 6, x2: s.x, y2: s.y + 14, stroke: 'oklch(80% 0.18 60)', strokeWidth: 1.5 }),
                );
              })(),
          ),
        React.createElement('div', { className: 'viewer-badge' }, t.viewer.badge),
        React.createElement(
          'svg',
          { className: 'viewer-compass', viewBox: '0 0 52 52' },
          React.createElement('circle', { cx: 26, cy: 26, r: 22, fill: 'oklch(20% 0.01 260 / 0.6)', stroke: 'oklch(60% 0.05 250 / 0.5)' }),
          React.createElement('line', { x1: 26, y1: 26, x2: 26, y2: 8, stroke: 'oklch(70% 0.12 60)', strokeWidth: 1.4 }),
          React.createElement('line', { x1: 26, y1: 26, x2: 44, y2: 26, stroke: 'oklch(70% 0.12 250)', strokeWidth: 1.4 }),
          React.createElement('text', { x: 26, y: 7, fontSize: 7, fill: 'oklch(85% 0.12 60)', textAnchor: 'middle', fontFamily: 'JetBrains Mono' }, '+Y'),
          React.createElement('text', { x: 48, y: 28, fontSize: 7, fill: 'oklch(85% 0.12 250)', textAnchor: 'middle', fontFamily: 'JetBrains Mono' }, '+X'),
        ),
      ),
      React.createElement(
        'div',
        { className: 'viewer-panel' },
        React.createElement('h4', null, t.viewer.controls.stretch),
        React.createElement(
          'div',
          { className: 'viewer-row' },
          ['linear', 'log', 'asinh', 'sqrt'].map((m) =>
            React.createElement(
              'button',
              {
                key: m,
                className: 'viewer-btn' + (stretch === m ? ' active' : ''),
                onClick: () => setStretch(m),
              },
              m,
            ),
          ),
        ),
        React.createElement('h4', null, t.viewer.controls.interval),
        React.createElement(
          'div',
          { className: 'viewer-row' },
          intervalLabels.slice(0, 3).map(([label, value]) =>
            React.createElement(
              'button',
              {
                key: value,
                className: 'viewer-btn' + (intervalMode === value ? ' active' : ''),
                onClick: () => setIntervalMode(value),
              },
              label,
            ),
          ),
        ),
        React.createElement(
          'div',
          { className: 'viewer-row' },
          intervalLabels.slice(3).map(([label, value]) =>
            React.createElement(
              'button',
              {
                key: value,
                className: 'viewer-btn' + (intervalMode === value ? ' active' : ''),
                onClick: () => setIntervalMode(value),
              },
              label,
            ),
          ),
        ),
        React.createElement('h4', null, copy.sourceTableTitle),
        React.createElement(
          'div',
          {
            style: {
              maxHeight: 180,
              overflowY: 'auto',
              overflowX: 'hidden',
              border: '1px solid oklch(25% 0.01 260)',
              borderRadius: 3,
            },
          },
          React.createElement(
            'table',
            { style: { width: '100%', borderCollapse: 'collapse', fontSize: 9.5, fontFamily: 'JetBrains Mono' } },
            React.createElement(
              'thead',
              null,
              React.createElement(
                'tr',
                { style: { background: 'oklch(22% 0.01 260)', color: 'oklch(60% 0.01 260)' } },
                ['ID', 'X', 'Y', 'Flux'].map((h) =>
                  React.createElement(
                    'th',
                    {
                      key: h,
                      style: { padding: '4px 6px', textAlign: 'left', fontWeight: 500, borderBottom: '1px solid oklch(28% 0.01 260)' },
                    },
                    h,
                  ),
                ),
              ),
            ),
            React.createElement(
              'tbody',
              null,
              REAL_SOURCES.map((s) =>
                React.createElement(
                  'tr',
                  {
                    key: s.id,
                    onClick: () => setSelSrc(s.id),
                    onMouseEnter: () => setHoverSrc(s.id),
                    onMouseLeave: () => setHoverSrc(null),
                    style: {
                      cursor: 'pointer',
                      background: selSrc === s.id ? 'oklch(55% 0.15 250 / 0.25)' : hoverSrc === s.id ? 'oklch(25% 0.01 260)' : 'transparent',
                      color: selSrc === s.id ? 'oklch(92% 0.02 250)' : 'oklch(80% 0.01 260)',
                    },
                  },
                  React.createElement('td', { style: { padding: '3px 6px' } }, s.id),
                  React.createElement('td', { style: { padding: '3px 6px' } }, fmt(s.x, 1)),
                  React.createElement('td', { style: { padding: '3px 6px' } }, fmt(s.y, 1)),
                  React.createElement('td', { style: { padding: '3px 6px' } }, fmtFlux(s.flux)),
                ),
              ),
            ),
          ),
        ),
        React.createElement('h4', null, copy.cursorTitle),
        React.createElement(
          'div',
          { className: 'viewer-kv' },
          React.createElement('span', { className: 'k' }, 'x, y'),
          React.createElement('span', { className: 'v' }, hoverPx ? `${hoverPx.x}, ${hoverPx.y}` : DASH),
        ),
        React.createElement(
          'div',
          { className: 'viewer-kv' },
          React.createElement('span', { className: 'k' }, copy.nearTitle),
          React.createElement('span', { className: 'v' }, hoverSrc ? `#${hoverSrc}` : DASH),
        ),
        React.createElement(
          'div',
          { className: 'viewer-row', style: { marginTop: 10 } },
          React.createElement(
            'button',
            {
              className: 'viewer-btn' + (showSources ? ' active' : ''),
              onClick: () => setShowSources(!showSources),
              style: { flex: 1 },
            },
            showSources ? copy.sourcesOn : copy.sourcesOff,
          ),
        ),
      ),
    ),
    React.createElement(
      'div',
      { className: 'viewer-status' },
      React.createElement('span', null, '512x512'),
      React.createElement('span', { className: 'dim' }, '|'),
      React.createElement('span', null, `${stretch.toUpperCase()} / ${intervalMode.toUpperCase()}`),
      React.createElement('span', { className: 'dim' }, '|'),
      React.createElement('span', null, copy.cropLabel),
      React.createElement('span', { className: 'mode-badge' }, selSrc ? `#${selSrc}` : DASH),
    ),
  );
}

window.ViewerDemo = ViewerDemo;

function buildHeaderCards() {
  const now = new Date();
  const startMs = now.getTime() - 6 * 60 * 1000;
  const d = (offsetMin) => new Date(startMs + offsetMin * 60 * 1000);
  const pad = (n) => String(n).padStart(2, '0');
  const iso = (dt) =>
    dt.getUTCFullYear() +
    '-' +
    pad(dt.getUTCMonth() + 1) +
    '-' +
    pad(dt.getUTCDate()) +
    'T' +
    pad(dt.getUTCHours()) +
    ':' +
    pad(dt.getUTCMinutes()) +
    ':' +
    pad(dt.getUTCSeconds());
  const local = (dt) => {
    const y = dt.getFullYear();
    const mo = pad(dt.getMonth() + 1);
    const da = pad(dt.getDate());
    return `${y}-${mo}-${da} ${pad(dt.getHours())}:${pad(dt.getMinutes())}`;
  };
  const tzOff = -now.getTimezoneOffset();
  const sign = tzOff >= 0 ? '+' : '-';
  const tzH = pad(Math.floor(Math.abs(tzOff) / 60));
  const tzM = pad(Math.abs(tzOff) % 60);
  const tzStr = `UTC${sign}${tzH}:${tzM}`;

  return [
    { kw: 'SIMPLE', val: 'T', cm: 'conforms to FITS standard' },
    { kw: 'BITPIX', val: '-32', cm: '32-bit floating point' },
    { kw: 'NAXIS', val: '2', cm: 'number of array dimensions' },
    { kw: 'NAXIS1', val: '512', cm: 'length of data axis 1' },
    { kw: 'NAXIS2', val: '512', cm: 'length of data axis 2' },
    { kw: 'EXTEND', val: 'T', cm: 'file may contain extensions' },
    { kw: '', val: '', cm: '' },
    { kw: 'OBJECT', val: "'AstroView-Demo'", cm: 'object name' },
    { kw: 'TELESCOP', val: "'AstroView'", cm: 'telescope' },
    { kw: 'INSTRUME', val: "'PixelScope-1'", cm: 'instrument' },
    { kw: 'OBSERVER', val: "'you'", cm: 'observer' },
    { kw: 'DATE-OBS', val: `'${iso(d(0))}'`, cm: 'UTC start of exposure' },
    { kw: 'TIMESYS', val: "'UTC'", cm: 'time system' },
    { kw: 'TIMEZONE', val: `'${tzStr}'`, cm: 'your local timezone' },
    { kw: 'EXPTIME', val: '60.0', cm: '[s] exposure time' },
    { kw: 'FILTER', val: "'R'", cm: 'filter name' },
    { kw: 'GAIN', val: '1.43', cm: '[e-/ADU] detector gain' },
    { kw: 'RDNOISE', val: '3.2', cm: '[e-] read noise' },
    { kw: '', val: '', cm: '' },
    { kw: 'CTYPE1', val: "'RA---TAN'", cm: 'WCS axis 1 type' },
    { kw: 'CTYPE2', val: "'DEC--TAN'", cm: 'WCS axis 2 type' },
    { kw: 'CRPIX1', val: '256.5', cm: 'reference pixel X' },
    { kw: 'CRPIX2', val: '256.5', cm: 'reference pixel Y' },
    { kw: 'CRVAL1', val: '83.82208', cm: '[deg] RA at reference pixel' },
    { kw: 'CRVAL2', val: '-5.39111', cm: '[deg] DEC at reference pixel' },
    { kw: 'CDELT1', val: '-1.389E-4', cm: '[deg/pix] scale' },
    { kw: 'CDELT2', val: '1.389E-4', cm: '[deg/pix] scale' },
    { kw: '', val: '', cm: '' },
    { kw: 'BKGRMS', val: '2.41', cm: 'SEP background RMS' },
    { kw: 'NSRC', val: '13', cm: 'sources extracted by SEP' },
    { kw: 'SEP_THR', val: '3.0', cm: 'SEP detect threshold [sigma]' },
    { kw: 'STRETCH', val: "'asinh'", cm: 'default display stretch' },
    { kw: 'INTERVAL', val: "'zscale'", cm: 'default display interval' },
    { kw: '', val: '', cm: '' },
    { kw: 'COMMENT', val: '', cm: '-- operator log --', egg: true },
    { kw: 'COMMENT', val: '', cm: 'seeing was forgiving, clouds were not.', egg: true },
    { kw: 'COMMENT', val: '', cm: 'the brightest source is almost certainly', egg: true },
    { kw: 'COMMENT', val: '', cm: 'a friend. say hi on your next pass.', egg: true },
    { kw: 'COMMENT', val: '', cm: '', egg: true },
    { kw: 'HISTORY', val: '', cm: `${local(d(0))} exposure started`, egg: true },
    { kw: 'HISTORY', val: '', cm: `${local(d(1))} dark subtracted`, egg: true },
    { kw: 'HISTORY', val: '', cm: `${local(d(2))} flat corrected`, egg: true },
    { kw: 'HISTORY', val: '', cm: `${local(d(3))} WCS solved (astrometry.net)`, egg: true },
    { kw: 'HISTORY', val: '', cm: `${local(d(4))} SEP: 13 sources above 3.0 sigma`, egg: true },
    { kw: 'HISTORY', val: '', cm: `${local(d(6))} opened in AstroView v${window.AV_SITE_META.latestVersion} (${tzStr})`, egg: true },
    { kw: '', val: '', cm: '' },
    { kw: 'EGG1', val: "'42'", cm: 'the answer, but to which question?', egg: true },
    { kw: 'EGG2', val: "'T'", cm: 'if you are reading this, thank you.', egg: true },
    { kw: 'COFFEE', val: '3', cm: '[cups] required to finish this build', egg: true },
    { kw: 'END', val: '', cm: '' },
  ];
}

function HeaderDialog({ onClose, lang }) {
  const copy = getViewerCopy(lang);
  const cards = useMemoV(() => buildHeaderCards(), []);
  const [q, setQ] = useStateV('');
  const ql = q.toLowerCase();
  const rows = cards.filter((c) => {
    if (!q) return true;
    if (!c.kw && !c.cm) return false;
    return `${c.kw} ${c.val} ${c.cm}`.toLowerCase().includes(ql);
  });

  return React.createElement(
    'div',
    { className: 'hdrdlg-backdrop', onClick: onClose },
    React.createElement(
      'div',
      { className: 'hdrdlg', onClick: (e) => e.stopPropagation() },
      React.createElement(
        'div',
        { className: 'hdrdlg-top' },
        React.createElement(
          'div',
          null,
          React.createElement('div', { className: 'hdrdlg-title' }, 'FITS Header'),
          React.createElement('div', { className: 'hdrdlg-sub mono' }, `first_light_no_cry.fits | HDU 0 | PRIMARY | ${cards.length} cards`),
        ),
        React.createElement('input', {
          className: 'hdrdlg-search mono',
          placeholder: copy.searchPlaceholder,
          value: q,
          onChange: (e) => setQ(e.target.value),
        }),
        React.createElement('button', { className: 'hdrdlg-close', onClick: onClose }, '×'),
      ),
      React.createElement(
        'div',
        { className: 'hdrdlg-body' },
        React.createElement(
          'table',
          { className: 'hdrdlg-table mono' },
          React.createElement(
            'tbody',
            null,
            rows.map((c, i) => {
              if (!c.kw && !c.cm) {
                return React.createElement(
                  'tr',
                  { key: i, className: 'hdr-blank' },
                  React.createElement('td', { colSpan: 3 }, '\u00A0'),
                );
              }

              return React.createElement(
                'tr',
                { key: i, className: c.egg ? 'hdr-egg' : '' },
                React.createElement('td', { className: 'hdr-kw' }, c.kw),
                React.createElement('td', { className: 'hdr-val' }, c.val ? `= ${c.val}` : ''),
                React.createElement('td', { className: 'hdr-cm' }, c.cm ? `/ ${c.cm}` : ''),
              );
            }),
          ),
        ),
      ),
      React.createElement(
        'div',
        { className: 'hdrdlg-foot mono' },
        React.createElement('span', null, copy.cardsLabel(rows.length, cards.length)),
        React.createElement('span', { style: { opacity: 0.5 } }, `Esc / ${copy.closeLabel}`),
      ),
    ),
  );
}

window.HeaderDialog = HeaderDialog;
