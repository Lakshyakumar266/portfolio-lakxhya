'use client';

import * as React from 'react';
import { useTheme } from 'next-themes';
import { Moon, Sun } from 'lucide-react';
import { AnimatePresence, motion } from 'motion/react';
import { cn } from '@/lib/utils';

/**
 * ThemeToggle — single button, no dropdown.
 * Clicking cycles: light <-> dark.
 * Default (system) resolves to the OS preference on first render.
 * Icon animates out upward and new one drops in from below.
 */
export function ModeToggle({
  className,
  ...props
}: React.ComponentProps<'button'>) {
  const { resolvedTheme, setTheme } = useTheme();
  const [mounted, setMounted] = React.useState(false);

  React.useEffect(() => setMounted(true), []);

  const isDark = resolvedTheme === 'dark';

  const toggle = () => setTheme(isDark ? 'light' : 'dark');

  return (
    <button
      type="button"
      onClick={toggle}
      aria-label={
        mounted
          ? isDark
            ? 'Switch to light mode'
            : 'Switch to dark mode'
          : 'Toggle theme'
      }
      suppressHydrationWarning
      className={cn(
        // Shadcn ghost icon button sizing
        'inline-flex items-center justify-center rounded-md',
        'size-9 text-sm font-medium',
        'border border-input bg-background',
        'shadow-sm transition-colors duration-150',
        'hover:bg-accent hover:text-accent-foreground',
        'focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring',
        'disabled:pointer-events-none disabled:opacity-50',
        'overflow-hidden relative',
        className,
      )}
      {...props}
    >
      {/* AnimatePresence swaps icons with a vertical slide */}
      <AnimatePresence mode="popLayout" initial={false}>
        {mounted ? (
          isDark ? (
            <motion.span
              key="moon"
              initial={{ opacity: 0, y: 8, scale: 0.8 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, y: -8, scale: 0.8 }}
              transition={{ duration: 0.18, ease: [0.22, 1, 0.36, 1] }}
              className="flex items-center justify-center"
            >
              <Moon className="size-[1.1rem]" />
            </motion.span>
          ) : (
            <motion.span
              key="sun"
              initial={{ opacity: 0, y: 8, scale: 0.8 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, y: -8, scale: 0.8 }}
              transition={{ duration: 0.18, ease: [0.22, 1, 0.36, 1] }}
              className="flex items-center justify-center"
            >
              <Sun className="size-[1.1rem]" />
            </motion.span>
          )
        ) : (
          /* Placeholder while SSR — prevents layout shift */
          <span className="size-[1.1rem]" />
        )}
      </AnimatePresence>
    </button>
  );
}
