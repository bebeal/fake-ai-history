import React, { useState } from "react";
import { Box, Card, CardContent, CardHeader, Divider, Tab, Tabs } from "@mui/material";
import { styled } from '@mui/material/styles';
import LinkRoundedIcon from '@mui/icons-material/LinkRounded';
import AutoAwesomeRoundedIcon from '@mui/icons-material/AutoAwesomeRounded';
import AccountTreeRoundedIcon from '@mui/icons-material/AccountTreeRounded';
import ArticleRoundedIcon from '@mui/icons-material/ArticleRounded';
import EventDescription from "./EventDescription";
import EventPapers from "./EventPapers";

const EventHeader = styled(CardHeader)`
    margin: 0px 0px 0px 0px;
    padding: 10px 10px 0px 10px;
    & .MuiTypography-root {
        color: rgba(0, 0, 0, 0.6);
    }
`

const EventContent = styled(CardContent)`
    padding-top: 5px;
`

const EventTabs = styled(Tabs)`
    padding: 0px 0px 10px 0px;
    margin: 0px;
    min-height: 0px;
    & .MuiTab-root {
        padding: 5px 0px 5px 0px;
        margin: 0px;
        min-height: 0px;
    }
`

export interface EventProps {
  date?: string | Date;
  title?: string;
  subtitle?: string;
  description?: any;
  image?: string;
  imageHeader?: string;
  imageCaption?: string;
  model?: any;
  papers?: any;
  resources?: any;
}

const Event: React.FC<EventProps> = ({
  date,
  title,
  subtitle,
  description,
  image,
  imageHeader,
  imageCaption,
  model,
  papers,
  resources,
}) => {
  const [activeTab, setActiveTab] = useState(0);

  const handleChange = (event: React.ChangeEvent<{}>, newValue: number) => {
    setActiveTab(newValue);
  };

  const getEventTitle = (): JSX.Element => {
    return (
        <EventHeader 
            title={title}
            titleTypographyProps={{variant: "h6"}}
            subheader={subtitle}
            subheaderTypographyProps={{variant: "subtitle2"}}
            sx={{ border: "1px solid #c8ccd1" }}
        />
    );
  };

  const getDescriptionTab = (): React.ReactNode => {
    return <EventDescription description={description} image={image} imageCaption={imageCaption} imageHeader={imageHeader} />;
  }

  const getModelTab = (): React.ReactNode => {
    return <div>{model.name}</div>;
  }

  const getPapersTab = (): React.ReactNode => {
    return <EventPapers papers={papers} />;
  }

  const getResourcesTab = (): React.ReactNode => {
    return <div>{resources}</div>;
  }

  return (
    <Card variant={"outlined"}>
      {title && getEventTitle()}
      <EventContent sx={{ border: "1px solid #c8ccd1", maxHeight: "600px" }}>
      {/* <Divider orientation="horizontal" variant="fullWidth"/> */}
        <EventTabs
          value={activeTab}
          onChange={handleChange}
          variant="fullWidth"
        >
          <Tab label="Event" icon={<AutoAwesomeRoundedIcon />} iconPosition="start" />
          {model && <Tab label="Model" icon={<AccountTreeRoundedIcon />} iconPosition="start" />}
          {papers && <Tab label="Papers" icon={<ArticleRoundedIcon />} iconPosition="start" />}
          {resources && <Tab label="Resources" icon={<LinkRoundedIcon />} iconPosition="start" />}
        </EventTabs>
        <div>
            {activeTab === 0 && getDescriptionTab()}
            {model && activeTab === 1 && getModelTab()}
            {papers && activeTab === 2 && getPapersTab()}
            {resources && activeTab === 3 && getResourcesTab()}
        </div>
        </EventContent>
    </Card>
  );
};

export default Event;
