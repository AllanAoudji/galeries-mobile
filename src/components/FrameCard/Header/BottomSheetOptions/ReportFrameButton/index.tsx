import * as React from 'react';
import { useSelector } from 'react-redux';

import BottomSheetButton from '#components/BottomSheetButton';
import { selectGalerie } from '#store/galeries';

type Props = {
    frame: Store.Models.Frame;
    me?: Store.Models.User;
};

const onPress = () => {};

const ReportFrameButton = ({ frame, me }: Props) => {
    const galerieSelector = React.useMemo(
        () => selectGalerie(frame.galerieId),
        [frame]
    );
    const galerie = useSelector(galerieSelector);

    if (!me || !galerie) return null;
    if (frame.userId === me.id) return null;
    if (galerie.role !== 'user') return null;

    return <BottomSheetButton onPress={onPress} title="delete frame" />;
};

export default React.memo(ReportFrameButton);
