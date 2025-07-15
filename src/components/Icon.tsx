import { LucideIcon } from "lucide-react";

interface Props {
  icon: LucideIcon;
  className?: string;
  size?: number;
}

export default function Icon({ icon: IconCmp, className = "", size = 28 }: Props) {
  const sizeClass = size <= 16 ? 'w-4 h-4' : size <= 20 ? 'w-5 h-5' : size <= 24 ? 'w-6 h-6' : size <= 32 ? 'w-8 h-8' : 'w-10 h-10';
  
  return (
    <IconCmp 
      className={`shrink-0 text-primary dark:text-primary-400 ${sizeClass} ${className}`} 
      size={size} 
      strokeWidth={1.8}
      aria-hidden="true"
    />
  );
}