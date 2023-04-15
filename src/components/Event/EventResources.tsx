import React from "react";
import { Box, Typography, styled } from "@mui/material";
import { extractName } from "../../utils/utils";
import { LABEL_TAG_MAP } from "../Tag/Tags";
import NamedTag from "../Tag/NamedTag";
import Tag from "../Tag/Tag";

const ResourcesTab = styled(Box)`
  display: flex;
  width: 100%;
  flex-wrap: wrap;
`

export interface EventResourcesProps {
  resources: any;
}

const EventResources: React.FC<EventResourcesProps> = ({ 
    resources, 
}) => {

  const getResource = (resource: any) => {
    const iconName: any = resource["icon"];
    let icon = undefined;
    if (Object.keys(LABEL_TAG_MAP).includes(iconName)) {
      const tag: any = LABEL_TAG_MAP[iconName];
      icon = tag.icon;
    } else if (iconName.includes("http") || iconName.includes("https")) {
      icon = <img src={iconName} alt={extractName(iconName)} style={{ width: '16px', height: '16px' }} />;
    }
    return (<Tag icon={icon} label={resource["label"]} href={resource["url"]} tagColor="ghost" />);
  };

  return (
    <ResourcesTab>
      { resources && resources.map((resource: any) => getResource(resource)) }
    </ResourcesTab>
  );
};

export default EventResources;
