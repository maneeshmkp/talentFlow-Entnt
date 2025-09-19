import { http, HttpResponse } from 'msw';
import { db } from '../../db/db.js';
import { withLatency, maybeFail } from '../../utils/sleep.js';

export const assessmentsHandlers = [
  // GET /assessments/:jobId
  http.get('/assessments/:jobId', async ({ params }) => withLatency(async () => {
    const a = await db.assessments.where('jobId').equals(params.jobId).first();
    if (!a) {
      // create a minimal default
      const schema = { title: 'Assessment', questions: [] };
      return HttpResponse.json({ jobId: params.jobId, schema });
    }
    return HttpResponse.json(a);
  })),

  // PUT /assessments/:jobId
  http.put('/assessments/:jobId', async ({ params, request }) => withLatency(async () => {
    maybeFail(0.08);
    const { schema } = await request.json();
    const existing = await db.assessments.where('jobId').equals(params.jobId).first();
    if (existing) {
      await db.assessments.update(existing.jobId, { schema });
    } else {
      await db.assessments.add({ jobId: params.jobId, schema });
    }
    const updated = await db.assessments.where('jobId').equals(params.jobId).first();
    return HttpResponse.json(updated || { jobId: params.jobId, schema });
  })),

  // POST /assessments/:jobId/submit
  http.post('/assessments/:jobId/submit', async ({ params, request }) => withLatency(async () => {
    maybeFail(0.06);
    const body = await request.json();
    const id = crypto.randomUUID();
    await db.submissions.add({ id, jobId: params.jobId, candidateId: body.candidateId || null, payload: body, ts: Date.now() });
    return new HttpResponse(null, { status: 204 });
  })),
];
