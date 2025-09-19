import { http, HttpResponse } from 'msw';
import { db } from '../../db/db.js';
import { withLatency, maybeFail } from '../../utils/sleep.js';
import slugify from '../../utils/slugify.js';

export const jobsHandlers = [
  // GET /jobs?search=&status=&page=&pageSize=&sort=
  http.get('/jobs', async ({ request }) => withLatency(async () => {
    const url = new URL(request.url);
    const search = url.searchParams.get('search')?.toLowerCase() || '';
    const status = url.searchParams.get('status') || '';
    const page = parseInt(url.searchParams.get('page') || '1', 10);
    const pageSize = parseInt(url.searchParams.get('pageSize') || '10', 10);
    const sort = url.searchParams.get('sort') || 'order';

    let rows = await db.jobs.toArray();
    if (search) rows = rows.filter(j => j.title.toLowerCase().includes(search));
    if (status) rows = rows.filter(j => j.status === status);
    rows.sort((a,b)=> (a[sort] > b[sort] ? 1 : -1));

    const total = rows.length;
    const start = (page-1)*pageSize;
    const data = rows.slice(start, start + pageSize);
    return HttpResponse.json({ data, page, pageSize, total });
  })),

  // POST /jobs
  http.post('/jobs', async ({ request }) => withLatency(async () => {
    maybeFail(0.08);
    const body = await request.json();
    if (!body.title) return new HttpResponse('Title required', { status: 400 });

    const slug = body.slug || slugify(body.title);
    const exists = await db.jobs.where('slug').equals(slug).first();
    if (exists) return new HttpResponse('Slug must be unique', { status: 409 });

    const order = (await db.jobs.count()) + 1;
    const job = { id: crypto.randomUUID(), title: body.title, slug, status: 'active', tags: body.tags || [], order };
    await db.jobs.add(job);
    return HttpResponse.json(job, { status: 201 });
  })),

  // PATCH /jobs/:id
  http.patch('/jobs/:id', async ({ params, request }) => withLatency(async () => {
    maybeFail(0.08);
    const updates = await request.json();
    const id = params.id;
    const job = await db.jobs.get(id);
    if (!job) return new HttpResponse('Not found', { status: 404 });
    if (updates.slug) {
      const dup = await db.jobs.where('slug').equals(updates.slug).first();
      if (dup && dup.id !== id) return new HttpResponse('Slug must be unique', { status: 409 });
    }
    await db.jobs.update(id, updates);
    return HttpResponse.json({ ...job, ...updates });
  })),

  // PATCH /jobs/:id/reorder { fromOrder, toOrder }
  http.patch('/jobs/:id/reorder', async ({ request }) => withLatency(async () => {
    maybeFail(0.1); // occasionally 500 to test rollback
    const { fromOrder, toOrder } = await request.json();
    const rows = await db.jobs.orderBy('order').toArray();

    // shift orders
    const moving = rows.find(r => r.order === fromOrder);
    if (!moving) return new HttpResponse('Bad order', { status: 400 });

    rows.forEach(r => {
      if (fromOrder < toOrder) {
        if (r.order > fromOrder && r.order <= toOrder) r.order -= 1;
      } else if (fromOrder > toOrder) {
        if (r.order >= toOrder && r.order < fromOrder) r.order += 1;
      }
    });
    moving.order = toOrder;
    await db.jobs.bulkPut(rows);
    await db.jobs.put(moving);
    return new HttpResponse(null, { status: 204 });
  })),
];
