const fs = require('fs');
const path = require('path');
const zlib = require('zlib');

const rootDir = path.resolve(__dirname, '..');
const siteDir = path.join(__dirname, 'astroview-site');
const oldBundlePath = path.join(__dirname, 'AstroView.html');
const outputPaths = [
  path.join(rootDir, 'index.html'),
  path.join(__dirname, 'AstroView.html'),
];

function readUtf8(filePath) {
  return fs.readFileSync(filePath, 'utf8');
}

function escapeScript(text) {
  return text.replace(/<\/script/gi, '<\\/script');
}

function dataUrlFor(filePath, mime) {
  const base64 = fs.readFileSync(filePath).toString('base64');
  return `data:${mime};base64,${base64}`;
}

function extractOldBundleParts(html) {
  const manifestMatch = html.match(/<script type="__bundler\/manifest">\s*([\s\S]*?)\s*<\/script>/);
  const templateMatch = html.match(/<script type="__bundler\/template">\s*([\s\S]*?)\s*<\/script>/);
  if (!manifestMatch || !templateMatch) {
    throw new Error('Could not parse existing bundled AstroView.html');
  }

  return {
    manifest: JSON.parse(manifestMatch[1]),
    template: JSON.parse(templateMatch[1]),
  };
}

function decodeManifestEntry(entry) {
  let buf = Buffer.from(entry.data, 'base64');
  if (entry.compressed) {
    buf = zlib.gunzipSync(buf);
  }
  return buf.toString('utf8');
}

function pickRuntimeScripts(manifest, oldTemplate) {
  const srcs = [...oldTemplate.matchAll(/<script(?:[^>]*?) src="([^"]+)"/g)].map((m) => m[1]);
  if (srcs.length < 3) {
    throw new Error('Existing bundle did not expose the expected runtime scripts');
  }
  return srcs.slice(0, 3).map((uuid) => decodeManifestEntry(manifest[uuid]));
}

function extractInlineAppScript(sourceIndex) {
  const match = sourceIndex.match(/<script type="text\/babel">\s*([\s\S]*?)\s*<\/script>\s*<\/body>/);
  if (!match) {
    throw new Error('Could not extract inline App script from astroview-site/index.html');
  }
  return match[1];
}

function extractTweaksObject(sourceIndex) {
  const match = sourceIndex.match(/window\.AV_TWEAKS = \/\*EDITMODE-BEGIN\*\/([\s\S]*?)\/\*EDITMODE-END\*\//);
  if (!match) {
    throw new Error('Could not extract AV_TWEAKS from astroview-site/index.html');
  }
  return match[1].trim();
}

function buildHtml() {
  const oldBundle = readUtf8(oldBundlePath);
  const { manifest, template } = extractOldBundleParts(oldBundle);
  const [reactText, reactDomText, babelText] = pickRuntimeScripts(manifest, template);

  const sourceIndex = readUtf8(path.join(siteDir, 'index.html'));
  const inlineAppScript = extractInlineAppScript(sourceIndex);
  const tweaksObject = extractTweaksObject(sourceIndex);

  const stylesText = readUtf8(path.join(siteDir, 'styles.css'));
  const contentText = readUtf8(path.join(siteDir, 'content.js'));
  const viewerText = readUtf8(path.join(siteDir, 'viewer.jsx'));
  const sectionsText = readUtf8(path.join(siteDir, 'sections.jsx'));

  const iconDataUrl = dataUrlFor(path.join(siteDir, 'resources', 'icons', 'main_icon.png'), 'image/png');
  const cropDataUrl = dataUrlFor(path.join(siteDir, 'data', 'crop.png'), 'image/png');

  return [
    '<!doctype html>',
    '<html lang="en" data-theme="light">',
    '<head>',
    '  <meta charset="utf-8" />',
    '  <meta name="viewport" content="width=device-width, initial-scale=1" />',
    '  <title>AstroView - FITS Viewer for Astronomical Imaging</title>',
    `  <link rel="icon" type="image/png" href="${iconDataUrl}" />`,
    '  <style>',
    stylesText,
    '  </style>',
    '</head>',
    '<body>',
    '  <canvas id="starfield"></canvas>',
    '  <div id="app" class="page"></div>',
    '  <script>',
    `    window.AV_TWEAKS = /*EDITMODE-BEGIN*/${tweaksObject}/*EDITMODE-END*/;`,
    `    window.__resources = { cropImg: ${JSON.stringify(cropDataUrl)} };`,
    '  </script>',
    '  <script>',
    escapeScript(reactText),
    '  </script>',
    '  <script>',
    escapeScript(reactDomText),
    '  </script>',
    '  <script>',
    escapeScript(babelText),
    '  </script>',
    '  <script>',
    escapeScript(contentText),
    '  </script>',
    '  <script>',
    escapeScript(viewerText),
    '  </script>',
    '  <script>',
    escapeScript(sectionsText),
    '  </script>',
    '  <script type="text/babel">',
    inlineAppScript,
    '  </script>',
    '</body>',
    '</html>',
    '',
  ].join('\n');
}

const outputHtml = buildHtml();
for (const outputPath of outputPaths) {
  fs.writeFileSync(outputPath, outputHtml, 'utf8');
  console.log(`wrote ${outputPath}`);
}
