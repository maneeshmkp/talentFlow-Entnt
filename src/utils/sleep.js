export const sleep = (ms) => new Promise(r => setTimeout(r, ms));
export const withLatency = async (fn) => {
  await sleep(200 + Math.floor(Math.random() * 800)); // 200–1000ms
  return fn();
};
export const maybeFail = (p = 0.08) => {
  if (Math.random() < p) {
    const e = new Error('Server error');
    e.status = 500;
    throw e;
  }
};
