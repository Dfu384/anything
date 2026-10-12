import collection from './puzzles.json' with {type:'json'};
export const DURATION=30;
export const ROUNDS=3;
export const ARCHIVE_START='2026-10-06';
export const objects=collection;
export function dayKey(date=new Date()){return date.toISOString().slice(0,10);}
export function puzzleIndex(key){return ((Math.floor(Date.parse(key+'T00:00:00Z')/86400000)%objects.length)+objects.length)%objects.length;}
export function normalize(value){return value.toLowerCase().trim().replace(/[^a-z0-9 ]/g,'').replace(/\s+/g,' ');}
export function isCorrect(value,object){return object.aliases.includes(normalize(value));}
export function score(seconds,mistakes){return Math.max(0,Math.round(1000*(1-Math.min(DURATION,Math.max(0,seconds))/DURATION))-mistakes*50);}
export function frameIndex(seconds,count){return Math.min(count-1,Math.floor(Math.max(0,seconds)/DURATION*(count-1)));}
export function archiveDates(today){const dates=[];for(let d=Date.parse(today+'T00:00:00Z')-86400000;d>=Date.parse(ARCHIVE_START+'T00:00:00Z')&&dates.length<60;d-=86400000)dates.push(dayKey(new Date(d)));return dates;}

export function dailyObjects(date){const first=puzzleIndex(date);return Array.from({length:ROUNDS},(_,i)=>objects[(first+i)%objects.length]);}
