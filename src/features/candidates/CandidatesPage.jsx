import React, { useMemo, useState } from 'react';
import { useCandidatesQuery, usePatchCandidate } from './useCandidatesApi.js';
import Spinner from '../../components/Spinner.jsx';
import ErrorBanner from '../../components/ErrorBanner.jsx';
import CandidatesVirtualTable from './CandidatesVirtualTable.jsx';
import Kanban from './Kanban.jsx';

export default function CandidatesPage() {
  const [filters, setFilters] = useState({ page:1, pageSize:50, stage:'', jobId:'', search:'' });
  const { data, isLoading, error } = useCandidatesQuery(filters);
  const patch = usePatchCandidate();

  const all = useMemo(()=> data?.data || [], [data]);

  const onMove = (candId, toStage) => {
    patch.mutate({ id: candId, updates: { stage: toStage } });
  };

  return (
    <div className="card">
      <div className="row" style={{justifyContent:'space-between'}}>
        <h2 style={{margin:0}}>Candidates</h2>
        <div className="row" style={{gap:8}}>
          <select className="input" value={filters.stage} onChange={e=>setFilters({...filters, stage:e.target.value, page:1})}>
            <option value="">All stages</option>
            {['applied','screen','tech','offer','hired','rejected'].map(s => <option key={s} value={s}>{s}</option>)}
          </select>
          <input className="input" placeholder="Search" value={filters.search}
                 onChange={e=>setFilters({...filters, search:e.target.value, page:1})}/>
        </div>
      </div>
      <hr className="sep"/>
      <ErrorBanner error={error || patch.error}/>
      {isLoading ? <Spinner/> : <>
        <Kanban all={all} onMove={onMove}/>
        <hr className="sep"/>
        <CandidatesVirtualTable rows={all}/>
      </>}
    </div>
  );
}
