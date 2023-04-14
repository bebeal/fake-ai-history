import styled from "styled-components";
import React, { useRef, useEffect, useState } from "react";
import { Grid, Typography } from "@mui/material";

// Define the set of symbols to use in the Matrix effect
const symbols = "1234567890";

interface MatrixEffectProps {
  fontSize?: number;
  resetThreshold?: number;
  fontFamily?: string;
  speed?: number;
  charUpdateFrequency?: number;
  colorUpdateFrequency?: number;
  opacity?: number;
  colorRange?: string[];
}

// Renders a Matrix rain-like effect on the background
const MatrixEffect = ({
  fontSize = 16,            // Font size of the symbols
  resetThreshold = 0.98,    // The probability that a symbol will reset to the top of the screen
  fontFamily = "Roboto",    // Font family of the symbols
  speed = 30,               // Speed of the animation (in ms)
  charUpdateFrequency = 1,  // Frequency of symbol updates (in frames)
  colorUpdateFrequency = 0, // Frequency of color updates (in frames)
  opacity = 0.05,           // Opacity of the background
  colorRange = [            // Color range the symbols will cycle through (in order)
  "#00FF00", 
  "#33FF33", 
  "#66FF66", 
  "#99FF99", 
  "#CCFFCC", 
  "#99FF99", 
  "#66FF66", 
  "#33FF33", 
  "#00FF00", 
],
}: MatrixEffectProps) => {
  const canvasRef: any = useRef(null);
  const drops: any = useState([]);
  const lastLetters: any = useState([]);

  useEffect(() => {
    const canvas = canvasRef.current;
    const cxt = canvas.getContext("2d");

    let frameCounter = 0;
    let colorIndex = 0;

    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;

    const columns = Math.floor(canvas.width / fontSize);

    for (let x = 0; x < columns; x++) {
      drops[x] = 1;
      lastLetters[x] = symbols[Math.floor(Math.random() * symbols.length)];
    }

    const draw = () => {
      frameCounter++;
      cxt.fillStyle = `rgba(0, 0, 0, ${opacity})`;
      cxt.fillRect(0, 0, canvas.width, canvas.height);

      if (frameCounter % colorUpdateFrequency === 0) {
        colorIndex = (colorIndex + 1) % colorRange.length;
      }

      cxt.fillStyle = colorRange[colorIndex];
      cxt.font = `${fontSize}px ${fontFamily}`;

      for (let i = 0; i < drops.length; i++) {
        if (frameCounter % charUpdateFrequency === 0) {
          lastLetters[i] = symbols[Math.floor(Math.random() * symbols.length)];
        }

        cxt.fillText(lastLetters[i], i * fontSize, (drops[i] - 1) * fontSize);

        if (
          drops[i] * fontSize > canvas.height &&
          Math.random() > resetThreshold
        ) {
          drops[i] = 0;
        }

        drops[i]++;
      }
    };

    const intervalId = setInterval(draw, speed);

    return () => clearInterval(intervalId);
  }, []);

  useEffect(() => {
    const handleResize = () => {
      if (!canvasRef.current) return;

      canvasRef.current.width = window.innerWidth;
      canvasRef.current.height = window.innerHeight;
    };

    window.addEventListener("resize", handleResize);
    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      width={window.innerWidth}
      height={window.innerHeight}
    />
  );
};

const Background = styled.div`
  position: relative;
  width: 100%;
  height: 100%;
  overflow: hidden;
`;

const Content = styled.div`
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
`;

interface MatrixEffectBackgroundProps {
  children: React.ReactNode;
  fontSize?: number;
  resetThreshold?: number;
  fontFamily?: string;
  speed?: number;
  charUpdateFrequency?: number;
  colorUpdateFrequency?: number;
  letterOpacity?: number;
  backgroundOpacity?: number;
  colorRange?: string[];
}
//   colorRange = [ "hsl(0, 100%, 50%)", "hsl(60, 100%, 50%)", "hsl(120, 100%, 50%)", "hsl(180, 100%, 50%)", "hsl(240, 100%, 50%)", "hsl(300, 100%, 50%)", "hsl(360, 100%, 50%)", ],
const MatrixEffectBackground = ({
  children,
  fontSize = 16,
  resetThreshold = 0.98,
  fontFamily = "Roboto",
  speed = 33 ,
  charUpdateFrequency = 1,
  colorUpdateFrequency = 0,
  letterOpacity = 0.05,
  backgroundOpacity = 1,
  colorRange = ["#00FF00", "#33FF33", "#66FF66", "#99FF99", "#CCFFCC",  "#99FF99", "#66FF66", "#33FF33", "#00FF00"],
}: MatrixEffectBackgroundProps) => {
  return (
    <Background>
      <div style={{
        width: "100%",
        height: "100%",
        overflow: "hidden",
        opacity: backgroundOpacity,
      }}>
      <MatrixEffect
        fontSize={fontSize}
        resetThreshold={resetThreshold}
        fontFamily={fontFamily}
        speed={speed}
        charUpdateFrequency={charUpdateFrequency}
        colorUpdateFrequency={colorUpdateFrequency}
        opacity={letterOpacity}
        colorRange={colorRange}
      />
      </div>
      <Content>{children}</Content>
    </Background>
  );
};

export default MatrixEffectBackground;

/*
<div style={{width: "500px", height: "500px", overflow: "hidden"}}>
  <MatrixEffectBackground>
    <div style={{color: "red"}}>Lorem Ipsum "Neque porro quisquam est qui dolorem ipsum quia dolor sit amet, consectetur, adipisci velit..." "There is no one who loves pain itself, who seeks after it and wants to have it, simply because it is pain..."</div>
  </MatrixEffectBackground>
</div>
*/