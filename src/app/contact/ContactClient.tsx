'use client';

import { useState } from 'react';
import { Reveal } from '@/components/Reveal';
import { Button } from '@/components/Button';

export function ContactClient() {
  const [submitted, setSubmitted] = useState(false);
  const [sending, setSending] = useState(false);
  const [error, setError] = useState('');

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setSending(true);
    setError('');

    const form = e.currentTarget;
    const data = {
      firstName: (form.elements.namedItem('firstName') as HTMLInputElement).value,
      lastName: (form.elements.namedItem('lastName') as HTMLInputElement).value,
      email: (form.elements.namedItem('email') as HTMLInputElement).value,
      company: (form.elements.namedItem('company') as HTMLInputElement).value,
      phone: (form.elements.namedItem('phone') as HTMLInputElement).value,
      message: (form.elements.namedItem('message') as HTMLTextAreaElement).value,
    };

    try {
      const res = await fetch('/api/contact', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(data),
      });

      if (!res.ok) throw new Error('Failed to send');
      setSubmitted(true);
    } catch {
      setError('Something went wrong. Please try again or email us directly.');
    } finally {
      setSending(false);
    }
  };

  return (
    <main className="fade-in pt-32 md:pt-48 pb-32 bg-[#F6F8F6]">
      <div className="px-6 md:px-12 max-w-2xl mx-auto">
        <Reveal direction="up">
          <div className="text-center mb-16">
            <h2 className="text-[#225430] font-semibold tracking-widest text-xs uppercase mb-6">
              Get in Touch
            </h2>
            <h1 className="font-serif text-4xl md:text-5xl font-medium tracking-tight text-[#0A1C12] mb-6">
              Talk to Us
            </h1>
            <p className="text-lg text-[#526656] font-light leading-relaxed">
              Tell us about your organization and we&apos;ll show you how Peerforum can help you
              scale peer coaching groups.
            </p>
          </div>
        </Reveal>

        {submitted ? (
          <Reveal direction="scale">
            <div className="bg-[#EBF0EC] border border-[#D3DCD4] rounded-2xl p-12 text-center">
              <h3 className="font-serif text-2xl font-medium text-[#0A1C12] mb-4">
                Thank you for reaching out.
              </h3>
              <p className="text-[#526656] font-light">
                We&apos;ll be in touch shortly to discuss how Peerforum can work for your
                organization.
              </p>
            </div>
          </Reveal>
        ) : (
          <Reveal direction="up" delay={200}>
            <form
              onSubmit={handleSubmit}
              className="bg-[#FAFAFA] border border-[#D3DCD4] rounded-2xl p-10 md:p-12 space-y-6"
            >
              <div className="grid md:grid-cols-2 gap-6">
                <div>
                  <label
                    htmlFor="firstName"
                    className="block text-sm font-medium text-[#0A1C12] mb-2"
                  >
                    First Name <span className="text-[#225430]">*</span>
                  </label>
                  <input
                    type="text"
                    id="firstName"
                    name="firstName"
                    required
                    className="w-full px-4 py-3 rounded-xl border border-[#D3DCD4] bg-[#F6F8F6] text-[#0A1C12] focus:outline-none focus:ring-2 focus:ring-[#225430] focus:border-transparent transition-all"
                  />
                </div>
                <div>
                  <label
                    htmlFor="lastName"
                    className="block text-sm font-medium text-[#0A1C12] mb-2"
                  >
                    Last Name <span className="text-[#225430]">*</span>
                  </label>
                  <input
                    type="text"
                    id="lastName"
                    name="lastName"
                    required
                    className="w-full px-4 py-3 rounded-xl border border-[#D3DCD4] bg-[#F6F8F6] text-[#0A1C12] focus:outline-none focus:ring-2 focus:ring-[#225430] focus:border-transparent transition-all"
                  />
                </div>
              </div>

              <div>
                <label htmlFor="email" className="block text-sm font-medium text-[#0A1C12] mb-2">
                  Email <span className="text-[#225430]">*</span>
                </label>
                <input
                  type="email"
                  id="email"
                  name="email"
                  required
                  className="w-full px-4 py-3 rounded-xl border border-[#D3DCD4] bg-[#F6F8F6] text-[#0A1C12] focus:outline-none focus:ring-2 focus:ring-[#225430] focus:border-transparent transition-all"
                />
              </div>

              <div>
                <label htmlFor="company" className="block text-sm font-medium text-[#0A1C12] mb-2">
                  Company <span className="text-[#225430]">*</span>
                </label>
                <input
                  type="text"
                  id="company"
                  name="company"
                  required
                  className="w-full px-4 py-3 rounded-xl border border-[#D3DCD4] bg-[#F6F8F6] text-[#0A1C12] focus:outline-none focus:ring-2 focus:ring-[#225430] focus:border-transparent transition-all"
                />
              </div>

              <div>
                <label htmlFor="phone" className="block text-sm font-medium text-[#0A1C12] mb-2">
                  Phone Number <span className="text-[#526656] text-xs">(optional)</span>
                </label>
                <input
                  type="tel"
                  id="phone"
                  name="phone"
                  className="w-full px-4 py-3 rounded-xl border border-[#D3DCD4] bg-[#F6F8F6] text-[#0A1C12] focus:outline-none focus:ring-2 focus:ring-[#225430] focus:border-transparent transition-all"
                />
              </div>

              <div>
                <label htmlFor="message" className="block text-sm font-medium text-[#0A1C12] mb-2">
                  Message <span className="text-[#225430]">*</span>
                </label>
                <textarea
                  id="message"
                  name="message"
                  required
                  rows={5}
                  className="w-full px-4 py-3 rounded-xl border border-[#D3DCD4] bg-[#F6F8F6] text-[#0A1C12] focus:outline-none focus:ring-2 focus:ring-[#225430] focus:border-transparent transition-all resize-none"
                />
              </div>

              {error && (
                <p className="text-red-600 text-sm text-center">{error}</p>
              )}

              <Button variant="primary" className="w-full text-base py-4" type="submit" disabled={sending}>
                {sending ? 'Sending...' : 'Send Message'}
              </Button>
            </form>
          </Reveal>
        )}
      </div>
    </main>
  );
}
