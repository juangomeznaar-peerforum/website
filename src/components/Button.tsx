import Link from 'next/link';

type ButtonProps = {
  children: React.ReactNode;
  variant?: 'primary' | 'secondary' | 'tertiary';
  className?: string;
  asLink?: boolean;
  href?: string;
} & React.ButtonHTMLAttributes<HTMLButtonElement>;

const baseStyle =
  'inline-flex items-center justify-center px-6 py-3 rounded-full font-medium transition-all duration-300 ease-out text-sm tracking-wide';

const variants = {
  primary:
    'bg-[#0A1C12] text-[#F6F8F6] hover:bg-[#225430] hover:scale-[1.02] shimmer border border-[#0A1C12]',
  secondary:
    'bg-transparent border border-[#0A1C12] text-[#0A1C12] hover:bg-[#0A1C12] hover:text-[#F6F8F6]',
  tertiary:
    'bg-[#F6F8F6] text-[#0A1C12] hover:bg-[#D3DCD4] hover:scale-[1.02] border border-[#F6F8F6]',
};

export function Button({
  children,
  variant = 'primary',
  className = '',
  asLink,
  href,
  ...props
}: ButtonProps) {
  const classes = `${baseStyle} ${variants[variant]} ${className}`;

  if (asLink && href) {
    return (
      <Link href={href} className={classes}>
        {children}
      </Link>
    );
  }

  return (
    <button
      className={classes}
      aria-label={typeof children === 'string' ? children : undefined}
      {...props}
    >
      {children}
    </button>
  );
}
