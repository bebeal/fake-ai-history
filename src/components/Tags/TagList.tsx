import React from "react";
import styled from 'styled-components';
import NamedTag from "./NamedTag";

const TagListContainer = styled.div<any>`
    display: ${({ display }) => display};
    width: auto;
    flex-wrap: wrap;
    flex-direction: ${({ direction }) => direction};

    &::before {
      margin-top: 0.5rem;
      margin-bottom: 0.25rem;
      border-top: 1px solid #e2e8f0;
      width: 100%;
      content: "";
      display: block;
    }
`;

interface TagListProps {
    tags: string[];
    active?: string[];
    variants?: string[];
    direction?: 'row' | 'column';
    display?: string;
};

const TagList: React.FC<TagListProps> = ({ 
    tags,
    active=[],
    variants=tags,
    direction='row',
    display='flex',
}) => {
  const getTag = (tag: string, variant: string, active: boolean, useHref: boolean) => {
    return (<div key={`${tag}_${variant}_${active}_${useHref}`} style={{width: 'auto'}}><NamedTag tag={tag} variant={variant} inactive={!active} useHref={useHref} /></div>);
  };

  return (
    <TagListContainer direction={direction} display={display}>
      {tags && tags.map((tag: string, index: number) => getTag(tag, variants[index] || 'white', active.includes(tag), true))}
    </TagListContainer>
  );
};

export default TagList;
