import React from 'react';

export default function Modal({ open, onClose, title, children, footer }) {
  if (!open) return null;
  return (
    <div style={{position:'fixed', inset:0, background:'rgba(0,0,0,.2)', display:'grid', placeItems:'center', zIndex:30}}
         onClick={onClose}>
      <div className="card" style={{width: 560, maxWidth:'95%'}} onClick={e => e.stopPropagation()}>
        <div className="row" style={{justifyContent:'space-between'}}>
          <h3 style={{margin:0}}>{title}</h3>
          <button className="btn ghost" onClick={onClose}>✕</button>
        </div>
        <div style={{marginTop:12}}>{children}</div>
        {footer && (<><hr className="sep"/><div className="row" style={{justifyContent:'flex-end', gap:8}}>{footer}</div></>)}
      </div>
    </div>
  );
}
