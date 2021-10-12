import * as React from 'react';
import { useDispatch, useSelector } from 'react-redux';

import BottomSheetButton from '#components/BottomSheetButton';
import { BottomSheetContext } from '#contexts/BottomSheetContext';
import {
    putGaleriePicture,
    selectFrameGaleriePicturesAllIds,
    selectGaleriePicture,
} from '#store/galeriePictures';
import { selectGalerie } from '#store/galeries';

type Props = {
    currentIndex: number;
    frame: Store.Models.Frame;
};

const UseAsCoverPictureButton = ({ currentIndex, frame }: Props) => {
    const dispatch = useDispatch();

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

    const { closeBottomSheet } = React.useContext(BottomSheetContext);

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

    const handlePressUseAsCoverPicture = React.useCallback(() => {
        if (galeriePicturesAllIds && galeriePicturesAllIds[currentIndex]) {
            dispatch(
                putGaleriePicture(frame.id, galeriePicturesAllIds[currentIndex])
            );
        }
        closeBottomSheet();
    }, [currentIndex, frame, galeriePicturesAllIds]);

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
