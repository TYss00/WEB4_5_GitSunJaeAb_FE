'use client';

import { InputHTMLAttributes } from 'react';

interface InputProps extends InputHTMLAttributes<HTMLInputElement> {
  label?: string;
}

export default function Input({ label, className = '', ...props }: InputProps) {
  return (
    <div className="flex flex-col gap-1 w-full">
      {label && (
        <label className="block text-base text-[var(--black)]">{label}</label>
      )}
      <input
        className={`border border-[var(--gray-200)] px-3 py-2 rounded-lg outline-none focus:border-[var(--primary-300)] focus:ring-1 focus:ring-[var(--primary-300)] placeholder:text-sm placeholder:text-[var(--gray-200)] ${className}`}
        {...props}
      />
    </div>
  );
}
