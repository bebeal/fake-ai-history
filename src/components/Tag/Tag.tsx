import React, { useState } from "react";
import './Tag.css';
import ReactDOMServer from 'react-dom/server';
import { fourCornerGradientBackground, getTagFromMap } from "./Tags";

interface TagProps {
  tagName: any;
  initiallyActive?: boolean;
  useHref?: boolean;
  variant?: number;
  tagColor?: string;
  width?: string;
  height?: string;
}

const Tag: React.FC<TagProps> = ({ 
    tagName,
    initiallyActive=true,
    useHref=false,
    variant=0,
    tagColor='white',
    width='24px',
    height='24px',
}) => {
  const [active, setActive] = useState(initiallyActive);
  const tag: any = getTagFromMap(tagName, variant, width, height);

  const getTag = (useHref: boolean): JSX.Element => {
    let tagClasses = 'tag tag-' + tagColor;
    let icoClasses = 'tag-ico';
    if (useHref) {
      return (
        <a href={tag.href} className={tagClasses} target={'_blank'} rel="noreferrer" >
          {tag.icon && <div className={icoClasses}>{tag.icon}</div>}
          {tag.label.length > 0 && <span>{tag.label}</span>}
        </a>
      );
    } else {
      tagClasses = tagClasses + (!active ? ' inactive' : '');
      return (
        <div className={tagClasses} onClick={(event: any) => setActive(!active)}>
          {tag.icon && <div className={icoClasses}>{tag.icon}</div>}
          {tag.label.length > 0 && <span>{tag.label}</span>}
        </div>
      );
    }
  };

  return (
    getTag(useHref)
  );
};

export default Tag;
