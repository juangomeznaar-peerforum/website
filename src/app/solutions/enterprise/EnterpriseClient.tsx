'use client';

import { CheckCircle2 } from 'lucide-react';
import { Reveal } from '@/components/Reveal';
import { Button } from '@/components/Button';
import { AnimatedCounter } from '@/components/AnimatedCounter';

export function EnterpriseClient() {
  return (
    <main className="fade-in pt-32 md:pt-48 pb-0 bg-[#F6F8F6]">
      <header className="px-6 md:px-12 max-w-4xl mx-auto text-center mb-32">
        <Reveal direction="down">
          <h2 className="text-[#225430] font-semibold tracking-widest text-xs uppercase mb-6">
            For Enterprise
          </h2>
          <h1 className="font-serif text-5xl md:text-7xl font-medium tracking-tight leading-[1.1] mb-8 text-[#0A1C12]">
            Democratize coaching.{' '}
            <span className="italic text-[#526656]">Build community.</span>
          </h1>
          <p className="text-xl md:text-[22px] text-[#526656] font-light leading-relaxed mb-10">
            Embed facilitated peer coaching groups directly into your leadership programs. Transform
            leadership from an isolated challenge into a continuous, supported journey.
          </p>
          <Button variant="primary" className="text-base px-8 py-4" asLink href="/contact">
            Talk to Us
          </Button>
        </Reveal>
      </header>

      {/* Strong Claim */}
      <section
        aria-labelledby="strong-claim"
        className="px-6 md:px-12 py-24 bg-[#EBF0EC] border-y border-[#D3DCD4] text-center"
      >
        <Reveal direction="scale">
          <h2
            id="strong-claim"
            className="font-serif text-3xl md:text-5xl text-[#0A1C12] max-w-4xl mx-auto leading-tight float-slow"
          >
            Unlock collective wisdom:
            <br />
            <span className="italic text-[#225430]">
              Peer coaching turns shared challenges into accelerated leadership growth.
            </span>
          </h2>
        </Reveal>
      </section>

      {/* 1:1 vs Peer Coaching Comparison */}
      <section
        aria-labelledby="comparison-heading"
        className="px-6 md:px-12 py-32 max-w-7xl mx-auto"
      >
        <Reveal direction="down" className="mb-16">
          <h2
            id="comparison-heading"
            className="text-[#225430] font-medium tracking-widest text-xs uppercase mb-4"
          >
            The Comparison
          </h2>
          <h3 className="font-serif text-4xl md:text-[44px] font-medium tracking-tight mb-6 text-[#0A1C12] leading-tight">
            1:1 Coaching vs. Peer Coaching
          </h3>
        </Reveal>

        <div className="grid md:grid-cols-2 gap-8">
          <Reveal
            direction="left"
            delay={100}
            className="bg-[#F6F8F6] border border-[#D3DCD4] p-10 rounded-2xl"
          >
            <h4 className="font-serif text-2xl text-[#526656] mb-8">Traditional 1:1 Coaching</h4>
            <div className="space-y-6">
              {[
                {
                  category: 'Context',
                  text: 'Isolated and highly individual. Reinforces the lonely reality of driving change.',
                },
                {
                  category: 'Skill Building',
                  text: 'Theoretical discussion about how to lead others.',
                },
                {
                  category: 'Organizational Impact',
                  text: 'Individual growth only. Zero cross-functional visibility.',
                },
                {
                  category: 'Scalability',
                  text: 'Prohibitively expensive. Reserved strictly for the top 1% (C-Suite).',
                },
              ].map((item, idx) => (
                <div key={idx} className="flex flex-col border-b border-[#D3DCD4] pb-4">
                  <span className="text-sm font-semibold uppercase tracking-wider text-[#526656] mb-1">
                    {item.category}
                  </span>
                  <span className="font-medium text-[#0A1C12]">{item.text}</span>
                </div>
              ))}
            </div>
          </Reveal>
          <Reveal
            direction="right"
            delay={200}
            className="bg-[#0A1C12] border border-[#0A1C12] p-10 rounded-2xl shadow-xl"
          >
            <h4 className="font-serif text-2xl text-[#F6F8F6] mb-8">Peerforum Peer Coaching</h4>
            <div className="space-y-6">
              {[
                {
                  category: 'Context',
                  text: 'Togetherness. A shared journey with peers facing the exact same organizational fires.',
                },
                {
                  category: 'Skill Building',
                  text: 'Active practice. Leaders learn how to coach by actively coaching their peers.',
                },
                {
                  category: 'Organizational Impact',
                  text: 'Organically dissolves silos and builds deep, cross-functional empathy.',
                },
                {
                  category: 'Scalability',
                  text: 'Democratized. Highly scalable across thousands of middle managers and rising leaders.',
                },
              ].map((item, idx) => (
                <div key={idx} className="flex flex-col border-b border-[#526656]/30 pb-4">
                  <span className="text-sm font-semibold uppercase tracking-wider text-[#225430] mb-1">
                    {item.category}
                  </span>
                  <span className="font-medium text-[#D3DCD4]">{item.text}</span>
                </div>
              ))}
            </div>
          </Reveal>
        </div>
      </section>

      {/* Outcomes & Journey */}
      <section
        aria-labelledby="continuous-support-heading"
        className="px-6 md:px-12 py-32 bg-[#EBF0EC] border-y border-[#D3DCD4]"
      >
        <div className="max-w-7xl mx-auto">
          <div className="grid lg:grid-cols-2 gap-20">
            <div>
              <Reveal direction="left">
                <h2
                  id="continuous-support-heading"
                  className="text-[#225430] font-medium tracking-widest text-xs uppercase mb-4"
                >
                  Continuous Support
                </h2>
                <h3 className="font-serif text-3xl md:text-[36px] font-medium tracking-tight mb-8 text-[#0A1C12] leading-tight">
                  Embed a 12-touchpoint rhythm.
                </h3>
                <p className="text-[#526656] text-lg font-light leading-relaxed mb-10">
                  Drop peer coaching directly into your existing leadership tracks. Instead of
                  episodic seminars, leaders get a continuous rhythm of shared problem-solving and
                  mutual accountability.
                </p>
              </Reveal>
              <div className="grid grid-cols-2 gap-8">
                <Reveal direction="up" delay={100}>
                  <div className="font-serif text-4xl text-[#225430] mb-2">
                    <AnimatedCounter value="12" />
                  </div>
                  <p className="text-sm text-[#526656] font-medium leading-relaxed">
                    Continuous monthly touchpoints
                  </p>
                </Reveal>
                <Reveal direction="up" delay={200}>
                  <div className="font-serif text-4xl text-[#225430] mb-2">Deep</div>
                  <p className="text-sm text-[#526656] font-medium leading-relaxed">
                    Community and cultural glue built
                  </p>
                </Reveal>
                <Reveal direction="up" delay={300}>
                  <div className="font-serif text-4xl text-[#225430] mb-2">Active</div>
                  <p className="text-sm text-[#526656] font-medium leading-relaxed">
                    Coaching skills learned through practice
                  </p>
                </Reveal>
                <Reveal direction="up" delay={400}>
                  <div className="font-serif text-4xl text-[#225430] mb-2">Cross</div>
                  <p className="text-sm text-[#526656] font-medium leading-relaxed">
                    Functional silos organically dissolved
                  </p>
                </Reveal>
              </div>
            </div>

            <div className="bg-[#F6F8F6] border border-[#D3DCD4] p-10 rounded-3xl">
              <Reveal direction="right">
                <h3 className="font-serif text-2xl font-medium mb-8 text-[#0A1C12]">
                  How we integrate with your programs.
                </h3>
                <div className="space-y-8">
                  {[
                    {
                      num: '1',
                      title: 'Align with Curriculum',
                      desc: 'We map our peer forum architecture directly to the themes and milestones of your existing L&D tracks.',
                      dark: false,
                    },
                    {
                      num: '2',
                      title: 'Expert Facilitation',
                      desc: 'Our elite coaches step in to run the 12 touchpoints, ensuring high-quality, vulnerability-driven dialogue.',
                      dark: false,
                    },
                    {
                      num: '3',
                      title: 'Skill Transfer',
                      desc: 'Through guided observation and practice, your leaders actively learn how to coach their own teams.',
                      dark: true,
                    },
                  ].map((step) => (
                    <div key={step.num} className="flex gap-4">
                      <div
                        className={`w-8 h-8 rounded-full flex items-center justify-center text-sm font-serif shrink-0 ${
                          step.dark
                            ? 'bg-[#0A1C12] text-[#F6F8F6] shadow-sm'
                            : 'bg-[#EBF0EC] text-[#526656]'
                        }`}
                      >
                        {step.num}
                      </div>
                      <div>
                        <h4 className="font-medium text-[#0A1C12] mb-1">{step.title}</h4>
                        <p className="text-sm text-[#526656] font-light leading-relaxed">
                          {step.desc}
                        </p>
                      </div>
                    </div>
                  ))}
                </div>
              </Reveal>
            </div>
          </div>
        </div>
      </section>
    </main>
  );
}
