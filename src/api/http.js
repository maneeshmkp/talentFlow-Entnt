async function j(res) {
  if (!res.ok) {
    const text = await res.text();
    const err = new Error(text || res.statusText);
    err.status = res.status;
    throw err;
  }
  return res.status === 204 ? null : res.json();
}

export const api = {
  get: (url) => fetch(url).then(j),
  post: (url, body) => fetch(url, { method:'POST', headers:{'Content-Type':'application/json'}, body: JSON.stringify(body) }).then(j),
  patch: (url, body) => fetch(url, { method:'PATCH', headers:{'Content-Type':'application/json'}, body: JSON.stringify(body) }).then(j),
  put: (url, body) => fetch(url, { method:'PUT', headers:{'Content-Type':'application/json'}, body: JSON.stringify(body) }).then(j),
};
