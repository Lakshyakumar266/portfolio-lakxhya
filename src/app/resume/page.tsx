import { PDFViewer } from '@/components/extend/pdf-viewer';

function page() {
  return (
    <div className="mx-auto sm:px-6 pt-6 sm:pt-10 pb-10 sm:pb-12">
      <PDFViewer
        src="https://ik.imagekit.io/lksimgshub/portfolio_lakxhya.in/Lakshya_resume.pdf"
        className="h-160"
        showUpload={false}
        showRotateControls={false}
        defaultZoom={1.5}
      />
    </div>
  );
}

export default page;
