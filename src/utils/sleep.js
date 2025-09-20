// export const sleep = (ms) => new Promise(r => setTimeout(r, ms));
// export const withLatency = async (fn) => {
//   await sleep(200 + Math.floor(Math.random() * 800)); // 200–1000ms
//   return fn();
// };
// export const maybeFail = (p = 0.08) => {
//   if (Math.random() < p) {
//     const e = new Error('Server error');
//     e.status = 500;
//     throw e;
//   }
// };

// src/utils/sleep.js
export const sleep = (ms) => new Promise(r => setTimeout(r, ms));

export const withLatency = async (fn, min = 200, max = 1200) => {
  const delay = min + Math.floor(Math.random() * (max - min + 1));
  await sleep(delay);
  return fn();
};

// 5–10% failure by default (pass a number to override)
export const maybeFailWrite = (prob) => {
  const p = typeof prob === 'number' ? prob : (0.05 + Math.random() * 0.05);
  if (Math.random() < p) {
    const e = new Error('Server error');
    e.status = 500;
    throw e;
  }
};
