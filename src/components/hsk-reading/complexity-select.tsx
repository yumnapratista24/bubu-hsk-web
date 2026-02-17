'use client';

import { useTheme } from 'next-themes';

import type { Complexity, HskLevel } from '@/lib/types/hsk';

interface ComplexitySelectProps {
  value: Complexity;
  onChange: (value: Complexity) => void;
  hskLevel: HskLevel;
}

const COMPLEXITY_OPTIONS = [
  { value: 1 as Complexity, label: 'Simple' },
  { value: 2 as Complexity, label: 'Medium' },
  { value: 3 as Complexity, label: 'Complex' },
];

export const ComplexitySelect = ({
  value,
  onChange,
  hskLevel,
}: ComplexitySelectProps) => {
  const { resolvedTheme } = useTheme();
  const isDark = resolvedTheme === 'dark';

  const availableOptions =
    hskLevel === 1
      ? COMPLEXITY_OPTIONS.filter((opt) => opt.value !== 3)
      : COMPLEXITY_OPTIONS;

  return (
    <select
      onChange={(e) => onChange(Number(e.target.value) as Complexity)}
      style={{
        padding: '6px 10px',
        borderRadius: '6px',
        border: `1px solid ${isDark ? '#475569' : '#cbd5e1'}`,
        backgroundColor: isDark ? '#1e293b' : 'white',
        color: isDark ? '#f8fafc' : '#0f172a',
        fontSize: '13px',
        cursor: 'pointer',
        outline: 'none',
        transition: 'border-color 0.2s',
      }}
      value={value}
    >
      {availableOptions.map((option) => (
        <option key={option.value} value={option.value}>
          {option.label}
        </option>
      ))}
    </select>
  );
};
