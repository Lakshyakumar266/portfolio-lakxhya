import type { Metadata } from 'next';
import { Inter, Schibsted_Grotesk, Geist } from 'next/font/google';
import './globals.css';
import { ThemeProvider } from '@/hooks/theme-provider';
import { SmoothScroll } from '@/components/smooth-scroll';
import Navbar from '@/components/Navbar';
import Footer from '@/components/footer';

const inter = Inter({
  subsets: ['latin'],
  variable: '--font-inter',
  display: 'swap',
});

const schibsted = Schibsted_Grotesk({
  subsets: ['latin'],
  variable: '--font-schibsted',
  display: 'swap',
});

const geist = Geist({
  subsets: ['latin'],
  variable: '--font-geist',
  display: 'swap',
});

export const metadata: Metadata = {
  title: 'Lakshya Kumar',
  description: 'Lakshya Kumar - developer, builder, and Founder.',
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      suppressHydrationWarning
      className={`${inter.variable} ${schibsted.variable} ${geist.variable} h-full antialiased`}
    >
      <body className="min-h-full flex flex-col" suppressHydrationWarning>
        <ThemeProvider
          attribute="class"
          defaultTheme="system"
          enableSystem
          disableTransitionOnChange
        >
          <SmoothScroll />

          <Navbar />
          {children}
          {/* FOOTER */}
          <Footer />
        </ThemeProvider>
      </body>
    </html>
  );
}
