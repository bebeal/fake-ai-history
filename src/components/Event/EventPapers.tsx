import React from "react";
import { Box, CircularProgress, ImageList, ImageListItem, Typography } from "@mui/material";
import Image from '../Image/Image';
import ResearchPaper from '../ResearchPaper/ResearchPaper';
import { Document, Outline, Page, pdfjs } from 'react-pdf';
import ResearchPaperList from "../ResearchPaper/ResearchPaperlist";

interface EventPapersProps {
  papers: any;
}

const EventPapers: React.FC<EventPapersProps> = ({ 
  papers,
}) => {
  return (
    <ResearchPaper paper={papers[0]} />
  );
};

export default EventPapers;
