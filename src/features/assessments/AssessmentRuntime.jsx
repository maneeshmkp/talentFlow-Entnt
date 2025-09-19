import { useForm } from 'react-hook-form';
import { useAssessmentByJob } from './useAssessmentsApi.js';

function shouldShow(q, values) {
  if (!q.when) return true;
  const { questionId, equals } = q.when; // simple conditional
  return values[questionId] === equals;
}

export default function AssessmentRuntime() {
  const { schema, submit } = useAssessmentByJob(); // wraps GET + POST submit
  const form = useForm({ mode:'onBlur' });

  const onSubmit = form.handleSubmit(async (values) => {
    // numeric range check
    schema.questions.filter(q=>q.type==='number' && q.range).forEach(q=>{
      const v = Number(values[q.id]);
      if (isNaN(v) || v < q.range.min || v > q.range.max) {
        throw new Error(`${q.label} out of range`);
      }
    });
    await submit(values);
    // show success
  });

  const values = form.watch();
  return (
    <form onSubmit={onSubmit} className="space-y-4">
      {schema.questions.filter(q=>shouldShow(q, values)).map(q=>(
        <div key={q.id}>
          <label className="block font-medium">{q.label}{q.required && ' *'}</label>
          {/* render by q.type: radio group, checkboxes, input, textarea, number, file (stub) */}
          {/* register with react-hook-form, add maxLength etc */}
        </div>
      ))}
      <button className="btn-primary">Submit</button>
    </form>
  );
}
