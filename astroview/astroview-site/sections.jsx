/* global React, AV_VERSIONS, AV_SITE_META */

const { useState: useStateS } = React;
const groupOrder = ['added', 'fixed', 'changed', 'validated'];

function pickVersionText(entry, lang) {
  return lang === 'en' ? entry.en : (entry.zh || entry.en);
}

function Nav({ t, lang, setLang, theme, setTheme }) {
  return React.createElement('nav', { className: 'nav' },
    React.createElement('div', { className: 'container nav-inner' },
      React.createElement('a', { className: 'brand', href: '#top' },
        React.createElement('span', { className: 'brand-mark' }, 'A'),
        React.createElement('span', { className: 'brand-name' }, 'AstroView'),
        React.createElement('span', { className: 'brand-version mono' }, `v${window.AV_SITE_META.latestVersion}`),
      ),
      React.createElement('div', { className: 'nav-links' },
        React.createElement('a', { href: '#features' }, t.nav.features),
        React.createElement('a', { href: '#release' }, t.nav.release),
        React.createElement('a', { href: '#changelog' }, t.nav.changelog),
        React.createElement('a', { href: '#download' }, t.nav.download),
      ),
      React.createElement('div', { className: 'nav-tools' },
        React.createElement('button', {
          className: 'lang-btn',
          onClick: () => setLang(lang === 'en' ? 'zh' : 'en'),
          title: 'Language / 中文',
        }, lang === 'en' ? 'EN / 中' : '中 / EN'),
        React.createElement('button', {
          className: 'icon-btn',
          onClick: () => setTheme(theme === 'light' ? 'dark' : 'light'),
          title: 'Theme',
        },
          theme === 'light'
            ? React.createElement('svg', { width: 16, height: 16, viewBox: '0 0 16 16', fill: 'none', stroke: 'currentColor', strokeWidth: 1.4 },
                React.createElement('path', { d: 'M13 9.5A5 5 0 0 1 6.5 3a5 5 0 1 0 6.5 6.5Z' }))
            : React.createElement('svg', { width: 16, height: 16, viewBox: '0 0 16 16', fill: 'none', stroke: 'currentColor', strokeWidth: 1.4 },
                React.createElement('circle', { cx: 8, cy: 8, r: 3 }),
                React.createElement('path', { d: 'M8 1v2M8 13v2M1 8h2M13 8h2M3 3l1.4 1.4M11.6 11.6 13 13M3 13l1.4-1.4M11.6 4.4 13 3' })),
        ),
        React.createElement('a', {
          className: 'icon-btn',
          href: window.AV_SITE_META.repoUrl,
          target: '_blank', rel: 'noopener',
          title: 'GitHub',
        },
          React.createElement('svg', { width: 16, height: 16, viewBox: '0 0 16 16', fill: 'currentColor' },
            React.createElement('path', { d: 'M8 0a8 8 0 0 0-2.5 15.6c.4.1.5-.2.5-.4v-1.4c-2.2.5-2.7-1-2.7-1-.4-.9-.9-1.2-.9-1.2-.8-.5.1-.5.1-.5.8.1 1.2.8 1.2.8.7 1.3 1.9.9 2.4.7.1-.5.3-.9.5-1.1-1.8-.2-3.6-.9-3.6-4 0-.9.3-1.6.8-2.2-.1-.2-.4-1 .1-2.1 0 0 .7-.2 2.2.8a7.5 7.5 0 0 1 4 0C10.6 3 11.3 3.2 11.3 3.2c.5 1.1.2 1.9.1 2.1.5.6.8 1.3.8 2.2 0 3.1-1.9 3.8-3.6 4 .3.2.5.7.5 1.4v2.1c0 .2.1.5.6.4A8 8 0 0 0 8 0Z' }))),
      ),
    ),
  );
}

function Hero({ t, lang }) {
  return React.createElement('section', { className: 'hero', id: 'top' },
    React.createElement('div', { className: 'container' },
      React.createElement('div', { className: 'hero-grid' },
        React.createElement('div', null,
          React.createElement('div', { className: 'eyebrow' }, t.hero.eyebrow),
          React.createElement('h1', { className: 'hero-title' },
            t.hero.title_a, ' ',
            React.createElement('em', null, t.hero.title_em),
            t.hero.title_b,
          ),
          React.createElement('p', { className: 'hero-desc' }, t.hero.desc),
          React.createElement('div', { className: 'hero-cta' },
            React.createElement('a', { className: 'btn btn-primary', href: '#download' },
              t.hero.cta_download,
              React.createElement('svg', { width: 14, height: 14, viewBox: '0 0 14 14', fill: 'none', stroke: 'currentColor', strokeWidth: 1.6 },
                React.createElement('path', { d: 'M7 1v10M3 7l4 4 4-4M2 13h10' })),
            ),
            React.createElement('a', { className: 'btn btn-ghost', href: window.AV_SITE_META.repoUrl, target: '_blank', rel: 'noopener' },
              t.hero.cta_github,
              React.createElement('svg', { width: 13, height: 13, viewBox: '0 0 13 13', fill: 'none', stroke: 'currentColor', strokeWidth: 1.6 },
                React.createElement('path', { d: 'M3 3h7v7M3 10 10 3' })),
            ),
          ),
          React.createElement('div', { className: 'hero-meta' },
            t.hero.meta.map((m, i) => React.createElement('div', { className: 'hero-meta-item', key: i },
              React.createElement('div', { className: 'hero-meta-val' }, m.v),
              React.createElement('div', { className: 'hero-meta-label' }, m.l),
            )),
          ),
        ),
        React.createElement(window.ViewerDemo, { t, lang }),
      ),
    ),
  );
}

function Features({ t }) {
  return React.createElement('section', { id: 'features' },
    React.createElement('div', { className: 'container' },
      React.createElement('div', { className: 'eyebrow' }, t.features.eyebrow),
      React.createElement('h2', { className: 'section-title' }, t.features.title),
      React.createElement('p', { className: 'section-desc' }, t.features.desc),
      React.createElement('div', { className: 'feat-grid' },
        t.features.items.map((f, i) => React.createElement('div', { className: 'feat', key: i },
          React.createElement('div', { className: 'feat-num mono' }, f.n),
          React.createElement('h3', { className: 'feat-title' }, f.t),
          React.createElement('p', { className: 'feat-desc' }, f.d),
          React.createElement('ul', { className: 'feat-list' },
            f.list.map((it, k) => React.createElement('li', { key: k }, it))),
        )),
      ),
    ),
  );
}

function ReleaseNotes({ t, lang }) {
  const versions = window.AV_VERSIONS.slice(0, 5).map((entry) => entry.v);
  const [sel, setSel] = useStateS(versions[0]);
  const entry = window.AV_VERSIONS.find((v) => v.v === sel);
  const summary = t.release.summaryByVersion[sel] || '';

  const renderGroup = (key, items) => {
    if (!items || !items.length) return null;
    return React.createElement('div', { className: 'change-group', key },
      React.createElement('h4', null,
        React.createElement('span', { className: `label label-${key}` }, t.labels[key])),
      React.createElement('ul', { className: 'change-list' },
        items.map((it, i) => React.createElement('li', { key: i },
          React.createElement('span', { className: 'bullet' }, (i + 1).toString().padStart(2, '0')),
          React.createElement('span', null, pickVersionText(it, lang)),
        )),
      ),
    );
  };

  return React.createElement('section', { id: 'release', style: { background: 'var(--bg-2)' } },
    React.createElement('div', { className: 'container' },
      React.createElement('div', { className: 'release-header' },
        React.createElement('div', null,
          React.createElement('div', { className: 'eyebrow' }, t.release.eyebrow),
          React.createElement('h2', { className: 'section-title' }, t.release.title),
          React.createElement('p', { className: 'section-desc' }, t.release.desc),
        ),
        React.createElement('div', { className: 'version-switcher' },
          versions.map((v) => React.createElement('button', {
            key: v,
            className: 'version-pill' + (sel === v ? ' active' : ''),
            onClick: () => setSel(v),
          }, v)),
        ),
      ),
      React.createElement('div', { className: 'release-grid' },
        React.createElement('div', { className: 'release-meta' },
          React.createElement('h3', null, lang === 'en' ? 'Version' : '版本'),
          React.createElement('div', { className: 'version-big mono' }, sel),
          React.createElement('div', { className: 'date mono' }, entry ? entry.date : ''),
          React.createElement('p', { className: 'summary' }, summary),
        ),
        React.createElement('div', { className: 'changes' },
          groupOrder.map((key) => renderGroup(key, entry?.groups[key])),
        ),
      ),
    ),
  );
}

function Quickstart({ t }) {
  return React.createElement('section', null,
    React.createElement('div', { className: 'container' },
      React.createElement('div', { className: 'eyebrow' }, t.quickstart.eyebrow),
      React.createElement('h2', { className: 'section-title' }, t.quickstart.title),
      React.createElement('div', { className: 'steps' },
        t.quickstart.steps.map((s, i) => React.createElement('div', { className: 'step', key: i },
          React.createElement('div', { className: 'step-num mono' }, String(i + 1).padStart(2, '0')),
          React.createElement('h3', { className: 'step-title' }, s.t),
          React.createElement('p', { className: 'step-desc' }, s.d),
          React.createElement('pre', { className: 'code-block' }, s.code),
        )),
      ),
    ),
  );
}

function Specs({ t }) {
  const d = t.specs.download;
  return React.createElement('section', { id: 'download', style: { background: 'var(--bg-2)' } },
    React.createElement('div', { className: 'container' },
      React.createElement('div', { className: 'eyebrow' }, t.specs.eyebrow),
      React.createElement('h2', { className: 'section-title' }, t.specs.title),
      React.createElement('div', { className: 'specs-grid', style: { marginTop: 48 } },
        React.createElement('div', { className: 'spec-table' },
          t.specs.rows.map((r, i) => React.createElement('div', { className: 'spec-row', key: i },
            React.createElement('div', { className: 'spec-key mono' }, r.k),
            React.createElement('div', { className: 'spec-val' },
              r.v,
              r.tags && r.tags.length > 0 && React.createElement('div', { style: { marginTop: r.v ? 8 : 0 } },
                r.tags.map((tag, k) => React.createElement('span', { className: 'tag mono', key: k }, tag))),
            ),
          )),
        ),
        React.createElement('div', { className: 'download-card' },
          React.createElement('h3', null, d.title),
          React.createElement('p', { className: 'sub mono' }, d.sub),
          React.createElement('div', { className: 'download-list' },
            d.items.map((entry, i) => React.createElement('a', {
              className: 'dl-item', key: i, href: entry.href, target: '_blank', rel: 'noopener',
            },
              React.createElement('div', { className: 'dl-os mono' }, entry.os),
              React.createElement('div', { className: 'dl-main' },
                React.createElement('div', { className: 'dl-title' }, entry.title),
                React.createElement('div', { className: 'dl-meta' }, entry.meta),
              ),
              React.createElement('div', { className: 'dl-arrow' },
                React.createElement('svg', { width: 14, height: 14, viewBox: '0 0 14 14', fill: 'none', stroke: 'currentColor', strokeWidth: 1.4 },
                  React.createElement('path', { d: 'M3 7h8M8 4l3 3-3 3' })),
              ),
            )),
          ),
        ),
      ),
    ),
  );
}

function ChangelogFull({ t, lang }) {
  return React.createElement('section', { id: 'changelog' },
    React.createElement('div', { className: 'container' },
      React.createElement('div', { className: 'eyebrow' }, t.changelog.eyebrow),
      React.createElement('h2', { className: 'section-title' }, t.changelog.title),
      React.createElement('p', { className: 'section-desc' }, t.changelog.desc),
      React.createElement('div', { className: 'changelog-full' },
        window.AV_VERSIONS.map((entry, i) => React.createElement('div', { className: 'cl-entry', key: i },
          React.createElement('div', null,
            React.createElement('div', { className: 'cl-ver mono' }, entry.v),
            React.createElement('div', { className: 'cl-date' }, entry.date),
          ),
          React.createElement('div', { className: 'cl-body' },
            groupOrder
              .filter((group) => entry.groups[group] && entry.groups[group].length)
              .map((group) => React.createElement('div', { key: group, style: { marginTop: 10 } },
                React.createElement('strong', null, t.labels[group]),
                React.createElement('ul', null,
                  entry.groups[group].map((it, k) => React.createElement('li', { key: k }, pickVersionText(it, lang))),
                ),
              )),
          ),
        )),
      ),
    ),
  );
}

function Footer({ t }) {
  return React.createElement('footer', { className: 'footer' },
    React.createElement('div', { className: 'container footer-inner' },
      React.createElement('div', { style: { display: 'flex', alignItems: 'center', gap: 14 } },
        React.createElement('span', { className: 'brand-mark' }, 'A'),
        React.createElement('div', null,
          React.createElement('div', { style: { fontSize: 14, fontWeight: 500 } }, 'AstroView'),
          React.createElement('div', { className: 'note' }, `${t.footer.license} • 2026 @carryons6`),
        ),
      ),
      React.createElement('div', { className: 'footer-links' },
        t.footer.links.map((link, i) => React.createElement('a', { key: i, href: link.h, target: '_blank', rel: 'noopener' }, link.t)),
      ),
      React.createElement('div', { className: 'note' }, t.footer.note),
    ),
  );
}

window.AV_Nav = Nav;
window.AV_Hero = Hero;
window.AV_Features = Features;
window.AV_ReleaseNotes = ReleaseNotes;
window.AV_Quickstart = Quickstart;
window.AV_Specs = Specs;
window.AV_ChangelogFull = ChangelogFull;
window.AV_Footer = Footer;
