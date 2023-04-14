import React from "react";
import { Box, Typography } from "@mui/material";
import { extractName } from "../../utils/utils";

interface EventResourcesProps {
  resources: any;
}

const EventResources: React.FC<EventResourcesProps> = ({ 
    resources, 
}) => {

  const getResource = (resource: any) => {
    // TODO: Add logic to render the resource based on type
    const site = extractName(resource.url);
    return (<Typography component={'span'}>{site}</Typography>)
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
