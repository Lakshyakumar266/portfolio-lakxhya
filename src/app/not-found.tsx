import type { Metadata } from 'next';
import Link from 'next/link';

export const metadata: Metadata = {
  title: '404 — Page Not Found',
  description: 'Page not found.',
};

export default function NotFound() {
  return (
    <section className="mx-auto max-w-3xl px-4 sm:px-6 py-20 sm:py-28">
      <div className="rounded-2xl border border-dashed border-neutral-300 dark:border-neutral-800 p-8 sm:p-12">
        <span className="font-mono text-xs text-neutral-400 dark:text-neutral-500 tracking-wider">
          404
        </span>
        <h1 className="mt-2 text-2xl sm:text-3xl font-bold tracking-tight text-foreground font-schibsted">
          Page not found
        </h1>
        <p className="mt-2 text-sm text-muted-foreground font-inter max-w-md leading-relaxed">
          The page you are looking for doesn&apos;t exist, was removed, or the
          link might be broken.
        </p>

        <div className="mt-6 flex items-center gap-4">
          <Link
            href="/"
            className="inline-flex items-center gap-1.5 text-sm font-inter font-medium text-foreground hover:underline underline-offset-4 transition-colors"
          >
            <span>&larr;</span> Back to home
          </Link>
        </div>
      </div>
    </section>
  );
}
