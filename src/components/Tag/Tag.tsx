import { useState } from "react";

export interface TagProps {
    icon?: any;
    label?: string;
    href?: string;
    initiallyActive?: boolean;
    tagColor?: string;
    width?: string;
    height?: string;
}

const Tag = ({
    icon,
    label="",
    href,
    initiallyActive=true,
    tagColor='author',
    width='16px',
    height='16px', 
}: TagProps) => {

    const [active, setActive] = useState(initiallyActive);

    const getTag = (): JSX.Element => {
        let tagClasses = 'tag tag-' + tagColor;
        let icoClasses = 'tag-ico';
        if (href) {
          return (
            <a href={href} className={tagClasses} target={'_blank'} rel="noreferrer" >
              {icon && <div className={icoClasses} style={{width: width, height: height}}>{icon}</div>}
              {label && label.length > 0 && <span>{label}</span>}
            </a>
          );
        } else {
          tagClasses = tagClasses + (!active ? ' inactive' : '');
          return (
            <div className={tagClasses} onClick={(event: any) => setActive(!active)}>
              {icon && <div className={icoClasses} style={{width: width, height: height}}>{icon}</div>}
              {label && label.length > 0 && <span>{label}</span>}
            </div>
          );
        }
      };

      return getTag();

};

export default Tag;