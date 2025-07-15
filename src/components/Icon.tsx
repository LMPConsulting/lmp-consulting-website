import { LucideIcon } from "lucide-react";

interface Props {
  icon: LucideIcon;
  className?: string;
  size?: number;
}

export default function Icon({ icon: IconCmp, className = "", size = 28 }: Props) {
  return (
    <IconCmp 
      className={`shrink-0 text-primary dark:text-primary-400 ${className}`} 
      size={size} 
      strokeWidth={1.8}
      aria-hidden="true"
    />
  );
}