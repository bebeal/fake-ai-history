import React from "react";
import { Box, Typography } from "@mui/material";
import Tag from "./Tag";

interface TagListProps {
  tags: any;
}

const TagList: React.FC<TagListProps> = ({ 
    tags, 
}) => {

  const getTag = (tagName: string) => {
    return (<Tag tagName={tagName} />)
  };

  return (
    <Box>
      {  tags.length && 
      tags.array.forEach((tagName: string) => getTag(tagName))
      }
    </Box>
  );
};

export default TagList;
