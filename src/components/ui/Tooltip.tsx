import React, { useState, useRef } from 'react';

interface TooltipProps {
  content: React.ReactNode;
  children: React.ReactNode;
}

export function Tooltip({ content, children }: TooltipProps) {
  const [open, setOpen] = useState(false);
  const timeout = useRef<NodeJS.Timeout | null>(null);

  return (
    <span
      className="relative inline-block"
      onMouseEnter={() => {
        timeout.current = setTimeout(() => setOpen(true), 80);
      }}
      onMouseLeave={() => {
        if (timeout.current) clearTimeout(timeout.current);
        setOpen(false);
      }}
      onFocus={() => setOpen(true)}
      onBlur={() => setOpen(false)}
      tabIndex={0}
    >
      {children}
      {open && (
        <span className="absolute left-1/2 -translate-x-1/2 -top-2 z-50 mb-2 px-3 py-1 rounded-lg bg-gray-900 text-white text-xs shadow-lg whitespace-nowrap pointer-events-none animate-fade-in">
          {content}
        </span>
      )}
    </span>
  );
} 