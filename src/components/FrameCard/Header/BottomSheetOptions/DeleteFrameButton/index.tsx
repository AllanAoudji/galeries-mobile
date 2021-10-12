import * as React from 'react';
import { useSelector } from 'react-redux';

import BottomSheetButton from '#components/BottomSheetButton';
import { BottomSheetContext } from '#contexts/BottomSheetContext';
import { selectMe } from '#store/me';
import { selectGalerie } from '#store/galeries';
import { selectUser } from '#store/users';
import { DeleteFrameModalContext } from '#contexts/DeleteFrameModalContext';

type Props = {
    frame: Store.Models.Frame;
    // onPress: () => void;
};

const DeleteFrameButton = ({ frame }: Props) => {
    const { closeBottomSheet } = React.useContext(BottomSheetContext);

    const galerieSelector = React.useMemo(
        () => selectGalerie(frame.galerieId),
        [frame]
    );
    const galerie = useSelector(galerieSelector);
    const userSelector = React.useMemo(() => selectUser(frame.userId), [frame]);
    const user = useSelector(userSelector);

    const me = useSelector(selectMe);

    const { handleOpenModal } = React.useContext(DeleteFrameModalContext);
    const handlePressDelete = React.useCallback(() => {
        handleOpenModal(frame.id);
    }, [frame]);

    const handlePressDeleteFrame = React.useCallback(() => {
        handlePressDelete();
        closeBottomSheet();
    }, []);

    if (!galerie || !me || !user) return null;
    if (galerie.role === 'user') return null;
    if (user.id !== me.id) return null;

    return (
        <BottomSheetButton
            onPress={handlePressDeleteFrame}
            title="delete frame"
        />
    );
};

export default React.memo(DeleteFrameButton);
