import React from "react";
import { Box, Typography } from "@mui/material";

interface EventModelProps {
  model: any;
}

const EventModel: React.FC<EventModelProps> = ({ 
    model 
}) => {

  const getModelName = () => {
    return (<Typography component={'span'}>{model.name}</Typography>)
  };

  return (
    <Box>
      {model.name && getModelName()}
    </Box>
  );
};

export default EventModel;
