import React from "react";
import { Box, Typography } from "@mui/material";
import NamedTag from "./NamedTag";
import styled from 'styled-components';

const TagListContainer = styled.div<any>`
    display: ${(props: any) => props.display || "flex"};
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

// TagList is a component that renders a list of tags
// Props:
// tagNames: an array of strings correspond to the global tag map
// direction: "row" or "column" for the direction of the tags. Default: "row"
// useHref: whether or not to use hrefs for the tags. Default: false
// tagColors: an array of strings that represent the colors of the tags. Default:
interface TagListProps {
  tagNames?: string[];
  direction?: 'row' | 'column';
  useHref?: boolean;
  tagColors?: string[];
  activeTags?: string[];
}

const TagList: React.FC<TagListProps> = ({ 
    tagNames=[],
    direction='row',
    useHref=false,
    tagColors=[],
    activeTags=tagNames,
}) => {
  const getTag = (tagName: string, tagColor?: string, active?: boolean) => {
    return (<div key={tagName} style={{width: 'auto'}}><NamedTag tagName={tagName} useHref={useHref} tagColor={tagColor} initiallyActive={active} /></div>);
  };

  return (
    <TagListContainer display={tagNames.length > 0 ? "flex" : "none"} direction={direction}>
      {tagNames && tagNames.map((tagName: string, index: number) => getTag(tagName, tagColors[index] || 'white', activeTags.includes(tagName)) )}
    </TagListContainer>
  );
};

export default TagList;
