import React from 'react';

export default function JobRow({ job, onEdit, onArchiveToggle, onMove }) {
  return (
    <tr>
      <td style={{width:40, opacity:.5}}>#{job.order}</td>
      <td><strong>{job.title}</strong><div style={{fontSize:12, color:'#6b7280'}}>{job.slug}</div></td>
      <td>{job.tags?.map(t => <span key={t} className="badge" style={{marginRight:6}}>{t}</span>)}</td>
      <td><span className="badge">{job.status}</span></td>
      <td className="row" style={{gap:8}}>
        <button className="btn secondary" onClick={() => onMove(job, -1)}>↑</button>
        <button className="btn secondary" onClick={() => onMove(job, +1)}>↓</button>
        <button className="btn secondary" onClick={() => onEdit(job)}>Edit</button>
        <button className="btn" onClick={() => onArchiveToggle(job)}>{job.status === 'active' ? 'Archive' : 'Unarchive'}</button>
      </td>
    </tr>
  );
}
