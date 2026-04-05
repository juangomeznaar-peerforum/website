'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { Menu, X, ChevronDown } from 'lucide-react';
import { Button } from './Button';

export function Navigation() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const pathname = usePathname();

  useEffect(() => {
    const handleScroll = () => setIsScrolled(window.scrollY > 20);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  useEffect(() => {
    setIsMobileMenuOpen(false);
  }, [pathname]);

  const primaryLinks = [
    { href: '/solutions/community', label: 'Community' },
    { href: '/solutions/education', label: 'Education' },
    { href: '/solutions/enterprise', label: 'Enterprise' },
  ];

  const aboutLinks = [
    { href: '/about', label: 'About Us' },
    { href: '/facilitators', label: 'Our Facilitators' },
    { href: '/impact', label: 'Our Impact' },
  ];

  const isAboutActive = aboutLinks.some((l) => pathname === l.href);

  return (
    <nav
      aria-label="Main Navigation"
      className={`fixed top-0 w-full z-50 transition-all duration-500 ${
        isScrolled
          ? 'bg-[#F6F8F6]/90 backdrop-blur-md border-b border-[#D3DCD4] py-4 shadow-sm'
          : 'bg-transparent py-6'
      }`}
    >
      <div className="max-w-7xl mx-auto px-6 md:px-12 flex items-center justify-between">
        <Link
          href="/"
          className="font-serif text-2xl font-medium tracking-tight text-[#0A1C12]"
          aria-label="Peerforum Home"
        >
          Peerforum.
        </Link>

        <div className="hidden md:flex items-center space-x-10 text-[15px] font-medium text-[#526656]">
          {primaryLinks.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              className={`transition-colors hover:text-[#0A1C12] ${
                pathname === link.href ? 'text-[#225430]' : ''
              }`}
            >
              {link.label}
            </Link>
          ))}

          <div className="relative group py-2">
            <button
              className={`flex items-center gap-1 transition-colors hover:text-[#0A1C12] ${
                isAboutActive ? 'text-[#225430]' : ''
              }`}
            >
              About{' '}
              <ChevronDown
                size={14}
                className="group-hover:rotate-180 transition-transform duration-200"
              />
            </button>
            <div className="absolute top-full left-1/2 -translate-x-1/2 mt-0 w-48 bg-[#F6F8F6] border border-[#D3DCD4] shadow-xl rounded-2xl p-2 opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-200">
              {aboutLinks.map((link) => (
                <Link
                  key={link.href}
                  href={link.href}
                  className="block w-full text-left px-4 py-2 text-sm text-[#526656] hover:text-[#0A1C12] hover:bg-[#EBF0EC] rounded-xl transition-colors"
                >
                  {link.label}
                </Link>
              ))}
            </div>
          </div>

          <Button variant="primary" className="px-5 py-2.5" asLink href="/contact">
            Talk to Us
          </Button>
        </div>

        <button
          aria-label="Toggle Menu"
          className="md:hidden text-[#0A1C12]"
          onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
        >
          {isMobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
        </button>
      </div>

      {isMobileMenuOpen && (
        <div className="md:hidden absolute top-full left-0 w-full bg-[#F6F8F6] border-b border-[#D3DCD4] py-4 px-6 shadow-xl flex flex-col space-y-2 fade-in max-h-[80vh] overflow-y-auto">
          {primaryLinks.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              className="text-left text-lg font-medium text-[#0A1C12] py-3 border-b border-[#D3DCD4]"
            >
              {link.label}
            </Link>
          ))}

          <div className="py-3 border-b border-[#D3DCD4] flex flex-col">
            <span className="text-lg font-medium text-[#0A1C12] mb-3">About</span>
            <div className="flex flex-col space-y-3 pl-4 border-l-2 border-[#D3DCD4]">
              {aboutLinks.map((link) => (
                <Link
                  key={link.href}
                  href={link.href}
                  className="text-left text-base text-[#526656]"
                >
                  {link.label}
                </Link>
              ))}
            </div>
          </div>

          <Button variant="primary" className="w-full mt-6" asLink href="/contact">
            Talk to Us
          </Button>
        </div>
      )}
    </nav>
  );
}
