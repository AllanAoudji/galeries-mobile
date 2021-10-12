import * as React from 'react';
import { useDispatch, useSelector } from 'react-redux';

import { selectGalerie } from '#store/galeries';
import {
    putGaleriePicture,
    selectGalerieCoverPictureId,
} from '#store/galeriePictures';

import BookMarkFill from './BookMarkFill';
import BookMarkStroke from './BookMarkStroke';

import { Container } from './styles';

type Props = {
    galeriePicture: Store.Models.GaleriePicture;
    frame: Store.Models.Frame;
};

const CoverPictureBookMark = ({ galeriePicture, frame }: Props) => {
    const dispatch = useDispatch();

    const coverPictureIdSelector = React.useMemo(
        () => selectGalerieCoverPictureId(frame.galerieId),
        [frame]
    );
    const coverPictureId = useSelector(coverPictureIdSelector);
    const galerieSelector = React.useMemo(
        () => selectGalerie(frame.galerieId),
        [frame]
    );
    const galerie = useSelector(galerieSelector);

    const handlePress = React.useCallback(() => {
        dispatch(putGaleriePicture(frame.id, galeriePicture.id));
    }, [frame, galeriePicture]);

    if (!galerie || galerie.role === 'user') return null;

    return (
        <Container onPress={handlePress}>
            {galeriePicture.id === coverPictureId ? (
                <BookMarkFill />
            ) : (
                <BookMarkStroke />
            )}
        </Container>
    );
};

export default React.memo(CoverPictureBookMark);
