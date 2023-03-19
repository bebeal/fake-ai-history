import React from "react";
import { Box, CircularProgress, ImageList, ImageListItem, Typography } from "@mui/material";
import Image from '../Image/Image';
import Paper from '../Paper/Paper';
import { Document, Outline, Page, pdfjs } from 'react-pdf';
pdfjs.GlobalWorkerOptions.workerSrc = `//cdnjs.cloudflare.com/ajax/libs/pdf.js/${pdfjs.version}/pdf.worker.js`;

interface EventPapersProps {
  papers: any;
}

const EventPapers: React.FC<EventPapersProps> = ({ 
  papers,
}) => {

  const getPaper = (paper: any) => {
    return (
      <ImageListItem>
        <Paper paper={paper} />
      </ImageListItem>
    )
  };

  return (
    <ImageList
      sx={{
        gridAutoFlow: "column",
        gridTemplateColumns: "repeat(auto-fit, minmax(160px,1fr)) !important",
        gridAutoColumns: "minmax(160px, 1fr)"
      }}
    >
      {papers.length > 0 && papers.map((paper: any) => getPaper(paper))}
    </ImageList>
  );
};

export default EventPapers;
