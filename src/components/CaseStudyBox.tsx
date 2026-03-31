'use client';

import { Reveal } from './Reveal';
import { AnimatedCounter } from './AnimatedCounter';

type CaseStudyBoxProps = {
  delay: number;
  value: string;
  suffix?: string;
  label: string;
  sublabel?: string;
  theme?: 'light' | 'dark';
};

export function CaseStudyBox({
  delay,
  value,
  suffix,
  label,
  sublabel,
  theme = 'light',
}: CaseStudyBoxProps) {
  const isDark = theme === 'dark';
  return (
    <Reveal
      delay={delay}
      direction="up"
      className={`p-6 rounded-2xl shadow-sm text-center flex flex-col items-center justify-center min-h-[140px] elegant-hover transition-colors ${
        isDark
          ? 'bg-[#225430] border border-[#326B42] hover:bg-[#0A1C12]'
          : 'bg-[#FAFAFA] border border-[#D3DCD4] hover:bg-[#EBF0EC]'
      }`}
    >
      <div
        className={`font-serif text-3xl md:text-4xl mb-2 flex items-baseline justify-center ${
          isDark ? 'text-[#F6F8F6]' : 'text-[#225430]'
        }`}
      >
        <AnimatedCounter value={value} />
        {suffix && (
          <span
            className={`text-sm ml-1 opacity-80 ${isDark ? 'text-[#D3DCD4]' : 'text-[#526656]'}`}
          >
            {suffix}
          </span>
        )}
      </div>
      <div
        className={`text-[10px] font-bold uppercase tracking-wider ${
          isDark ? 'text-[#D3DCD4]' : 'text-[#0A1C12]'
        }`}
      >
        {label}
      </div>
      {sublabel && (
        <div
          className={`text-[10px] font-bold uppercase tracking-wider mt-1 ${
            isDark ? 'text-[#D3DCD4]/70' : 'text-[#526656]'
          }`}
        >
          {sublabel}
        </div>
      )}
    </Reveal>
  );
}
