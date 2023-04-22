import React from "react";
import { Box, Typography, styled } from "@mui/material";
import { isURL } from "../../utils/utils";

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
  font-weight:${(props: any) => props.label ? "600": "200"};
  color: ${(props: any) => props.label ? "#000000" : "#595959"};
  text-align:  ${(props: any) => props.label ? "left" : (props.center ? "center" : "right")};
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
  label?: boolean; // Set true if want top left bold label. Default is false which corresponds to bottom right footnote.
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

  const getCaption = () => {
    return (
      <Caption center={center} label={label} component="span">
        {getChild()}
      </Caption>
    )
  }

  // url=https://www.google.com, caption=Google -> <a href="https://www.google.com">Google</a>
  // url=https://www.google.com, caption= -> <a href="https://www.google.com">https://www.google.com</a>
  // url=, caption=https://www.google.com ->  <a href="https://www.google.com">Source</a>
  // url=, caption=Google -> Google
  const getChild = () => {
    if (url) {
      const text = caption ? caption : url;
      return (<a href={url} target={"_blank"} rel={"noreferrer"}>{text}</a>);
    } else if (isURL(caption)) {
      return (<a href={caption} target={"_blank"} rel={"noreferrer"}>Source</a>);
    } else {
      return caption
    }
  };

  // If label is false, then the caption is greyed and placed to the bottom right.
  const getFootnoteComponent = () => {
    return (
        <Container height={height} marginBottom={marginBottom}>
            {children}
            {getCaption()}
        </Container>
    )
  }

  // If label is true, then the caption is bolded and placed to the top left.
  const getLabeledComponent = () => {
    return (
        <Container height={height} marginBottom={marginBottom}>
            {getCaption()}
            {children}
        </Container>
    )
  }

  return (label ? getLabeledComponent() : getFootnoteComponent());
};

export default CaptionedComponent;

export const getLabeledCaptioned = (component: any, caption: string) => {
  return (
    <CaptionedComponent caption={caption} label={true}>
      {component}
    </CaptionedComponent>
  );
};