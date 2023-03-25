import React from "react";
import { Box, Typography } from "@mui/material";
import Tag from "./Tag";
import styled from 'styled-components';

const TagListContainer = styled.div`
    display: flex;
    flex-wrap: wrap;

    &::before {
      margin-top: 0.5rem;
      margin-bottom: 0.25rem;
      border-top: 1px solid #e2e8f0;
      width: 100%;
      content: "";
      display: block;
    }
`

interface TagListProps {
  tags: any;
}

const TagList: React.FC<TagListProps> = ({ 
    tags, 
}) => {
  console.log(tags);

  const getTag = (tagName: string) => {
    return (<Tag tagName={tagName} />);
  };

  return (
    <TagListContainer>
      {  tags.length && 
      tags.map((tagName: string) => getTag(tagName))
      }
    </TagListContainer>
  );
};

export default TagList;
