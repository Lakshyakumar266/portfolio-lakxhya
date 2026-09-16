'use client';

import { ModeToggle } from './theme-toogle';
import { motion } from 'motion/react';
import { cn } from '@/lib/utils';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import Image from 'next/image';
import { ChevronDown, FileText, FlaskConical } from 'lucide-react';
import {
  DropdownMenu,
  DropdownMenuTrigger,
  DropdownMenuContent,
  DropdownMenuItem,
} from '@/components/ui/dropdown-menu';

const NAV_LINKS = [
  { label: 'Home', href: '/' },
  { label: 'Proof of Work', href: '/work' },
  { label: 'Blog', href: '/blog' },
];

const MORE_DROPDOWN_ITEMS = [
  {
    label: 'Resume',
    href: '/resume',
    icon: FileText,
  },
  {
    label: 'Experimental',
    href: '/experimental',
    icon: FlaskConical,
  },
];

export default function Navbar() {
  const pathname = usePathname();
  const isMoreActive = MORE_DROPDOWN_ITEMS.some(
    (item) => pathname === item.href,
  );

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

              {/* More dropdown */}
              <DropdownMenu>
                <DropdownMenuTrigger
                  openOnHover
                  delay={0}
                  closeDelay={120}
                  className={cn(
                    'group relative inline-flex items-center gap-1 px-2.5 py-1 rounded-md text-sm transition-colors duration-150 cursor-pointer outline-none select-none',
                    'font-inter',
                    isMoreActive
                      ? 'text-foreground font-medium'
                      : 'text-muted-foreground hover:text-foreground data-popup-open:text-foreground',
                  )}
                >
                  {/* Active: animated dashed underline */}
                  {isMoreActive && (
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
                  {!isMoreActive && (
                    <span className="pointer-events-none absolute inset-x-2.5 -bottom-0.5 overflow-visible opacity-0 transition-opacity duration-150 group-hover:opacity-75 group-data-[popup-open]:opacity-75 dark:group-hover:opacity-50 dark:group-data-[popup-open]:opacity-50">
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

                  <span>More</span>
                  <ChevronDown className="size-3.5 transition-transform duration-150 group-data-[popup-open]:rotate-180 opacity-70 group-hover:opacity-100 group-data-[popup-open]:opacity-100" />
                </DropdownMenuTrigger>

                <DropdownMenuContent
                  align="start"
                  side="bottom"
                  sideOffset={4}
                  className="w-44 p-1 rounded-lg bg-white/95 dark:bg-neutral-900/95 backdrop-blur-md border border-neutral-200 dark:border-neutral-800 shadow-xl"
                >
                  {MORE_DROPDOWN_ITEMS.map((item) => {
                    const isItemActive = pathname === item.href;
                    const Icon = item.icon;
                    return (
                      <DropdownMenuItem
                        key={item.href}
                        render={<Link href={item.href} />}
                        className={cn(
                          'flex items-center gap-2.5 py-1.5 px-2.5 rounded-md cursor-pointer select-none',
                          'text-[13px] font-mono tracking-tight transition-all duration-150',
                          isItemActive
                            ? 'bg-neutral-200 text-black dark:bg-white/10 dark:text-white font-medium'
                            : 'text-neutral-500 dark:text-neutral-400 hover:text-black dark:hover:text-white hover:bg-neutral-200 dark:hover:bg-white/5 focus:text-black dark:focus:text-white focus:bg-neutral-200 dark:focus:bg-white/5',
                        )}
                      >
                        <span>{item.label}</span>
                      </DropdownMenuItem>
                    );
                  })}
                </DropdownMenuContent>
              </DropdownMenu>
            </div>

            <ModeToggle className="size-8 rounded-md" iconClassName="size-4" />
          </motion.nav>

          <div className="mt-5 border-t-2 border-dashed border-neutral-400 dark:border-neutral-800" />
        </div>
      </header>
    </>
  );
}
