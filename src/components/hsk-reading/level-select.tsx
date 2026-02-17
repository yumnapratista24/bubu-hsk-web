'use client';

import { useTheme } from 'next-themes';

import type { HskLevel } from '@/lib/types/hsk';

interface LevelSelectProps {
  value: HskLevel;
  onChange: (value: string) => void;
}

export const LevelSelect = ({ value, onChange }: LevelSelectProps) => {
  const { resolvedTheme } = useTheme();
  const isDark = resolvedTheme === 'dark';

  return (
    <select
      onChange={(e) => onChange(e.target.value)}
      style={{
        width: '200px',
        padding: '8px 12px',
        borderRadius: '6px',
        border: `1px solid ${isDark ? '#475569' : '#cbd5e1'}`,
        backgroundColor: isDark ? '#1e293b' : 'white',
        color: isDark ? '#f8fafc' : '#0f172a',
        fontSize: '14px',
        cursor: 'pointer',
        outline: 'none',
        transition: 'border-color 0.2s',
      }}
      value={value}
    >
      {[1, 2, 3, 4].map((level) => (
        <option key={level} value={level}>
          HSK {level}
        </option>
      ))}
    </select>
  );
};
