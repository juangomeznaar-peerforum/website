'use client';

import { Reveal } from './Reveal';
import { AnimatedCounter } from './AnimatedCounter';

type Stat = {
  value: string;
  label: string;
};

type StatBarProps = {
  stats: Stat[];
};

export function StatBar({ stats }: StatBarProps) {
  return (
    <section aria-label="Key Statistics" className="border-y border-[#D3DCD4] bg-[#F6F8F6]">
      <div className="max-w-7xl mx-auto grid grid-cols-2 md:grid-cols-4 divide-x divide-[#D3DCD4]">
        {stats.map((stat, idx) => (
          <Reveal key={idx} delay={idx * 150} direction="scale" className="p-10 text-center">
            <div className="font-serif text-4xl md:text-5xl font-medium text-[#225430] mb-2">
              <AnimatedCounter value={stat.value} delay={idx * 150} />
            </div>
            <div className="text-sm text-[#526656] font-medium uppercase tracking-wider">
              {stat.label}
            </div>
          </Reveal>
        ))}
      </div>
    </section>
  );
}
