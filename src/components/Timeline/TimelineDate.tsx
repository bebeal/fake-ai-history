import React, { useEffect } from 'react';
import moment from 'moment';


export interface TimelineDateProps {
    date: any;
    formats?: string[];
}

const TimelineDate = ({
    date,
    formats=["DD MMM YYYY", "MM/DD/YYYY", "MM/YYYY", "YYYY"],
}: TimelineDateProps) => {
    const [format, setFormat] = React.useState<number>(0);

    const changeFormat = () => {
        setFormat((format + 1) % formats.length);
    };

    const updateFormat = () => {
        if (window.innerWidth < 400) {
          setFormat(3);
        } else if (window.innerWidth < 768) {
          setFormat(2);
        } else if (window.innerWidth < 1500) {
          setFormat(1);
        } else {
          setFormat(0);
        }
      };

    useEffect(() => {
        updateFormat();
        window.addEventListener('resize', updateFormat);
    
        return () => {
          window.removeEventListener('resize', updateFormat);
        };
      }, []);

    return (
        <time>{moment(date).format(formats[format])}</time>
    );
};

export default TimelineDate;