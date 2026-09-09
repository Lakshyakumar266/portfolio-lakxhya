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
export interface ModeToggleProps extends React.ComponentProps<'button'> {
  variant?: 'outline' | 'ghost';
  iconClassName?: string;
}

export function ModeToggle({
  className,
  variant = 'ghost',
  iconClassName,
  ...props
}: ModeToggleProps) {
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
        'inline-flex items-center justify-center text-sm font-medium',
        'focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring',
        'disabled:pointer-events-none disabled:opacity-50',
        'overflow-hidden relative cursor-pointer',
        variant === 'ghost'
          ? 'rounded-lg text-muted-foreground hover:text-foreground hover:bg-neutral-100 dark:hover:bg-neutral-800/60 transition-colors duration-150'
          : 'rounded-md size-9 border border-input bg-background shadow-sm hover:bg-accent hover:text-accent-foreground transition-colors duration-150',
        className,
      )}
      {...props}
    >
      {/* AnimatePresence swaps icons with a vertical slide */}
      <AnimatePresence mode="popLayout" initial={false}>
        {mounted ? (
          isDark ? (
            <motion.span
              key="sun"
              initial={{ opacity: 0, y: 8, scale: 0.8 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, y: -8, scale: 0.8 }}
              transition={{ duration: 0.18, ease: [0.22, 1, 0.36, 1] }}
              className="flex items-center justify-center"
            >
              <Sun className={cn('size-[1.1rem]', iconClassName)} />
            </motion.span>
          ) : (
            <motion.span
              key="moon"
              initial={{ opacity: 0, y: 8, scale: 0.8 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, y: -8, scale: 0.8 }}
              transition={{ duration: 0.18, ease: [0.22, 1, 0.36, 1] }}
              className="flex items-center justify-center"
            >
              <Moon className={cn('size-[1.1rem]', iconClassName)} />
            </motion.span>
          )
        ) : (
          /* Placeholder while SSR — prevents layout shift */
          <span className={cn('size-[1.1rem]', iconClassName)} />
        )}
      </AnimatePresence>
    </button>
  );
}
