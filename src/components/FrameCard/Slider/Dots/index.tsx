import * as React from 'react';

import { Dot } from './styles';

type Props = {
    allIds: string[];
    currentIndex: number;
};

const Dots = ({ allIds, currentIndex }: Props) => {
    if (allIds.length <= 1) return null;

    return (
        <>
            {allIds.map((id, index) => (
                <Dot current={currentIndex === index} key={id} />
            ))}
        </>
    );
};

export default React.memo(Dots);
