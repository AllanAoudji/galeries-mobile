import * as React from 'react';
import { useSelector } from 'react-redux';

import { Container, Spacing } from './styles';
import { selectMe } from '#store/me';

import DeleteFrameButton from './DeleteFrameButton';
import ReportFrameButton from './ReportFrameButton';
import UpdateFrameButton from './UpdateFrameButton';
import UseAsCoverPictureButton from './UseAsCoverPictureButton';

type Props = {
    currentIndex: number;
    frame: Store.Models.Frame;
};

const Buttons = ({ currentIndex, frame }: Props) => {
    const me = useSelector(selectMe);

    return (
        <Container>
            <UpdateFrameButton frame={frame} me={me} />
            <UseAsCoverPictureButton
                currentIndex={currentIndex}
                frame={frame}
            />
            <DeleteFrameButton frame={frame} me={me} />
            <ReportFrameButton frame={frame} me={me} />
            <Spacing />
        </Container>
    );
};

export default React.memo(Buttons);
