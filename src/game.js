import collection from './puzzles.json' with {type:'json'};
import photoCollection from './photo-puzzles.json' with {type:'json'};
export const EDITION='explorer-angles-v1';
export const VIDEO_START='2026-10-12';
export const DURATION=30;
export const ROUNDS=3;
export const ARCHIVE_START='2026-10-06';
export const objects=collection;
export function dayKey(date=new Date()){return date.toISOString().slice(0,10);}
export function puzzleIndex(key){return ((Math.floor(Date.parse(key+'T00:00:00Z')/86400000)%objects.length)+objects.length)%objects.length;}
export function normalize(value){return value.toLowerCase().trim().replace(/[^a-z0-9 ]/g,'').replace(/\s+/g,' ');}
// Damerau-Levenshtein accepts adjacent transpositions as one typo.
export function editDistance(a,b){
 const d=Array.from({length:a.length+1},()=>Array(b.length+1).fill(0));
 for(let i=0;i<=a.length;i++)d[i][0]=i;
 for(let j=0;j<=b.length;j++)d[0][j]=j;
 for(let i=1;i<=a.length;i++)for(let j=1;j<=b.length;j++){
  d[i][j]=Math.min(d[i-1][j]+1,d[i][j-1]+1,d[i-1][j-1]+(a[i-1]===b[j-1]?0:1));
  if(i>1&&j>1&&a[i-1]===b[j-2]&&a[i-2]===b[j-1])d[i][j]=Math.min(d[i][j],d[i-2][j-2]+1);
 }
 return d[a.length][b.length];
}
export function isCorrect(value,object){
 const guess=normalize(value).replace(/\s/g,'');
 if(!guess)return false;
 return [object.name,...object.aliases].some(value=>{
  const answer=normalize(value).replace(/\s/g,'');
  if(guess===answer)return true;
  if(Math.min(guess.length,answer.length)<4)return false;
  const allowed=answer.length>=8&&guess.length>=8?2:1;
  return editDistance(guess,answer)<=allowed;
 });
}
export function score(seconds,mistakes){return Math.max(0,Math.round(1000*(1-Math.min(DURATION,Math.max(0,seconds))/DURATION))-mistakes*50);}
export function frameIndex(seconds,count){return Math.min(count-1,Math.floor(Math.max(0,seconds)/DURATION*(count-1)));}
export function archiveDates(today){const dates=[];for(let d=Date.parse(today+'T00:00:00Z')-86400000;d>=Date.parse(ARCHIVE_START+'T00:00:00Z')&&dates.length<60;d-=86400000)dates.push(dayKey(new Date(d)));return dates;}

export function dailyObjects(date){const list=date<VIDEO_START?photoCollection:objects;const first=((Math.floor(Date.parse(date+'T00:00:00Z')/86400000)%list.length)+list.length)%list.length;return Array.from({length:ROUNDS},(_,i)=>list[(first+i)%list.length]);}
