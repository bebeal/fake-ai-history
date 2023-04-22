import React from "react";
import { Box, CardMedia, Typography, styled } from "@mui/material";
import Captioned from "../Captioned/Captioned";

export interface ContentProps {
  src?: string;
  header?: string;
  caption?: string;
  content_source?: string;
  alt?: string;
  width?: string;
  maxWidth?: string;
}

const StyledBox = styled(Box)`
  display: flex;
  justify-content: center;
  width: ${(props: any) => props.width || "25%"};
  height: auto;
  border: 1px solid #c8ccd1;
  background-color: #f8f9fa;
`;

const ContentBox = styled(Box)`
  padding: 4px;
  display: flex;
  width: 100%;
  overflow: hidden;
  background-color: white;
`;

const TextWrapper = styled(Box)`
  padding: 0px 6px;
  margin: 0px;
  font-size: 60%;
  text-align: center;
  width: 100%;
`;

const StyledCardMedia = styled(CardMedia)<any>`
  outline: 1px solid #c8ccd1;
  width: 100%;
`;

const Content: React.FC<ContentProps> = ({
  src,
  header,
  caption,
  content_source,
  alt,
  width = "100%",
  maxWidth = "25%",
}) => {
  const getHeader = () => (
    <Typography variant="h6" component="h2">
      {header}
    </Typography>
  );

  const getCaption = () => (
    <Typography variant="caption" component={"span"}>
      {caption}
    </Typography>
  );

  const getText = () => (
    <TextWrapper>
      {header && getHeader()}
      {caption && getCaption()}
    </TextWrapper>
  );

  const getMedia = () => {
    return <StyledCardMedia component={"img"} src={src} alt={alt} />
  };

  const getContentSource = (child: any) => {
    return (
      <Captioned caption={content_source} marginBottom={"0px"}>
        {child}
      </Captioned>
    )
  };

  const getContent = () => (
    <ContentBox>
      <Typography width={"100%"} component={"span"}>
        {(content_source && getContentSource(getMedia())) || getMedia()}
        {(caption || header) && getText()}
      </Typography>
    </ContentBox>
  );

  return <StyledBox width={width}>{getContent()}</StyledBox>;
};

export default Content;
