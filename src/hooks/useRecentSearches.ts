import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import axiosInstance from '@/libs/axios';
import { SearchRecord } from '@/types/search';

// 최근 검색어 조회
export function useRecentSearches() {
  return useQuery<SearchRecord[]>({
    queryKey: ['recentSearches'],
    queryFn: async () => {
      const res = await axiosInstance.get('/search/list');
      return res.data.searchHistoryDTOs || [];
    },
  });
}

// 검색어 추가
export function useAddSearchTerm() {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (term: string) =>
      axiosInstance.post('/search', { keyword: term }),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['recentSearches'] });
    },
    onError: (err) => {
      console.error('검색어 저장 실패:', err);
    },
  });
}

// 개별 검색어 삭제
export function useRemoveSearchTerm() {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: async (term: string) => {
      const confirm = window.confirm(`'${term}' 검색어를 삭제하시겠습니까?`);
      if (!confirm) throw new Error('취소됨');

      await axiosInstance.delete('/search', {
        params: { keyword: term },
      });
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['recentSearches'] });
    },
    onError: (err) => {
      console.error('검색어 삭제 실패:', err);
    },
  });
}

// 전체 삭제
export function useClearSearchHistory() {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: async () => {
      const confirm = window.confirm('검색어를 모두 삭제하시겠습니까?');
      if (!confirm) throw new Error('취소됨');

      await axiosInstance.delete('/search/list');
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['recentSearches'] });
    },
    onError: (err) => {
      console.error('전체 검색어 삭제 실패:', err);
    },
  });
}
