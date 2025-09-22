import React, { useMemo, useState } from 'react';
import { useParams } from 'react-router-dom';
import { useAssessment, useSaveAssessment } from './useAssessmentsApi.js';
import Spinner from '../../components/Spinner.jsx';
import ErrorBanner from '../../components/ErrorBanner.jsx';
import { id as newId } from '../../utils/rand.js';
import AssessmentPreview from './AssessmentPreview.jsx';

const TYPES = [
  { type: 'short', label: 'Short text' },
  { type: 'long', label: 'Long text' },
  { type: 'number', label: 'Number' },
  { type: 'single', label: 'Single choice' },
  { type: 'multi', label: 'Multi choice' },
];

export default function AssessmentBuilder() {
  const { jobId } = useParams();
  const { data, isLoading, error } = useAssessment(jobId);
  const save = useSaveAssessment(jobId);
  const [schema, setSchema] = useState(null);

  const current = useMemo(() => schema || data?.schema || { title: 'Assessment', questions: [] }, [data, schema]);

  const addQ = (type) => {
    const q = { id: newId(), type, label: 'New question', required: false };
    if (type === 'single' || type === 'multi') q.options = ['Option A', 'Option B'];
    if (type === 'number') q.range = { min: 0, max: 10 };
    setSchema({ ...current, questions: [...current.questions, q] });
  };

  const saveAll = async () => {
    await save.mutateAsync(current);
    alert('Saved');
  };

  if (isLoading) return <Spinner/>;
  if (error) return <ErrorBanner error={error}/>;

  return (
    <div className="columns">
      <div className="card">
        <h2 style={{marginTop:0}}>Assessment Builder</h2>
        <div>
          <label>Title</label>
          <input className="input" value={current.title} onChange={e => setSchema({ ...current, title: e.target.value })}/>
        </div>
        <hr className="sep"/>
        <div className="row" style={{gap:8, flexWrap:'wrap'}}>
          {TYPES.map(t => <button key={t.type} className="btn secondary" onClick={()=>addQ(t.type)}>{t.label}</button>)}
        </div>
        <hr className="sep"/>
        <div style={{display:'grid', gap:10}}>
          {current.questions.map((q, idx) => (
            <div key={q.id} className="card">
              <div className="row" style={{justifyContent:'space-between', alignItems:'center'}}>
                <strong>Q{idx+1}</strong>
                <button className="btn ghost" onClick={() => setSchema({ ...current, questions: current.questions.filter(x=>x.id!==q.id) })}>Delete</button>
              </div>
              <div style={{marginTop:8}} className="columns">
                <div>
                  <label>Label</label>
                  <input className="input" value={q.label} onChange={e => {
                    const qs = current.questions.map(x => x.id === q.id ? { ...x, label: e.target.value } : x);
                    setSchema({ ...current, questions: qs });
                  }}/>
                </div>
                <div>
                  <label>Required</label>
                  <select className="input" value={q.required ? 'true' : 'false'} onChange={e=>{
                    const qs = current.questions.map(x => x.id === q.id ? { ...x, required: e.target.value==='true' } : x);
                    setSchema({ ...current, questions: qs });
                  }}>
                    <option value="false">No</option>
                    <option value="true">Yes</option>
                  </select>
                </div>
              </div>
              {(q.type === 'single' || q.type === 'multi') && (
                <div style={{marginTop:8}}>
                  <label>Options (comma separated)</label>
                  <input className="input" value={q.options.join(', ')} onChange={e=>{
                    const qs = current.questions.map(x => x.id === q.id ? { ...x, options: e.target.value.split(',').map(s=>s.trim()).filter(Boolean) } : x);
                    setSchema({ ...current, questions: qs });
                  }}/>
                </div>
              )} 
              {q.type === 'number' && (
                <div style={{marginTop:8}} className="columns">
                  <div>
                    <label>Min</label>
                    <input className="input" type="number" value={q.range?.min ?? 0} onChange={e=>{
                      const qs = current.questions.map(x => x.id === q.id ? { ...x, range: { ...x.range, min: Number(e.target.value) } } : x);
                      setSchema({ ...current, questions: qs });
                    }}/>
                  </div>
                  <div>
                    <label>Max</label>
                    <input className="input" type="number" value={q.range?.max ?? 10} onChange={e=>{
                      const qs = current.questions.map(x => x.id === q.id ? { ...x, range: { ...x.range, max: Number(e.target.value) } } : x);
                      setSchema({ ...current, questions: qs });
                    }}/>
                  </div>
                </div>
              )}
            </div>
          ))}
        </div>
        <hr className="sep"/>
        <button className="btn" onClick={saveAll} disabled={save.isPending}>{save.isPending ? 'Saving…' : 'Save'}</button>
      </div>

      <AssessmentPreview schema={current}/>
    </div>
  );
}
