'use client';

import { PDFViewer } from '@/components/extend/pdf-viewer';
import { useCallback, useEffect, useState } from 'react';

function Page() {
  const [isMobile, setIsMobile] = useState(false);
  const resolveScrollAreaViewport = useCallback((container: HTMLDivElement) => {
    const viewport = container.querySelector<HTMLDivElement>(
      '[data-slot="scroll-area-viewport"]',
    );
    viewport?.setAttribute('data-lenis-prevent', '');
    return viewport;
  }, []);

  useEffect(() => {
    const mediaQuery = window.matchMedia('(max-width: 639px)');
    const updateMobileState = () => setIsMobile(mediaQuery.matches);
    updateMobileState();
    mediaQuery.addEventListener('change', updateMobileState);
    return () => mediaQuery.removeEventListener('change', updateMobileState);
  }, []);

  return (
    <section className="mx-auto flex w-full max-w-3xl min-w-0 flex-1 flex-col px-3 pt-6 pb-8 sm:px-6 sm:pt-10 sm:pb-12">
      {/* Cool Section Header */}
      <div className="mb-4 space-y-1">
        <h2 className="text-2xl sm:text-3xl font-bold tracking-tight text-foreground font-schibsted">
          Resume
        </h2>
        <p className="text-sm text-muted-foreground font-inter max-w-md">
          View and download my professional resume.
        </p>
      </div>
      <PDFViewer
        src="https://ik.imagekit.io/lksimgshub/portfolio_lakxhya.in/lakshya_resume_alt.pdf"
        className="h-[calc(100svh-14rem)] min-h-112 max-h-160 sm:h-160 sm:min-h-0"
        showUpload={false}
        showRotateControls={false}
        defaultZoom={1.25}
        fileName="lakshya_kumar_resume.pdf"
        showSearchControls={false}
        showToolbar={!isMobile}
        resolveScrollAreaViewport={resolveScrollAreaViewport}
      />
    </section>
  );
}

export default Page;
