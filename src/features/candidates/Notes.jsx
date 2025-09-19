import React, { useState } from 'react';

const team = ['Maneesh','Priya','Alex','Jordan','Sam'];

export default function Notes() {
  const [value, setValue] = useState('');
  const [notes, setNotes] = useState([]);

  const add = () => {
    const v = value.trim();
    if (!v) return;
    setNotes([{ id: crypto.randomUUID(), text: v, ts: Date.now() }, ...notes]);
    setValue('');
  };

  const mentionHint = value.endsWith('@');
  return (
    <div className="card">
      <h3 style={{marginTop:0}}>Notes</h3>
      <textarea className="input" rows={3} value={value} onChange={e=>setValue(e.target.value)}
        placeholder="Type a note. Use @ to mention (visual only)." />
      <div className="row" style={{justifyContent:'space-between', marginTop:8}}>
        {mentionHint ? <div style={{fontSize:12, color:'#6b7280'}}>Try: {team.map(t=>'@'+t).join(' ')}</div> : <span/>}
        <button className="btn" onClick={add}>Add note</button>
      </div>
      <hr className="sep"/>
      <div style={{display:'grid', gap:8}}>
        {notes.map(n => (
          <div key={n.id} className="card" style={{padding:10}}>
            <div style={{fontSize:12, color:'#6b7280'}}>{new Date(n.ts).toLocaleString()}</div>
            <div dangerouslySetInnerHTML={{__html: n.text.replace(/@(\w+)/g,'<span style="background:#eef2ff;padding:2px 6px;border-radius:999px">@$1</span>')}}/>
          </div>
        ))}
        {notes.length === 0 && <div style={{color:'#6b7280'}}>No notes yet.</div>}
      </div>
    </div>
  );
}
