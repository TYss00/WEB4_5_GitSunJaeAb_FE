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
      ? 'bg-[var(--primary-300)] text-[var(--white)] rounded-[8px]'
      : buttonStyle === 'white'
      ? 'border border-[var(--primary-300)] text-[var(--primary-300)] bg-[var(--white)] rounded-[4px]'
      : buttonStyle === 'smGreen'
      ? 'border border-[var(--primary-300)] text-[var(--white)] bg-[var(--primary-300)] rounded-[4px]'
      : buttonStyle === 'withIcon'
      ? 'border border-[var(--gray-200)] text-[#000000] bg-[var(--white)] rounded-[8px]'
      : '';

  const fullWidthStyle = fullWidth ? 'w-full' : '';

  return (
    <button
      type={type}
      onClick={onClick}
      className={`${baseStyle} ${styleByType} ${fullWidthStyle} ${
        className ?? ''
      }`}
    >
      {icon && <span>{icon}</span>}
      {children}
    </button>
  );
}
