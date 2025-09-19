import React from 'react';

export default function JobsFilters({ filters, onChange }) {
  const set = (k, v) => onChange({ ...filters, [k]: v, page: 1 });
  return (
    <div className="row" style={{gap:10, flexWrap:'wrap'}}>
      <input className="input" placeholder="Search title or slug" value={filters.search}
             onChange={e=>set('search', e.target.value)}/>
      <select className="input" value={filters.status} onChange={e=>set('status', e.target.value)}>
        <option value="">All statuses</option>
        <option value="active">Active</option>
        <option value="archived">Archived</option>
      </select>
      <select className="input" value={filters.pageSize} onChange={e=>set('pageSize', Number(e.target.value))}>
        <option value="5">5</option>
        <option value="10">10</option>
        <option value="20">20</option>
      </select>
    </div>
  );
}
