import React from "react";
import { Box, CardMedia, Paper, Typography } from "@mui/material";
import Captioned from "../Captioned/Captioned";

export interface ImageProps {
  caption?: string;
  header?: string;
  src?: string;
  alt?: string;
  width?: string;
  maxWidth?: string;
  source?: string;
  baseImage?: boolean;
}

const Image: React.FC<ImageProps> = ({
  caption,
  header,
  src,
  alt,
  width = "300px",
  maxWidth = "25%",
  source,
  baseImage = false,
}) => {
  const getHeader = () => {
    return (
      <Typography variant="h6" component="h2">
        {header}
      </Typography>
    );
  };

  const getCaption = () => {
    return (
      <Typography variant="caption" component={"span"}>
        {caption}
      </Typography>
    );
  };

  const getText = () => {
    return (
      <Box
        sx={{
          padding: "0px 6px 0px 6px",
          margin: "0px",
          fontSize: "60%",
          textAlign: "center",
          width: "100%",
        }}
      >
        {header && getHeader()}
        {caption && getCaption()}
      </Box>
    );
  };

  return (
    <Box
    justifyContent={"center"}
    sx={{
      display: "flex",
      width: "auto",
      maxWidth: { maxWidth },
      height: "auto",
      float: "left",
      margin: "auto 5px auto 0px",
      border: "1px solid #c8ccd1",
      backgroundColor: "#f8f9fa",
    }}
  >
    <Box
      sx={{
        padding: "4px",
        display: "flex",
        overflow: "hidden",
        backgroundColor: "white",
      }}
    >
      <Typography width={"100%"}>
        <Captioned caption={source} marginBottom={"0px"}>
          <CardMedia
            component={"img"}
            src={src}
            alt={alt}
            sx={{ outline: "1px solid #c8ccd1", width: "100%" }}
          />
        </Captioned>
        {(caption || header) && getText()}
      </Typography>
    </Box>
  </Box>
  );
};

export default Image;
