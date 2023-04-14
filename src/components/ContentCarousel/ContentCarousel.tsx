import React, { useRef, useState } from "react";

import styled from "styled-components";
import ArrowBackIos from "@mui/icons-material/ArrowBackIos";
import ArrowForwardIos from "@mui/icons-material/ArrowForwardIos";
import { Box, IconButton } from "@mui/material";

const CarouselWrapper = styled.div`
  float: left;
  margin: auto 5px auto 0px;
  max-width: 25%;
  height: auto;
`;


const StyledCarousel = styled.div`
  display: flex;
  position: relative;
  width: 100%;
`;

const CarouselContent = styled.div`
  display: flex;
  width: 100%;
`;

const CarouselButton = styled<any>(IconButton)`
  position: absolute !important;
  top: 50%;
  z-index: 2;
  ${({ isLeft }) => (isLeft ? "left: 0;" : "right: 0;")}
`;

interface ContentCarouselProps {
  contentList: any;
}

const ContentCarousel = ({ contentList }: ContentCarouselProps) => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [showButtons, setShowButtons] = useState(false);
  const contentRef = useRef<HTMLDivElement>(null);

  const handleMouseEnterImage = () => {
    setShowButtons(true);
  };

  const handleMouseLeaveImage = () => {
    setShowButtons(false);
  };

  const handleMouseEnterButton = () => {
    handleMouseEnterImage();
    
  };

  const handleMouseLeaveButton = () => {
    handleMouseLeaveImage();
  };


  return (
    <CarouselWrapper>
    <StyledCarousel>
      {contentList.length > 1 && (
        <CarouselButton
          color="primary"
          onMouseEnter={handleMouseEnterButton} onMouseLeave={handleMouseLeaveButton}
          isLeft={true}
          style={{ opacity: showButtons ? 1 : 0 }}
          onClick={() => {
            setCurrentIndex(
              (currentIndex - 1 + contentList.length) % contentList.length
            );
          }}
        >
          <ArrowBackIos />
        </CarouselButton>
      )}
      <CarouselContent ref={contentRef} onMouseEnter={handleMouseEnterImage} onMouseLeave={handleMouseLeaveImage}>
        {contentList[currentIndex].getContent()}
      </CarouselContent>
      {contentList.length > 1 && (
        <CarouselButton
          color="primary"
          onMouseEnter={handleMouseEnterButton} onMouseLeave={handleMouseLeaveButton}
          style={{ opacity: showButtons ? 1 : 0 }}
          onClick={() => {
            setCurrentIndex((currentIndex + 1) % contentList.length);
          }}
        >
          <ArrowForwardIos />
        </CarouselButton>
      )}
    </StyledCarousel>
    </CarouselWrapper>
  );
};

export default ContentCarousel;
