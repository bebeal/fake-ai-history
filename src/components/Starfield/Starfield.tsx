
import React, { useEffect, useRef, useState } from "react";
import styled from "styled-components";
import { normalize } from "../../utils/utils";

const StarfieldWrapper = styled.div`
  position: relative;
  width: 100%;
  height: 100%;
  overflow: hidden;
`;

const StarfieldCanvas = styled.canvas`
  position: absolute;
  width: 100%;
  height: 100%;
`;

const StarfieldControls = styled.div`
  position: absolute;
  top: 10px;
  left: 10px;
  z-index: 1;
  display: flex;
  flex-direction: column;
`;

const ControlRow = styled.div`
  display: flex;
  align-items: center;
  margin-bottom: 5px;
`;

const ControlLabel = styled.label`
  margin-right: 5px;
  color: ${props => props.color || "#FFFFFF"};
`;

const ControlInput = styled.input`
  margin-right: 5px;
  width: 50px;
`;

const Content = styled.div`
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
`;

interface Star {
  x: number;
  y: number;
  z: number;
  prevX: number;
  prevY: number;
  prevZ: number;
}

interface StarfieldProps {
  children?: React.ReactNode;  // content to render
  starColor?: string;          // star color. Default: #5A788F
  voidColor?: string;          // background color. Default: #000000
  numStars?: number;           // number of stars to render. Default: 512
  speed?: number;              // 0-1 (0 = no movement, 1 = full speed). Default: 1
  warpSpeed?: number;          // 0-1 (0 = no warp, 1 = full warp) (hyperspace only). Default: 1
  hyperspace?: boolean;       // true = hyperspace effect (stars trail behind). Default: false
}

const Starfield = ({
  children,
  starColor = "#5A788F",
  voidColor = "#000000",
  numStars = 512,
  speed = 1,
  warpSpeed = 1,
  hyperspace = false,
}: StarfieldProps) => {
  const [inputStarColor, setInputStarColor] = useState(starColor);
  const [inputVoidColor, setInputVoidColor] = useState(voidColor);
  const [inputNumStars, setInputNumStars] = useState(numStars);
  const [inputSpeed, setInputSpeed] = useState(speed);
  const [inputWarpSpeed, setInputWarpSpeed] = useState(warpSpeed);
  const [inputHyperspace, setInputHyperspace] = useState(hyperspace);

  const canvasRef = useRef<HTMLCanvasElement>(null);
  const starColorRef = useRef(inputStarColor);
  const voidColorRef = useRef(inputVoidColor);
  const numStarsRef = useRef(inputNumStars);
  const speedRef = useRef(normalize(speed, 0, 0.01));
  const warpSpeedRef = useRef(normalize(inputWarpSpeed, 0, 1));
  const hyperspaceRef = useRef(inputHyperspace);

  useEffect(() => {
    starColorRef.current = inputStarColor;
    voidColorRef.current = inputVoidColor;
    speedRef.current = normalize(inputSpeed, 0, 0.01);
    warpSpeedRef.current = normalize(inputWarpSpeed, 0, 1);
    numStarsRef.current = inputNumStars;
    hyperspaceRef.current = inputHyperspace;
    const canvas = canvasRef.current;
    if (!canvas) return;
    const context = canvas.getContext("2d");
    if (!context) return;
    canvas.width = canvas.offsetWidth;
    canvas.height = canvas.offsetHeight;
    const opacity = hyperspaceRef.current ? 1 - (warpSpeedRef.current * 0.9) : 1;
    context.fillStyle = `${voidColorRef.current}${Math.round(opacity * 255).toString(16)}`;
    context.strokeStyle = starColorRef.current;

    const centerX = canvas.width / 2;
    const centerY = canvas.height / 2;
    const focalLength = (canvas.width + canvas.height) / 2;

    const createStar = () => {
      const angle = Math.random() * Math.PI * 2;
      const distance = Math.random() * focalLength;
      const x = centerX + Math.cos(angle) * distance;
      const y = centerY + Math.sin(angle) * distance;
      const z = Math.random() * focalLength;
      return {
        x: x,
        y: y,
        z: z,
        prevX: x,
        prevY: y,
        prevZ: z,
      };
    };

    const stars = Array.from({ length: numStarsRef.current }, () => {
      return createStar();
    }) as Star[];

    const updateStar = (star: Star) => {
      star.prevX = star.x;
      star.prevY = star.y;
      star.prevZ = star.z;

      star.z -= hyperspaceRef.current ? speedRef.current * warpSpeedRef.current : speedRef.current;
      const dz = star.z / focalLength;
      star.x += ((star.x - centerX) / dz) * speedRef.current;
      star.y += ((star.y - centerY) / dz) * speedRef.current;

      // if off screen, reset
      if (star.x < 0 || star.x > canvas.width || star.y < 0 || star.y > canvas.height || star.z < 0 || star.z > focalLength) {
        const tempStar = createStar();
        star.x = tempStar.x;
        star.y = tempStar.y;
        star.z = tempStar.z;
        star.prevX = tempStar.prevX;
        star.prevY = tempStar.prevY;
        star.prevZ = tempStar.prevZ;
      }
    };


    const drawStar = (star: Star) => {
      // line thicker as it gets closer to the viewer
      context.lineWidth = Math.max(0.5, 2 * (1 - star.z / focalLength));
      context.beginPath();
      context.moveTo(star.x, star.y);
      context.lineTo(star.prevX, star.prevY);
      context.stroke();
      context.closePath();
    };

    const animate = () => {
      context.fillRect(0, 0, canvas.width, canvas.height);
      for (let i = 0; i < stars.length; i++) {
        const star = stars[i];
        drawStar(star);
        updateStar(star);
      }
      requestAnimationFrame(animate);
    };

    const animationId = requestAnimationFrame(animate);

    return () => {
      cancelAnimationFrame(animationId);
    };
  }, [inputStarColor, inputVoidColor, inputSpeed, inputWarpSpeed, inputNumStars, inputHyperspace]);

  return (
    <StarfieldWrapper>
      <StarfieldControls>
        <ControlRow>
          <ControlLabel color={inputStarColor}>Star Color:</ControlLabel>
          <ControlInput
            type="color"
            value={inputStarColor}
            onChange={(e) => setInputStarColor(e.target.value)}
          />
        </ControlRow>
        <ControlRow>
          <ControlLabel color={inputStarColor}>Void Color:</ControlLabel>
          <ControlInput
            type="color"
            value={inputVoidColor}
            onChange={(e) => setInputVoidColor(e.target.value)}
          />
        </ControlRow>
        <ControlRow>
          <ControlLabel color={inputStarColor}>Speed:</ControlLabel>
          <ControlInput
            type="number"
            value={inputSpeed}
            onChange={(e) => setInputSpeed(parseFloat(e.target.value))}
          />
        </ControlRow>
        <ControlRow>
          <ControlLabel color={inputStarColor}>Warp Speed:</ControlLabel>
          <ControlInput
            type="number"
            value={inputWarpSpeed}
            onChange={(e) => setInputWarpSpeed(parseFloat(e.target.value))}
          />
        </ControlRow>
        <ControlRow>
          <ControlLabel color={inputStarColor}>Number of Stars:</ControlLabel>
          <ControlInput
            type="number"
            value={inputNumStars}
            onChange={(e) => setInputNumStars(parseInt(e.target.value))}
          />
        </ControlRow>
        <ControlRow>
          <ControlLabel color={inputStarColor}>Jump To Hyperspace:</ControlLabel>
          <ControlInput
            type="checkbox"
            checked={inputHyperspace}
            onChange={(e) => setInputHyperspace(e.target.checked)}
          />
        </ControlRow>
      </StarfieldControls>
      <StarfieldCanvas ref={canvasRef} />
      <Content>{children}</Content>
    </StarfieldWrapper>
  );
};

export default Starfield;

/*
<Grid item>

<div style={{width: "100%", height: "800px", overflow: "hidden"}}>
  <Starfield>
    <div style={{color: "red"}}>Lorem Ipsum "Neque porro quisquam est qui dolorem ipsum quia dolor sit amet, consectetur, adipisci velit..." "There is no one who loves pain itself, who seeks after it and wants to have it, simply because it is pain..."</div>
  </Starfield>
</div>
</Grid>
*/