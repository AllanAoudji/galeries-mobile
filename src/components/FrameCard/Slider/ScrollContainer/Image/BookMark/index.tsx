import * as React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Pressable } from 'react-native';
import { selectGalerie } from '#store/galeries';

import BookMarkFill from './BookMarkFill';
import BookMarkStroke from './BookMarkStroke';
import {
    putGaleriePicture,
    selectGalerieCoverPictureId,
} from '#store/galeriePictures';

type Props = {
    galeriePicture: Store.Models.GaleriePicture;
    frame: Store.Models.Frame;
};

const BookMark = ({ galeriePicture, frame }: Props) => {
    const dispatch = useDispatch();
    const galerieSelector = React.useMemo(
        () => selectGalerie(frame.galerieId),
        [frame]
    );
    const galerie = useSelector(galerieSelector);

    const coverPictureIdSelector = React.useMemo(
        () => selectGalerieCoverPictureId(frame.galerieId),
        [frame]
    );
    const coverPictureId = useSelector(coverPictureIdSelector);

    const handlePressUseAsCoverPicture = React.useCallback(() => {
        dispatch(putGaleriePicture(frame.id, galeriePicture.id));
    }, [frame, galeriePicture]);

    if (!galerie || galerie.role === 'user') return null;

    return (
        <Pressable
            style={{
                position: 'absolute',
                bottom: 15,
                right: 15,
                paddingHorizontal: 15,
                paddingVertical: 15,
            }}
            onPress={handlePressUseAsCoverPicture}
        >
            {galeriePicture.id === coverPictureId ? (
                <BookMarkFill />
            ) : (
                <BookMarkStroke />
            )}
        </Pressable>
    );
};

export default BookMark;
