import React, { useCallback, useEffect, useRef, useState } from 'react';
import ReactMarkdown from 'react-markdown';
import rehypeKatex from 'rehype-katex';
import remarkMath from 'remark-math';

import 'katex/dist/katex.min.css';

import { Box, Typography } from '@mui/material';
import Image from '../Image/Image';
import styled from 'styled-components';
import ContentCarousel from '../ContentCarousel/ContentCarousel';

const StyledMarkdownBox = styled.div`
  > p {
    margin: 0px 0px 0px 0px;
  }
`

interface EventDescriptionProps {
  description: string;
  images?: any[];
}

const EventDescription: React.FC<EventDescriptionProps> = ({
  description,
  images=[],
}) => {

  const makeContentList = () => { 
    return images!.map((image, index) => {
      return {
        id: image.id,
        src: image.src,
        thumb: image.src,
        caption: image.caption,
        source: image.source,
        getContent: () => {
          return (
            <Image src={image.src} caption={image.caption} source={image.source} maxWidth="100%"  />
            )
        }
      }
    });
  };

  const getContentCarousel = () => {
    return (
      <ContentCarousel contentList={makeContentList()} />
    )
  };

  const getDescription = () => {
    return (
      <Box display="flex" justifyContent={"center"} alignItems={"center"}>
        <Typography component={"span"} variant={"body1"} width={"95%"}>
          {images && getContentCarousel()}
          <StyledMarkdownBox>
          <ReactMarkdown 
            rehypePlugins={[rehypeKatex]}
            remarkPlugins={[remarkMath]}
            children={description}
            linkTarget={'_blank'}
            components={{
                a: ({ node, children, ...props}) => {
                    const linkProps = props;
                    linkProps['rel'] = 'noopener noreferrer';
                    return <a {...linkProps}>{children}</a>
                }
            }}
          /></StyledMarkdownBox>
        </Typography>
      </Box>
    );
  };

  return (
    <Box sx={{ display: "flex" }}>
        {getDescription()}
    </Box>
  );
}

export default EventDescription;