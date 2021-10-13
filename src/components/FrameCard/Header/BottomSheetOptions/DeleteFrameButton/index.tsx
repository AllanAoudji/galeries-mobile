import * as React from 'react';
import { useSelector } from 'react-redux';

import BottomSheetButton from '#components/BottomSheetButton';
import { BottomSheetContext } from '#contexts/BottomSheetContext';
import { DeleteFrameModalContext } from '#contexts/DeleteFrameModalContext';
import { selectMe } from '#store/me';
import { selectGalerie } from '#store/galeries';
import { selectUser } from '#store/users';

type Props = {
    frame: Store.Models.Frame;
};

const DeleteFrameButton = ({ frame }: Props) => {
    const { closeBottomSheet } = React.useContext(BottomSheetContext);
    const { handleOpenModal } = React.useContext(DeleteFrameModalContext);

    const galerieSelector = React.useMemo(
        () => selectGalerie(frame.galerieId),
        [frame]
    );
    const galerie = useSelector(galerieSelector);

    const me = useSelector(selectMe);

    const userSelector = React.useMemo(() => selectUser(frame.userId), [frame]);
    const user = useSelector(userSelector);

    const handlePress = React.useCallback(() => {
        handleOpenModal(frame.id);
        closeBottomSheet();
    }, [frame]);

    if (!galerie || !me || !user) return null;
    if (galerie.role === 'user') return null;
    if (user.id !== me.id) return null;

    return <BottomSheetButton onPress={handlePress} title="delete frame" />;
};

export default React.memo(DeleteFrameButton);
