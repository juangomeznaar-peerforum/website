'use client';

import Link from 'next/link';
import { ArrowRight, Users, BookOpen, Building } from 'lucide-react';
import { Reveal } from '@/components/Reveal';
import { Button } from '@/components/Button';
import { StatBar } from '@/components/StatBar';

export function HomeClient() {
  return (
    <main className="fade-in pt-32 md:pt-48 pb-0">
      {/* Hero */}
      <header className="px-6 md:px-12 max-w-5xl mx-auto text-center mb-32 md:mb-40">
        <Reveal direction="up">
          <h2 className="text-[#225430] font-semibold tracking-widest text-xs uppercase mb-6 flex items-center justify-center gap-3">
            <span className="w-6 h-[1px] bg-[#225430]"></span> Peer Coaching Groups at Scale{' '}
            <span className="w-6 h-[1px] bg-[#225430]"></span>
          </h2>
          <h1 className="font-serif text-5xl md:text-7xl lg:text-[84px] font-medium tracking-tight leading-[1.05] mb-8 text-[#0A1C12]">
            Scale peer groups.
            <br />
            <span className="italic text-[#526656]">Without the pain.</span>
          </h1>
          <p className="text-lg md:text-[22px] text-[#526656] font-light max-w-3xl mx-auto leading-relaxed mb-12 float-slow">
            Powered by the top 1% of facilitators. We design, operate, and run peer coaching groups
            for the world&apos;s most ambitious organizations.
          </p>
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
            <Button variant="primary" className="w-full sm:w-auto text-base px-8 py-4" asLink href="/contact">
              Talk to Us
            </Button>
            <Button variant="secondary" className="w-full sm:w-auto text-base px-8 py-4 border-[#D3DCD4]" asLink href="#how-it-works">
              See How It Works
            </Button>
          </div>
        </Reveal>
      </header>

      <StatBar
        stats={[
          { value: '50K+', label: 'Leaders in forums' },
          { value: '500+', label: 'Organizations served' },
          { value: '94%', label: 'Participant Satisfaction' },
          { value: '12x', label: 'More cost-effective than 1:1' },
        ]}
      />

      {/* The Problem / Solution Split */}
      <section aria-labelledby="challenge-heading" className="px-6 md:px-12 py-32 bg-[#F6F8F6]">
        <div className="max-w-7xl mx-auto grid lg:grid-cols-2 gap-20 items-center">
          <div>
            <Reveal direction="left">
              <h2
                id="challenge-heading"
                className="text-[#225430] font-medium tracking-widest text-xs uppercase mb-4"
              >
                The Challenge
              </h2>
              <h3 className="font-serif text-4xl md:text-[44px] font-medium tracking-tight mb-6 text-[#0A1C12] leading-tight">
                Peer groups work.
                <br />
                Scaling them doesn&apos;t.
              </h3>
              <p className="text-[#526656] text-lg font-light leading-relaxed mb-10">
                You know peer coaching groups create transformative outcomes. But running them at
                scale — the design, the matching, the facilitation, the operations — is a different
                challenge entirely.
              </p>
            </Reveal>
            <div className="space-y-8">
              {[
                {
                  title: 'Finding great facilitators is hard',
                  desc: 'Peer group facilitation is a specialized skill. Building a bench of qualified coaches takes years.',
                },
                {
                  title: 'Program design is complex',
                  desc: 'Group composition, session structure, cadence — getting the design right requires deep experience.',
                },
                {
                  title: 'Operations become overwhelming',
                  desc: 'Matching, scheduling, onboarding, tracking engagement — the logistics multiply exponentially.',
                },
                {
                  title: 'Quality drops as you grow',
                  desc: "What works for 5 groups falls apart at 50. Without a proven system, the personal touch disappears.",
                },
              ].map((pain, idx) => (
                <Reveal
                  key={idx}
                  direction="left"
                  delay={idx * 150}
                  className="border-l-[3px] border-[#225430] pl-6"
                >
                  <h4 className="font-serif text-xl font-medium mb-2 text-[#0A1C12]">
                    {pain.title}
                  </h4>
                  <p className="text-[#526656] font-light text-base leading-relaxed">{pain.desc}</p>
                </Reveal>
              ))}
            </div>
          </div>

          <Reveal direction="right" delay={200}>
            <div className="bg-[#0A1C12] text-[#F6F8F6] p-12 md:p-16 rounded-[2rem] shadow-xl elegant-hover">
              <h2 className="text-[#225430] font-semibold tracking-widest text-xs uppercase mb-6">
                The Peerforum Way
              </h2>
              <h3 className="font-serif text-3xl md:text-4xl font-medium tracking-tight mb-8 leading-tight">
                We don&apos;t give you a tool. We run your peer groups for you.
              </h3>
              <p className="text-[#D3DCD4] font-light text-lg leading-relaxed mb-6">
                Peerforum is a full-service provider of peer coaching groups at scale. We design the
                program, manage the operations, and facilitate every session with our own network of
                expert coaches.
              </p>
              <p className="text-[#D3DCD4] font-light text-lg leading-relaxed border-t border-[#526656]/30 pt-6">
                The result: a turnkey peer coaching program that scales from 5 groups to 500, with
                the same intimacy and impact in every room.
              </p>
            </div>
          </Reveal>
        </div>
      </section>

      {/* How It Works */}
      <section
        id="how-it-works"
        aria-labelledby="methodology-heading"
        className="px-6 md:px-12 py-32 bg-[#EBF0EC] border-y border-[#D3DCD4]"
      >
        <div className="max-w-7xl mx-auto">
          <Reveal direction="down" className="text-center mb-20 max-w-3xl mx-auto">
            <h2
              id="methodology-heading"
              className="text-[#225430] font-medium tracking-widest text-xs uppercase mb-4"
            >
              How It Works
            </h2>
            <h3 className="font-serif text-4xl md:text-[44px] font-medium tracking-tight mb-6 text-[#0A1C12] leading-tight">
              We design it. We run it. We facilitate it.
            </h3>
            <p className="text-[#526656] text-lg font-light leading-relaxed">
              From program architecture to facilitation, our team handles every layer of your peer
              coaching program.
            </p>
          </Reveal>

          <div className="grid md:grid-cols-3 gap-8">
            {[
              {
                num: '01',
                title: 'We design the program',
                desc: 'Our team architects your peer group model — group composition, session structure, facilitation methodology, and success metrics.',
              },
              {
                num: '02',
                title: 'We run the operations',
                desc: "Matching, scheduling, onboarding, and engagement tracking — our operations team manages the logistics so you don't have to.",
              },
              {
                num: '03',
                title: 'We facilitate every session',
                desc: 'Our network of expert facilitators leads every group with a proven methodology. Consistent quality, every session, at any scale.',
              },
            ].map((step, idx) => (
              <Reveal key={idx} delay={idx * 150} direction="up">
                <div className="bg-[#F6F8F6] border border-[#D3DCD4] p-10 rounded-[2rem] h-full elegant-hover">
                  <div className="font-serif text-5xl text-[#225430] opacity-20 mb-6 float-slow">
                    {step.num}
                  </div>
                  <h4 className="font-serif text-2xl font-medium mb-4 text-[#0A1C12]">
                    {step.title}
                  </h4>
                  <p className="text-[#526656] font-light leading-relaxed">{step.desc}</p>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* Our Facilitators Summary */}
      <section
        aria-labelledby="facilitators-heading"
        className="px-6 md:px-12 py-32 bg-[#0A1C12] text-[#F6F8F6]"
      >
        <div className="max-w-7xl mx-auto grid lg:grid-cols-12 gap-16 items-center">
          <div className="lg:col-span-5">
            <Reveal direction="left">
              <h2
                id="facilitators-heading"
                className="text-[#225430] font-medium tracking-widest text-xs uppercase mb-4"
              >
                Our Facilitators
              </h2>
              <h3 className="font-serif text-4xl md:text-[44px] font-medium tracking-tight mb-6 text-[#F6F8F6] leading-tight">
                Experts in group dynamics and coaching.
              </h3>
              <p className="text-[#D3DCD4] text-lg font-light leading-relaxed mb-8">
                We don&apos;t just provide moderators. Our global network consists of heavily vetted
                executive coaches and behavioral experts, trained specifically in the Peerforum
                methodology to extract maximum value from every session.
              </p>
              <Button variant="tertiary" className="px-8 py-4" asLink href="/facilitators">
                Meet the Network
              </Button>
            </Reveal>
          </div>
          <div className="lg:col-span-6 lg:col-start-7">
            <div className="grid sm:grid-cols-2 gap-6">
              {[
                {
                  title: 'Executive Pedigree',
                  desc: 'Former founders, C-suite leaders, and ICF-certified coaches who understand the weight of leadership.',
                },
                {
                  title: 'Masters of Friction',
                  desc: 'Trained to bypass small talk, manage dominant voices, and engineer productive vulnerability.',
                },
                {
                  title: 'Top 1% Acceptance',
                  desc: 'Our rigorous vetting process ensures only elite practitioners lead our client forums.',
                },
                {
                  title: 'Continuous Calibration',
                  desc: 'Facilitators receive ongoing supervision and quantitative feedback on group health.',
                },
              ].map((feat, idx) => (
                <Reveal
                  key={idx}
                  delay={idx * 150}
                  direction="right"
                  className="bg-[#0A1C12] border border-[#526656]/30 p-8 rounded-2xl elegant-hover hover:border-[#D3DCD4]/30 transition-colors"
                >
                  <h4 className="font-serif text-xl font-medium mb-3 text-[#F6F8F6]">
                    {feat.title}
                  </h4>
                  <p className="text-[#D3DCD4] font-light text-sm leading-relaxed">{feat.desc}</p>
                </Reveal>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Audiences */}
      <section aria-labelledby="audiences-heading" className="px-6 md:px-12 py-32 bg-[#F6F8F6]">
        <div className="max-w-7xl mx-auto">
          <Reveal direction="down" className="text-center mb-20">
            <h2
              id="audiences-heading"
              className="text-[#225430] font-medium tracking-widest text-xs uppercase mb-4"
            >
              Who We Serve
            </h2>
            <h3 className="font-serif text-4xl md:text-[44px] font-medium tracking-tight mb-6 text-[#0A1C12] leading-tight">
              Built for organizations that invest in people.
            </h3>
          </Reveal>

          <div className="grid md:grid-cols-3 gap-8">
            {[
              {
                title: 'Premium Communities',
                desc: 'Transform passive member networks into vibrant, engaged communities through facilitated forums.',
                route: '/solutions/community',
                icon: <Users size={24} />,
              },
              {
                title: 'Executive Education',
                desc: 'Sustain the momentum of your programs with a 1-year continuity forum that keeps alumni connected to their intellectual home.',
                route: '/solutions/education',
                icon: <BookOpen size={24} />,
              },
              {
                title: 'Enterprise Leadership',
                desc: 'Embed peer coaching into your leadership programs to democratize coaching, teach coaching skills, and build community.',
                route: '/solutions/enterprise',
                icon: <Building size={24} />,
              },
            ].map((card, idx) => (
              <Reveal key={idx} delay={idx * 150} direction="scale">
                <Link
                  href={card.route}
                  className="group cursor-pointer flex flex-col justify-between p-10 bg-[#F6F8F6] border border-[#D3DCD4] rounded-2xl elegant-hover h-full"
                >
                  <div>
                    <div className="w-12 h-12 bg-[#EBF0EC] rounded-full flex items-center justify-center text-[#225430] mb-8 float-slow">
                      {card.icon}
                    </div>
                    <h4 className="font-serif text-2xl font-medium mb-4 text-[#0A1C12]">
                      {card.title}
                    </h4>
                    <p className="text-[#526656] font-light leading-relaxed mb-8">{card.desc}</p>
                  </div>
                  <div className="flex items-center text-sm font-medium text-[#225430] group-hover:text-[#0A1C12] transition-colors mt-auto">
                    Explore Solutions{' '}
                    <ArrowRight
                      size={16}
                      className="ml-2 group-hover:translate-x-1 transition-transform"
                    />
                  </div>
                </Link>
              </Reveal>
            ))}
          </div>
        </div>
      </section>
    </main>
  );
}
