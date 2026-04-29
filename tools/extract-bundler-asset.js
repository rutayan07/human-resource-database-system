const fs = require('fs');
const zlib = require('zlib');
const path = require('path');

const [,, uuid, outFile] = process.argv;
if (!uuid || !outFile) {
  console.error('Usage: node extract-bundler-asset.js <uuid> <outFile>');
  process.exit(2);
}

const standalone = path.resolve(__dirname, '..', 'TeamSync Standalone.html');
const html = fs.readFileSync(standalone, 'utf8');

const startTag = '<script type="__bundler/manifest">';
const endTag = '</script>';
const start = html.indexOf(startTag);
const end = html.indexOf(endTag, start);
const jsonText = html.slice(start + startTag.length, end).trim();
const manifest = JSON.parse(jsonText);

const entry = manifest[uuid];
if (!entry) {
  console.error('UUID not found in manifest:', uuid);
  process.exit(1);
}

let buf = Buffer.from(entry.data, 'base64');
if (entry.compressed) buf = zlib.gunzipSync(buf);

fs.mkdirSync(path.dirname(outFile), { recursive: true });
fs.writeFileSync(outFile, buf);
console.log('Wrote', outFile, 'mime=', entry.mime, 'bytes=', buf.length, 'compressed=', !!entry.compressed);
