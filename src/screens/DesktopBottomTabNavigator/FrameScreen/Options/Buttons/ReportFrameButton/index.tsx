import * as React from 'react';
import { useSelector } from 'react-redux';

import { Typography } from '#components';
import { selectGalerie } from '#store/galeries';

import { Button } from './styles';

type Props = {
    frame: Store.Models.Frame;
    me?: Store.Models.User;
};

const ReportFrameButton = ({ frame, me }: Props) => {
    const galerieSelector = React.useMemo(
        () => selectGalerie(frame.galerieId),
        [frame]
    );
    const galerie = useSelector(galerieSelector);

    if (!me || !galerie) return null;
    if (frame.userId === me.id) return null;
    if (galerie.role !== 'user') return null;

    return (
        <Button>
            <Typography fontSize={18}>report frame</Typography>
        </Button>
    );
};

export default React.memo(ReportFrameButton);
