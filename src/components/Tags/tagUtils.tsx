import React from 'react';
import ReactDOMServer from "react-dom/server";

import NamedTag from './NamedTag';
import TagList from './TagList';
import { Avatar, Grid } from '@mui/material';
import { stringToColor } from '../../utils/utils';
import Tag from './Tag';

export interface NamedTagInMap {
    label?: string;
    icon?: React.ReactNode;
    href?: string;
};

export const TAG_MAP: {[key: string]: NamedTagInMap} = {
};

export const getTagFromMap = (tag: string) => { 
    return tagInMap(tag) ? TAG_MAP[tag] : getEmptyTag();
};

export const tagInMap = (tag: string, map: any = TAG_MAP) => {
    return Object.keys(map).includes(tag);
};

export const getEmptyTag = (width: string = '18px', height: string = '18px', fill: string = '#FFFFFF', stroke: string = '#000000') => {
    return {
        label: '',
        icon: <div style={{
            width: width,
            height: height,
            backgroundColor: fill,
            border: `1px solid ${stroke}`,
        }}></div>,
        href: '',
    };
};

// parameterized solution from https://stackoverflow.com/a/53681663
export const gradientSVG = (topLeft: string = "#38C9EA", topRight: any = "#db258f", bottomRight: string = "#FFA93A", bottomLeft: any = "#6D3DFC"): any => {
    return (<svg preserveAspectRatio="none" viewBox="0 0 1 1"> <defs> <linearGradient id="g"> <stop offset="0" stopColor="#fff" stopOpacity="0"></stop> <stop offset="1" stopColor="#fff" stopOpacity="1"></stop> </linearGradient> <mask id="m"> <rect x="0" y="0" width="1" height="1" fill="url(#g)"></rect> </mask> <linearGradient id="a" gradientTransform="rotate(90)"> <stop offset="0" stopColor={topRight}></stop> <stop offset="1" stopColor={bottomRight}></stop> </linearGradient> <linearGradient id="b" gradientTransform="rotate(90)"> <stop offset="0" stopColor={bottomLeft}></stop> <stop offset="1" stopColor={topLeft}></stop> </linearGradient> </defs> <rect x="0" y="0" width="1" height="1" fill="url(#a)" mask="url(#m)"></rect> <rect x="0" y="0" width="1" height="1" fill="url(#b)" mask="url(#m)" transform="translate(1,1) rotate(180)"></rect> </svg>);
};

export const getIconOnBackground = (tag: string, variant: string, topLeft: string = "#38C9EA", topRight: any = "#db258f", bottomRight: string = "#FFA93A", bottomLeft: any = "#6D3DFC", borderRadius: string = '7px') => {
    const svg = gradientSVG(topLeft, topRight, bottomRight, bottomLeft);
    const stringSVG =  ReactDOMServer.renderToString(svg);
    const backgroundSVG = `url("data:image/svg+xml,${encodeURIComponent(stringSVG)}")`;
    return (
        <div style={{
            backgroundImage: backgroundSVG, 
            borderRadius: borderRadius, 
            alignItems: 'center', 
            display: 'inline-flex', 
            justifyContent: 'center'}}
        >
            <NamedTag tag={tag} variant={variant} />
        </div>
    );
};
