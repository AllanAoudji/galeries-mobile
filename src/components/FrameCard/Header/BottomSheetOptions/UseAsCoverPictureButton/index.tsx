import * as React from 'react';
import { useDispatch, useSelector } from 'react-redux';

import BottomSheetButton from '#components/BottomSheetButton';
import { BottomSheetContext } from '#contexts/BottomSheetContext';
import { CurrentGaleriePictureContext } from '#contexts/CurrentGaleriePictureContext';
import { selectGalerie } from '#store/galeries';
import {
    putGaleriePicture,
    selectFrameGaleriePicturesAllIds,
    selectGaleriePicture,
} from '#store/galeriePictures';

type Props = {
    frameId: string;
    galerieId: string;
};

const UseAsCoverPictureButton = ({ frameId, galerieId }: Props) => {
    const dispatch = useDispatch();

    const { currentIndex } = React.useContext(CurrentGaleriePictureContext);
    const { closeBottomSheet } = React.useContext(BottomSheetContext);

    const galeriePicturesAllIdsSelector = React.useMemo(
        () => selectFrameGaleriePicturesAllIds(frameId),
        [frameId]
    );
    const galeriePicturesAllIds = useSelector(galeriePicturesAllIdsSelector);
    const galeriePictureSelector = React.useMemo(
        () =>
            selectGaleriePicture(
                galeriePicturesAllIds
                    ? galeriePicturesAllIds[currentIndex]
                    : undefined
            ),
        [currentIndex]
    );
    const galeriePicture = useSelector(galeriePictureSelector);

    const galerieSelector = React.useMemo(
        () => selectGalerie(galerieId),
        [galerieId]
    );
    const galerie = useSelector(galerieSelector);

    const handlePressUseAsCoverPicture = React.useCallback(() => {
        if (galeriePicturesAllIds && galeriePicturesAllIds[currentIndex]) {
            dispatch(
                putGaleriePicture(frameId, galeriePicturesAllIds[currentIndex])
            );
        }
        closeBottomSheet();
    }, [frameId, currentIndex, galeriePicturesAllIds]);

    const text = React.useMemo(() => {
        if (galeriePicture && galeriePicture.current)
            return 'remove this cover picture';
        return 'use as cover picture';
    }, [galeriePicture]);

    if (!galerie || galerie.role === 'user') return null;

    return (
        <BottomSheetButton
            onPress={handlePressUseAsCoverPicture}
            title={text}
        />
    );
};

export default UseAsCoverPictureButton;
