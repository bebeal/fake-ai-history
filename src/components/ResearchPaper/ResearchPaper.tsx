import React, { useRef, useState } from "react";
import { Box, CircularProgress, Paper, Typography, Card, CardContent, CardMedia } from "@mui/material";
import Grid2 from "@mui/material/Unstable_Grid2/Grid2";
import { Document, Outline, Page, pdfjs } from 'react-pdf';
pdfjs.GlobalWorkerOptions.workerSrc = `//cdnjs.cloudflare.com/ajax/libs/pdf.js/${pdfjs.version}/pdf.worker.js`;

interface ResearchPaperProps {
  paper: any;
}

const ResearchPaper: React.FC<ResearchPaperProps> = ({
  paper,
}) => {
  // const gridRef = useRef<HTMLDivElement>(null);
  const [currentPage, setCurrentPage] = useState<number>(1);
  const [numPages, setNumPages] = useState<number>(0);
  const [height, setHeight] = React.useState<number>(0);

  const onDocumentLoadSuccess = ({ numPages: nextNumPages }: { numPages: number }) => {
    setNumPages(nextNumPages);
    // setHeight(gridRef?.current?.getBoundingClientRect().height || height);
  };

  const getPaper = () => {
    return (
      <Box sx={{border: "1px solid black"}}>
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
      </Box>
    )
  };

  const getPaperInfo = () => {
    return (
      <Box display="flex" flexDirection="column" maxWidth="500px">
        <Typography gutterBottom variant="subtitle2">{paper.title}</Typography>
        <Typography gutterBottom variant="caption">{paper.authors}</Typography>
        <Typography sx={{textOverflow: "ellipsis", overflow:"hidden", whiteSpace: "nowrap" }}>{paper.abstract}</Typography>
      </Box>
    );
  };

  const handleHeightChange = React.useCallback(
    (node: HTMLDivElement | null) => {
      if (node) {
        setHeight(node.getBoundingClientRect().height);
      }
    },
    [setHeight]
  );
  
  return (
    <Grid2 container xs={12} spacing={1} flexWrap={"nowrap"} flexGrow={1}>
      <Grid2
        xs={"auto"}
        sx={{ height: "100%" }}
        flexDirection={"column"}
        ref={handleHeightChange}
      >
        {getPaper()}
      </Grid2>
      <Grid2
        container
        xs={true}
        sx={{ maxHeight: height }}
      >
        {getPaperInfo()}
      </Grid2>
    </Grid2>
  );
};

export default ResearchPaper;