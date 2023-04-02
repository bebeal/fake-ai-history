import { Grid, Typography } from "@mui/material";
import TagList from "./TagList";
import { MUITags } from './MUITags';
import { OrgTags, OtherTags } from "./OrgTags";
import { CustomTags } from "./CustomTags";
import ReactDOMServer from "react-dom/server";
import Tag from "./Tag";

export const TAG_COLORS = ['white', 'blue', 'green', 'indigo',  'orange', 'purple', 'yellow']

export const getTagFromMap = (tagName: string, variant: number = 0, width: string = '32px', height: string = '32px', fill: string = '#000000', stroke: string = '#000000') => { 
    if (Object.keys(OrgTags).includes(tagName) || Object.keys(OtherTags).includes(tagName)) {
        return Object.keys(TAGS).includes(tagName) ? TAGS[tagName](variant, width, height, fill, stroke) : getEmptyTag(width, height);
    }
    return Object.keys(TAGS).includes(tagName) ? TAGS[tagName](width, height, fill, stroke) : getEmptyTag(width, height);
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
                <stop offset="0" stop-color="#fff" stop-opacity="0"></stop>
                <stop offset="1" stop-color="#fff" stop-opacity="1"></stop>
            </linearGradient>
            <mask id="m">
                <rect x="0" y="0" width="1" height="1" fill="url(#g)"></rect>
            </mask>
            <linearGradient id="a" gradientTransform="rotate(90)">
                <stop offset="0" stop-color={topRight}></stop>
                <stop offset="1" stop-color={bottomRight}></stop>
            </linearGradient>
            <linearGradient id="b" gradientTransform="rotate(90)">
                <stop offset="0" stop-color={bottomLeft}></stop>
                <stop offset="1" stop-color={topLeft}></stop>
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
  ...CustomTags,
  ...OrgTags,
  ...MUITags,
  ...OtherTags,
};

/* For Testing */
export const renderAllTags: any = () => {
    return <TagList tags={Object.keys(TAGS)} />;
};

export const renderAllTagSets: any = () => {
    const svg =  ReactDOMServer.renderToString(fourCornerGradientBackground());
    const backgroundImage = `url("data:image/svg+xml,${encodeURIComponent(svg)}")`;
    const tag = TAGS['OpenAI'](0, '24px', '24px', '#FFFFFF',);
    return (
        <>
        <Grid container justifyContent="center" spacing={'2'}>
        <Grid item >{getIconOnTopOfBackgroundGradient('OpenAI', 0, '32px', '32px', '#FFFFFF', '#FFFFFF', '#38C9EA', '#db258f', '#FFA93A', '#6D3DFC', '15px')}</Grid>
        <Grid item >{getIconOnTopOfBackgroundGradient('OpenAI', 0, '32px', '32px', '#FFFFFF', '#FFFFFF', '#38C9EA', '#db258f', '#FFA93A', '#6D3DFC', '10px')}</Grid>
        <Grid item >{getIconOnTopOfBackgroundGradient('OpenAI', 0, '32px', '32px', '#FFFFFF', '#FFFFFF', '#38C9EA', '#db258f', '#FFA93A', '#6D3DFC', '7px')}</Grid>
        <Grid item >{getIconOnTopOfBackgroundGradient('OpenAI', 0, '32px', '32px', '#FFFFFF', '#FFFFFF', '#38C9EA', '#db258f', '#FFA93A', '#6D3DFC', '5px')}</Grid>
        <Grid item >{getIconOnTopOfBackgroundGradient('OpenAI', 0, '32px', '32px', '#FFFFFF', '#FFFFFF', '#38C9EA', '#db258f', '#FFA93A', '#6D3DFC', '0px')}</Grid>
        </Grid>
        <Grid container direction="row" justifyContent="center" alignItems="stretch" style={{height: "100%"}}>
            <Grid container item xs direction="column" justifyContent="center" alignItems="center" style={{height: "100%"}}>
                <Typography variant="h5">Custom</Typography>
                <TagList 
                    tags={Object.keys(CustomTags)} 
                    tagColors={ Array.from({length: Object.keys(CustomTags).length}, () => TAG_COLORS[Math.floor(Math.random() * TAG_COLORS.length)]) }
                />
            </Grid>
            <Grid container item xs direction="column" justifyContent="center" alignItems="center" style={{height: "100%"}}>
                <Typography variant="h5">Organizations</Typography>
                <TagList useHref={true}  tags={Object.keys(OrgTags)} />
            </Grid>
            <Grid container item xs direction="column" justifyContent="center" alignItems="center" style={{height: "100%"}}>
                <Typography variant="h5">MUI</Typography>
                <TagList tags={Object.keys(MUITags)}/>
            </Grid>
            <Grid container item xs direction="column" justifyContent="center" alignItems="center" style={{height: "100%"}}>
                <Typography variant="h5">Other</Typography>
                <TagList useHref={true}  tags={Object.keys(OtherTags)} />
            </Grid>
        </Grid>
        </>
    );
};