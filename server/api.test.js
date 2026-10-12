import {test} from 'node:test';
import assert from 'node:assert/strict';
import {createServer} from 'node:http';
import {mkdtempSync,rmSync} from 'node:fs';
import {tmpdir} from 'node:os';
import {join} from 'node:path';
import {createApi} from './api.js';
import {dailyObjects} from '../src/game.js';
test('shared leaderboard verifies all three rounds, timeout, scoring and durable results',async()=>{
 const dir=mkdtempSync(join(tmpdir(),'odd-api-'));let clock=Date.parse('2026-10-12T12:00:00Z');
 let api=createApi({dataDir:dir,now:()=>clock});const server=createServer((req,res)=>api(req,res,()=>{res.statusCode=404;res.end();}));await new Promise(r=>server.listen(0,'127.0.0.1',r));const base=`http://127.0.0.1:${server.address().port}`;
 async function request(path,data){const r=await fetch(base+path,{method:data?'POST':'GET',headers:{'Content-Type':'application/json'},body:data?JSON.stringify(data):undefined});return {status:r.status,body:await r.json()};}
 try{
  assert.equal((await request('/api/leaderboard',{playerId:'player-test',name:'Early'})).status,400);
  let r=(await request('/api/round',{playerId:'player-test'})).body;assert.equal(r.round,0);clock+=3000;
  assert.equal((await request('/api/guess',{token:r.token,guess:'incorrect'})).body.mistakes,1);
  let correct=(await request('/api/guess',{token:r.token,guess:dailyObjects('2026-10-12')[0].name})).body;assert.equal(correct.result.points,850);
  r=(await request('/api/round',{playerId:'player-test'})).body;assert.equal(r.round,1);clock+=30000;assert.equal((await request('/api/guess',{token:r.token,guess:'late'})).body.result.points,0);
  r=(await request('/api/round',{playerId:'player-test'})).body;assert.equal(r.round,2);clock+=6000;correct=(await request('/api/guess',{token:r.token,guess:dailyObjects('2026-10-12')[2].name})).body;assert.equal(correct.result.points,800);
  assert.equal((await request('/api/round',{playerId:'player-test'})).status,409);
  assert.equal((await request('/api/leaderboard',{playerId:'player-test',name:'<script>'})).status,400);
  assert.equal((await request('/api/leaderboard',{playerId:'player-test',name:'Alex',points:99999})).status,201);
  assert.equal((await request('/api/leaderboard',{playerId:'player-test',name:'Again'})).status,409);
  let board=(await request('/api/leaderboard')).body;assert.equal(board.entries[0].points,1650);assert.equal(board.entries[0].solved,2);assert.equal(board.entries[0].seconds,39);
  api=createApi({dataDir:dir,now:()=>clock});assert.equal((await request('/api/progress?playerId=player-test')).body.results.length,3);assert.equal((await request('/api/leaderboard')).body.entries[0].name,'Alex');
  clock+=86400000;assert.equal((await request('/api/leaderboard')).body.entries.length,0);assert.equal((await request('/api/round',{playerId:'player-test'})).body.round,0);
 }finally{await new Promise(r=>server.close(r));rmSync(dir,{recursive:true,force:true});}
});
