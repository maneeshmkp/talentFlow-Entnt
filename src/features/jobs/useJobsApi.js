import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import { api } from '../../api/http.js';

export function useJobsQuery(params) {
  const q = new URLSearchParams(params).toString();
  return useQuery({ queryKey: ['jobs', q], queryFn: () => api.get(`/jobs?${q}`) });
}

export function useCreateJob() {
  const qc = useQueryClient();
  return useMutation({
    mutationFn: (payload) => api.post('/jobs', payload),
    onSuccess: () => qc.invalidateQueries({ queryKey: ['jobs'] }),
  });
}

export function usePatchJob() {
  const qc = useQueryClient();
  return useMutation({
    mutationFn: ({ id, updates }) => api.patch(`/jobs/${id}`, updates),
    onSuccess: () => qc.invalidateQueries({ queryKey: ['jobs'] }),
  });
}

export function useReorderJob() {
  const qc = useQueryClient();
  return useMutation({
    mutationFn: ({ id, fromOrder, toOrder }) => api.patch(`/jobs/${id}/reorder`, { fromOrder, toOrder }),
    onMutate: async ({ fromOrder, toOrder }) => {
      // optimistic: reorder in cache
      const keys = qc.getQueryCache().findAll({ queryKey: ['jobs'] }).map(q => q.queryKey);
      const prev = [];
      keys.forEach(k => {
        const data = qc.getQueryData(k);
        if (!data) return;
        prev.push([k, data]);
        const rows = [...data.data].sort((a,b)=>a.order-b.order);
        const moving = rows.find(r=>r.order===fromOrder);
        if (!moving) return;
        rows.forEach(r => {
          if (fromOrder < toOrder) {
            if (r.order > fromOrder && r.order <= toOrder) r.order -= 1;
          } else if (fromOrder > toOrder) {
            if (r.order >= toOrder && r.order < fromOrder) r.order += 1;
          }
        });
        moving.order = toOrder;
        qc.setQueryData(k, { ...data, data: rows });
      });
      return { prev };
    },
    onError: (_err, _vars, ctx) => {
      // rollback
      ctx?.prev?.forEach(([k, d]) => {
        qc.setQueryData(k, d);
      });
    },
    onSettled: () => {
      // ensure server state eventually wins
      qc.invalidateQueries({ queryKey: ['jobs'] });
    }
  });
}
