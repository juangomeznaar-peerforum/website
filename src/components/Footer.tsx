import Link from 'next/link';
import { Button } from './Button';

export function Footer() {
  return (
    <footer className="bg-[#0A1C12] text-[#F6F8F6] py-24 px-6 md:px-12">
      <div className="max-w-7xl mx-auto flex flex-col md:flex-row justify-between items-start md:items-end border-b border-[#526656]/30 pb-16 mb-16 gap-12">
        <div className="max-w-2xl">
          <h2 className="font-serif text-4xl md:text-6xl font-medium tracking-tight leading-tight mb-6 text-[#F6F8F6]">
            Scale your peer groups.
          </h2>
          <p className="text-[#526656] text-lg font-light mb-10 max-w-md">
            Full-service peer coaching groups at scale. We design, operate, and facilitate.
          </p>
          <Button variant="tertiary" className="text-base px-8 py-4" asLink href="/contact">
            Talk to Us
          </Button>
        </div>

        <div className="flex gap-16 text-[15px] font-light text-[#526656]">
          <div className="flex flex-col space-y-4">
            <span className="text-[#F6F8F6] font-medium mb-2 tracking-wide text-sm">Solutions</span>
            <Link href="/solutions/community" className="hover:text-[#F6F8F6] transition-colors">
              For Communities
            </Link>
            <Link href="/solutions/education" className="hover:text-[#F6F8F6] transition-colors">
              For Education
            </Link>
            <Link href="/solutions/enterprise" className="hover:text-[#F6F8F6] transition-colors">
              For Enterprise
            </Link>
          </div>
          <div className="flex flex-col space-y-4">
            <span className="text-[#F6F8F6] font-medium mb-2 tracking-wide text-sm">Company</span>
            <Link href="/about" className="hover:text-[#F6F8F6] transition-colors">
              About Us
            </Link>
            <Link href="/facilitators" className="hover:text-[#F6F8F6] transition-colors">
              Our Facilitators
            </Link>
            <Link href="/impact" className="hover:text-[#F6F8F6] transition-colors">
              Our Impact
            </Link>
          </div>
        </div>
      </div>
      <div className="max-w-7xl mx-auto flex flex-col md:flex-row justify-between items-center text-sm text-[#526656] font-light">
        <p>&copy; {new Date().getFullYear()} Peerforum. All rights reserved.</p>
        <div className="flex space-x-6 mt-4 md:mt-0">
          <span className="hover:text-[#F6F8F6] transition-colors cursor-pointer">Privacy Policy</span>
          <span className="hover:text-[#F6F8F6] transition-colors cursor-pointer">Terms of Service</span>
        </div>
      </div>
    </footer>
  );
}
