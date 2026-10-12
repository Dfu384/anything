import {test} from 'node:test';
import assert from 'node:assert/strict';
import {dayKey,puzzleIndex,score,isCorrect,objects} from './game.js';
test('daily key uses UTC and sample selection is deterministic',()=>{assert.equal(dayKey(new Date('2026-10-12T23:59:59Z')),'2026-10-12');assert.equal(puzzleIndex('2026-10-12'),puzzleIndex('2026-10-12'));assert.notEqual(puzzleIndex('2026-10-12'),puzzleIndex('2026-10-13'));});
test('scoring rewards speed and penalizes mistakes without negative scores',()=>{assert.equal(score(3,0),850);assert.equal(score(3,1),800);assert.equal(score(20,0),0);assert.equal(score(19,4),0);});
test('guesses accept synonyms, capitalization and punctuation',()=>{assert.ok(isCorrect(' Fruit! ',objects[0]));assert.ok(!isCorrect('hammer',objects[0]));});
