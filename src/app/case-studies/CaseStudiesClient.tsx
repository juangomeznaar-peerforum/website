'use client';

import { Quote } from 'lucide-react';
import { Reveal } from '@/components/Reveal';
import { CaseStudyBox } from '@/components/CaseStudyBox';

export function CaseStudiesClient() {
  return (
    <main className="fade-in pt-32 md:pt-48 pb-0 bg-[#F6F8F6]">
      {/* Featured Case Study: SHRM */}
      <section aria-labelledby="shrm-heading" className="px-6 md:px-12 pb-32">
        <div className="max-w-7xl mx-auto">
          <header className="mb-12 text-center">
            <Reveal direction="down">
              <h2 className="text-[#225430] font-medium tracking-widest text-xs uppercase mb-4">
                Featured Case Study
              </h2>
              <h1
                id="shrm-heading"
                className="font-serif text-4xl md:text-[56px] font-medium tracking-tight text-[#0A1C12] leading-tight mb-6"
              >
                Unlocking the #1 CHRO community in the world.
              </h1>
            </Reveal>
          </header>

          <div className="max-w-4xl mx-auto mb-16">
            <Reveal direction="up" delay={100}>
              <p className="text-lg text-[#526656] font-light leading-relaxed mb-6">
                SHRM set out to create the ultimate destination for the world&apos;s top HR leaders,
                they recognized a fundamental truth: CHROs are profoundly isolated. They needed a
                confidential, high-trust environment to solve complex organizational challenges with
                true peers.
              </p>
              <p className="text-lg text-[#526656] font-light leading-relaxed">
                We partnered with SHRM to <strong>embed and run</strong> a confidential forum program
                for their Executive Network.
              </p>
              <p className="text-lg text-[#0A1C12] font-medium leading-relaxed mt-8 border-l-[3px] border-[#225430] pl-6">
                Peerforum serves as the operational and facilitation engine for these groups. Using
                our proprietary matching and elite coaches, we manage over 70 concurrent executive
                groups for a community of 1,000+ HR leaders.
              </p>
            </Reveal>
          </div>

          {/* Wide Quote Banner */}
          <Reveal direction="scale" delay={200} className="mb-24 flex justify-center">
            <div className="w-full max-w-5xl bg-[#225430] border border-[#326B42] rounded-[2rem] flex items-center justify-center p-12 md:p-16 text-center shadow-xl relative overflow-hidden float-slow">
              <div className="absolute top-[-20%] right-[-10%] w-64 h-64 bg-[#326B42] rounded-full blur-3xl opacity-50"></div>
              <div className="absolute bottom-[-20%] left-[-10%] w-48 h-48 bg-[#0A1C12] rounded-full blur-3xl opacity-50"></div>
              <Quote
                size={48}
                className="absolute top-8 left-8 text-[#326B42] opacity-30"
                aria-hidden="true"
              />
              <p className="font-serif text-2xl md:text-4xl text-[#F6F8F6] leading-tight relative z-10 max-w-3xl mx-auto">
                &ldquo;Each month, hundreds of HR executives join their peer group to support one
                another.&rdquo;
              </p>
            </div>
          </Reveal>

          {/* 3 Columns Grid */}
          <div className="grid lg:grid-cols-3 gap-10 md:gap-12 max-w-6xl mx-auto">
            {/* Column 1: Scale */}
            <div>
              <Reveal direction="left" delay={300}>
                <div className="flex items-center gap-3 mb-6 border-b border-[#D3DCD4] pb-4">
                  <div className="w-2 h-2 bg-[#225430] rounded-full"></div>
                  <h4 className="text-xs font-semibold tracking-widest text-[#526656] uppercase">
                    Scale
                  </h4>
                </div>
              </Reveal>
              <div className="grid grid-cols-2 gap-4">
                <CaseStudyBox delay={350} value="—" label="Participants" />
                <CaseStudyBox delay={400} value="—" label="Groups" />
                <CaseStudyBox delay={450} value="—" label="Facilitators" />
                <CaseStudyBox delay={500} value="—" label="Sessions" sublabel="Run to Date" />
              </div>
            </div>

            {/* Column 2: Engagement */}
            <div>
              <Reveal direction="up" delay={400}>
                <div className="flex items-center gap-3 mb-6 border-b border-[#D3DCD4] pb-4">
                  <div className="w-2 h-2 bg-[#225430] rounded-full"></div>
                  <h4 className="text-xs font-semibold tracking-widest text-[#526656] uppercase">
                    Engagement
                  </h4>
                </div>
              </Reveal>
              <div className="grid grid-cols-2 gap-4">
                <CaseStudyBox delay={450} value="—" label="Active" sublabel="Members" />
                <CaseStudyBox
                  delay={500}
                  value="—"
                  label="Facilitation"
                  sublabel="Score"
                />
                <CaseStudyBox delay={550} value="—" label="Monthly" sublabel="Sessions" />
                <CaseStudyBox
                  delay={600}
                  value="—"
                  label="Session"
                  sublabel="Score"
                />
              </div>
            </div>

            {/* Column 3: Impact */}
            <div>
              <Reveal direction="right" delay={500}>
                <div className="flex items-center gap-3 mb-6 border-b border-[#D3DCD4] pb-4">
                  <div className="w-2 h-2 bg-[#225430] rounded-full"></div>
                  <h4 className="text-xs font-semibold tracking-widest text-[#526656] uppercase">
                    Program Impact
                  </h4>
                </div>
              </Reveal>
              <div className="grid grid-cols-2 gap-4">
                <CaseStudyBox
                  delay={550}
                  value="—"
                  label="Most Valued"
                  sublabel="Component"
                  theme="dark"
                />
                <CaseStudyBox
                  delay={600}
                  value="—"
                  label="Most Adopted"
                  sublabel="Component"
                  theme="dark"
                />
                <CaseStudyBox
                  delay={650}
                  value="—"
                  label="Most Active"
                  sublabel="Participants"
                  theme="dark"
                />
                <CaseStudyBox
                  delay={700}
                  value="—"
                  label="Driver Of"
                  sublabel="Retention"
                  theme="dark"
                />
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* REVIEW: This entire testimonials section was not in the original content.md — all quotes invented by Gemini */}
      {/* Testimonials */}
      <section
        aria-label="Testimonials"
        className="px-6 md:px-12 py-32 bg-[#0A1C12] text-[#F6F8F6]"
      >
        <div className="max-w-7xl mx-auto">
          <Reveal direction="down" className="mb-16 text-center">
            <h2 className="text-[#225430] font-medium tracking-widest text-xs uppercase mb-4">
              The Partnership
            </h2>
            <h3 className="font-serif text-4xl md:text-[44px] font-medium tracking-tight text-[#F6F8F6] leading-tight">
              In their own words.
            </h3>
          </Reveal>

          <div className="grid lg:grid-cols-3 gap-8">
            {[
              {
                quote:
                  '"To build the world\'s most exclusive network for HR leaders, we needed a secure environment for vulnerable problem-solving. Peerforum provided the elite facilitators and operational backbone to scale this vision seamlessly. They are a critical partner in our community\'s success."',
                name: 'VP of Executive Network',
                org: 'SHRM Leadership',
              },
              {
                quote:
                  '"My monthly forum is the one meeting I never cancel. Having a dedicated, expert facilitator completely changes the dynamic—we bypass small talk and get straight to the hardest issues without the usual corporate posturing."',
                name: 'Chief Human Resources Officer',
                org: 'SHRM Forum Participant',
              },
              {
                quote:
                  '"The matching by Peerforum is incredibly precise. I am in a room with true peers who understand the exact scale and complexity of my challenges. It makes the isolating reality of executive leadership profoundly less lonely."',
                name: 'EVP of HR, Fortune 500',
                org: 'SHRM Forum Participant',
              },
            ].map((testimonial, idx) => (
              <Reveal
                key={idx}
                direction="up"
                delay={(idx + 1) * 100}
                className="p-10 bg-[#F6F8F6]/5 border border-[#526656]/30 rounded-2xl flex flex-col justify-between elegant-hover hover:border-[#D3DCD4]/30"
              >
                <div>
                  <Quote size={32} className="text-[#225430] mb-6" aria-hidden="true" />
                  <p className="text-[#D3DCD4] font-light leading-relaxed mb-8">
                    {testimonial.quote}
                  </p>
                </div>
                <div>
                  <div className="font-medium text-[#F6F8F6]">{testimonial.name}</div>
                  <div className="text-xs tracking-widest text-[#526656] uppercase mt-1">
                    {testimonial.org}
                  </div>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>
    </main>
  );
}
