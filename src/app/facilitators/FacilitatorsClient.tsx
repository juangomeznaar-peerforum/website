'use client';

import { Reveal } from '@/components/Reveal';
import { Button } from '@/components/Button';
import { AnimatedCounter } from '@/components/AnimatedCounter';

export function FacilitatorsClient() {
  return (
    <main className="fade-in pt-32 md:pt-48 pb-0 bg-[#F6F8F6]">
      {/* Hero */}
      <header className="px-6 md:px-12 max-w-4xl mx-auto text-center mb-32">
        <Reveal direction="down">
          <h2 className="text-[#225430] font-semibold tracking-widest text-xs uppercase mb-6">
            Our Facilitators
          </h2>
          <h1 className="font-serif text-5xl md:text-7xl font-medium tracking-tight leading-[1.1] mb-8 text-[#0A1C12]">
            The faces behind the{' '}
            <span className="italic text-[#526656]">breakthroughs.</span>
          </h1>
          <p className="text-xl md:text-[22px] text-[#526656] font-light leading-relaxed mb-10 float-slow">
            We don&apos;t hire event moderators. We curate the top 1% of executive coaches and
            foster deep connections and profound breakthroughs.
          </p>
          <Button variant="primary" className="text-base px-8 py-4" asLink href="/contact">
            Meet the Network
          </Button>
        </Reveal>
      </header>

      {/* The 1% Standard */}
      <section
        aria-labelledby="acceptance-rate-heading"
        data-theme="dark"
        className="px-6 md:px-12 py-32 bg-[#0A1C12] text-[#F6F8F6]"
      >
        <div className="max-w-7xl mx-auto grid lg:grid-cols-2 gap-20 items-center">
          <Reveal direction="left">
            <div className="font-serif text-[120px] leading-none text-[#225430] mb-6">
              <AnimatedCounter value="1" />%
            </div>
            <h3
              id="acceptance-rate-heading"
              className="font-serif text-3xl md:text-[36px] font-medium tracking-tight mb-6 text-[#F6F8F6] leading-tight"
            >
              The acceptance rate for
              <br />
              Peerforum facilitators.
            </h3>
            <p className="text-[#D3DCD4] text-lg font-light leading-relaxed">
              Our vetting process is strict. We look beyond ICF certifications and
              impressive resumes. We test for presence, the ability to manage conflict, and the
              courage to ask the uncomfortable questions that unlock true growth.
            </p>
          </Reveal>

          <div className="space-y-6">
            {[
              {
                step: '01',
                title: 'Clinical & Executive Background',
                desc: 'Our candidates must possess deep experience in executive coaching, organizational psychology, or as former C-Suite operators.',
              },
              {
                step: '02',
                title: 'Live Simulation',
                desc: 'Candidates facilitate simulated, high-friction peer groups where we intentionally introduce difficult personalities and dominant voices.',
              },
              {
                step: '03',
                title: 'Methodology Training',
                desc: 'Accepted facilitators undergo rigorous training in the proprietary Peerforum framework for bypassing small talk and engineering vulnerability.',
              },
              {
                step: '04',
                title: 'Ongoing Calibration',
                desc: 'Every session is evaluated. Facilitators receive ongoing supervision, peer reviews, and quantitative feedback on group health.',
              },
            ].map((item, idx) => (
              <Reveal
                key={idx}
                delay={idx * 150}
                direction="right"
                className="bg-[#0A1C12] border border-[#526656]/30 p-8 rounded-2xl flex gap-6"
              >
                <div className="text-[#225430] font-serif text-xl font-medium mt-1">
                  {item.step}
                </div>
                <div>
                  <h4 className="font-medium text-[#F6F8F6] mb-2">{item.title}</h4>
                  <p className="text-sm text-[#D3DCD4] font-light leading-relaxed">{item.desc}</p>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* REVIEW: This "What makes a Peerforum coach?" archetypes section was not in the original content.md — all copy invented by Gemini */}
      {/* Facilitator Archetypes */}
      <section
        aria-labelledby="facilitator-profile"
        className="px-6 md:px-12 py-32 bg-[#F6F8F6]"
      >
        <div className="max-w-7xl mx-auto">
          <Reveal direction="down" className="text-center mb-20">
            <h2
              id="facilitator-profile"
              className="text-[#225430] font-medium tracking-widest text-xs uppercase mb-4"
            >
              The Profile
            </h2>
            <h3 className="font-serif text-4xl md:text-[44px] font-medium tracking-tight mb-6 text-[#0A1C12] leading-tight">
              What makes a Peerforum coach?
            </h3>
            <p className="text-[#526656] text-lg font-light leading-relaxed max-w-2xl mx-auto">
              The power of a peer group relies entirely on the person guiding it. Our network is
              defined by three non-negotiable traits.
            </p>
          </Reveal>

          <div className="grid md:grid-cols-3 gap-8">
            {[
              {
                title: 'Executive Pedigree',
                desc: "They have sat in the seat. Our network includes former founders, SVPs, and leaders who understand the weight of executive decision-making. They don't just speak the language; they have lived the isolating reality of leadership.",
              },
              {
                title: 'Masters of Friction',
                desc: 'A good moderator avoids conflict; a Peerforum coach leans into it. They are specifically trained to manage dominant personalities, draw out quiet members, and engineer the productive friction necessary for breakthroughs.',
              },
              {
                title: 'Unflinching Candor',
                desc: 'They bypass superficial networking and small talk immediately. They ask the questions peers are often too polite to ask each other, forcing groups into states of extreme vulnerability and high-signal problem solving.',
              },
            ].map((trait, idx) => (
              <Reveal
                key={idx}
                delay={idx * 150}
                direction="up"
                className="p-10 border border-[#D3DCD4] bg-[#EBF0EC] rounded-[2rem] elegant-hover"
              >
                <h4 className="font-serif text-2xl font-medium mb-4 text-[#0A1C12]">
                  {trait.title}
                </h4>
                <p className="text-[#526656] font-light leading-relaxed">{trait.desc}</p>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* Facilitator Roster Grid */}
      <section
        aria-labelledby="roster-heading"
        className="px-6 md:px-12 py-32 bg-[#EBF0EC] border-y border-[#D3DCD4]"
      >
        <div className="max-w-7xl mx-auto">
          <Reveal direction="down" className="mb-16 text-center">
            <h2
              id="roster-heading"
              className="text-[#225430] font-medium tracking-widest text-xs uppercase mb-4"
            >
              Our Roster
            </h2>
            <h3 className="font-serif text-4xl md:text-[44px] font-medium tracking-tight mb-6 text-[#0A1C12] leading-tight">
              The faces behind the breakthroughs.
            </h3>
            <p className="text-[#526656] text-lg font-light leading-relaxed max-w-2xl mx-auto">
              A diverse, global bench of elite coaches, former executives, from diverse background
              with a global footprint.
            </p>
          </Reveal>

          <div className="grid grid-cols-2 md:grid-cols-5 gap-4 md:gap-6 max-w-5xl mx-auto">
            {[
              { name: 'Andre Hartwich', src: '/facilitators/andre-hartwich.jpg' },
              { name: 'Ed Johnson', src: '/facilitators/ed-johnson.jpg' },
              { name: 'Fabiola Dieudonne Aniton', src: '/facilitators/fabiola-dieudonne-aniton.jpeg' },
              { name: 'Florentine Versteeg', src: '/facilitators/florentine-versteeg.jpeg' },
              { name: 'Marcela Contigiani', src: '/facilitators/marcela-contigiani.jpg' },
              { name: 'Masa Gong', src: '/facilitators/masa-gong.png' },
              { name: 'Michelle Clarke', src: '/facilitators/michelle-clarke.jpg' },
              { name: 'Sergio Ledesma', src: '/facilitators/sergio-ledesma.png' },
              { name: 'Shereen Thor', src: '/facilitators/shereen-thor.jpeg' },
              { name: 'Ute Franzen-Waschke', src: '/facilitators/ute-franzen-waschke.jpg' },
            ].map((facilitator, i) => (
              <Reveal
                key={facilitator.name}
                delay={(i % 5) * 100}
                direction="scale"
                className="aspect-square relative rounded-xl overflow-hidden group border border-[#D3DCD4] shadow-sm cursor-pointer"
              >
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img
                  src={facilitator.src}
                  alt={facilitator.name}
                  loading="lazy"
                  className="w-full h-full object-cover grayscale brightness-90 group-hover:grayscale-0 group-hover:brightness-110 group-hover:scale-105 transition-all duration-700"
                />
                <div className="absolute inset-x-0 bottom-0 translate-y-full group-hover:translate-y-0 transition-transform duration-500 ease-out bg-gradient-to-t from-[#0A1C12]/80 to-transparent pt-12 pb-4 px-4">
                  <p className="text-[#F6F8F6] text-sm font-medium text-center leading-tight">
                    {facilitator.name}
                  </p>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>
    </main>
  );
}
