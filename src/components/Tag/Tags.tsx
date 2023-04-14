import React, { useEffect, useState } from "react";
import { Org_Tags } from "./Tags/Org_Tags";
import { BI_Tags } from "./Tags/BI_Tags";
import { BX_Tags } from "./Tags/BX_Tags";
import { Carbon_Tags } from "./Tags/Carbon_Tags";
import { Custom_Tags } from "./Tags/Custom_Tags";
import { FABrand_Tags } from "./Tags/FABrand_Tags";
import { FARegular_Tags } from "./Tags/FARegular_Tags";
import { HF_Tags } from "./Tags/HF_Tags";
import { IC_Tags } from "./Tags/IC_Tags";
import { Ion_Tags } from "./Tags/Ion_Tags";
import { Logo_Tags } from "./Tags/Logo_Tags";
import { MDI_Tags } from "./Tags/MDI_Tags";
import { MingCute_Tags } from "./Tags/MingCute_Tags";
import { PH_Tags } from "./Tags/PH_Tags";
import { RI_Tags } from "./Tags/RI_Tags";
import { Tabler_Tags } from "./Tags/Tabler_Tags";
import { Teeny_Tags } from "./Tags/Teeny_Tags";
import { UIL_Tags } from "./Tags/UIL_Tags";
import { VSCode_Tags } from "./Tags/VSCode_Tags";

import { Button, Grid, Typography } from "@mui/material";
import TagList from "./TagList";
import ReactDOMServer from "react-dom/server";
import NamedTag from "./NamedTag";
import { range, slice } from "../../utils/utils";

export const TAG_COLORS = ['white', 'ghost', 'blue', 'green', 'indigo',  'orange', 'purple', 'yellow']

export const getTagFromMap = (tagName: string, variant: number = 0, width: string = '32px', height: string = '32px', fill: string = '#000000', stroke: string = '#000000') => { 
    if (Object.keys(Org_Tags).includes(tagName)) {
        return Object.keys(TAGS).includes(tagName) ? TAGS[tagName](variant, width, height, fill, stroke) : getEmptyTag(width, height);
    }
    return Object.keys(TAGS).includes(tagName) ? TAGS[tagName](width, height, "var(--tw-color)") : getEmptyTag(width, height);
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
export const fourCornerGradientBackground = (topLeft: string = "#38C9EA", topRight: any = "#db258f", bottomRight: string = "#FFA93A", bottomLeft: any = "#6D3DFC"): any => {
    return (
        <svg preserveAspectRatio="none" viewBox="0 0 1 1" version="1.1" xmlns="http://www.w3.org/2000/svg">
            <defs>
            <linearGradient id="g">
                <stop offset="0" stopColor="#fff" stopOpacity="0"></stop>
                <stop offset="1" stopColor="#fff" stopOpacity="1"></stop>
            </linearGradient>
            <mask id="m">
                <rect x="0" y="0" width="1" height="1" fill="url(#g)"></rect>
            </mask>
            <linearGradient id="a" gradientTransform="rotate(90)">
                <stop offset="0" stopColor={topRight}></stop>
                <stop offset="1" stopColor={bottomRight}></stop>
            </linearGradient>
            <linearGradient id="b" gradientTransform="rotate(90)">
                <stop offset="0" stopColor={bottomLeft}></stop>
                <stop offset="1" stopColor={topLeft}></stop>
            </linearGradient>
            </defs>
            <rect x="0" y="0" width="1" height="1" fill="url(#a)" mask="url(#m)"></rect>
            <rect x="0" y="0" width="1" height="1" fill="url(#b)" mask="url(#m)" transform="translate(1,1) rotate(180)"></rect>
        </svg>
    );
};

export const getIconOnTopOfBackgroundGradient = (tagName: string, variant: number = 0, width: string = '32px', height: string = '32px', fill: string = '#FFFFFF', stroke: string = '#FFFFFF', topLeft: string = "#38C9EA", topRight: any = "#db258f", bottomRight: string = "#FFA93A", bottomLeft: any = "#6D3DFC", borderRadius: string = '7px') => {
    const newWidth = (parseFloat(width) * 0.8) + 'px';
    const newHeight = (parseFloat(height) * 0.8) + 'px';
    const tag: any = getTagFromMap(tagName, variant, newWidth, newHeight, fill, stroke);
    const svg =  ReactDOMServer.renderToString(fourCornerGradientBackground(topLeft, topRight, bottomRight, bottomLeft));
    const backgroundImage = `url("data:image/svg+xml,${encodeURIComponent(svg)}")`;
    return <div style={{backgroundImage, width: width, height: width, borderRadius: borderRadius, alignItems: 'center', display: 'inline-flex', justifyContent: 'center'}}>{tag.icon}</div>
};


export const TAGS: any = {
    ...Custom_Tags,
    ...Org_Tags,
    ...BI_Tags,
    ...BX_Tags,
    ...Carbon_Tags,
    ...FABrand_Tags,
    ...FARegular_Tags,
    ...HF_Tags,
    ...IC_Tags,
    ...Ion_Tags,
    ...MDI_Tags,
    ...MingCute_Tags,
    ...PH_Tags,
    ...RI_Tags,
    ...Tabler_Tags,
    ...Teeny_Tags,
    ...UIL_Tags,
    ...Logo_Tags,
    ...VSCode_Tags,
};

/* For Testing */
export const customGradientLogo = () => {
    return (
        <Grid container justifyContent="center" spacing={'2'}>
            <Grid item >{getIconOnTopOfBackgroundGradient('OpenAI', 0, '32px', '32px', '#FFFFFF', '#FFFFFF', '#38C9EA', '#db258f', '#FFA93A', '#6D3DFC', '15px')}</Grid>
            <Grid item >{getIconOnTopOfBackgroundGradient('OpenAI', 0, '32px', '32px', '#FFFFFF', '#FFFFFF', '#38C9EA', '#db258f', '#FFA93A', '#6D3DFC', '10px')}</Grid>
            <Grid item >{getIconOnTopOfBackgroundGradient('OpenAI', 0, '32px', '32px', '#FFFFFF', '#FFFFFF', '#38C9EA', '#db258f', '#FFA93A', '#6D3DFC', '7px')}</Grid>
            <Grid item >{getIconOnTopOfBackgroundGradient('OpenAI', 0, '32px', '32px', '#FFFFFF', '#FFFFFF', '#38C9EA', '#db258f', '#FFA93A', '#6D3DFC', '5px')}</Grid>
            <Grid item >{getIconOnTopOfBackgroundGradient('OpenAI', 0, '32px', '32px', '#FFFFFF', '#FFFFFF', '#38C9EA', '#db258f', '#FFA93A', '#6D3DFC', '0px')}</Grid>
        </Grid>
    )
}

export const renderAllTags: any = () => {
    return <TagList tagNames={Object.keys(TAGS)} />;
};

interface RenderTagSetProps {
    initialTags: any;
    initialMaxNumTags?: number;
    initialSkip?: number;
    increment?: number;
}

export const RenderTagSet = ({
    initialTags,
    initialMaxNumTags=32,
    initialSkip=2,
    increment=32,
}: RenderTagSetProps) => {
    const [maxNumTags, setMaxNumTags] = useState<number>(initialMaxNumTags);
    const [skip, setSkip] = useState<number>(initialSkip);
    const [tags, setTags] = useState(slice(initialTags, 0, initialTags.length > maxNumTags ? maxNumTags : initialTags.length, skip));
    
    const prefix = initialTags[0].split('_')[0];
    const tagColors = Array.from({length: initialTags.length}, () => TAG_COLORS[Math.floor(Math.random() * TAG_COLORS.length)])

    useEffect(() => {
        setTags(slice(initialTags, 0, initialTags.length > maxNumTags ? maxNumTags : initialTags.length, skip));
    }, [initialTags, maxNumTags, skip]);

    return (
        <Grid container alignItems={'top'}>
            <Grid container item direction={'column'} justifyContent="center" alignItems="center">
                <Grid item><h2>{prefix}</h2></Grid>
                <Grid item>
                    <button 
                    type="button"
                    disabled={maxNumTags >= initialTags.length}
                    onClick={() => {
                        setMaxNumTags(Math.min(maxNumTags + increment, initialTags.length));
                        setTags(slice(initialTags, 0, Object.keys(initialTags).length > maxNumTags ? maxNumTags : Object.keys(initialTags).length, skip));
                    }}>+</button>
                    <button 
                    type="button"
                    disabled={tags.length === 0 || maxNumTags <= 0}
                    onClick={() => {
                        setMaxNumTags(Math.max(maxNumTags - increment, 0));
                        setTags(slice(initialTags, 0, Object.keys(initialTags).length > maxNumTags ? maxNumTags : Object.keys(initialTags).length, skip));
                    }
                    }>-</button>
                    <button
                    type="button"
                    disabled={maxNumTags >= initialTags.length}
                    onClick={() => {
                        setMaxNumTags(initialTags.length);
                        setTags(Object.keys(initialTags));
                    }}>Show All</button>
                </Grid>
            </Grid>
            <Grid container item>
                <TagList 
                    tagNames={tags} 
                    tagColors={tagColors}
                />
            </Grid>
        </Grid>
    )
};

export const RenderAllTagSets = () => {    
    return (
        <Grid container spacing={2} style={{height: "100%", width: "100%", overflow: "hidden"}} marginLeft={'0px'}>
            <Grid item xs><RenderTagSet initialTags={Object.keys(Org_Tags)} /></Grid>
            <Grid item xs><RenderTagSet initialTags={Object.keys(BI_Tags)} /></Grid>
            <Grid item xs><RenderTagSet initialTags={Object.keys(BX_Tags)} /></Grid>
            <Grid item xs><RenderTagSet initialTags={Object.keys(Carbon_Tags)} /></Grid>
            <Grid item xs><RenderTagSet initialTags={Object.keys(FABrand_Tags)} /></Grid>
            <Grid item xs><RenderTagSet initialTags={Object.keys(FARegular_Tags)} /></Grid>
            <Grid item xs><RenderTagSet initialTags={Object.keys(HF_Tags)} /></Grid>
            <Grid item xs><RenderTagSet initialTags={Object.keys(IC_Tags)} /></Grid>
            <Grid item xs><RenderTagSet initialTags={Object.keys(Ion_Tags)} /></Grid>
            <Grid item xs><RenderTagSet initialTags={Object.keys(MDI_Tags)} /></Grid>
            <Grid item xs><RenderTagSet initialTags={Object.keys(MingCute_Tags)} /></Grid>
            <Grid item xs><RenderTagSet initialTags={Object.keys(PH_Tags)} /></Grid>
            <Grid item xs><RenderTagSet initialTags={Object.keys(RI_Tags)} /></Grid>
            <Grid item xs><RenderTagSet initialTags={Object.keys(Tabler_Tags)} /></Grid>
            <Grid item xs><RenderTagSet initialTags={Object.keys(Teeny_Tags)} /></Grid>
            <Grid item xs><RenderTagSet initialTags={Object.keys(UIL_Tags)} /></Grid>
            <Grid item xs><RenderTagSet initialTags={Object.keys(Logo_Tags)} /></Grid>
            <Grid item xs><RenderTagSet initialTags={Object.keys(VSCode_Tags)} /></Grid>
        </Grid>
    );
};