import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Resume',
  description:
    "View and download Lakshya Kumar's professional resume, skills, experience, and background.",
  alternates: { canonical: '/resume' },
  openGraph: {
    title: 'Resume | Lakshya Kumar',
    description:
      "View and download Lakshya Kumar's professional resume, skills, experience, and background.",
    url: '/resume',
    type: 'profile',
  },
};

export default function ResumeLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return children;
}
