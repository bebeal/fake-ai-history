import React, { useState } from "react";
import Research, { ResearchPiece } from "./Research";
import Grid from '@mui/material/Unstable_Grid2';


interface ResearchListProps {
  researchList: ResearchPiece[];
}

const ResearchList: React.FC<ResearchListProps> = ({
  researchList,
}) => {

  const getResearchPiece = (researchPiece: any, collapsed: boolean = false) => {
    return (
      <Grid xs={true}>
        <Research researchPiece={researchPiece} collapsed={collapsed} />
      </Grid>
    )
  };
  
  return (
    <Grid container flexDirection={'column'} flexWrap="nowrap" sx={{ overflow: 'auto'}}>
      {researchList.length > 0 && researchList.map((researchPiece: any) => getResearchPiece(researchPiece))}
    </Grid>
  );
};

export default ResearchList;