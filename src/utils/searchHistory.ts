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

export async function removeSearchTerm(term: string): Promise<boolean> {
  try {
    const confirm = window.confirm(`'${term}' 검색어를 삭제하시겠습니까?`);
    if (!confirm) return false;

    await axiosInstance.delete('/search', {
      params: { keyword: term },
    });
    return true;
  } catch (err) {
    console.error('검색어 삭제 실패:', err);
    return false;
  }
}

export async function clearSearchHistory(): Promise<boolean> {
  try {
    const confirm = window.confirm('검색어를 모두 삭제하시겠습니까?');
    if (!confirm) return false;

    await axiosInstance.delete('/search/list');
    return true;
  } catch (err) {
    console.error('전체 검색어 삭제 실패:', err);
    return false;
  }
}
