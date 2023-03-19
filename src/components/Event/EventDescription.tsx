import React from 'react';
import Markdown from 'markdown-to-jsx';
import { Box, Typography } from '@mui/material';
import Image from '../Image/Image';

interface EventDescriptionProps {
  description: string;
  image?: string;
  imageCaption?: string;
  imageHeader?: string;
}

const EventDescription: React.FC<EventDescriptionProps> = ({
  description,
  image,
  imageCaption,
  imageHeader,
}) => {

  const wrapMarkdown = () => {
    return (
      <Typography variant={"body1"}>{image && <Image src={image} caption={imageCaption} />}<Markdown className='markdown'>{description}</Markdown></Typography>
    );
  };

  return (
    <Box sx={{ display: "flex" }}>
      {wrapMarkdown()}
    </Box>
  );
}

export default EventDescription;