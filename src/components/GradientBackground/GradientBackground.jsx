import React, { useRef, useEffect } from 'react';
import Gradient from './Gradient';
import styled from "styled-components";


export const GradientBackgroundContainer = styled.div`
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  zIndex: 1;
`;


const GradientBackground = ({ colors=['#7140D9', '#5C28CC', '#6200C0', '#F46036'] }) => {
    const canvasRef = useRef(null);
  
    useEffect(() => {
      const canvas = canvasRef.current;
      new Gradient({
        canvas: canvas,
        colors: colors,
      });
    }, [colors]);
  
    return (
      <GradientBackgroundContainer>
        <canvas ref={canvasRef} />
      </GradientBackgroundContainer>
    );
  };
  
  export default GradientBackground;