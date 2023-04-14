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
    <Box display="flex" justifyContent={"center"} alignItems={"center"}>
      <Box sx={{ width: '95%', maxHeight: '300px' }}>
          {papers.map((paper: any) => <ResearchPaper paper={paper} />)}
      </Box>
    </Box>
  );
};

export default EventPapers;
