import * as React from 'react';
import { useSelector } from 'react-redux';

import CoverPictureBookMark from '#components/CoverPictureBookMark';
import { selectGalerie } from '#store/galeries';
import { selectGalerieCoverPictureId } from '#store/galeriePictures';

import { Container } from './styles';

type Props = {
    frame: Store.Models.Frame;
    galeriePictureId: string;
};

const BookMark = ({ frame, galeriePictureId }: Props) => {
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

    if (!galerie) return null;
    if (galerie.role === 'user') return null;

    return (
        <Container>
            <CoverPictureBookMark
                coverPictureId={coverPictureId}
                frame={frame}
                galeriePictureId={galeriePictureId}
            />
        </Container>
    );
};

export default React.memo(BookMark);
