import http from 'node:http';
import fs from 'node:fs';
import path from 'node:path';
const root = path.resolve(process.argv[2] || 'dist-local');
const types = {
  '.html': 'text/html',
  '.js': 'application/javascript',
  '.json': 'application/json',
  '.png': 'image/png',
  '.ico': 'image/x-icon',
};
http
  .createServer((req, res) => {
    let file = path.resolve(
      root,
      '.' + decodeURIComponent(new URL(req.url, 'http://localhost').pathname),
    );
    if (!file.startsWith(root + path.sep) && file !== root) {
      res.writeHead(403);
      res.end();
      return;
    }
    if (!fs.existsSync(file) || fs.statSync(file).isDirectory())
      file = path.join(root, 'index.html');
    res.setHeader('Content-Type', types[path.extname(file)] || 'application/octet-stream');
    fs.createReadStream(file).pipe(res);
  })
  .listen(8081, '127.0.0.1', () => console.log(`Preview: http://127.0.0.1:8081 (${root})`));
