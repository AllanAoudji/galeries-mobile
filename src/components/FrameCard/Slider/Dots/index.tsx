import * as React from 'react';
import { CurrentGaleriePictureContext } from '#contexts/CurrentGaleriePictureContext';

import { Dot } from './styles';

type Props = {
    allIds: string[];
};

const Dots = ({ allIds }: Props) => {
    const { currentIndex } = React.useContext(CurrentGaleriePictureContext);

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
