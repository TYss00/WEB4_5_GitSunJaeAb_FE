import { twMerge } from 'tailwind-merge';

type ButtonProps = {
  children: React.ReactNode;
  buttonStyle?: 'green' | 'white' | 'withIcon' | 'smGreen';
  fullWidth?: boolean;
  icon?: React.ReactNode;
  className?: string;
  onClick?: () => void;
  type?: 'button' | 'submit' | 'reset';
};

export default function Button({
  children,
  buttonStyle = 'green',
  fullWidth = false,
  icon,
  className,
  onClick,
  type = 'button',
}: ButtonProps) {
  const baseStyle =
    'inline-flex items-center justify-center font-medium transition-all px-[10px] py-[5px]';

  const styleByType =
    buttonStyle === 'green'
      ? 'bg-[#005C54] text-[#FFFFFF] rounded-[8px]'
      : buttonStyle === 'white'
      ? 'border border-[#005C54] text-[#005C54] bg-[#FFFFFF] rounded-[4px]'
      : buttonStyle === 'smGreen'
      ? 'border border-[#005C54] text-[#FFFFFF] bg-[#005C54] rounded-[4px]'
      : buttonStyle === 'withIcon'
      ? 'border border-[#9F9F9F] text-[#000000] bg-[#FFFFFF] rounded-[8px]'
      : '';

  const fullWidthStyle = fullWidth ? 'w-full' : '';

  return (
    <button
      type={type}
      onClick={onClick}
      className={twMerge(
        `${baseStyle} ${styleByType} ${fullWidthStyle} ${className}`
      )}
    >
      {icon && <span>{icon}</span>}
      {children}
    </button>
  );
}
