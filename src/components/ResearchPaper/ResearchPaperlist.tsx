import React, { useState } from "react";
import { Box, CircularProgress, ImageList, ImageListItem, Paper, Typography } from "@mui/material";
import { Document, Outline, Page, pdfjs } from 'react-pdf';
import ResearchPaper from "./ResearchPaper";
import Grid from '@mui/material/Unstable_Grid2';


interface ResearchPaperListProps {
  papers: any;
}

const ResearchPaperList: React.FC<ResearchPaperListProps> = ({
  papers,
}) => {

  const getPaper = (paper: any) => {
    return (
      <Grid xs={true}>
        <ResearchPaper paper={paper} />
      </Grid>
    )
  };
  
  return (
    <Grid container spacing={2} flexDirection={'row'} flexWrap="nowrap" sx={{ overflow: 'auto'}}>
      {papers.length > 0 && papers.map((paper: any) => getPaper(paper))}
    </Grid>
  );
};

export default ResearchPaperList;