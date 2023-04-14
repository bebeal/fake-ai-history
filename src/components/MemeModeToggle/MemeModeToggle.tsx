import React, { useState } from 'react';
import styled from 'styled-components';

const IconWrapper = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  width: 50px;
  height: 50px;
  background-color: #ffffff;
  border: 1px solid #000000;
  border-radius: 50%;
`;

const IconImage = styled.img`
  width: 100%;
  height: 100%;
`;

const MemeModeToggle: React.FC = () => {
  const [isMemeMode, setIsMemeMode] = useState(false);

  

  const currentIconUrl = isMemeMode ? './doge.gif' : './doge.png';
  console.log(currentIconUrl);
  

  return (
    <IconWrapper onClick={() => setIsMemeMode(!isMemeMode)}>
      <IconImage src={currentIconUrl} />
    </IconWrapper>
  );
};

export default MemeModeToggle;
