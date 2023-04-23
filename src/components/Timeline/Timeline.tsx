import React from "react";
import moment from "moment";
import styled from "styled-components";
import TimelineItem, { EmptyTimelineItem } from "./TimelineItem";
import { Themes } from "../../utils/themes";
import { getDateInBetween, interpolateGradientInLinearRGB, normalize } from "../../utils/utils";

export const TimelineContainer = styled.div<any>`
  position: relative;
  display: flex;
  flex-direction: column;
  line-height: normal;
  width: 100%;
`;

export const TimelineItemWrapper = styled.div<any>`
  z-index: -100;
  height: 100%;
  justify-content: center;
  ${({ theme }) => {
    if (theme) {
      return `
        background-color: #d8d8d8;
      `;
    }
  }}
`;

export const TimelineInternalWrapper = styled.div<any>`
  z-index: -100;
  top: -20%;
  height: 120%;
  justify-content: center;
  ${({ theme }) => {
    if (theme) {
      return `
        background-color: #d8d8d8;
      `;
    }
  }}
`;

export const TimelineTrackLine = styled.div<any>`
  position: absolute;
  left: ${(props) => props.left || "13.5px"};
  top: ${(props) => props.top || "0"};
  content: ${(props) => props.content || "''"};
  width: ${(props) => props.width || "2px"};
  height: ${(props) => props.height || "100%"};

  ${({ gradientFrom, gradientTo }) => {
    if (gradientFrom && gradientTo) {
      return `
        background-image: linear-gradient(to bottom, ${gradientFrom}, ${gradientTo});
      `;
    }
  }}
  ${({ backgroundColor }) =>
    backgroundColor ? `background-color: ${backgroundColor};` : ""}
`;

export interface TimelineItemProps {
  events?: any;
  variant?: string;
}

export const Timeline = ({ events, variant = "grey2" }: TimelineItemProps) => {
  const tagVariant = Themes[variant];
  // Find the start and end dates of the timeline
  const startDate = moment(events[0].date);
  const endDate = moment(events[events.length - 1].date);
  const totalDuration = endDate.diff(startDate, "days");

  const calculateGradientFromDate = (eventDate: any) => {
    const daysFromStart = eventDate.diff(startDate, "days");
    const value = normalize(daysFromStart, 0, totalDuration);

    return interpolateGradientInLinearRGB(
      tagVariant.gradientFrom,
      tagVariant.gradientTo,
      value
    );
  };

  const getDate = (baseIndex: number) => {
    let prevDate = events[baseIndex - 1].date;
    if (!prevDate) {
      prevDate = getDate(baseIndex - 1)[1];
    }
    let date = events[baseIndex].date;
    // special case, if date is empty, split difference between prev and next
    if (!date) {
      let index = baseIndex;
      while (!date) {
        index++;
        date = events[index].date;
      }
      date = getDateInBetween(prevDate, date);
    }

    return [prevDate, date];
  };

  const getGradients = (index: number) => {
    if (index === 0 || index === events.length - 1) {
      const gradient = calculateGradientFromDate(moment(events[index].date));
      return [gradient, gradient];
    } else {
      const [prevDate, date] = getDate(index);
      return [
        calculateGradientFromDate(moment(prevDate)),
        calculateGradientFromDate(moment(date)),
      ];
    }
  };

  const getEvent = (event: any, index: any) => {
    const [gradientFrom, gradientTo] = getGradients(index);
    const height = `calc(100% / ${events.length})`;
    const top = `calc(${height} * ${index})`;
    // if no date, render empty timeline item to keep track gradient line smooth
    const date = events[index].date;
    return (
      <React.Fragment key={index}>
        <TimelineInternalWrapper>
        <TimelineTrackLine
          key={index}
          gradientFrom={gradientFrom}
          gradientTo={gradientTo}
          height={height}
          top={top}
        />
        {date ? <TimelineItem
          {...event}
          variant={variant}
          gradientFrom={gradientFrom}
          gradientTo={gradientTo}
        /> : <EmptyTimelineItem />}
        </TimelineInternalWrapper>
      </React.Fragment>
    );
  };

  return (
    <TimelineContainer>
      {events.map((event: any, index: number) => getEvent(event, index))}
    </TimelineContainer>
  );
};
