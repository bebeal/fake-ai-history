import React, { useState } from "react";
import './Tag.css';
import ReactDOMServer from 'react-dom/server';
import { fourCornerGradientBackground, getTagFromMap } from "./Tags";

interface NamedTagProps {
  tagName?: any;
  initiallyActive?: boolean;
  useHref?: boolean;
  variant?: number;
  tagColor?: string;
  width?: string;
  height?: string;
}

// Renders a tag with an optional label and optional icon
// Props:
// tagName: The name of the tag to render. This is used to look up the tag in the TAGS map.
// initiallyActive: Whether the tag should be active or inactive when the component is first rendered. Default: true.
// useHref: Whether the tag should be rendered as an anchor tag or a div. Default: false.
// variant: The variant of the tag to render. Default: 0.
// tagColor: The color of the tag. Default: white.
// width: The width of the tag. Default: 24px.
// height: The height of the tag. Default: 24px.
const NamedTag: React.FC<NamedTagProps> = ({
    tagName,
    initiallyActive=true,
    useHref=false,
    variant=0,
    tagColor='white',
    width='16px',
    height='16px',
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
          {tag.label && tag.label.length > 0 && <span>{tag.label}</span>}
        </a>
      );
    } else {
      tagClasses = tagClasses + (!active ? ' inactive' : '');
      return (
        <div className={tagClasses} onClick={(event: any) => setActive(!active)}>
          {tag.icon && <div className={icoClasses}>{tag.icon}</div>}
          {tag.label && tag.label.length > 0 && <span>{tag.label}</span>}
        </div>
      );
    }
  };

  return (
    getTag(useHref)
  );
};

export default NamedTag;
