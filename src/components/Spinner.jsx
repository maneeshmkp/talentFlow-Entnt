import React from 'react';
export default function Spinner({ small }) {
  const size = small ? 16 : 24;
  return (
    <div role="status" aria-label="loading" style={{display:'inline-block'}}>
      <svg width={size} height={size} viewBox="0 0 24 24">
        <circle cx="12" cy="12" r="10" stroke="#e5e7eb" strokeWidth="4" fill="none"/>
        <path d="M22 12a10 10 0 0 0-10-10" stroke="#2563eb" strokeWidth="4" fill="none" strokeLinecap="round"/>
      </svg>
    </div>
  );
}
