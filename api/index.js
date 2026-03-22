import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const publicDir = path.join(__dirname, '../');

const MIME = {
  '.html': 'text/html',
  '.css': 'text/css',
  '.js': 'application/javascript',
  '.svg': 'image/svg+xml',
  '.png': 'image/png',
  '.jpg': 'image/jpeg',
  '.woff2': 'font/woff2',
};

export default async function handler(req, res) {
  let filePath = req.url === '/' ? 'index.html' : req.url;
  filePath = path.join(publicDir, filePath);

  if (!filePath.startsWith(publicDir)) {
    res.status(403).json({ error: 'Forbidden' });
    return;
  }

  try {
    const ext = path.extname(filePath);
    const contentType = MIME[ext] || 'application/octet-stream';
    const data = fs.readFileSync(filePath);

    res.setHeader('Content-Type', contentType);
    res.status(200).send(data);
  } catch (error) {
    res.status(404).json({ error: 'Not found' });
  }
}
