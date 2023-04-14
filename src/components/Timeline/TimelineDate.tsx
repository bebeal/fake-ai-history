import React from 'react';
import moment from 'moment';


export interface TimelineDateProps {
    date: any;
    formats?: string[];
}

const TimelineDate = ({
    date,
    formats=["DD MMM YYYY", "MM / DD / YYYY"],
}: TimelineDateProps) => {
    const [format, setFormat] = React.useState<number>(0);

    const handleOnClick = () => {
        setFormat((format + 1) % formats.length);
    };

    return (
        <time style={{
            cursor: "pointer",
        }} onClick={handleOnClick}>{moment(date).format(formats[format])}</time>
    );
};

export default TimelineDate;