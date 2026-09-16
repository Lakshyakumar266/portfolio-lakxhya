import React from 'react';

function Page() {
  return (
    <section className="mx-auto flex w-full max-w-3xl min-w-0 flex-1 flex-col px-3 pt-6 pb-8 sm:px-6 sm:pt-10 sm:pb-12">
      {/* Cool Section Header */}
      <div className="mb-4 space-y-1">
        <h2 className="text-2xl sm:text-3xl font-bold tracking-tight text-foreground font-schibsted">
          Proof Of Work
        </h2>
        <p className="text-sm text-muted-foreground font-inter max-w-md">
          Proof of work showcasing the projects I’ve built and the work I’ve
          done across different companies.
        </p>
      </div>
      <div>none</div>
    </section>
  );
}

export default Page;
