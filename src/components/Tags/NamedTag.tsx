import React from 'react';
import Tag from './Tag';
import { getTagFromMap } from './tagUtils';

interface NamedTagProps {
    tag: string;
    variant?: string;
    inactive?: boolean;
    useHref?: boolean;
};

const NamedTag = ({
    tag,
    variant='ghost',
    inactive=false,
    useHref=false,
}: NamedTagProps) => {
    const tagFromMap: any = getTagFromMap(tag);

    return (
        <Tag 
            icon={tagFromMap.icon}
            label={tagFromMap.label}
            variant={variant}
            inactive={inactive}
            href={useHref ? tagFromMap.href : undefined}            
        />
    );
};

export default NamedTag;
