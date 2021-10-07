import * as React from 'react';
import { useSelector } from 'react-redux';

import { Typography } from '#components';
import { selectFrame } from '#store/frames';
import { selectGalerie } from '#store/galeries';

import { Button, Container, Spacing } from './styles';
import { selectMe } from '#store/me';

type Props = {
    frameId: string;
};

const Buttons = ({ frameId }: Props) => {
    const frameSeletor = React.useMemo(() => selectFrame(frameId), [frameId]);
    const frame = useSelector(frameSeletor);
    const galerieSelector = React.useMemo(
        () => selectGalerie(frame.galerieId),
        [frame]
    );
    const galerie = useSelector(galerieSelector);
    const me = useSelector(selectMe);

    const updateFrameButton = React.useMemo(() => {
        if (me && me.id === frame.userId)
            return (
                <Button>
                    <Typography fontSize={18}>update frame</Typography>
                </Button>
            );
        return null;
    }, [frame, me]);
    const useAsCoverPicture = React.useMemo(() => {
        if (galerie && galerie.role !== 'user')
            return (
                <Button>
                    <Typography fontSize={18}>use as cover picture</Typography>
                </Button>
            );
        return null;
    }, [galerie]);
    const deleteOrReportFrame = React.useMemo(() => {
        if (
            (me && frame.userId === me.id) ||
            (galerie && galerie.role !== 'user')
        )
            return (
                <Button>
                    <Typography fontSize={18}>delete frame</Typography>
                </Button>
            );
        return (
            <Button>
                <Typography fontSize={18}>report frame...</Typography>
            </Button>
        );
    }, []);

    return (
        <Container>
            {updateFrameButton}
            {useAsCoverPicture}
            {deleteOrReportFrame}
            <Spacing />
        </Container>
    );
};

export default Buttons;
