import React from "react";
import Markdown from "markdown-to-jsx";
import { Box, CardMedia, Paper, Typography } from "@mui/material";

export interface ImageProps {
  caption?: string;
  header?: string;
  src?: string;
  alt?: string;
  width?: string;

}

const Image: React.FC<ImageProps> = ({ 
    caption,
    header,
    src,
    alt,
    width="300px"
}) => {

  const getHeader = () => {
    return (<Typography gutterBottom variant="h5" component="h2">{header}</Typography>);
  }

  const getCaption = () => {
    return (<Typography variant="caption">{caption}</Typography>);
  }

  return (
    <Box sx={{ display: "flex", width: width, height: "auto", float: "left", margin: "0.25em 0.9em 0em 0em", border: "1px solid #c8ccd1", backgroundColor: "#f8f9fa" }} >
      <Box sx={{ padding: "4px", display: 'flex', overflow: "hidden" }}>
        <Typography>
        <CardMedia component={"img"} src={src} alt={alt} sx={{ outline: "1px solid #c8ccd1" }}/>
          <Box sx={{ padding: "6px", fontSize: "80%", textAlign: "center"}}>
            {header && getHeader()}
            {caption && getCaption()}
          </Box>
          </Typography>
      </Box>
    </Box>
  );
};

export default Image;
