import { ButtonProps } from '@/types/type';
import { twMerge } from 'tailwind-merge';

export default function Button({
  children,
  buttonStyle = 'green',
  fullWidth = false,
  icon,
  className,
  disabled,
  onClick,
  type = 'button',
}: ButtonProps) {
  const baseStyle =
    'inline-flex items-center justify-center font-medium transition-all px-[10px] py-[5px]';

  const styleByType =
    buttonStyle === 'green'
      ? 'bg-[var(--primary-300)] text-[var(--white)] rounded-lg cursor-pointer'
      : buttonStyle === 'white'
      ? 'border border-[var(--primary-300)] text-[var(--primary-300)] bg-[var(--white)] rounded cursor-pointer'
      : buttonStyle === 'smGreen'
      ? 'border border-[var(--primary-300)] text-[var(--white)] bg-[var(--primary-300)] rounded cursor-pointer'
      : buttonStyle === 'withIcon'
      ? 'border border-[var(--gray-200)] text-[var(--black)] bg-[var(--white)] rounded-lg cursor-pointer'
      : '';

  const fullWidthStyle = fullWidth ? 'w-full' : '';

  const disabledStyle =
    'bg-white text-[#9F9F9F] border border-[var(--primary-300)] cursor-not-allowed';

  return (
    <button
      type={type}
      onClick={onClick}
      disabled={disabled}
      className={twMerge(
        `${baseStyle} ${styleByType} ${fullWidthStyle} ${className}`,
        disabled && disabledStyle
      )}
    >
      {icon && <span>{icon}</span>}
      {children}
    </button>
  );
}
