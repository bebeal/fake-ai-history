import React from "react";
import styled from "styled-components";
import { Themes } from "../../utils/themes";
import { gradientBorder } from "../../utils/utils";

export const TimelineItemMarkerContainer = styled.div<any>`
    width: 20px;
    height: 20px;
    z-index: 100;
    
    ${({ variant, gradientFrom, gradientTo }) => {
        const tagVariant = Themes[variant];
        if (tagVariant) {
            return `
            background-color: ${tagVariant.backgroundColor};
            color: ${tagVariant.color};
            ${gradientBorder(gradientFrom, gradientTo, '0%', '100%', '2px')};
            `;
        }
    }}

    ${({ backgroundColor }) => (backgroundColor ? `background-color: ${backgroundColor};` : "")}
    ${({ border }) => (border ? `border: ${border};` : "")}
    ${({ borderRadius }) => (borderRadius ? `border-radius: ${borderRadius};` : "50%")}
    ${({ color }) => (color ? `color: ${color};` : "")}
    ${({ fontSize }) => (fontSize ? `font-size: ${fontSize};` : "")}
`;

export interface TimelineItemMarkerProps {
    variant?: string;
    backgroundColor?: string;
    border?: string;
    borderRadius?: string;
    color?: string;
    fontSize?: string;
    gradientFrom?: string;
    gradientTo?: string;
};

export const TimelineItemMarker = ({
    variant="ghost",
    backgroundColor,
    border,
    borderRadius="50%",
    color,
    fontSize="0.85rem",
    gradientFrom,
    gradientTo,
}: TimelineItemMarkerProps) => {
    return (
        <TimelineItemMarkerContainer
            variant={variant}
            backgroundColor={backgroundColor}
            border={border}
            borderRadius={borderRadius}
            color={color}
            fontSize={fontSize}
            gradientFrom={gradientFrom} gradientTo={gradientTo}
        />
    );
};

export default TimelineItemMarker;
