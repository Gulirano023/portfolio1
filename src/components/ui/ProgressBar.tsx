import React from 'react';
import { cn } from '@/lib/utils';

interface ProgressBarProps {
  value: number;
  max?: number;
  className?: string;
  showLabel?: boolean;
  size?: 'sm' | 'md' | 'lg';
  color?: string;
}

export function ProgressBar({
  value,
  max = 100,
  className,
  showLabel = false,
  size = 'md',
  color,
}: ProgressBarProps) {
  const percentage = Math.min(Math.round((value / max) * 100), 100);
  const heightClass = size === 'sm' ? 'h-1.5' : size === 'lg' ? 'h-3' : 'h-2';

  return (
    <div className={cn('w-full', className)}>
      {showLabel && (
        <div className="flex justify-between items-center mb-1.5">
          <span className="text-xs text-ts-muted">{value}/{max}</span>
          <span className="text-xs font-medium text-ts-gold">{percentage}%</span>
        </div>
      )}
      <div className={cn('w-full rounded-full bg-white/[0.06] overflow-hidden', heightClass)}>
        <div
          className={cn('h-full rounded-full transition-all duration-500 ease-out')}
          style={{
            width: `${percentage}%`,
            backgroundColor: color || '#D4AF37',
          }}
        />
      </div>
    </div>
  );
}
