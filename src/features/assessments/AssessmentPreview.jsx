import React from 'react';

export default function AssessmentPreview({ schema }) {
  if (!schema) return null;
  return (
    <div className="card">
      <h3 style={{marginTop:0}}>Live Preview</h3>
      <p style={{color:'#6b7280'}}>{schema.title || 'Untitled Assessment'}</p>
      <ol>
        {schema.questions?.map((q, i) => (
          <li key={q.id} style={{marginBottom:8}}>
            <strong>Q{i+1}:</strong> {q.label} <span className="badge">{q.type}</span>
          </li>
        ))}
      </ol>
      {!schema.questions?.length && <div style={{color:'#6b7280'}}>No questions yet.</div>}
    </div>
  );
}
