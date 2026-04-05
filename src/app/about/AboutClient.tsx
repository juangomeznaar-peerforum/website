'use client';

import { Reveal } from '@/components/Reveal';

export function AboutClient() {
  return (
    <main className="fade-in">
      <section
        id="story"
        className="bg-[#0A1C12] py-[120px]"
      >
        <div className="px-6 md:px-12 max-w-[740px] mx-auto">
          <Reveal direction="up">
            <p className="text-[11px] font-sans font-semibold tracking-[0.16em] uppercase text-[#225430] mb-10">
              What We Believe
            </p>
          </Reveal>

          <div className="font-serif text-[clamp(24px,3.2vw,36px)] leading-[1.5]">
            <Reveal direction="up" delay={100}>
              <p className="text-white/[0.92] mb-8">
                The most effective form of leadership development has always been the peer forum — a
                small group of leaders who meet regularly, share real challenges, and coach each other
                with honesty and trust.
              </p>
            </Reveal>

            <Reveal direction="up" delay={200}>
              <p className="text-white/40 mb-8">
                But for most of its history, this experience has been reserved for a very small group:
                CEOs. People with the seniority, the flexibility, and the network to find the right
                peers, carve out the time, travel to the right room, and commit for years.
              </p>
            </Reveal>

            <Reveal direction="up" delay={300}>
              <p className="text-white/[0.92] mb-8">
                That&apos;s too much friction for the VP navigating her first board. For the GM scaling
                a business unit across three time zones. For the director who&apos;s never had a peer
                who truly understands what she&apos;s going through.
              </p>
            </Reveal>

            <Reveal direction="up" delay={400}>
              <p className="mb-8">
                <span className="text-white/40">
                  We believe every leader — not just the CEO — deserves access to a room full of peers
                  who get it.{' '}
                </span>
                <span className="text-[#225430]">
                  A global pool of the right people. A world-class facilitator. A rhythm that fits a
                  real schedule. Zero friction.
                </span>
              </p>
            </Reveal>

            <Reveal direction="up" delay={500}>
              <p className="text-white/[0.92]">
                That&apos;s what we build.
              </p>
            </Reveal>
          </div>
        </div>
      </section>
    </main>
  );
}
