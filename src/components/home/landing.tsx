'use client';

import Image from 'next/image';
import { motion, useScroll, useTransform, useSpring } from 'motion/react';
import { ArrowDown, ArrowUpRight } from 'lucide-react';
import { cn } from '@/lib/utils';

export function Landing() {
  const { scrollY, scrollYProgress } = useScroll();

  const smoothScrollY = useSpring(scrollY, {
    stiffness: 80,
    damping: 25,
    mass: 0.5,
  });

  const flowerY = useTransform(smoothScrollY, [0, 900], [0, -140]);

  const flowerScale = useTransform(smoothScrollY, [0, 900], [1, 1.08]);

  const heroOpacity = useTransform(scrollYProgress, [0, 0.4], [1, 0]);

  const contentY = useTransform(smoothScrollY, [0, 700], [0, -60]);

  return (
    <main className="w-full overflow-x-clip">
      {/* HERO */}
      <section className="relative min-h-screen w-full overflow-hidden bg-background">
        {/* NAV */}
        <header className="absolute inset-x-0 top-0 z-50 px-6 py-6 md:px-10">
          <div className="mx-auto flex max-w-[1600px] items-center justify-between">
            <a
              href="/"
              className="text-sm font-medium tracking-tight text-foreground"
            >
              LK.
            </a>

            <nav className="hidden items-center gap-8 md:flex">
              <a
                href="#work"
                className="text-xs uppercase tracking-[0.18em] text-foreground transition-opacity hover:opacity-50"
              >
                Work
              </a>

              <a
                href="#about"
                className="text-xs uppercase tracking-[0.18em] text-foreground transition-opacity hover:opacity-50"
              >
                About
              </a>

              <a
                href="#contact"
                className="group flex items-center gap-2 text-xs uppercase tracking-[0.18em] text-foreground transition-opacity hover:opacity-50"
              >
                Contact
                <ArrowUpRight
                  size={13}
                  className="transition-transform duration-300 group-hover:-translate-y-0.5 group-hover:translate-x-0.5"
                />
              </a>
            </nav>

            <a
              href="#contact"
              className="flex items-center gap-2 text-sm text-foreground md:hidden"
            >
              Contact
              <ArrowUpRight size={14} />
            </a>
          </div>
        </header>

        {/* HERO CONTENT */}
        <motion.div
          style={{
            y: contentY,
            opacity: heroOpacity,
          }}
          className={cn(
            'relative z-30 mx-auto flex min-h-screen w-full max-w-[1600px]',
            'items-center px-6 pb-20 pt-32',
            'md:px-10 md:pt-20',
          )}
        >
          {/* LEFT CONTENT */}
          <div className="relative z-40 w-full md:w-[55%]">
            {/* Label */}
            <motion.p
              initial={{
                opacity: 0,
                y: 20,
              }}
              animate={{
                opacity: 1,
                y: 0,
              }}
              transition={{
                duration: 0.7,
                ease: [0.22, 1, 0.36, 1],
              }}
              className={cn(
                'mb-7 text-[10px] font-medium uppercase',
                'tracking-[0.28em] text-muted-foreground',
                'md:text-xs',
              )}
            >
              Software Engineer · Builder
            </motion.p>

            {/* NAME */}
            <motion.h1
              initial={{
                opacity: 0,
                y: 70,
              }}
              animate={{
                opacity: 1,
                y: 0,
              }}
              transition={{
                duration: 1,
                delay: 0.1,
                ease: [0.16, 1, 0.3, 1],
              }}
              className={cn(
                'max-w-[900px]',
                'text-[clamp(4.5rem,10vw,10rem)]',
                'font-medium leading-[0.82]',
                'tracking-[-0.075em] text-foreground',
              )}
            >
              Lakshya
              <br />
              <span className="text-muted-foreground">Kumar</span>
            </motion.h1>

            {/* DESCRIPTION */}
            <motion.p
              initial={{
                opacity: 0,
                y: 30,
              }}
              animate={{
                opacity: 1,
                y: 0,
              }}
              transition={{
                duration: 0.8,
                delay: 0.35,
                ease: [0.22, 1, 0.36, 1],
              }}
              className={cn(
                'mt-8 max-w-[360px]',
                'text-sm leading-7 text-muted-foreground',
                'md:ml-[28%] md:text-base',
              )}
            >
              I build software, products, and systems that turn ambitious ideas
              into real things.
            </motion.p>
          </div>

          {/* FLOWER */}
          <motion.div
            style={{
              y: flowerY,
              scale: flowerScale,
            }}
            className={cn(
              'pointer-events-none absolute z-10',
              'left-[52%] top-[24%]',
              'w-[85vw] max-w-[900px]',
              '-translate-x-1/2',
              'md:left-[72%] md:top-[12%] md:w-[62vw]',
              'lg:w-[58vw]',
            )}
          >
            <motion.div
              initial={{
                opacity: 0,
                scale: 0.75,
                rotate: -10,
              }}
              animate={{
                opacity: 1,
                scale: 1,
                rotate: 0,
              }}
              transition={{
                duration: 1.4,
                delay: 0.15,
                ease: [0.16, 1, 0.3, 1],
              }}
              className="relative aspect-square w-full"
            >
              <motion.div
                animate={{
                  rotate: 360,
                }}
                transition={{
                  duration: 180,
                  repeat: Infinity,
                  ease: 'linear',
                }}
                className="relative h-full w-full"
              >
                <Image
                  src="/flower-globe.png"
                  alt=""
                  fill
                  priority
                  sizes="(max-width: 768px) 85vw, 60vw"
                  className="object-contain"
                />
              </motion.div>
            </motion.div>
          </motion.div>

          {/* SCROLL */}
          <motion.a
            href="#work"
            initial={{
              opacity: 0,
              y: 15,
            }}
            animate={{
              opacity: 1,
              y: 0,
            }}
            transition={{
              delay: 1,
              duration: 0.7,
            }}
            className={cn(
              'group absolute bottom-7 left-1/2 z-50',
              'flex -translate-x-1/2 flex-col',
              'items-center gap-3 text-foreground',
            )}
          >
            <span
              className={cn(
                'text-[10px] font-medium uppercase',
                'tracking-[0.25em]',
              )}
            >
              Scroll
            </span>

            <span
              className={cn(
                'flex size-10 items-center justify-center',
                'rounded-full border border-foreground/20',
                'bg-background/70 backdrop-blur-sm',
                'transition-all duration-500',
                'group-hover:bg-foreground',
                'group-hover:text-background',
              )}
            >
              <ArrowDown
                size={14}
                className={cn(
                  'transition-transform duration-500',
                  'group-hover:translate-y-1',
                )}
              />
            </span>
          </motion.a>
        </motion.div>
      </section>

      {/* WORK */}
      <section
        id="work"
        className={cn(
          'min-h-screen border-t border-border',
          'bg-background px-6 py-32',
          'md:px-10',
        )}
      >
        <div className="mx-auto max-w-[1600px]">
          <p
            className={cn(
              'text-xs uppercase',
              'tracking-[0.2em] text-muted-foreground',
            )}
          >
            01 / Selected work
          </p>

          <h2
            className={cn(
              'mt-8 max-w-4xl',
              'text-5xl font-medium leading-[0.95]',
              'tracking-[-0.05em] text-foreground',
              'md:text-7xl',
            )}
          >
            Things I've built,
            <br />
            <span className="text-muted-foreground">
              and continue to build.
            </span>
          </h2>
        </div>
      </section>

      {/* ABOUT */}
      <section
        id="about"
        className={cn(
          'min-h-screen border-t border-border',
          'bg-background px-6 py-32',
          'md:px-10',
        )}
      >
        <div className="mx-auto max-w-[1600px]">
          <p
            className={cn(
              'text-xs uppercase',
              'tracking-[0.2em] text-muted-foreground',
            )}
          >
            02 / About
          </p>

          <h2
            className={cn(
              'mt-8 max-w-5xl',
              'text-5xl font-medium leading-[0.95]',
              'tracking-[-0.05em] text-foreground',
              'md:text-7xl',
            )}
          >
            Engineer by trade.
            <br />
            <span className="text-muted-foreground">Builder by nature.</span>
          </h2>
        </div>
      </section>

      {/* CONTACT */}
      <section
        id="contact"
        className={cn(
          'min-h-[70vh] border-t border-border',
          'bg-background px-6 py-10',
          'md:px-10',
        )}
      >
        <div
          className={cn(
            'mx-auto flex min-h-[60vh]',
            'max-w-[1600px] flex-col justify-end',
          )}
        >
          <p
            className={cn(
              'text-xs uppercase',
              'tracking-[0.2em] text-muted-foreground',
            )}
          >
            03 / Contact
          </p>

          <a
            href="mailto:hello@example.com"
            className={cn(
              'group mt-8 flex items-end',
              'justify-between border-b border-border',
              'pb-4 text-foreground',
            )}
          >
            <span
              className={cn(
                'text-[clamp(2.5rem,7vw,7rem)]',
                'font-medium leading-none',
                'tracking-[-0.06em]',
              )}
            >
              Let's build.
            </span>

            <ArrowUpRight
              size={32}
              className={cn(
                'mb-2 transition-transform duration-500',
                'group-hover:-translate-y-2',
                'group-hover:translate-x-2',
              )}
            />
          </a>
        </div>
      </section>
    </main>
  );
}
