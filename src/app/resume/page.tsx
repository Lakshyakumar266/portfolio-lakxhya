'use client';

import { PDFViewer } from '@/components/extend/pdf-viewer';
import { useCallback } from 'react';

function Page() {
  const resolveScrollAreaViewport = useCallback((container: HTMLDivElement) => {
    const viewport = container.querySelector<HTMLDivElement>(
      '[data-slot="scroll-area-viewport"]',
    );
    viewport?.setAttribute('data-lenis-prevent', '');
    return viewport;
  }, []);

  return (
    <div className="mx-auto flex-1 pt-4 pb-10 sm:px-6 sm:pt-10 sm:pb-12">
      <PDFViewer
        src="https://ik.imagekit.io/lksimgshub/portfolio_lakxhya.in/Lakshya_resume.pdf"
        className="h-160"
        showUpload={false}
        showRotateControls={false}
        defaultZoom={1.25}
        fileName="lakshya_kumar_resume.pdf"
        resolveScrollAreaViewport={resolveScrollAreaViewport}
      />
    </div>
  );
}

export default Page;
