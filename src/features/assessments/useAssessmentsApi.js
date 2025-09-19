import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import { api } from '../../api/http.js';

export function useAssessment(jobId) {
  return useQuery({
    queryKey: ['assessment', jobId],
    queryFn: () => api.get(`/assessments/${jobId}`),
    enabled: !!jobId
  });
}

export function useSaveAssessment(jobId) {
  const qc = useQueryClient();
  return useMutation({
    mutationFn: (schema) => api.put(`/assessments/${jobId}`, { schema }),
    onSuccess: () => qc.invalidateQueries({ queryKey: ['assessment', jobId] })
  });
}

export function useSubmitAssessment(jobId) {
  return useMutation({
    mutationFn: (payload) => api.post(`/assessments/${jobId}/submit`, payload),
  });
}
