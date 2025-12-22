interface LogoProps {
  className?: string;
  size?: 'sm' | 'md' | 'lg';
}

export function Logo({ className = '', size = 'md' }: LogoProps) {
  const sizes = {
    sm: 'h-8',
    md: 'h-12',
    lg: 'h-16',
  };

  return (
    <img 
      src="/tryfidelo.png" 
      alt="TryFidelo Logo" 
      className={`${sizes[size]} ${className}`}
    />
  );
}