import * as React from 'react';
import { useSelector } from 'react-redux';

import BottomSheetButton from '#components/BottomSheetButton';
import { BottomSheetContext } from '#contexts/BottomSheetContext';
import { DeleteInvitationModalContext } from '#contexts/DeleteInvitationModalContext';
import { selectGalerie } from '#store/galeries';
import { selectMe } from '#store/me';

type Props = {
    invitation: Store.Models.Invitation;
};

const DeleteInvitationButton = ({ invitation }: Props) => {
    const { closeBottomSheet } = React.useContext(BottomSheetContext);
    const { handleOpenModal } = React.useContext(DeleteInvitationModalContext);

    const galerieSelector = React.useMemo(
        () => selectGalerie(invitation.galerieId),
        [invitation]
    );
    const galerie = useSelector(galerieSelector);
    const me = useSelector(selectMe);

    const handlePress = React.useCallback(() => {
        handleOpenModal(invitation.id);
        closeBottomSheet();
    }, [closeBottomSheet, invitation]);

    if (!galerie || !me) return null;
    if (galerie.role === 'user') return null;
    if (invitation.userId !== me.id) return null;

    return (
        <BottomSheetButton onPress={handlePress} title="delete invitation..." />
    );
};

export default React.memo(DeleteInvitationButton);
