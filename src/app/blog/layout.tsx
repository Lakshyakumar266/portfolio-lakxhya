import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Blog',
  description:
    "Read Lakshya Kumar's notes, experiments, lessons, and honest thoughts on building with technology.",
  alternates: { canonical: '/blog' },
  openGraph: {
    title: 'Blog | Lakshya Kumar',
    description:
      "Read Lakshya Kumar's notes, experiments, lessons, and honest thoughts on building with technology.",
    url: '/blog',
    type: 'website',
  },
};

export default function BlogLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return children;
}
