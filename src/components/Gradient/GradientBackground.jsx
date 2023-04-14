import React, { useRef, useEffect } from 'react';
import Gradient from './Gradient';

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
      <canvas ref={canvasRef} />
    );
  };
  
  export default GradientBackground;