import { useEffect } from 'react';

export function useClickOut<T extends HTMLElement>(
  ref: React.RefObject<T | null>,
  onClickOutside: () => void
) {
  useEffect(() => {
    const handleClick = (e: MouseEvent) => {
      // if (ref.current && !ref.current.contains(e.target as Node)) {
      //   onClickOutside();
      // }
      const target = e.target as HTMLElement;

      // 삭제 버튼은 외부 클릭으로 간주하지 않음
      if (
        ref.current &&
        !ref.current.contains(target) &&
        !target.closest('.recent-search-item')
      ) {
        onClickOutside();
      }
    };

    document.addEventListener('mousedown', handleClick);
    return () => document.removeEventListener('mousedown', handleClick);
  }, [ref, onClickOutside]);
}
