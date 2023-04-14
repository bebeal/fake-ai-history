import React from "react";
import { Box, Typography, styled } from "@mui/material";
import EventIcon from '@mui/icons-material/Event';
const Container = styled<any>(Box)`
  position: relative;
  width: auto;
  height: ${(props: any) => props.height};
  margin-bottom: ${(props: any) => props.marginBottom};
`;

const Caption = styled<any>(Typography)`
  position: relative;
  line-height: 1;
  bottom: 0;
  right: 0;
  font-weight: ${(props: any) => props.label ? "600" : "200"};
  color: ${(props: any) => props.label ? "#000000" : "#595959"};
  text-align:  ${(props: any) => props.label ? "left" : props.center ? "center" : "right"};
  font-size: 0.5rem;
  display: block;
  margin-right: ${(props: any) => props.label ? "0" : "0.8%"};
  margin-left: 0;
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;

  a {
    color: #595959;
  }

  a:hover {
    color: #595959;
    text-decoration: underline;
  }
`;

export interface CaptionedProps {
  caption?: string;
  url?: string;
  children?: React.ReactNode;
  center?: boolean;
  label?: boolean;
  height?: string;
  marginBottom?: string;
}

const CaptionedComponent = ({
  caption = "",
  url = "",
  children,
  center = false,
  label = false,
  height = "auto",
  marginBottom = "4px",
}: CaptionedProps) => {
  const isUrl = (caption: string) => {
    const pattern = /^(https?:\/\/)?[\w\-]+(\.[\w\-]+)+[/#?]?.*$/;
    return pattern.test(caption);
  };

  const renderCaption = () => {
    if (url && !caption) {
      return (
        <Caption center={center} label={label}>
          <a href={url}>{url}</a>
        </Caption>
      );
    } else if (isUrl(caption)) {
      return (
        <Caption center={center} label={label}>
          <a href={caption}>Source</a>
        </Caption>
      );
    } else {
      return <Caption center={center} label={label}>{caption}</Caption>;
    }
  };

  const renderCaptionedComponent = () => {
    return (
        <Container height={height} marginBottom={marginBottom}>
            {children}
            {renderCaption()}
        </Container>
    )
  }

  const renderLabeledComponent = () => {
    return (
        <Container height={height} marginBottom={marginBottom}>
            {renderCaption()}
            {children}
        </Container>
    )
  }

  return (label ? renderLabeledComponent() : renderCaptionedComponent());
};

export default CaptionedComponent;
