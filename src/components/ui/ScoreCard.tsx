import React from 'react';
import { cn } from '@/lib/utils';
import { ProgressBar } from './ProgressBar';

interface ScoreCardProps {
  label: string;
  score: number;
  maxScore?: number;
  icon?: React.ReactNode;
  className?: string;
}

export function ScoreCard({ label, score, maxScore = 100, icon, className }: ScoreCardProps) {
  return (
    <div className={cn('glass-card p-4 card-hover', className)}>
      <div className="flex items-center gap-3 mb-3">
        {icon && (
          <div className="w-9 h-9 rounded-lg bg-ts-gold/10 flex items-center justify-center flex-shrink-0">
            {icon}
          </div>
        )}
        <div className="flex-1 min-w-0">
          <p className="text-xs text-ts-muted">{label}</p>
          <p className="text-xl font-bold text-white">{score}<span className="text-sm text-ts-muted font-normal">/{maxScore}</span></p>
        </div>
      </div>
      <ProgressBar value={score} max={maxScore} />
    </div>
  );
}
