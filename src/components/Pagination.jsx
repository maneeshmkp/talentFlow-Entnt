import React from 'react';

export default function Pagination({ page, pageSize, total, onPage }) {
  const pages = Math.max(1, Math.ceil(total / pageSize));
  return (
    <div className="row" style={{justifyContent:'space-between', marginTop: 10}}>
      <div>{(page-1)*pageSize+1}-{Math.min(page*pageSize, total)} of {total}</div>
      <div className="row" style={{gap:8}}>
        <button className="btn secondary" onClick={() => onPage(Math.max(1, page-1))} disabled={page===1}>Prev</button>
        <div className="badge">Page {page} / {pages}</div>
        <button className="btn secondary" onClick={() => onPage(Math.min(pages, page+1))} disabled={page===pages}>Next</button>
      </div>
    </div>
  );
}
