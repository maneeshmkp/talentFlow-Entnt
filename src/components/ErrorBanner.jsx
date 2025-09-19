import React from 'react';
export default function ErrorBanner({ error }) {
  if (!error) return null;
  return (
    <div className="card" style={{borderColor:'#fecaca', background:'#fff1f2', color:'#991b1b'}}>
      <strong>Error:</strong> {error.message || String(error)}
    </div>
  );
}
