import { http, HttpResponse } from 'msw';
import { db } from '../../db/db.js';
import { withLatency, maybeFailWrite } from '../../utils/sleep.js';

export const candidatesHandlers = [
  // GET /candidates
  http.get('/candidates', async ({ request }) => withLatency(async () => {
    const url = new URL(request.url);
    const page = parseInt(url.searchParams.get('page') || '1', 10);
    const pageSize = parseInt(url.searchParams.get('pageSize') || '30', 10);
    const stage = url.searchParams.get('stage') || '';
    const jobId = url.searchParams.get('jobId') || '';
    const search = (url.searchParams.get('search') || '').toLowerCase();

    let rows = await db.candidates.toArray();
    if (stage) rows = rows.filter(c => c.stage === stage);
    if (jobId) rows = rows.filter(c => c.jobId === jobId);
    if (search) rows = rows.filter(c => c.name.toLowerCase().includes(search) || c.email.toLowerCase().includes(search));

    rows.sort((a,b)=> a.name.localeCompare(b.name));
    const total = rows.length;
    const start = (page-1)*pageSize;
    const data = rows.slice(start, start + pageSize);
    return HttpResponse.json({ data, page, pageSize, total });
  })),

  // GET /candidates/:id
  http.get('/candidates/:id', async ({ params }) => withLatency(async () => {
    const cand = await db.candidates.get(params.id);
    if (!cand) return new HttpResponse('Not found', { status: 404 });
    return HttpResponse.json(cand);
  })),

  // GET /candidates/:id/timeline
  http.get('/candidates/:id/timeline', async ({ params }) => withLatency(async () => {
    const rows = await db.timelines.where('candidateId').equals(params.id).sortBy('ts');
    return HttpResponse.json(rows);
  })),

  // PATCH /candidates/:id
  http.patch('/candidates/:id', async ({ params, request }) => withLatency(async () => {
    maybeFailWrite();
    const updates = await request.json();
    const id = params.id;
    const cand = await db.candidates.get(id);
    if (!cand) return new HttpResponse('Not found', { status: 404 });

    if (updates.stage && updates.stage !== cand.stage) {
      await db.timelines.add({ candidateId: id, ts: Date.now(), note: `Moved to ${updates.stage}` });
    }
    await db.candidates.update(id, updates);
    const updated = await db.candidates.get(id);
    return HttpResponse.json(updated);
  })),
];
