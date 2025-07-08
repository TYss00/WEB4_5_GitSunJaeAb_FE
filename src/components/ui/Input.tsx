'use client';

import { InputHTMLAttributes } from 'react';

interface InputProps extends InputHTMLAttributes<HTMLInputElement> {
  label?: string;
}

export default function Input({ label, className = '', ...props }: InputProps) {
  return (
    <div className="flex flex-col gap-1 w-full">
      {label && (
        <label className="block text-base text-[#222222]">{label}</label>
      )}
      <input
        className={`border border-[#9F9F9F] px-3 py-2 rounded-lg outline-none focus:border-[#005C54] focus:ring-1 focus:ring-[#005C54] placeholder:text-sm placeholder:text-[#9F9F9F] ${className}`}
        {...props}
      />
    </div>
  );
}
