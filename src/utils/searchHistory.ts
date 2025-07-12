import { SearchRecord } from '@/types/type';

// 최근 검색어 관련 유틸
const STORAGE_KEY = 'recentSearches';

export function getRecentSearches(): SearchRecord[] {
  if (typeof window === 'undefined') return [];
  const stored = localStorage.getItem(STORAGE_KEY);
  return stored ? JSON.parse(stored) : [];
}

export function addSearchTerm(term: string) {
  const now = new Date();
  const formattedDate = `${String(now.getMonth() + 1).padStart(
    2,
    '0'
  )}.${String(now.getDate()).padStart(2, '0')}`;
  const current = getRecentSearches();
  const filtered = current.filter((item) => item.term !== term);

  const updated: SearchRecord[] = [
    { term, date: formattedDate },
    ...filtered,
  ].slice(0, 10);
  localStorage.setItem(STORAGE_KEY, JSON.stringify(updated));
}

export function removeSearchTerm(term: string) {
  const updated = getRecentSearches().filter((item) => item.term !== term);
  localStorage.setItem(STORAGE_KEY, JSON.stringify(updated));
}

export function clearSearchHistory() {
  localStorage.removeItem(STORAGE_KEY);
}
