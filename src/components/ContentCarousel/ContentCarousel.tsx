import React, { useState } from 'react';

// import ArrowForwardIosIcon from '@mui/icons-material/ArrowForwardIos';
// import ArrowBackIosIcon from '@mui/icons-material/ArrowBackIos';
// import styled from 'styled-components';

// const CarouselContainer = styled.div`
//   display: flex;
//   align-items: center;
//   justify-content: center;
//   position: relative;
//   overflow: hidden;
// `;

// const CarouselContent = styled.div<{ position: number }>`
//   display: flex;
//   transform: ${({ position }) => `translateX(${position * -100}%)`};
//   transition: transform 0.5s;
// `;

// const CarouselItem = styled.div`
//   flex-shrink: 0;
//   width: 100%;
// `;

// const ArrowButton = styled(IconButton)`
//   position: absolute;
//   z-index: 1;
// `;

// const LeftArrow = styled(ArrowButton)`
//   left: 0;
// `;

// const RightArrow = styled(ArrowButton)`
//   right: 0;
// `;

// interface ContentCarouselProps {
//   content: React.ReactNode[];
// }

// const ContentCarousel: React.FC<ContentCarouselProps> = ({ content }) => {
//   const [position, setPosition] = useState(0);

//   const handlePrev = () => {
//     setPosition((prev) => (prev === 0 ? content.length - 1 : prev - 1));
//   };

//   const handleNext = () => {
//     setPosition((prev) => (prev === content.length - 1 ? 0 : prev + 1));
//   };

//   return (
//     <CarouselContainer>
//       <LeftArrow color="primary" onClick={handlePrev}>
//         <ArrowBackIos />
//       </LeftArrow>
//       <CarouselContent position={position}>
//         {content.map((item, index) => (
//           <CarouselItem key={index}>{item}</CarouselItem>
//         ))}
//       </CarouselContent>
//       <RightArrow color="primary" onClick={handleNext}>
//         <ArrowForwardIos />
//       </RightArrow>
//     </CarouselContainer>
//   );
// };

// export default ContentCarousel;