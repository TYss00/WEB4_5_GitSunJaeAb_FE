import { formatDistanceToNow } from 'date-fns';
import { ko } from 'date-fns/locale';

export const formatDate = (iso: string) => {
  const date = new Date(iso);
  return (
    date
      .toLocaleDateString('ko-KR', {
        year: 'numeric',
        month: '2-digit',
        day: '2-digit',
      })
      .replace(/\. /g, '. ')
      // 맨 끝 마침표만 제거
      .replace(/\.$/, '')
  );
};

export const formatRelativeTime = (date: string | Date) =>
  formatDistanceToNow(new Date(date), {
    addSuffix: true,
    locale: ko,
  });
