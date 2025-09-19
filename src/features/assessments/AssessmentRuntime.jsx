import React from 'react';
import { useParams } from 'react-router-dom';
import { useAssessment, useSubmitAssessment } from './useAssessmentsApi.js';
import Spinner from '../../components/Spinner.jsx';
import ErrorBanner from '../../components/ErrorBanner.jsx';
import { useForm } from 'react-hook-form';

function Field({ q, register, errors, watch }) {
  const required = q.required ? { required: 'Required' } : {};
  const visible = (() => {
    // simple conditional: show if q.when = { questionId, equals }
    if (!q.when) return true;
    const val = watch(q.when.questionId);
    return val === q.when.equals;
  })();
  if (!visible) return null;

  return (
    <div className="card">
      <label><strong>{q.label}</strong> {q.required && <span className="badge">required</span>}</label>
      {q.type === 'short' && <input className="input" {...register(q.id, { ...required, maxLength: q.max || 300 })} />}
      {q.type === 'long' && <textarea className="input" rows={4} {...register(q.id, { ...required, maxLength: q.max || 1000 })} />}
      {q.type === 'number' && <input className="input" type="number" {...register(q.id, {
        ...required,
        valueAsNumber: true,
        validate: v => {
          if (typeof v !== 'number' || Number.isNaN(v)) return 'Invalid number';
          if (q.range) {
            if (v < q.range.min) return `Min ${q.range.min}`;
            if (v > q.range.max) return `Max ${q.range.max}`;
          }
          return true;
        }
      })} />}
      {q.type === 'single' && (
        <div className="row" style={{flexWrap:'wrap', gap:8}}>
          {q.options.map(opt => (
            <label key={opt} className="row" style={{gap:6}}>
              <input type="radio" value={opt} {...register(q.id, required)} />
              {opt}
            </label>
          ))}
        </div>
      )}
      {q.type === 'multi' && (
        <div className="row" style={{flexWrap:'wrap', gap:8}}>
          {q.options.map(opt => (
            <label key={opt} className="row" style={{gap:6}}>
              <input type="checkbox" value={opt} {...register(q.id, required)} />
              {opt}
            </label>
          ))}
        </div>
      )}
      {errors[q.id] && <div style={{color:'#b91c1c', marginTop:6}}>{errors[q.id]?.message || 'Invalid'}</div>}
    </div>
  );
}

export default function AssessmentRuntime() {
  const { jobId } = useParams();
  const { data, isLoading, error } = useAssessment(jobId);
  const submitApi = useSubmitAssessment(jobId);
  const { register, handleSubmit, formState: { errors }, watch, reset } = useForm();

  if (isLoading) return <Spinner/>;
  if (error) return <ErrorBanner error={error}/>;

  const onSubmit = async (values) => {
    await submitApi.mutateAsync(values);
    alert('Submitted!');
    reset();
  };

  const schema = data?.schema || { title: 'Assessment', questions: [] };

  return (
    <div className="card">
      <h2 style={{marginTop:0}}>{schema.title}</h2>
      <form onSubmit={handleSubmit(onSubmit)} style={{display:'grid', gap:10}}>
        {schema.questions.map(q => (
          <Field key={q.id} q={q} register={register} errors={errors} watch={watch}/>
        ))}
        <button className="btn" type="submit" disabled={submitApi.isPending}>
          {submitApi.isPending ? 'Submitting…' : 'Submit'}
        </button>
      </form>
    </div>
  );
}
