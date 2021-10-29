import * as React from 'react';
import { useSelector } from 'react-redux';

import BottomSheetButton from '#components/BottomSheetButton';
import { BottomSheetContext } from '#contexts/BottomSheetContext';
import { DeleteFrameModalContext } from '#contexts/DeleteFrameModalContext';
import { selectGalerie } from '#store/galeries';

type Props = {
    frame: Store.Models.Frame;
    me?: Store.Models.User;
};

const DeleteFrameButton = ({ frame, me }: Props) => {
    const { closeBottomSheet } = React.useContext(BottomSheetContext);
    const { handleOpenModal } = React.useContext(DeleteFrameModalContext);

    const galerieSelector = React.useMemo(
        () => selectGalerie(frame.galerieId),
        [frame]
    );
    const galerie = useSelector(galerieSelector);

    const handlePress = React.useCallback(() => {
        handleOpenModal(frame.id);
        closeBottomSheet();
    }, [frame]);

    if (!galerie || !me) return null;
    if (galerie.role === 'user' && frame.userId !== me.id) return null;

    return <BottomSheetButton onPress={handlePress} title="delete frame..." />;
};

export default React.memo(DeleteFrameButton);
