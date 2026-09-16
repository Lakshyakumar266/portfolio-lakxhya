import React from 'react';

function Page() {
  return (
    <section className="mx-auto flex w-full max-w-3xl min-w-0 flex-1 flex-col px-3 pt-6 pb-8 sm:px-6 sm:pt-10 sm:pb-12">
      {/* Cool Section Header */}
      <div className="mb-4 space-y-1">
        <h2 className="text-2xl sm:text-3xl font-bold tracking-tight text-foreground font-schibsted">
          Read Blog&apos;s
        </h2>
        <p className="text-sm text-muted-foreground font-inter max-w-md">
          Crazy ASS things which im not proud of but wanna show of...
        </p>
      </div>
      <div>none</div>
    </section>
  );
}

export default Page;
