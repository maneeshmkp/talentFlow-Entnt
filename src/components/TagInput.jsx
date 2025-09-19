import React, { useState } from 'react';

export default function TagInput({ value = [], onChange }) {
  const [input, setInput] = useState('');
  const add = () => {
    const t = input.trim();
    if (!t) return;
    onChange?.([...new Set([...value, t])]);
    setInput('');
  };
  const remove = (t) => onChange?.(value.filter(v => v !== t));

  return (
    <div className="row" style={{flexWrap:'wrap', gap:8}}>
      {value.map(t => (
        <span key={t} className="badge" style={{display:'inline-flex', gap:6, alignItems:'center'}}>
          {t} <button className="btn ghost" onClick={() => remove(t)} style={{padding:'0 6px'}}>×</button>
        </span>
      ))}
      <input className="input" placeholder="Add tag"
             value={input} onChange={e=>setInput(e.target.value)}
             onKeyDown={e=> e.key==='Enter' ? add() : null} />
      <button className="btn secondary" type="button" onClick={add}>Add</button>
    </div>
  );
}
