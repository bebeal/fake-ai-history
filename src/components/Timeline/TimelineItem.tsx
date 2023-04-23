import React from "react";
import styled from "styled-components";
import { TimelineItemDate } from "./TimelineItemDate";
import TimelineItemMarker from "./TimelineItemMarker";
import TimelineItemEvent from "./TimelineItemEvent";
import {
  getGradients,
  interpolateGradientInLinearRGB,
} from "../../utils/utils";
import { Themes } from "../../utils/themes";

export const EmptyTimelineItem = styled.div<any>`
  position: relative;
  display: flex;
  height: 100px;
  margin: 10px 0px;
`;

export const TimelineItemContainer = styled(EmptyTimelineItem)<any>`
  z-index: 50;
`;

export const TimelineItemColumn = styled.div<any>`
  display: ${(props: any) => props.display || "flex"};
  flex-direction: column;
  align-items: center;
  justify-content: center;
  margin: 0px 4px;
  ${({ flexGrow }) => (flexGrow ? `flex-grow: ${flexGrow};` : "")}
  ${({ overflow }) => (overflow ? `overflow: ${overflow};` : "")}
`;

interface TimelineItemProps {
  date?: string;
  variant?: string;
  gradientFrom?: string;
  gradientTo?: string;
}

const TimelineItem = ({
  date,
  variant = "grey",
  gradientFrom,
  gradientTo,
}: TimelineItemProps) => {
  if (!gradientFrom || !gradientTo) {
    gradientFrom = Themes[variant].backgroundColor;
    gradientTo = Themes[variant].backgroundColor;
  }

  const getMarker = () => {
    const [gradientStart, gradientEnd] = getGradients(
      gradientFrom!,
      gradientTo!,
      40,
      60
    );
    return (
      <TimelineItemMarker
        variant={variant}
        gradientFrom={gradientStart}
        gradientTo={gradientEnd}
      />
    );
  };

  return (
    <TimelineItemContainer>
      {/* <TimelineItemColumn display={"none"}>
                <TimelineItemDate date={date} variant={variant} />
            </TimelineItemColumn> */}
      <TimelineItemColumn>{getMarker()}</TimelineItemColumn>
      <TimelineItemColumn flexGrow={"1"} overflow={"auto"}>
        <TimelineItemEvent
          date={date}
          variant={variant}
          gradientFrom={gradientFrom}
          gradientTo={gradientTo}
        >
          Test test test test
        </TimelineItemEvent>
      </TimelineItemColumn>
    </TimelineItemContainer>
  );
};

export default TimelineItem;
