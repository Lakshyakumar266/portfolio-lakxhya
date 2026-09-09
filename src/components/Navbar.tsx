import { ModeToggle } from './theme-toogle';
import { motion } from 'motion/react';
import { cn } from '@/lib/utils';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import Image from 'next/image';

const NAV_LINKS = [
  { label: 'Home', href: '/' },
  { label: 'Inspiration', href: '/inspiration' },
  { label: 'Blog', href: '/blog' },
  { label: 'Sponsor', href: '/sponsor' },
];

export default function Navbar() {
  const pathname = usePathname();
  return (
    <>
      <header className="w-full">
        <div className="relative mx-auto max-w-3xl px-6 pt-10 pb-0">
          {/* Identity row */}
          <motion.div
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
            className="flex items-center gap-3 mb-5"
          >
            {/* Avatar */}
            <div className="relative h-16 w-16 shrink-0 overflow-hidden rounded-lg border border-border shadow-sm">
              <Image
                src="/avtar-cat.jpg"
                alt="Lakshya Kumar"
                fill
                sizes="478px"
                className="object-cover"
                priority
              />
            </div>

            {/* Name */}
            <p
              className={cn(
                'leading-none text-foreground',
                'font-schibsted font-semibold tracking-tight',
              )}
            >
              <span className="text-xl">Lakshya Kumar </span>
              <span className="font-normal text-md">
                <span className="font-schibsted font-semibold text-muted-foreground">
                  aka{' '}
                </span>
                <em className="font-geist not-italic font-medium text-foreground text-xl">
                  Lakxhya
                </em>
              </span>
            </p>
          </motion.div>

          {/* Nav links */}
          <motion.nav
            initial={{ opacity: 0, y: 8 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.1, ease: [0.22, 1, 0.36, 1] }}
            className="flex items-center justify-between"
            aria-label="Main navigation"
          >
            <div className="flex items-center gap-1">
              {NAV_LINKS.map((link) => {
                const isActive = pathname === link.href;
                return (
                  <Link
                    key={link.href}
                    href={link.href}
                    className={cn(
                      'group relative px-2.5 py-1 rounded-md text-sm transition-colors duration-200',
                      'font-inter',
                      isActive
                        ? 'text-foreground font-medium'
                        : 'text-muted-foreground hover:text-foreground',
                    )}
                  >
                    {/* Active: animated dashed underline */}
                    {isActive && (
                      <motion.span
                        layoutId="nav-underline"
                        className="absolute inset-x-2.5 -bottom-0.5 overflow-visible"
                        transition={{
                          type: 'spring',
                          stiffness: 380,
                          damping: 32,
                        }}
                      >
                        <svg
                          width="100%"
                          height="3"
                          className="overflow-visible block"
                        >
                          <line
                            x1="0"
                            y1="1.5"
                            x2="100%"
                            y2="1.5"
                            stroke="currentColor"
                            strokeWidth="2"
                            strokeDasharray="3.5 3"
                            strokeLinecap="round"
                          />
                        </svg>
                      </motion.span>
                    )}

                    {/* Hover: faded dashed underline (non-active only) */}
                    {!isActive && (
                      <span className="pointer-events-none absolute inset-x-2.5 -bottom-0.5 overflow-visible opacity-0 transition-opacity duration-200 group-hover:opacity-75 dark:group-hover:opacity-50">
                        <svg
                          width="100%"
                          height="3"
                          className="overflow-visible block"
                        >
                          <line
                            x1="0"
                            y1="1.5"
                            x2="100%"
                            y2="1.5"
                            stroke="currentColor"
                            strokeWidth="2"
                            strokeDasharray="3.5 3"
                            strokeLinecap="round"
                          />
                        </svg>
                      </span>
                    )}

                    {link.label}
                  </Link>
                );
              })}
            </div>

            <ModeToggle className="size-8 rounded-md" iconClassName="size-4" />
          </motion.nav>

          <div className="mt-5 border-t-2 border-dashed border-neutral-400 dark:border-neutral-800" />
        </div>
      </header>
    </>
  );
}
