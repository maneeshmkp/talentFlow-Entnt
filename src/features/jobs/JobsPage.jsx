import React, { useMemo, useState } from 'react';
import { Link, useParams } from 'react-router-dom';
import { useCreateJob, useJobsQuery, usePatchJob, useReorderJob } from './useJobsApi.js';
import JobsFilters from './JobsFilters.jsx';
import JobsTable from './JobsTable.jsx';
import Pagination from '../../components/Pagination.jsx';
import Spinner from '../../components/Spinner.jsx';
import ErrorBanner from '../../components/ErrorBanner.jsx';
import JobForm from './JobForm.jsx';

export default function JobsPage() {
  const { jobId } = useParams();
  const [filters, setFilters] = useState({ search:'', status:'', page:1, pageSize:10, sort:'order' });
  const { data, isLoading, error } = useJobsQuery(filters);
  const createJob = useCreateJob();
  const patchJob = usePatchJob();
  const reorder = useReorderJob();

  const rows = useMemo(() => (data?.data || []).slice().sort((a,b)=>a.order-b.order), [data]);

  const onMove = (job, dir) => {
    const from = job.order;
    const to = job.order + dir;
    if (to < 1 || to > (data?.total || 0)) return;
    reorder.mutate({ id: job.id, fromOrder: from, toOrder: to });
  };

  const onArchiveToggle = (job) => {
    patchJob.mutate({ id: job.id, updates: { status: job.status === 'active' ? 'archived' : 'active' } });
  };

  const [open, setOpen] = useState(false);
  const [edit, setEdit] = useState(null);

  return (
    <div className="card">
      <div className="row" style={{justifyContent:'space-between'}}>
        <h2 style={{margin:0}}>Jobs</h2>
        <div className="row" style={{gap:8}}>
          <Link to={`/assessments/${jobId || (rows[0]?.id || '')}/builder`} className="btn secondary">Assessment Builder</Link>
          <button className="btn" onClick={() => { setEdit(null); setOpen(true); }}>New Job</button>
        </div>
      </div>
      <hr className="sep"/>
      <JobsFilters filters={filters} onChange={setFilters}/>
      <hr className="sep"/>
      {isLoading && <Spinner/>}
      <ErrorBanner error={error || createJob.error || patchJob.error || reorder.error}/>
      {!isLoading && (
        <>
          <JobsTable
            rows={rows}
            onEdit={(j)=>{ setEdit(j); setOpen(true); }}
            onArchiveToggle={onArchiveToggle}
            onMove={onMove}
          />
          <Pagination page={filters.page} pageSize={filters.pageSize} total={data?.total || 0}
                      onPage={(p)=>setFilters({...filters, page:p})}/>
        </>
      )}
      <JobForm
        open={open}
        initial={edit}
        onClose={()=>setOpen(false)}
        onSave={async payload => {
          if (edit) {
            await patchJob.mutateAsync({ id: edit.id, updates: payload });
          } else {
            await createJob.mutateAsync(payload);
          }
        }}
      />
    </div>
  );
}
