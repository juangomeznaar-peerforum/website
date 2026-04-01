'use client';

import { X, CheckCircle2 } from 'lucide-react';
import { Reveal } from '@/components/Reveal';
import { Button } from '@/components/Button';

export function EducationClient() {
  return (
    <main className="fade-in pt-32 md:pt-48 pb-0 bg-[#F6F8F6]">
      <header className="px-6 md:px-12 max-w-4xl mx-auto text-center mb-32">
        <Reveal direction="down">
          <h2 className="text-[#225430] font-semibold tracking-widest text-xs uppercase mb-6">
            For Executive Education
          </h2>
          <h1 className="font-serif text-5xl md:text-7xl font-medium tracking-tight leading-[1.1] mb-8 text-[#0A1C12]">
            Sustain the momentum of{' '}
            <span className="italic text-[#526656]">executive education.</span>
          </h1>
          <p className="text-xl md:text-[22px] text-[#526656] font-light leading-relaxed mb-10">
            A 1-year continuity program that begins the moment your core program ends. Prevent
            post-program quick disengagement and establish the university as a lifelong strategic
            anchor for their career.
          </p>
          <Button variant="primary" className="text-base px-8 py-4" asLink href="/contact">
            Explore Continuity
          </Button>
        </Reveal>
      </header>

      {/* The Cliff Timeline */}
      <section
        aria-labelledby="education-challenge"
        className="px-6 md:px-12 py-32 bg-[#EBF0EC] border-y border-[#D3DCD4]"
      >
        <div className="max-w-7xl mx-auto">
          <Reveal direction="down" className="text-center mb-24">
            <h2
              id="education-challenge"
              className="text-[#225430] font-medium tracking-widest text-xs uppercase mb-4"
            >
              The Challenge
            </h2>
            <h3 className="font-serif text-4xl md:text-[44px] font-medium tracking-tight mb-6 text-[#0A1C12] leading-tight">
              The abrupt return to leadership.
            </h3>
            <p className="text-[#526656] text-lg font-light leading-relaxed max-w-3xl mx-auto">
              Executive education ignites transformative growth through deep learning and powerful
              connections. But the abrupt return to the demands of leadership often breaks this
              momentum, creating a gap where isolation can diminish the program&apos;s long-term impact.
            </p>
          </Reveal>

          <div className="relative">
            <div className="hidden md:block absolute top-6 left-12 right-12 h-[2px] bg-gradient-to-r from-[#0A1C12] via-[#D3DCD4] to-[#225430] z-0 shimmer"></div>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              <Reveal direction="up" delay={100} className="relative z-10 pt-10 text-center">
                <div className="w-4 h-4 bg-[#0A1C12] rounded-full mx-auto mb-6 absolute top-0 left-1/2 -translate-x-1/2 -translate-y-[7px]"></div>
                <h4 className="font-serif text-xl font-medium mb-3 text-[#0A1C12]">
                  Program Active
                </h4>
                <p className="text-[#526656] font-light text-sm leading-relaxed px-4">
                  Ignited growth. Participants are immersed, deeply connected, and driven by dynamic
                  peer learning.
                </p>
              </Reveal>

              <Reveal direction="up" delay={300} className="relative z-10 pt-10 text-center">
                <div className="w-4 h-4 bg-[#D3DCD4] border-2 border-[#0A1C12] rounded-full mx-auto mb-6 absolute top-0 left-1/2 -translate-x-1/2 -translate-y-[7px]"></div>
                <h4 className="font-serif text-xl font-medium mb-3 text-[#526656]">
                  Abrupt Isolation
                </h4>
                <p className="text-[#526656] font-light text-sm leading-relaxed px-4">
                  Back to the grind. Drowning in urgent tasks with no room to think. The vanishing
                  cohort effect takes over.
                </p>
              </Reveal>

              <Reveal direction="up" delay={500} className="relative z-10 pt-10 text-center">
                <div className="w-6 h-6 bg-[#225430] rounded-full mx-auto mb-6 absolute top-0 left-1/2 -translate-x-1/2 -translate-y-[11px] ring-4 ring-[#225430]/20"></div>
                <h4 className="font-serif text-xl font-medium mb-3 text-[#225430]">
                  1-Year Continuity Forum
                </h4>
                <p className="text-[#0A1C12] font-light text-sm leading-relaxed px-4">
                  Sustained momentum. A structured 1-year program keeps the bond alive and extends
                  the university-student relationship.
                </p>
              </Reveal>
            </div>
          </div>
        </div>
      </section>

      {/* Comparison Grid */}
      <section aria-labelledby="network-decay" className="px-6 md:px-12 py-32 max-w-7xl mx-auto">
        <Reveal direction="down" className="mb-16">
          <h2
            id="network-decay"
            className="text-[#225430] font-medium tracking-widest text-xs uppercase mb-4"
          >
            The Difference
          </h2>
          <h3 className="font-serif text-4xl md:text-[44px] font-medium tracking-tight mb-6 text-[#0A1C12] leading-tight">
            Don&apos;t let the network decay.
          </h3>
        </Reveal>

        <div className="grid md:grid-cols-2 gap-8">
          <Reveal
            direction="left"
            delay={100}
            className="bg-[#F6F8F6] border border-[#D3DCD4] p-10 rounded-2xl"
          >
            <h4 className="font-serif text-2xl text-[#526656] mb-8">Without Continuity</h4>
            <div className="space-y-6">
              {[
                'Lonely reality of driving change solo',
                'Diminishing bond with the university',
                'Missed opportunity for lasting impact',
              ].map((item, idx) => (
                <div
                  key={idx}
                  className="flex justify-between border-b border-[#D3DCD4] pb-4"
                >
                  <span className="text-[#526656] font-light">{item}</span>
                  <X size={18} className="text-red-800/60 shrink-0" />
                </div>
              ))}
            </div>
          </Reveal>
          <Reveal
            direction="right"
            delay={200}
            className="bg-[#0A1C12] border border-[#0A1C12] p-10 rounded-2xl shadow-xl"
          >
            <h4 className="font-serif text-2xl text-[#F6F8F6] mb-8">
              With 1-Year Continuity Forum
            </h4>
            <div className="space-y-6">
              {[
                'Dynamic, ongoing peer collaboration',
                'University remains their intellectual home',
                'Sustained ROI and continuous growth',
              ].map((item, idx) => (
                <div
                  key={idx}
                  className="flex justify-between border-b border-[#526656]/30 pb-4"
                >
                  <span className="text-[#D3DCD4] font-light">{item}</span>
                  <CheckCircle2 size={18} className="text-[#225430] shrink-0" />
                </div>
              ))}
            </div>
          </Reveal>
        </div>
      </section>
    </main>
  );
}
