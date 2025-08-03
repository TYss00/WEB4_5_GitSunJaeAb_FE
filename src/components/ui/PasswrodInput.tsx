'use client';

import { useState } from 'react';
import { Eye, EyeOff } from 'lucide-react';
import Input from '../ui/Input';
import { PasswordInputProps } from '@/types/type';

export default function PasswordInput({
  label = '비밀번호',
  placeholder = '비밀번호를 입력하세요',
  className = '',
  name = 'password',
  value,
  onChange,
}: PasswordInputProps) {
  const [visible, setVisible] = useState(false);
  const toggle = () => setVisible((prev) => !prev);

  return (
    <div className="relative">
      <Input
        label={label}
        type={visible ? 'text' : 'password'}
        placeholder={placeholder}
        className={`pr-10 ${className}`}
        name={name}
        value={value}
        onChange={onChange}
      />
      <button
        type="button"
        onClick={toggle}
        className="absolute right-3 bottom-3 text-[var(--primary-300)]"
      >
        {visible ? <Eye size={20} /> : <EyeOff size={20} />}
      </button>
    </div>
  );
}
