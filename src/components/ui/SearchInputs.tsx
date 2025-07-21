'use client';

import { Search } from 'lucide-react';
import Input from './Input';
import { SearchInputProps } from '@/types/type';

export default function SearchInputs({
  value,
  onChange,
  placeholder = '검색어를 입력해주세요',
  className = '',
  inputClassName = '',
}: SearchInputProps & { inputClassName?: string }) {
  return (
    <div className={`relative ${className}`}>
      <Input
        className={`w-full pr-10 ${inputClassName}`}
        placeholder={placeholder}
        value={value}
        onChange={onChange}
      />
      <Search
        size={16}
        strokeWidth={3}
        className="absolute right-3 top-1/2 -translate-y-1/2 text-[var(--gray-20)]"
      />
    </div>
  );
}
