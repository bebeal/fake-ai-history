import React from "react";
import { Box, Typography } from "@mui/material";

interface EventResourcesProps {
  resources: any;
}

const EventResources: React.FC<EventResourcesProps> = ({ 
    resources, 
}) => {

  const getResource = (resource: any) => {
    return (<Typography component={'span'}>{resource}</Typography>)
  };

  return (
    <Box>
      {  resources.name && 
      resources.array.forEach((resource: any) => getResource(resource))
      }
    </Box>
  );
};

export default EventResources;
