import React, { useState } from "react";
import './Tag.css';
import { getTagFromMap } from "./utils";

interface TagProps {
  tagName: any;
  initiallyActive?: boolean;
  useHref?: boolean;
}

const Tag: React.FC<TagProps> = ({ 
    tagName,
    initiallyActive=true,
    useHref=false,
}) => {
  const [active, setActive] = useState(initiallyActive);
  const tag: any = getTagFromMap(tagName);

  const getTagLink = (): JSX.Element => {
    return (
      <a href={tag.href} className={'tag tag-white'} target={'_blank'} rel="noreferrer" >
          <div className="tag-ico">{tag.icon}</div>
          <span>{tag.label}</span>
      </a>
    );
  };

  const getTag = (): JSX.Element => {
    const className = 'tag tag-white' + (!active ? ' inactive' : '');
    return (
        <div className={className} onClick={(event: any) => setActive(!active)}>
          <div className="tag-ico">{tag.icon}</div>
          <span>{tag.label}</span>
        </div>
      );
  };

  return (
    useHref ? getTagLink() : getTag()
  );
};

export default Tag;
