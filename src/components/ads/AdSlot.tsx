"use client";

interface AdSlotProps {
  className?: string;
  label?: string;
}

export function AdSlot({ className = "", label = "광고" }: AdSlotProps) {
  return (
    <div
      className={`bg-surface-muted border border-border rounded-lg text-center py-6 text-xs text-text-muted ${className}`}
    >
      {label}
    </div>
  );
}
