import React, { useState } from "react";
import { CircularProgress } from "@mui/material";
import { Document, Outline, Page, pdfjs } from 'react-pdf';


interface PaperProps {
  paper: any;
}

const Paper: React.FC<PaperProps> = ({
  paper,
}) => {
  const [currentPage, setCurrentPage] = useState<number>(1);
  const [numPages, setNumPages] = useState<number>(0);

  const onDocumentLoadSuccess = ({ numPages: nextNumPages }: { numPages: number }) => {
    setNumPages(nextNumPages);
  };

  
  return (
    <Document 
      file={paper.url_pdf} 
      loading={<CircularProgress />}
      onLoadSuccess={onDocumentLoadSuccess}
    >
      <Page 
        pageNumber={currentPage} 
        renderTextLayer={false} 
        renderAnnotationLayer={false}
        renderMode="canvas"
        height={300}
        scale={1}
      />
    </Document>
  );
};

export default Paper;