'use client';

import { X, CheckCircle2 } from 'lucide-react';
import { Reveal } from '@/components/Reveal';
import { Button } from '@/components/Button';

export function CommunityClient() {
  return (
    <main className="fade-in pt-32 md:pt-48 pb-0 bg-[#F6F8F6]">
      <header className="px-6 md:px-12 max-w-4xl mx-auto text-center mb-32">
        <Reveal direction="down">
          <h2 className="text-[#225430] font-semibold tracking-widest text-xs uppercase mb-6">
            For Premium Communities
          </h2>
          <h1 className="font-serif text-5xl md:text-7xl font-medium tracking-tight leading-[1.1] mb-8 text-[#0A1C12]">
            Forums are the key to{' '}
            <span className="italic text-[#526656]">community.</span>
          </h1>
          <p className="text-xl md:text-[22px] text-[#526656] font-light leading-relaxed mb-10">
            We design, operate, and facilitate peer forums that turn your casual members into a
            deeply bonded, thriving community.
          </p>
          <Button variant="primary" className="text-base px-8 py-4" asLink href="/contact">
            Build Your Community
          </Button>
        </Reveal>
      </header>

      {/* REVIEW: This partner networks banner section was not in the original content.md — entirely invented by Gemini */}
      {/* Top Networks Banner */}
      <section
        aria-label="Partner Networks"
        className="px-6 md:px-12 py-12 bg-[#EBF0EC] border-y border-[#D3DCD4] overflow-hidden"
      >
        <Reveal direction="up" className="max-w-7xl mx-auto text-center">
          <p className="text-sm font-semibold tracking-widest text-[#526656] uppercase mb-8">
            Every top-tier network uses forums as their core value proposition
          </p>
          <div className="flex flex-wrap justify-center items-center gap-8 md:gap-16 opacity-60 grayscale float-slow">
            {['YPO', 'Chief', 'Vistage', 'Hampton', 'Tiger 21', 'SHRM'].map((name) => (
              <span key={name} className="font-serif text-2xl font-bold text-[#0A1C12]">
                {name}
              </span>
            ))}
          </div>
        </Reveal>
      </section>

      {/* Before / After Contrast */}
      <section
        aria-label="Before and After Forums"
        className="px-6 md:px-12 py-24 bg-[#F6F8F6]"
      >
        <div className="max-w-7xl mx-auto grid md:grid-cols-2">
          <Reveal
            direction="left"
            className="bg-[#F6F8F6] p-12 md:p-16 border border-[#D3DCD4] rounded-t-3xl md:rounded-l-3xl md:rounded-tr-none shadow-sm"
          >
            <h2 className="text-[#526656] font-medium tracking-widest text-xs uppercase mb-4">
              Without Forums
            </h2>
            <h3 className="font-serif text-3xl font-medium text-[#0A1C12] mb-10">
              The typical community problem.
            </h3>
            <div className="space-y-8">
              {[
                {
                  title: 'Low engagement after launch',
                  desc: 'Members sign up, attend the first event, then quietly disappear. The community becomes a ghost town.',
                },
                {
                  title: 'Low willingness to pay',
                  desc: 'Members resist price increases because the exact ROI of the community is unquantifiable.',
                },
                {
                  title: 'Commodity perceived value',
                  desc: 'Seen as a collection of standard community touchpoints competing for a leader\'s limited attention.',
                },
              ].map((item, idx) => (
                <div key={idx}>
                  <h4 className="font-medium text-[#0A1C12] mb-2 flex items-center gap-2">
                    <X size={18} className="text-red-800/60" /> {item.title}
                  </h4>
                  <p className="text-[#526656] font-light text-sm leading-relaxed">{item.desc}</p>
                </div>
              ))}
            </div>
          </Reveal>

          <Reveal
            direction="right"
            delay={200}
            className="bg-[#0A1C12] p-12 md:p-16 border border-[#0A1C12] rounded-b-3xl md:rounded-r-3xl md:rounded-bl-none shadow-xl"
          >
            <h2 className="text-[#225430] font-medium tracking-widest text-xs uppercase mb-4">
              With Peerforum
            </h2>
            <h3 className="font-serif text-3xl font-medium text-[#F6F8F6] mb-10">
              The forum-driven community.
            </h3>
            <div className="space-y-8">
              {[
                {
                  title: 'High recurring engagement',
                  desc: "Our facilitators lead small groups that meet every month. It's a recurring rhythm that builds habit and belonging, and drives attendance to events and benefits utilization.",
                },
                {
                  title: 'High willingness to pay',
                  desc: 'Members recognize the high value of a confidential, facilitated forum, which leads to significantly higher willingness to pay.',
                },
                {
                  title: 'Indispensable perceived value',
                  desc: 'The forum acts as a personal Board of Advisors for career and life, establishing a continuous rhythm of engagement.',
                },
              ].map((item, idx) => (
                <div key={idx}>
                  <h4 className="font-medium text-[#F6F8F6] mb-2 flex items-center gap-2">
                    <CheckCircle2 size={18} className="text-[#225430]" /> {item.title}
                  </h4>
                  <p className="text-[#D3DCD4] font-light text-sm leading-relaxed">{item.desc}</p>
                </div>
              ))}
            </div>
          </Reveal>
        </div>
      </section>

      <section
        aria-labelledby="why-forums-work"
        className="px-6 md:px-12 py-32 max-w-7xl mx-auto"
      >
        <Reveal direction="down" className="mb-20">
          <h2
            id="why-forums-work"
            className="text-[#225430] font-medium tracking-widest text-xs uppercase mb-4"
          >
            Why Forums Work
          </h2>
          <h3 className="font-serif text-4xl md:text-[44px] font-medium tracking-tight mb-6 text-[#0A1C12] leading-tight">
            The forum model changes everything.
          </h3>
          <p className="text-[#526656] text-lg font-light leading-relaxed max-w-2xl">
            Forums aren&apos;t just another engagement tactic. They are a strategic pillar that
            provides a continuous rhythm of high-value support for members.
          </p>
        </Reveal>
        <div className="grid md:grid-cols-2 gap-8">
          {[
            {
              title: 'Scale without losing intimacy',
              desc: 'We design and facilitate hundreds of forums simultaneously while maintaining the small-group experience that makes each one transformative.',
            },
            {
              title: 'Create sustainable revenue',
              desc: 'Forums become a premium tier of your community — a high-value offering members are willing to pay for.',
            },
            {
              title: 'Amplify broader engagement',
              desc: 'Forum members engage more with the broader community too. They attend more events, contribute more content, and bring referrals.',
            },
            {
              title: 'Surface community intelligence',
              desc: 'See which topics resonate, which members are most engaged, and where your community is growing based on aggregate forum insights.',
            },
          ].map((val, idx) => (
            <Reveal
              key={idx}
              delay={idx * 150}
              direction="up"
              className="p-10 border border-[#D3DCD4] bg-[#F6F8F6] rounded-[2rem] elegant-hover"
            >
              <h4 className="font-serif text-2xl font-medium mb-4 text-[#0A1C12]">{val.title}</h4>
              <p className="text-[#526656] font-light leading-relaxed">{val.desc}</p>
            </Reveal>
          ))}
        </div>
      </section>
    </main>
  );
}
