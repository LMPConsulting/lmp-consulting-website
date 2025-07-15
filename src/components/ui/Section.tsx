import { forwardRef } from 'react';
import { cn } from '../../lib/utils';

interface SectionProps extends React.HTMLAttributes<HTMLElement> {
  size?: 'sm' | 'md' | 'lg';
  variant?: 'default' | 'muted' | 'accent';
}

const Section = forwardRef<HTMLElement, SectionProps>(
  ({ className, size = 'md', variant = 'default', ...props }, ref) => {
    const sizeClasses = {
      sm: 'py-12 lg:py-16',
      md: 'py-16 lg:py-24', 
      lg: 'py-20 lg:py-32'
    };

    const variantClasses = {
      default: 'bg-background',
      muted: 'bg-gray-50 dark:bg-gray-900/50',
      accent: 'bg-gradient-to-br from-primary to-primary-700 text-primary-foreground'
    };

    return (
      <section
        ref={ref}
        className={cn(
          sizeClasses[size],
          variantClasses[variant],
          className
        )}
        {...props}
      />
    );
  }
);

Section.displayName = 'Section';

export { Section };