export const sleep = (ms) => new Promise(r => setTimeout(r, ms));
export const withLatency = async (fn) => {
  await sleep(200 + Math.floor(Math.random()*1000)); // 200–1200ms
  return fn();
};
export const maybeFail = (p=0.08) => { // 8% default
  if (Math.random() < p) {
    const e = new Error('Server error');
    e.status = 500;
    throw e;
  }
};
