import React, { ReactNode, useEffect, useMemo, useState } from 'react';
import moment from 'moment';

import Event, { EventProps } from '../Event/Event';
import styled from 'styled-components';
import { isDate } from '../../utils/utils';
import TimelineDate from './TimelineDate';

const TimelineContainer = styled.div`
  position: relative;
  display: flex;
  flex-direction: column;
  line-height: normal;
  width: 100%;

  ::after {
    position: absolute;
    left: ${(props: any) => props.left || "119px"};
    width: ${(props: any) => props.width || "2px"};
    height: ${(props: any) => props.height || "100%"};
    background-color: ${(props: any) => props.backgroundColor || "#777777"};
    content: ${(props: any) => props.content || "''"};
  }
`

const TimelineItemContainer = styled.div`
    position: relative;
    display: flex;
    margin-bottom: 20px;
    margin-top: 20px;

    :nth-child(1): {
      margin-top: 20px;
    }

    :nth-child(event) {
      flex-direction: ${(props: any) => props.flexDirection || "row"};
    }
`

const TimelineItemDate = styled.div`
    display: flex;
    flex-direction: column;
    flex-basis: 100px;
    justify-content: center;
    align-items: flex-end;
    z-index: 300;

    time {
      background-color: ${(props: any) => props.flexDirection || "#777777"};
      color: ${(props: any) => props.flexDirection || "#FFFFFF"};
      z-index: 100;
      border-radius: 4px;
      font-weight: 500;
      font-size: 0.85rem;
      padding: 4px;
    }
`

const TimelineItemMarker = styled.div`
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    flex-basis: 40px;
    flex-shrink: 0;
    z-index: 200;
`

const TimelineMarker = styled.span`
  z-index: 100;
  width: 20px;
  height: 20px;
  border-radius: 50%;
  border: 2px solid #777777;
  background-color: #FFFFFF;
`

const TimelineItemContent = styled.div`
    display: flex;
    flex-direction: column;
    justify-content: flex-start;
    flex-basis: 50%;
    overflow: auto;
    max-width: 100%;
    flex-grow: 1;
    
`

export interface TimelineProps {
    initialEvents: EventProps[];
    activeTags: string[];
};

const Timeline = ({
    initialEvents,
    activeTags,
}: TimelineProps) => {
    const [events, setEvents] = useState(initialEvents);
    const [tagsSelected, setTagsSelected] = useState<string[]>(activeTags);

    useEffect(() => {
        const sortEvents = (events: any[], reverse = false) => {
          initialEvents.sort((eventA, eventB) => {return reverse ? new Date(eventB?.date!).getTime() - new Date(eventA?.date!).getTime() : new Date(eventA?.date!).getTime() - new Date(eventB?.date!).getTime(); });
          return initialEvents;
        };

        setTagsSelected(activeTags);
        setEvents(sortEvents(initialEvents));
    }, [activeTags, setTagsSelected, initialEvents, setEvents]);

    const getEvents = (event: EventProps) => {
      // console.log('event', event);
      return (
        <TimelineItemContainer key={event.title}>
          <TimelineItemDate>
            <TimelineDate date={event.date} />
          </TimelineItemDate>
          <TimelineItemMarker>
            <TimelineMarker />
          </TimelineItemMarker>
          <TimelineItemContent>
            <Event {...event} />
          </TimelineItemContent>
        </TimelineItemContainer>
      )
    } 

    return (
      <TimelineContainer>
        {events.map((event) => getEvents(event))}
      </TimelineContainer>
    );
};

export default Timeline;
