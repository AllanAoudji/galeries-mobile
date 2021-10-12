import * as React from 'react';
import { useSelector } from 'react-redux';

import BottomSheetButton from '#components/BottomSheetButton';
import { selectMe } from '#store/me';
import { selectGalerie } from '#store/galeries';

type Props = {
    galerieId: string;
    userId: string;
};

const ReportFrameButton = ({ galerieId, userId }: Props) => {
    const galerieSelector = React.useMemo(
        () => selectGalerie(galerieId),
        [galerieId]
    );
    const galerie = useSelector(galerieSelector);
    const me = useSelector(selectMe);

    if (!me || !galerie) return null;
    if (userId === me.id) return null;
    if (galerie.role !== 'user') return null;

    return <BottomSheetButton onPress={() => {}} title="delete frame" />;
};

export default ReportFrameButton;
