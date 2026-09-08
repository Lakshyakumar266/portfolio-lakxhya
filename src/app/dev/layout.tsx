import React from 'react';

export default function layout({ children }: { children: React.ReactNode }) {
  if (process.env.NEXT_PUBLIC_ENV === 'production') {
    return <>Opp&apos;s, you&apos;re not supposed to be here</>;
  }
  return (
    <div className="flex flex-col items-center justify-center h-screen">
      {children}
    </div>
  );
}
