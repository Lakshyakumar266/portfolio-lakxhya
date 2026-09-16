import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Experimental',
  description:
    "Browse Lakshya Kumar's experimental projects, prototypes, and playful technical explorations.",
  alternates: { canonical: '/experimental' },
  openGraph: {
    title: 'Experimental | Lakshya Kumar',
    description:
      "Browse Lakshya Kumar's experimental projects, prototypes, and playful technical explorations.",
    url: '/experimental',
    type: 'website',
  },
};

export default function ExperimentalLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return children;
}
