import { useState } from "react";
import styled from "styled-components";
import { Themes } from "../../utils/themes";

// Add this after the imports in the Tag.tsx file
const StyledTag = styled.div<any>`
  --tag-color: #000000;
  --tag-border-size: 1px;
  --tag-border-style: solid;

  background-image: linear-gradient(
    to bottom,
    var(--tag-gradient-from),
    var(--tag-gradient-to)
  );
  border: var(--tag-border-size) var(--tag-border-style) var(--tag-border-color);
  color: var(--tag-color) !important;
  background-size: 100% 100%;

  text-decoration: none;
  text-decoration-color: var(--tag-color);

  justify-content: center;
  align-items: center;
  border-radius: 0.5rem;
  display: inline-flex;
  font-size: ${({ fontSize }) => fontSize};
  line-height: 1.25rem;
  height: 1.5rem;
  margin: 0px 0.125rem;
  max-width: 100%;
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;

  ${({ inactive }) =>
    inactive &&
    `
    filter: grayscale(100%);
    opacity: 0.5;
  `}

  &:hover {
    cursor: ${({ cursor = "pointer" }) => cursor};
  }

  div,
  a,
  span {
    margin: 0rem 0.125rem;
  }

  ${({ variant, disableHover }) => {
    const tagVariant = Themes[variant];
    if (tagVariant) {
      return `
        --tag-gradient-from: ${tagVariant.gradientFrom};
        --tag-gradient-to: ${tagVariant.gradientTo};
        --tag-color: ${tagVariant.color};
        --tag-border-color: ${tagVariant.borderColor};
        &:hover {
            --tag-gradient-from: ${ disableHover ? tagVariant.gradientFrom : tagVariant.hover.gradientFrom || tagVariant.gradientFrom };
            --tag-gradient-to: ${ disableHover ? tagVariant.gradientTo : tagVariant.hover.gradientTo };
        }
    `;
    }
  }}
`;

const StyledTagLink = styled(StyledTag).attrs({ as: "a" })`
  &:hover {
    text-decoration: ${({ textDecoration = "underline" }) => textDecoration};
    text-decoration-thickness: 0.85px;
  }
`;

const TagIcon = styled.div<any>`
  height: ${({ height = "auto" }) => height};
  width: ${({ width = "100%" }) => width};
  fill: ${({ icoVariant }) => Themes[icoVariant].color};
  stroke: ${({ icoVariant }) => Themes[icoVariant].color};
  background-image: ${({ backgroundImage = "none" }) => backgroundImage};
  background-color: ${({ backgroundColor = "transparent" }) => backgroundColor};
  color: ${({ color = "#000000" }) => color};
  font-size: ${({ fontSize }) => fontSize};
  line-height: ${({ lineHeight = "1rem" }) => lineHeight};
  margin: ${({ margin = "0" }) => margin};
  padding: ${({ padding = "0" }) => padding};
  display: ${({ display = "flex" }) => display};
`;

export interface TagProps {
  icon?: React.ReactNode;
  label?: string;
  href?: string;
  fontSize?: string;
  variant?: string;
  icoVariant?: string;
  disableHover?: boolean;
  disableClick?: boolean;
  inactive?: boolean;
}

const Tag = ({
  icon,
  label,
  href,
  fontSize = "auto",
  variant = "default",
  icoVariant = variant,
  disableHover = false,
  disableClick = false,
  inactive = false,
}: TagProps) => {
  const [active, setActive] = useState(inactive);

  const getIcon = () => {
    return icon!! && <TagIcon icoVariant={icoVariant}>{icon}</TagIcon>;
  };

  const getLabel = () => {
    return label && label.length > 0 && <div>{label}</div>;
  };

  const getStyledTagLink = () => {
    return (
      <StyledTagLink
        href={href}
        target="_blank"
        rel="noreferrer"
        variant={variant}
        fontSize={fontSize}
        inactive={active}
        disableHover={disableHover}
      >
        {getIcon()}
        {getLabel()}
      </StyledTagLink>
    );
  };

  const getStyledTag = () => {
    return (
      <StyledTag
        variant={variant}
        inactive={active}
        disableHover={disableHover}
        fontSize={fontSize}
        cursor={disableClick ? "inherit" : "pointer"}
        onClick={ disableClick ? () => {} : () => { setActive(!active); } }
      >
        {getIcon()}
        {getLabel()}
      </StyledTag>
    );
  };

  return href!! && href.length > 0 ? getStyledTagLink() : getStyledTag();
};

export default Tag;
