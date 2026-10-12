import {test} from 'node:test';
import assert from 'node:assert/strict';
import {DURATION,ROUNDS,dayKey,dailyObjects,frameIndex,archiveDates,score,isCorrect,objects} from './game.js';
test('daily set has three distinct objects and stable UTC dates',()=>{assert.equal(DURATION,30);assert.equal(ROUNDS,3);assert.equal(dayKey(new Date('2026-10-12T23:59:59Z')),'2026-10-12');const set=dailyObjects('2026-10-12');assert.equal(new Set(set.map(o=>o.id)).size,3);assert.deepEqual(set,dailyObjects('2026-10-12'));assert.notDeepEqual(set,dailyObjects('2026-10-13'));});
test('30-second scoring rewards speed, penalizes mistakes and clamps at zero',()=>{assert.equal(score(3,0),900);assert.equal(score(3,1),850);assert.equal(score(30,0),0);assert.equal(score(29,4),0);});
test('guesses accept everyday names and punctuation',()=>{assert.ok(isCorrect(' SAGRADA FAMILIA! ',objects[0]));assert.ok(!isCorrect('hammer',objects[0]));});
test('photo sequence changes at 2.5-second intervals and ends on familiar view',()=>{assert.equal(frameIndex(0,13),0);assert.equal(frameIndex(2.49,13),0);assert.equal(frameIndex(2.5,13),1);assert.equal(frameIndex(15,13),6);assert.equal(frameIndex(30,13),12);assert.equal(frameIndex(99,13),12);});
test('archive excludes today and future dates',()=>{const dates=archiveDates('2026-10-12');assert.equal(dates.length,6);assert.equal(dates[0],'2026-10-11');assert.equal(dates.at(-1),'2026-10-06');assert.deepEqual(archiveDates('2026-10-06'),[]);});

test('close guesses accept misspellings without accepting fragments or unrelated words',()=>{
 assert.ok(isCorrect('sagrda familia',objects[0]));assert.ok(isCorrect('sagrada famila',objects[0]));
 assert.ok(isCorrect('stone henge',objects[1]));assert.ok(isCorrect('stonehedge',objects[1]));
 assert.ok(!isCorrect('air',objects[0]));assert.ok(!isCorrect('',objects[0]));
 assert.ok(!isCorrect('bad',{name:'Bed',aliases:['bed']}));assert.ok(!isCorrect('table',objects[0]));
 assert.ok(isCorrect('waterfal',{name:'Waterfall',aliases:['waterfall']}));
});
