import React, { useCallback, useEffect, useRef, useState } from 'react';
import ReactMarkdown from 'react-markdown';
import rehypeKatex from 'rehype-katex';
import remarkMath from 'remark-math';

import 'katex/dist/katex.min.css';

import { Box, Typography } from '@mui/material';
import Image from '../Image/Image';
import styled from 'styled-components';
// import ContentCarousel from '../ContentCarousel/ContentCarousel';

const StyledMarkdownBox = styled.div`
  > p {
    margin: 0 px 0px 0px 0px;
  }
`

interface EventDescriptionProps {
  description: string;
  images?: any[];
}

const EventDescription: React.FC<EventDescriptionProps> = ({
  description,
  images,
}) => {
  const lightGallery = useRef<any>(null);
  const [index, setIndex] = React.useState<number>(0);

  const onBeforeSlide = (detail: any) => {
    const { index, prevIndex } = detail;
    console.log(index, prevIndex);
    setIndex(index);
  };

  const getImage = () => {
    const image = images![index];
    return (
      <Box>
      <Image src={image.src} caption={image.caption} source={image.source} />
    </Box>
    )
  }

  const makeContentItemList = () => { 
    return images!.map((image, index) => {
      return {
        id: image.id,
        src: image.src,
        thumb: image.src,
        caption: image.caption,
        source: image.source,
        getContent: () => {
          return (
            <Image src={image.src} caption={image.caption} source={image.source} baseImage={true} />
            )
        }
      }
    });
  };

  // const getContentCarousel = () => {
  //   return (
  //     <ContentCarousel contentItemList={makeContentItemList()} />
  //   )
  // };

  const getDescription = () => {
    return (
      <Box display="flex" justifyContent={"center"} alignItems={"center"}>
        <Typography component={'span'} variant={"body1"} width={"95%"}>
          {/* {images && getImageCaraousel()} */}
          {images && getImage()}
          <StyledMarkdownBox>
          <ReactMarkdown 
            rehypePlugins={[rehypeKatex]}
            remarkPlugins={[remarkMath]}
            children={description}
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