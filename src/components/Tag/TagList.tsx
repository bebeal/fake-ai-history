import React from "react";
import { Box, Typography } from "@mui/material";
import Tag from "./Tag";

interface TagListProps {
  tags: any;
}

const TagList: React.FC<TagListProps> = ({ 
    tags, 
}) => {

  const getTag = (tag: any) => {
    return (<Tag tag={tag} />)
  };

  return (
    <Box>
      {  tags.length && 
      tags.array.forEach((tag: any) => getTag(tag))
      }
    </Box>
  );
};

export default TagList;
