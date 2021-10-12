import * as React from 'react';
import { useSelector } from 'react-redux';

import BottomSheetButton from '#components/BottomSheetButton';
import { DeleteFrameModalContext } from '#contexts/DeleteFrameModalContext';
import { selectGalerie } from '#store/galeries';
import { selectMe } from '#store/me';
import { BottomSheetContext } from '#contexts/BottomSheetContext';

type Props = {
    frameId: string;
    galerieId: string;
    userId: string;
};

const DeleteFrameButton = ({ frameId, galerieId, userId }: Props) => {
    const { closeBottomSheet } = React.useContext(BottomSheetContext);
    const { handleOpenModal } = React.useContext(DeleteFrameModalContext);

    const galerieSelector = React.useMemo(
        () => selectGalerie(galerieId),
        [galerieId]
    );
    const galerie = useSelector(galerieSelector);

    const me = useSelector(selectMe);

    const handlePressDeleteFrame = React.useCallback(() => {
        handleOpenModal(frameId);
        closeBottomSheet();
    }, [frameId]);

    if (!me || userId !== me.id) return null;
    if (!galerie || galerie.role === 'user') return null;
    return (
        <BottomSheetButton
            onPress={handlePressDeleteFrame}
            title="delete frame"
        />
    );
};

export default DeleteFrameButton;
