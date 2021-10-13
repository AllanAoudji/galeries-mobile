import * as React from 'react';
import { useSelector } from 'react-redux';
import { selectFrameGaleriePicturesAllIds } from '#store/galeriePictures';

import Dot from './Dot';

type Props = {
    frame: Store.Models.Frame;
};

const Dots = ({ frame }: Props) => {
    const frameGaleriePicturesAllIdsSelector = React.useMemo(
        () => selectFrameGaleriePicturesAllIds(frame.id),
        [frame]
    );
    const frameGaleriePicturesAllIds = useSelector(
        frameGaleriePicturesAllIdsSelector
    );

    if (!frameGaleriePicturesAllIds || frameGaleriePicturesAllIds.length <= 1)
        return null;

    return (
        <>
            {frameGaleriePicturesAllIds.map((id, index) => (
                <Dot index={index} key={id} />
            ))}
        </>
    );
};

export default React.memo(Dots);
