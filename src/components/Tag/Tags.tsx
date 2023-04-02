import { Grid, Typography } from "@mui/material";
import TagList from "./TagList";
import { MUITags } from './MUITags';
import { OrgTags, OtherTags } from "./OrgTags";
import { CustomTags } from "./CustomTags";

export const TAG_COLORS = ['white', 'blue', 'green', 'indigo',  'orange', 'purple', 'yellow']
export const COLOR_MAP: any = {
    'blue': '#1e40af',
    'green': '#065f46',
    'indigo': '#3730a3',
    'orange': '#9a3412',
    'purple': '#5b21b2',
    'yellow': '#92400e',
};

export const getTagFromMap = (tagName: string, variant?: number, width?: string, height?: string, fill?: string, stroke?: string) => { 
    if (Object.keys(OrgTags).includes(tagName) || Object.keys(OtherTags).includes(tagName)) {
        return Object.keys(TAGS).includes(tagName) ? TAGS[tagName](variant, width, height) : getEmptyTag(width, height);
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
}

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
    return (
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
    );
};