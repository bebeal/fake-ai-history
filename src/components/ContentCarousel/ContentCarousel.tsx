import React, { useRef, useState } from "react";

import styled from "styled-components";
import ChevronLeftIcon from '@mui/icons-material/ChevronLeft';
import ChevronRightIcon from '@mui/icons-material/ChevronRight';
import { Box, IconButton } from "@mui/material";
import Content, { ContentProps } from "../Content/Content";

const CarouselWrapper = styled.div`
  float: left;
  margin: auto 5px auto 0px;
  max-width: 100%;
  height: auto;
`;


const StyledCarousel = styled.div`
  display: flex;
  position: relative;
  width: 100%;
  height: auto;
`;

const CarouselContent = styled.div`
  display: flex;
  width: 100%;
  height: auto;
`;

const CarouselButton = styled<any>(IconButton)`
  position: absolute !important;
  height: 100%;
  z-index: 2;
  padding: 0px !important;
  margin: 0px !important;
  ${({ isLeft }) => (isLeft ? "left: 0;" : "right: 0;")}
`;

interface ContentCarouselProps {
    contentList: any[];
};
  
const ContentCarousel = ({ contentList }: ContentCarouselProps) => {
    const [currentIndex, setCurrentIndex] = useState(0);
    const [showButtons, setShowButtons] = useState(false);
    const contentRef = useRef<HTMLDivElement>(null);

    const handleMouseEnterImage = () => {
        setShowButtons(true);
    }

    const handleMouseLeaveImage = () => {
        setShowButtons(false);
    }

    const handleMouseEnterButton = () => {
        handleMouseEnterImage();
    }

    const handleMouseLeaveButton = () => {
        handleMouseLeaveImage();
    }

    return (
      <CarouselWrapper>
        <StyledCarousel>
          {contentList.length > 1 && (
            <CarouselButton
              color="primary"
              onMouseEnter={handleMouseEnterButton}
              onMouseLeave={handleMouseLeaveButton}
              isLeft={true}
              style={{ opacity: showButtons ? 1 : 0 }}
              onClick={() => {
                setCurrentIndex(
                  (currentIndex - 1 + contentList.length) % contentList.length
                );
              }}
            >
              <ChevronLeftIcon />
            </CarouselButton>
          )}
          <CarouselContent
            ref={contentRef}
            onMouseEnter={handleMouseEnterImage}
            onMouseLeave={handleMouseLeaveImage}
          >
            {contentList[currentIndex]}
          </CarouselContent>
          {contentList.length > 1 && (
            <CarouselButton
              color="primary"
              onMouseEnter={handleMouseEnterButton}
              onMouseLeave={handleMouseLeaveButton}
              style={{ opacity: showButtons ? 1 : 0 }}
              onClick={() => {
                setCurrentIndex((currentIndex + 1) % contentList.length);
              }}
            >
              <ChevronRightIcon />
            </CarouselButton>
          )}
        </StyledCarousel>
      </CarouselWrapper>
    );
};

export default ContentCarousel;
