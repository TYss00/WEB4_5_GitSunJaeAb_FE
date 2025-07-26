import axiosInstance from '@/libs/axios';
import { SearchRecord } from '@/types/search';

export async function getRecentSearches(): Promise<SearchRecord[]> {
  try {
    const res = await axiosInstance.get('/search/list');
    return res.data.searchHistoryDTOs || [];
  } catch (err) {
    console.error('최근 검색어 조회 실패:', err);
    return [];
  }
}

export async function addSearchTerm(term: string) {
  try {
    await axiosInstance.post('/search', { keyword: term });
  } catch (err) {
    console.error('검색어 저장 실패:', err);
  }
}

export async function removeSearchTerm(term: string) {
  try {
    await axiosInstance.delete('/search', {
      params: { keyword: term },
    });
  } catch (err) {
    console.error('검색어 삭제 실패:', err);
  }
}

export async function clearSearchHistory() {
  try {
    await axiosInstance.delete('/search/list');
  } catch (err) {
    console.error('전체 검색어 삭제 실패:', err);
  }
}
