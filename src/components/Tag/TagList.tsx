import React from "react";
import { Box, Typography } from "@mui/material";
import Tag from "./Tag";
import styled from 'styled-components';

const TagListContainer = styled.div<TagListProps>`
    display: flex;
    width: auto;
    flex-wrap: wrap;
    flex-direction: ${(props: any) => props.direction};

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
  tags?: any;
  direction?: 'row' | 'column';
  useHref?: boolean;
  tagColors?: string[];
}

const TagList: React.FC<TagListProps> = ({ 
    tags, 
    direction='row',
    useHref=false,
    tagColors=[],
}) => {
  const getTag = (tagName: string, tagColor?: string) => {
    return (<div key={tagName} style={{width: 'auto'}}><Tag tagName={tagName} useHref={useHref} tagColor={tagColor} /></div>);
  };

  return (
    <TagListContainer direction={direction}>
      {tags && tags.map((tagName: string, index: number) => getTag(tagName, tagColors[index] || 'white') )}
    </TagListContainer>
  );
};

export default TagList;
