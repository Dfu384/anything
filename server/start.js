import {createServer} from 'node:http';
import {readFile,stat} from 'node:fs/promises';
import {resolve,extname,sep} from 'node:path';
import {createApi} from './api.js';
const root=resolve('dist');const api=createApi();const types={'.html':'text/html','.js':'text/javascript','.css':'text/css','.jpg':'image/jpeg','.json':'application/json','.txt':'text/plain'};
createServer((req,res)=>api(req,res,async()=>{try{const path=resolve(root,'.'+decodeURIComponent(new URL(req.url,'http://localhost').pathname));if(path!==root&&!path.startsWith(root+sep)){res.writeHead(403);return res.end();}const file=(await stat(path)).isDirectory()?resolve(path,'index.html'):path;res.setHeader('Content-Type',types[extname(file)]||'application/octet-stream');res.end(await readFile(file));}catch{res.writeHead(404);res.end('Not found');}})).listen(Number(process.env.PORT||5173),'0.0.0.0',()=>console.log('Odd Angle server running on port '+(process.env.PORT||5173)));
