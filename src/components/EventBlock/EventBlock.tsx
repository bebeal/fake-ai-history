import React, { useState } from "react";
import { Themes } from "../../utils/themes";
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import LinkRoundedIcon from '@mui/icons-material/LinkRounded';
import EventOutlinedIcon from '@mui/icons-material/EventOutlined';
import { Db2Database, MachineLearningModel, Microscope, CalendarHeatMap, Calendar, Event, Link } from '@carbon/icons-react';
import { Accordion, AccordionDetails, AccordionSummary, Box, Card, CardContent, CardHeader, Divider, IconButton, Tab, Tabs, Typography } from "@mui/material";
import { styled } from '@mui/material/styles';
import { TimelineItemEventDate } from "../Timeline/TimelineItemEvent";
import { TimelineItemDate } from "../Timeline/TimelineItemDate";

const StyledExpandMoreIcon = styled(ExpandMoreIcon)<any>`
  transition: transform 0.2s ease-in-out;
`;

export const EventBlockDropdown = styled(Accordion)<any>`
  margin: 0;
  padding: 0;
  width: 50%;
`;

export const EventBlockDropdownHeader = styled(AccordionSummary)<any>`
  margin: 0;
  padding: 0;
  min-height: 0;
  width: 100%;
  font-size: 100%;

  ${({ variant }) => {
    const tagVariant = Themes[variant];
    if (tagVariant) {
      return `
            background-color: ${tagVariant.backgroundColor};
            color: ${tagVariant.color};
            border: 1px solid ${tagVariant.color};
        `;
    }
  }}
  & .MuiAccordionSummary-expandIconWrapper {
    padding: 0;
    margin: 0 2px;
  }
  & .MuiAccordionSummary-content {
    padding: 0;
    margin: 4px 4px;
    align-items: center;
    
  }
`;

export const EventBlockDetails = styled(AccordionDetails)<any>`
  margin: 0;
  padding: 5px !important;
  min-height: 0;
  width: 100%;
  font-size: 100%;

  ${({ variant }) => {
    const tagVariant = Themes[variant];
    if (tagVariant) {
      return `
            background-color: ${tagVariant.backgroundColor};
            color: ${tagVariant.color};
            border: 1px solid ${tagVariant.color};
            border-top-width: 0;
        `;
    }
  }}

`;

export const EventBlockTabs = styled(Tabs)<any>`
  margin: 2px 0;
  padding: 0;
  min-height: 0;
`;

export const EventBlockTab = styled(Tab)<any>`
  padding: 0px;
  margin: 2px 0;
  min-height: 0px;
  ${({ variant }) => {
    const tagVariant = Themes[variant];
    if (tagVariant) {
      return `
        color: ${tagVariant.borderColor};
        &.Mui-selected {
          color: ${tagVariant.color};
        }
      `;
    }
  }}
`;

export const EventBlockTitle = styled(Typography)<any>`
  width: 100%;
  display: flex;
  text-align: left;
  font-weight: ${(props: any) => props.expanded ? "600" :  "400"};
`;

export interface EventBlockProps {
  date?: any;
  title?: string;
  subtitle?: string;
  variant?: string;
  initialExpanded?: boolean;
};

const EventBlock = ({
  date,
  title,
  subtitle,
  variant = "red2",
  initialExpanded = false,
}: EventBlockProps) => {
    const theme = Themes[variant];
    const [activeTab, setActiveTab] = useState("description");
    const [expanded, setExpanded] = useState<boolean>(initialExpanded);

    const getDate = () => {
      return (
        <TimelineItemEventDate marginRight={"4px"}>
          <TimelineItemDate
            date={date}
            variant={variant}
            expanded={expanded}
          />
        </TimelineItemEventDate>
      );
    };

    const handleChange = (event: React.ChangeEvent<{}>, newTab: string) => {
      setActiveTab(newTab);
    };
  
    const toggleExpand = (event: React.SyntheticEvent, newExpanded: boolean) => {
      setExpanded(newExpanded);
    };
    
    return (
        <EventBlockDropdown variant={variant} sx={{ boxShadow: 0 }} elevation={0} defaultExpanded={initialExpanded} disableGutters={true} onChange={toggleExpand} TransitionProps={{ unmountOnExit: true }} >

          <EventBlockDropdownHeader aria-controls="panel1d-content" id="panel1d-header" expandIcon={<StyledExpandMoreIcon expanded={expanded} sx={{color: expanded ? theme.color : theme.borderColor}} />} variant={variant}>
            {date && getDate()}{title && <EventBlockTitle noWrap expanded={expanded}>{title}</EventBlockTitle>}
            {subtitle && <Typography variant={'subtitle2'}>{subtitle}</Typography>}
          </EventBlockDropdownHeader>
          <EventBlockDetails variant={variant}>
            <EventBlockTabs 
              value={activeTab}
              onChange={handleChange}
              variant="fullWidth"
              TabIndicatorProps={{style: {background: theme.color}}}
            >
              <EventBlockTab label="Event" value="Event" icon={<Calendar size="24" />} iconPosition="start" variant={variant} />
              <EventBlockTab label="Research" value="Research" icon={<Microscope size="24" />} iconPosition="start" variant={variant} />
              <EventBlockTab label="Model" value="Model" icon={<MachineLearningModel size="24" />} iconPosition="start" variant={variant} />
              <EventBlockTab label="Dataset" value="Dataset" icon={<Db2Database size="24" />} iconPosition="start" variant={variant} />
              <EventBlockTab label="Resources" value="Resources" icon={<Link size="24" />} iconPosition="start" variant={variant} />
            </EventBlockTabs>
          </EventBlockDetails>
        </EventBlockDropdown>
    );
};

export default EventBlock;