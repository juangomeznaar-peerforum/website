'use client';

import { Reveal } from '@/components/Reveal';

export function AboutClient() {
  return (
    <main className="fade-in pt-32 md:pt-48 pb-32 bg-[#F6F8F6]">
      <article className="px-6 md:px-12 max-w-3xl mx-auto">
        <Reveal direction="up">
          <div className="bg-[#FAFAFA] border border-[#D3DCD4] p-12 md:p-20 rounded-sm shadow-sm relative elegant-hover">
            <header className="mb-12">
              <h1 className="font-serif text-4xl md:text-5xl font-medium tracking-tight text-[#0A1C12] mb-4">
                A letter on isolation.
              </h1>
              <div className="w-16 h-[2px] bg-[#225430]"></div>
            </header>

            <div className="space-y-6 font-serif text-[19px] text-[#0A1C12] leading-relaxed">
              <p>Dear Leader,</p>

              <p>The world of leadership has fundamentally changed.</p>

              <p>
                Accelerated by the pandemic and the permanent shift to distributed work, the natural
                collisions and organic mentorship that used to define executive growth have vanished.
              </p>

              <p>
                Today, leaders are operating in unprecedented isolation. You are expected to navigate
                complex, structural challenges—shifting market dynamics, team burnout, strategic
                pivots—with less visibility and less human support than ever before. The higher you
                climb, the harder it is to find objective, unfiltered feedback from people who
                genuinely understand the weight of your decisions.
              </p>

              <p>
                You cannot always share your deepest doubts with your board without triggering panic.
                You cannot workshop sensitive changes with your subordinates. And friends outside
                your industry rarely grasp the nuance of the fires you are fighting.
              </p>

              <p>
                But when you remove that isolation—when you put a leader in a room with true peers
                who understand the exact burden of their seat, guided by an expert who knows how to
                bypass small talk—the transformation is profound.
              </p>

              <p>
                We built Peerforum because standard networking has become superficial, and 1-on-1
                coaching often reinforces the lonely reality of driving change. We engineered a
                system to deliver collective intelligence and togetherness at scale.
              </p>

              <p>
                It is the community we wished we had. And we are honored to build it for you.
              </p>

              <footer className="pt-8">
                <span className="font-sans font-bold text-sm tracking-widest text-[#225430] uppercase">
                  The Founders, Peerforum
                </span>
              </footer>
            </div>
          </div>
        </Reveal>
      </article>
    </main>
  );
}
