// Serve the checked-in production build without installing dependencies.
import { createServer } from 'node:http';
import { readFile, stat } from 'node:fs/promises';
import { resolve, extname, sep } from 'node:path';
import { fileURLToPath } from 'node:url';
const root = fileURLToPath(new URL('../dist/', import.meta.url));
const port = Number(process.env.PORT || 4173);
const types = { '.html':'text/html; charset=utf-8','.js':'text/javascript; charset=utf-8','.css':'text/css; charset=utf-8','.webp':'image/webp','.svg':'image/svg+xml' };
try { await stat(resolve(root,'index.html')); } catch { console.error('Missing dist/index.html. Run npm ci and npm run build first.'); process.exit(1); }
createServer(async (req,res) => {
  if (req.method !== 'GET' && req.method !== 'HEAD') { res.writeHead(405); res.end(); return; }
  try {
    const pathname = decodeURIComponent(new URL(req.url,'http://localhost').pathname);
    const target = resolve(root, pathname === '/' ? 'index.html' : '.' + pathname);
    if (!target.startsWith(root.endsWith(sep) ? root : root + sep)) { res.writeHead(403); res.end(); return; }
    const bytes = await readFile(target);
    res.writeHead(200, {'Content-Type':types[extname(target)] || 'application/octet-stream','X-Content-Type-Options':'nosniff'});
    res.end(req.method === 'HEAD' ? undefined : bytes);
  } catch { res.writeHead(404); res.end('Not found'); }
}).listen(port,'127.0.0.1',()=>console.log(`Koro Baby local prototype: http://localhost:${port}\nPress Ctrl+C to stop. No live multiplayer connection.`));
