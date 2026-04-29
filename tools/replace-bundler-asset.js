const fs = require('fs');
const zlib = require('zlib');
const path = require('path');

const [,, uuid, inputFile] = process.argv;
if (!uuid || !inputFile) {
  console.error('Usage: node replace-bundler-asset.js <uuid> <inputFile>');
  process.exit(2);
}

const standalone = path.resolve(__dirname, '..', 'TeamSync Standalone.html');
const html = fs.readFileSync(standalone, 'utf8');

const startTag = '<script type="__bundler/manifest">';
const endTag = '</script>';

const start = html.indexOf(startTag);
if (start < 0) throw new Error('manifest tag not found');
const end = html.indexOf(endTag, start);
if (end < 0) throw new Error('manifest end tag not found');

const manifestText = html.slice(start + startTag.length, end).trim();
const manifest = JSON.parse(manifestText);

const entry = manifest[uuid];
if (!entry) throw new Error('UUID not found in manifest: ' + uuid);

let buf = fs.readFileSync(path.resolve(inputFile));
if (entry.compressed) {
  // gzip at maximum compression to keep size small; runtime gunzips either way.
  buf = zlib.gzipSync(buf, { level: 9 });
}

entry.data = buf.toString('base64');
manifest[uuid] = entry;

const nextManifestText = JSON.stringify(manifest);
const nextHtml = html.slice(0, start + startTag.length) + '\n' + nextManifestText + '\n' + html.slice(end);

fs.writeFileSync(standalone, nextHtml, 'utf8');
console.log('Updated', uuid, 'compressed=', !!entry.compressed, 'bytes=', buf.length);
