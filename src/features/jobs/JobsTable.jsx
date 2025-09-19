import React from 'react';
import JobRow from './JobRow.jsx';

export default function JobsTable({ rows, onEdit, onArchiveToggle, onMove }) {
  return (
    <table className="table">
      <thead>
        <tr><th>#</th><th>Title</th><th>Tags</th><th>Status</th><th>Actions</th></tr>
      </thead>
      <tbody>
        {rows.map(j => (
          <JobRow key={j.id} job={j} onEdit={onEdit} onArchiveToggle={onArchiveToggle} onMove={onMove} />
        ))}
      </tbody>
    </table>
  );
}
