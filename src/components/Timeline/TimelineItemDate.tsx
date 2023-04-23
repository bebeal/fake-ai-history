import moment from "moment";
import React, { useEffect } from "react";
import styled from "styled-components";
import { Themes } from "../../utils/themes";

export const TimelineItemDateContainer = styled.time<any>`
  height: auto;
  font-weight: ${(props: any) => props.expanded ? "600" :  "400"};
  padding: 2px;
  z-index: 100;
  align-self: center; 

  ${({ variant, gradientFrom, gradientTo, expanded }) => {
    const tagVariant = Themes[variant];
    if (tagVariant) {
      if (expanded) {
        return `
            background-color: ${tagVariant.color};
            color: ${tagVariant.backgroundColor};
            border: 1px solid ${tagVariant.color};
        `;
      }
      return `
            background-color: ${tagVariant.borderColor};
            color: ${tagVariant.backgroundColor};
            ${
              gradientFrom &&
              gradientTo &&
              `background-image: linear-gradient(to bottom, ${gradientFrom}, ${gradientTo});`
            };
        `;
    }
  }}
  ${({ backgroundColor }) =>
    backgroundColor ? `background-color: ${backgroundColor};` : ""}
    ${({ border }) => (border ? `border: ${border};` : "")}
    ${({ borderRadius }) =>
    borderRadius ? `border-radius: ${borderRadius};` : ""}
    ${({ color }) => (color ? `color: ${color};` : "")}
    ${({ fontSize }) => (fontSize ? `font-size: ${fontSize};` : "")}
`;

interface TimelineItemDateProps {
  date?: any;
  formats?: string[];
  variant?: string;
  backgroundColor?: string;
  border?: string;
  borderRadius?: string;
  color?: string;
  fontSize?: string;
  gradientFrom?: string;
  gradientTo?: string;
  expanded? : boolean;
}

export const TimelineItemDate = ({
  date,
  formats = ["MM/DD/YYYY", "MM/YYYY", "YYYY"],
  variant = "ghost",
  backgroundColor,
  border,
  borderRadius = "4px",
  color,
  fontSize = "0.85rem",
  gradientFrom,
  gradientTo,
  expanded = false,
}: TimelineItemDateProps) => {
  const [format, setFormat] = React.useState<number>(0);

  const changeFormat = (format: number) => {
    setFormat(format % formats.length);
  };

  const updateFormat = () => {
    if (window.innerWidth < 400) {
      changeFormat(3);
    } else if (window.innerWidth < 768) {
      changeFormat(2);
    } else if (window.innerWidth < 1500) {
      changeFormat(1);
    } else {
      changeFormat(0);
    }
  };

  useEffect(() => {
    updateFormat();
    window.addEventListener("resize", updateFormat);

    return () => {
      window.removeEventListener("resize", updateFormat);
    };
  }, []);

  return (
    <TimelineItemDateContainer
      variant={variant}
      backgroundColor={backgroundColor}
      border={border}
      borderRadius={borderRadius}
      color={color}
      fontSize={fontSize}
      gradientFrom={gradientFrom}
      gradientTo={gradientTo}
      expanded={expanded}
    >
      {moment(date).format(formats[format])}
    </TimelineItemDateContainer>
  );
};
