'use client';

import { Reveal } from '@/components/Reveal';
import { Button } from '@/components/Button';
import { AnimatedCounter } from '@/components/AnimatedCounter';

const flagshipStats = [
  { value: '70+', label: 'Concurrent peer groups' },
  { value: '1,000+', label: 'Senior HR leaders served' },
  { value: '12', label: 'Sessions per year, per group' },
  { value: '9.2', label: 'Avg. facilitation score' },
];

const engagements = [
  {
    type: 'Executive Education',
    org: 'Global Entrepreneurship Network',
    detail:
      'A leading global entrepreneurship platform sought to sustain peer connections among alumni of its flagship scaleup program. We designed and facilitated post-program peer forums that kept founders connected, accountable, and actively supporting each other\u2019s growth beyond the formal curriculum.',
    tags: ['Post-Program Continuity', 'Founder Peer Groups', 'Alumni Engagement'],
  },
  {
    type: 'Enterprise',
    org: 'High-Growth Technology Companies',
    detail:
      'Fast-scaling Latin American technology companies embedded peer coaching groups into their leadership development programs — giving senior leaders a recurring, confidential space to navigate the unique challenges of hypergrowth, from scaling culture to managing through organizational ambiguity.',
    tags: ['Leadership Development', 'Hypergrowth Context', 'Cross-Functional Cohorts'],
  },
  {
    type: 'Enterprise',
    org: 'Leading Financial Institution',
    detail:
      'A major financial institution launched facilitated peer forums exclusively for women in senior leadership — creating a confidential, recurring space to navigate the distinct challenges of executive visibility, sponsorship, and organizational influence in a traditionally male-dominated industry.',
    tags: ['Women in Leadership', 'Financial Services', 'Executive Development'],
  },
];

const aggregateStats = [
  { value: '9.2', label: 'Perceived value', sublabel: '(out of 10)' },
  { value: '9.4', label: 'Facilitation quality', sublabel: '(out of 10)' },
  { value: '97%', label: 'Would recommend', sublabel: 'to a peer' },
  { value: '3%', label: 'Facilitator', sublabel: 'acceptance rate' },
];

export function ImpactClient() {
  return (
    <main className="fade-in pt-32 md:pt-48 pb-0 bg-[#F6F8F6]">
      {/* Hero */}
      <section aria-label="Our Impact Hero" className="px-6 md:px-12 pb-10 md:pb-14 text-center">
        <div className="max-w-4xl mx-auto">
          <Reveal direction="down">
            <p className="text-[#225430] uppercase text-xs tracking-widest font-medium mb-5 flex items-center justify-center gap-3">
              <span className="w-6 h-[1px] bg-[#225430]"></span> Our Impact{' '}
              <span className="w-6 h-[1px] bg-[#225430]"></span>
            </p>
          </Reveal>
          <Reveal direction="down" delay={100}>
            <h1 className="font-serif text-[clamp(32px,4.5vw,52px)] font-medium tracking-tight leading-[1.15] mb-6 text-[#0A1C12]">
              Where peer coaching becomes infrastructure.
            </h1>
          </Reveal>
          <Reveal direction="down" delay={200}>
            <p className="text-[#526656] text-lg leading-relaxed max-w-[620px] mx-auto font-light">
              We partner with organizations that treat leadership development as a strategic
              investment — not a perk. Here&apos;s what that looks like.
            </p>
          </Reveal>
        </div>
      </section>

      {/* Flagship Partnership */}
      <section aria-label="Featured Partnership" className="px-6 md:px-12 pb-20 md:pb-24">
        <div className="max-w-[900px] mx-auto">
          <Reveal direction="up">
            <div className="bg-[#FAFAFA] border border-[#D3DCD4] rounded-[2rem] p-8 md:p-12 lg:p-16">
              <span className="inline-block text-xs font-semibold tracking-wide uppercase text-[#526656] bg-[#EBF0EC] px-3.5 py-1.5 rounded-full mb-7">
                Featured Partnership
              </span>
              <h2 className="font-serif text-3xl md:text-4xl lg:text-[40px] font-medium leading-[1.2] mb-5 text-[#0A1C12]">
                Powering the #1 CHRO community in the world.
              </h2>
              <p className="text-[17px] text-[#526656] leading-[1.75] mb-4 max-w-[680px] font-light">
                SHRM set out to build the definitive peer experience for senior HR leaders. They
                needed more than content and events — they needed a confidential, high-trust
                environment where CHROs could solve complex organizational challenges with true
                peers, at scale.
              </p>
              <p className="text-[17px] text-[#526656] leading-[1.75] mb-9 max-w-[680px] font-light">
                We designed and now operate the full peer forum program for SHRM&apos;s Executive
                Network — from group composition and matching to facilitation and ongoing
                optimization. Every month, hundreds of HR executives join their peer group for
                facilitated, high-signal dialogue.
              </p>

              {/* Stats Grid */}
              <div className="grid grid-cols-2 md:grid-cols-4 gap-6 pt-9 border-t border-[#D3DCD4]">
                {flagshipStats.map((stat, idx) => (
                  <Reveal key={idx} delay={idx * 100} direction="up">
                    <div>
                      <div className="font-serif text-4xl text-[#0A1C12] leading-[1.1] mb-1.5">
                        <AnimatedCounter value={stat.value} delay={idx * 100} />
                      </div>
                      <div className="text-sm text-[#526656] leading-snug">{stat.label}</div>
                    </div>
                  </Reveal>
                ))}
              </div>

              {/* Quote */}
              <div className="mt-9 pt-9 border-t border-[#D3DCD4]">
                <blockquote className="font-serif text-[22px] font-normal leading-[1.5] text-[#0A1C12] italic">
                  &ldquo;Each month, hundreds of HR executives join their peer group to support one
                  another.&rdquo;
                </blockquote>
                <p className="mt-3 text-sm text-[#526656]">— SHRM Executive Network</p>
              </div>
            </div>
          </Reveal>
        </div>
      </section>

      {/* Select Engagements */}
      <section aria-label="Select Engagements" className="px-6 md:px-12 pb-24 md:pb-32">
        <div className="max-w-[900px] mx-auto">
          <Reveal direction="down" className="text-center mb-12">
            <h2 className="font-serif text-3xl md:text-[32px] font-medium mb-3 text-[#0A1C12]">
              Select Engagements
            </h2>
            <p className="text-base text-[#526656] max-w-[520px] mx-auto font-light">
              A sample of our work across communities, executive education, and enterprise
              leadership.
            </p>
          </Reveal>

          <div className="flex flex-col gap-5">
            {engagements.map((engagement, idx) => (
              <Reveal key={idx} delay={idx * 150} direction="up">
                <div className="bg-[#FAFAFA] border border-[#D3DCD4] rounded-xl p-7 md:p-10 grid grid-cols-1 sm:grid-cols-[200px_1fr] gap-4 sm:gap-8 items-start">
                  <div className="flex flex-col gap-2">
                    <span className="inline-block self-start text-xs font-semibold tracking-wide uppercase text-[#526656] bg-[#EBF0EC] px-2.5 py-1 rounded-full">
                      {engagement.type}
                    </span>
                    <span className="font-serif text-lg text-[#0A1C12] leading-tight">
                      {engagement.org}
                    </span>
                  </div>
                  <div>
                    <p className="text-base text-[#526656] leading-[1.7] font-light">
                      {engagement.detail}
                    </p>
                    <div className="flex flex-wrap gap-2 mt-3">
                      {engagement.tags.map((tag) => (
                        <span
                          key={tag}
                          className="text-xs font-medium text-[#526656] bg-[#EBF0EC] px-2.5 py-1 rounded-full"
                        >
                          {tag}
                        </span>
                      ))}
                    </div>
                  </div>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* Aggregate Stats */}
      <section
        aria-label="Aggregate Statistics"
        className="px-6 md:px-12 py-16 md:py-24 border-t border-[#D3DCD4] text-center"
      >
        <div className="max-w-[700px] mx-auto">
          <Reveal direction="down">
            <p className="text-sm font-semibold tracking-widest uppercase text-[#526656] mb-10">
              Across All Engagements
            </p>
          </Reveal>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
            {aggregateStats.map((stat, idx) => (
              <Reveal key={idx} delay={idx * 100} direction="up">
                <div className="text-center">
                  <div className="font-serif text-[42px] text-[#0A1C12] leading-[1.1] mb-1.5">
                    <AnimatedCounter value={stat.value} delay={idx * 100} />
                  </div>
                  <div className="text-sm text-[#526656] leading-snug">
                    {stat.label}
                    <br />
                    {stat.sublabel}
                  </div>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section aria-label="Call to Action" className="px-6 md:px-12 py-20 border-t border-[#D3DCD4] text-center">
        <div className="max-w-4xl mx-auto">
          <Reveal direction="down">
            <h2 className="font-serif text-3xl md:text-4xl lg:text-[40px] font-medium mb-4 text-[#0A1C12]">
              Scale your peer groups.
            </h2>
          </Reveal>
          <Reveal direction="down" delay={100}>
            <p className="text-[17px] text-[#526656] mb-8 font-light">
              Full-service peer coaching groups at scale. We design, operate, and facilitate.
            </p>
          </Reveal>
          <Reveal direction="up" delay={200}>
            <Button variant="primary" className="px-8 py-3.5 text-[15px]" asLink href="/contact">
              Talk to Us
            </Button>
          </Reveal>
        </div>
      </section>
    </main>
  );
}
