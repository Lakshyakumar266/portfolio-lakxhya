import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Proof of Work',
  description:
    "Explore Lakshya Kumar's projects, products, and engineering work across different companies.",
  alternates: { canonical: '/work' },
  openGraph: {
    title: 'Proof of Work | Lakshya Kumar',
    description:
      "Explore Lakshya Kumar's projects, products, and engineering work across different companies.",
    url: '/work',
    type: 'website',
  },
};

export default function WorkLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return children;
}
