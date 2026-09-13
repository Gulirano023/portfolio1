import React from 'react';
import { cn } from '@/lib/utils';

type BadgeVariant = 'beginner' | 'intermediate' | 'advanced' | 'completed' | 'in_progress' | 'draft' | 'reviewed' | 'default';

interface BadgeProps {
  children: React.ReactNode;
  variant?: BadgeVariant;
  className?: string;
}

const variantStyles: Record<BadgeVariant, string> = {
  beginner: 'bg-emerald-500/10 text-emerald-400 border-emerald-500/20',
  intermediate: 'bg-blue-500/10 text-blue-400 border-blue-500/20',
  advanced: 'bg-purple-500/10 text-purple-400 border-purple-500/20',
  completed: 'bg-ts-gold/10 text-ts-gold border-ts-gold/20',
  in_progress: 'bg-amber-500/10 text-amber-400 border-amber-500/20',
  draft: 'bg-white/[0.06] text-ts-muted border-white/[0.08]',
  reviewed: 'bg-blue-500/10 text-blue-400 border-blue-500/20',
  default: 'bg-white/[0.06] text-ts-gray border-white/[0.08]',
};

export function Badge({ children, variant = 'default', className }: BadgeProps) {
  return (
    <span
      className={cn(
        'inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium border',
        variantStyles[variant],
        className
      )}
    >
      {children}
    </span>
  );
}
