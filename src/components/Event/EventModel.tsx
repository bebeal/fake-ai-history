import React from "react";
import { Box, Grid, Typography } from "@mui/material";
import Captioned from "../Captioned/Captioned";

interface EventModelProps {
  model: any;
}

const EventModel: React.FC<EventModelProps> = ({ 
    model 
}) => {


  const getItem = (component: any, caption: string, label: boolean) => {
    return (
      <div style={{marginRight: "16px", height: "100%"}}>
        {getCaptioned(component, caption, label)}
      </div>
    );
  };


  const getCaptioned = (component: any, caption: string, label: boolean) => {
    return (
      <Captioned caption={caption} label={label}>
        {component}
      </Captioned>
    );
  };

  const getProperty = (name: any) => {
    return (
      <Typography
        variant="subtitle2"
        width="auto"
        maxWidth="100%"
        fontSize={"14px"}
      >
        {model[name]}
      </Typography>
    );
  }

  const getName = () => {
    return getProperty("name");
  };

  const getArchitecture = () => {
    return getProperty("architecture");
  };

  const getNumParams = () => {
    return getProperty("num_params");
  };

  const getRow = (components: any[], captions: string[], labels: boolean[]) => {
    return (
      <Box margin="0px" padding="0px" display="inline-flex" height="auto">
        {components.map((component, index) => getItem(component, captions[index], labels[index]))}
      </Box>
    )
  };

  return (
    <Box display="flex" justifyContent={"center"} alignItems={"center"}>
      <Box sx={{ width: '95%', maxHeight: '300px' }}>
        <Grid
          item
          display="flex"
          flexDirection="column"
          padding="0px"
          flex={"1"}
          flexGrow={"1"}
          textAlign={"left"}
        >
          {getRow([getName(), getArchitecture(), getNumParams()], ["Name", "Architecture", "Num Params"], [true, true, true])}
        </Grid>
      </Box>
    </Box>
  );
};

export default EventModel;
