import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import { api } from '../../api/http.js';

export function useCandidatesQuery(params) {
  const q = new URLSearchParams(params).toString();
  return useQuery({ queryKey: ['candidates', q], queryFn: () => api.get(`/candidates?${q}`) });
}

export function useCandidate(id) {
  return useQuery({ queryKey: ['candidate', id], queryFn: () => api.get(`/candidates/${id}`), enabled: !!id });
}

export function useTimeline(id) {
  return useQuery({ queryKey: ['timeline', id], queryFn: () => api.get(`/candidates/${id}/timeline`), enabled: !!id });
}

export function usePatchCandidate() {
  const qc = useQueryClient();
  return useMutation({
    mutationFn: ({ id, updates }) => api.patch(`/candidates/${id}`, updates),
    onSuccess: (_data, vars) => {
      qc.invalidateQueries({ queryKey: ['candidates'] });
      qc.invalidateQueries({ queryKey: ['candidate', vars.id] });
      qc.invalidateQueries({ queryKey: ['timeline', vars.id] });
    }
  });
}
