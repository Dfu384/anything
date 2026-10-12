export const DURATION = 20;
export const objects = [
 {name:'Fruit',src:'/media/fruit.jpg',aliases:['fruit','fruits','fruit bowl','bowl of fruit','basket of fruit']},
 {name:'Baboon',src:'/media/baboon.jpg',aliases:['baboon','monkey','ape','mandrill']},
 {name:'Building',src:'/media/building.jpg',aliases:['building','buildings','house','houses','apartment','apartments','apartment building']}
];
export function dayKey(date = new Date()) { return date.toISOString().slice(0,10); }
export function puzzleIndex(key) { return Math.floor(Date.parse(key+'T00:00:00Z')/86400000) % objects.length; }
export function normalize(value) { return value.toLowerCase().trim().replace(/[^a-z0-9 ]/g,'').replace(/\s+/g,' '); }
export function isCorrect(value, object) { return object.aliases.includes(normalize(value)); }
export function score(seconds, mistakes) { return Math.max(0, Math.round(1000*(1-Math.min(DURATION,Math.max(0,seconds))/DURATION))-mistakes*50); }
