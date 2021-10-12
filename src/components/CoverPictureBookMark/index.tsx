import * as React from 'react';
import { useDispatch } from 'react-redux';

import { putGaleriePicture } from '#store/galeriePictures';

import BookMarkFill from './BookMarkFill';
import BookMarkStroke from './BookMarkStroke';

import { Container } from './styles';

type Props = {
    coverPictureId: string | null | undefined;
    frame: Store.Models.Frame;
    galeriePictureId: string;
};

const CoverPictureBookMark = ({
    coverPictureId,
    frame,
    galeriePictureId,
}: Props) => {
    const dispatch = useDispatch();

    const handlePress = React.useCallback(() => {
        if (frame && galeriePictureId)
            dispatch(putGaleriePicture(frame.id, galeriePictureId));
    }, [frame, galeriePictureId]);

    return (
        <Container onPress={handlePress}>
            {galeriePictureId && galeriePictureId === coverPictureId ? (
                <BookMarkFill />
            ) : (
                <BookMarkStroke />
            )}
        </Container>
    );
};

export default React.memo(CoverPictureBookMark);
