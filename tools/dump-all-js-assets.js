const fs = require('fs');
const zlib = require('zlib');
const path = require('path');

const standalone = path.resolve(__dirname, '..', 'TeamSync Standalone.html');
const outDir = path.resolve(__dirname, 'decoded_all');

const html = fs.readFileSync(standalone, 'utf8');
const startTag = '<script type="__bundler/manifest">';
const endTag = '</script>';
const start = html.indexOf(startTag);
const end = html.indexOf(endTag, start);
const manifest = JSON.parse(html.slice(start + startTag.length, end).trim());

fs.mkdirSync(outDir, { recursive: true });

let n = 0;
for (const [uuid, entry] of Object.entries(manifest)) {
  if (!entry || !entry.data || !entry.mime) continue;
  if (entry.mime !== 'application/javascript' && !entry.mime.startsWith('text/')) continue;

  let buf = Buffer.from(entry.data, 'base64');
  if (entry.compressed) buf = zlib.gunzipSync(buf);

  const ext = entry.mime === 'application/javascript' ? 'js' : 'txt';
  const p = path.join(outDir, `${uuid}.${ext}`);
  fs.writeFileSync(p, buf);
  n++;
}

console.log('Wrote', n, 'assets to', outDir);
