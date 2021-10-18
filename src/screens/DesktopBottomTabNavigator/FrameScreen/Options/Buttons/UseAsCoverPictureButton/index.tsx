import * as React from 'react';
import { useDispatch, useSelector } from 'react-redux';

import { Typography } from '#components';
import { selectGalerie } from '#store/galeries';
import {
    putGaleriePicture,
    selectFrameGaleriePicturesAllIds,
    selectGalerieCoverPictureId,
    selectGaleriePicture,
} from '#store/galeriePictures';

import { Button } from './styles';

type Props = {
    currentIndex: number;
    frame: Store.Models.Frame;
};

const UseAsCoverPictureButton = ({ currentIndex, frame }: Props) => {
    const dispatch = useDispatch();

    const coverPictureIdSelector = React.useMemo(
        () => selectGalerieCoverPictureId(frame.galerieId),
        [frame]
    );
    const coverPictureId = useSelector(coverPictureIdSelector);

    const galerieSelector = React.useMemo(
        () => selectGalerie(frame ? frame.galerieId : null),
        [frame]
    );
    const galerie = useSelector(galerieSelector);

    const galeriePicturesAllIdsSelector = React.useMemo(
        () => selectFrameGaleriePicturesAllIds(frame.id),
        [frame]
    );
    const galeriePicturesAllIds = useSelector(galeriePicturesAllIdsSelector);

    const galeriePictureSelector = React.useMemo(
        () =>
            selectGaleriePicture(
                galeriePicturesAllIds
                    ? galeriePicturesAllIds[currentIndex]
                    : undefined
            ),
        [currentIndex, galeriePicturesAllIds]
    );
    const galeriePicture = useSelector(galeriePictureSelector);

    const handlePress = React.useCallback(() => {
        if (galeriePicturesAllIds && galeriePicturesAllIds[currentIndex]) {
            dispatch(
                putGaleriePicture(frame.id, galeriePicturesAllIds[currentIndex])
            );
        }
    }, [currentIndex, frame, galeriePicturesAllIds]);

    const text = React.useMemo(() => {
        if (
            coverPictureId &&
            galeriePicture &&
            galeriePicture.id === coverPictureId
        )
            return 'remove this cover picture';
        return 'use as cover picture';
    }, [coverPictureId, galeriePicture]);

    if (!galerie || galerie.role === 'user') return null;

    return (
        <Button onPress={handlePress}>
            <Typography fontSize={18}>{text}</Typography>
        </Button>
    );
};

export default UseAsCoverPictureButton;
