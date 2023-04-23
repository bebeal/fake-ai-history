import React from "react";
import styled from "styled-components";
import { Themes } from "../../utils/themes";
import { Box } from "@mui/material";
import { getGradients, gradientBorder } from "../../utils/utils";
import {
  TimelineItemDate,
  TimelineItemDateContainer,
} from "./TimelineItemDate";

export const TimelineItemEventContainer = styled.div<any>`
  width: 100%;
  height: auto;
  min-height: 100px;

  ${({ variant, gradientFrom, gradientTo }) => {
    const tagVariant = Themes[variant];
    if (tagVariant) {
      return `
            background-color: ${tagVariant.backgroundColor};
            color: ${tagVariant.color};
            ${
              gradientFrom &&
              gradientTo &&
              gradientBorder(gradientFrom, gradientTo, "0%", "100%", "2px")
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

export const TimelineItemEventContent = styled.div<any>`
  ${({ variant, gradientFrom, gradientTo }) => {
    const tagVariant = Themes[variant];
    if (tagVariant) {
      return `
            background-color: ${tagVariant.backgroundColor};
            color: ${tagVariant.color};
            ${
              gradientFrom &&
              gradientTo &&
              `background: linear-gradient(to bottom, ${gradientFrom}, ${gradientTo}); background-clip: text; -webkit-background-clip: text; -webkit-text-fill-color: transparent;`
            };
        `;
    }
  }}
`;

export const TimelineItemEventMargin = styled.div<any>`
  margin: 4px;
`;

export const TimelineItemEventDate = styled.div<any>`
  width: auto;
  height: 24px;
  display: flex;
  ${({ marginRight }) => (marginRight ? `margin-right: ${marginRight};` : "")}
  `;

export interface TimelineItemEventProps {
  children?: any;
  date?: string;
  variant?: string;
  borderRadius?: string;
  gradientFrom?: string;
  gradientTo?: string;
}

export const TimelineItemEvent = ({
  children,
  date,
  variant = "default",
  borderRadius = "4px",
  gradientFrom,
  gradientTo,
}: TimelineItemEventProps) => {
  const getDate = () => {
    const start = 8;
    const end = start + 24;
    const [gradientStart, gradientEnd] = getGradients(
      gradientFrom!,
      gradientTo!,
      start,
      end
    );
    return (
      <TimelineItemEventDate>
        <TimelineItemDate
          date={date}
          variant={variant}
          gradientFrom={gradientStart}
          gradientTo={gradientEnd}
        />
      </TimelineItemEventDate>
    );
  };

  return (
    <TimelineItemEventContainer
      variant={variant}
      borderRadius={borderRadius}
      gradientFrom={gradientFrom}
      gradientTo={gradientTo}
    >
      <TimelineItemEventMargin>
        {date && getDate()}
        <TimelineItemEventContent
          variant={variant}
          gradientFrom={gradientFrom}
          gradientTo={gradientTo}
        >
          {children}
        </TimelineItemEventContent>
      </TimelineItemEventMargin>
    </TimelineItemEventContainer>
  );
};

export default TimelineItemEvent;
