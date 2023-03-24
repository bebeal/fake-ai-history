import React, { useState } from "react";
import { Box, Chip, Typography } from "@mui/material";

interface TagProps {
  tag: any;
  initiallyActive?: boolean;
}

const Tag: React.FC<TagProps> = ({ 
    tag,
    initiallyActive=true,
}) => {
  const [active, setActive] = useState(initiallyActive);

  const getTagLink = (tag: any): JSX.Element => {
    return (
      <a href={tag.href} className={!active ? ' inactive' : ''} target={'_blank'} rel="noreferrer" >
          <Chip icon={tag.icon} label={tag.label} />
      </a>
    );
};

const getTag = (tag: any): JSX.Element => {
    return (
        <div className={!active ? ' inactive' : ''} onClick={(event: any) => setActive(!active)}>
          <Chip icon={tag.icon} label={tag.label} size={'small'} />
        </div>
      );
};

  return (
    tag.href ? getTagLink(tag) : getTag(tag)
  );
};

export default Tag;

export const tagMap: any = {
  'AI': {
    label: '1',
    icon: '2',
    href: '3',  
},
};
