export const pick = (arr) => arr[Math.floor(Math.random() * arr.length)];
export const range = (n, map) => Array.from({ length: n }, (_, i) => map ? map(i) : i);
export const id = () => crypto.randomUUID();


