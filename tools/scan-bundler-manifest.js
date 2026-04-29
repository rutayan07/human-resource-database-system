const fs = require('fs');
const zlib = require('zlib');
const path = require('path');

const file = path.resolve(__dirname, '..', 'TeamSync Standalone.html');
const html = fs.readFileSync(file, 'utf8');

const startTag = '<script type="__bundler/manifest">';
const endTag = '</script>';

const start = html.indexOf(startTag);
if (start < 0) throw new Error('manifest tag not found');

const end = html.indexOf(endTag, start);
if (end < 0) throw new Error('manifest end tag not found');

const jsonText = html.slice(start + startTag.length, end).trim();
const manifest = JSON.parse(jsonText);

const needles = [
  'EmployeePage',
  'Employee Page',
  'EmployeePage()',
  'function Employee',
  'navigate(',
  'loadMenu(',
  'employee',
];

function decode(entry) {
  let buf = Buffer.from(entry.data, 'base64');
  if (entry.compressed) buf = zlib.gunzipSync(buf);
  return buf.toString('utf8');
}

const hits = [];
for (const [uuid, entry] of Object.entries(manifest)) {
  if (!entry || !entry.data || !entry.mime) continue;
  if (!/javascript|text\/(plain|babel)|json|jsx|ecmascript/i.test(entry.mime)) continue;

  let txt;
  try {
    txt = decode(entry);
  } catch {
    continue;
  }

  for (const needle of needles) {
    if (txt.includes(needle)) {
      hits.push({ uuid, mime: entry.mime, needle, size: txt.length });
    }
  }
}

console.log('Assets:', Object.keys(manifest).length);
console.log('Hits:', hits.length);
for (const h of hits) console.log(h);
