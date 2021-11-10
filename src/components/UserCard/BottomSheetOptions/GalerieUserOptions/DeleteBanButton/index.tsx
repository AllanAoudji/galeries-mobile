import * as React from 'react';
import { useSelector } from 'react-redux';

import BottomSheetButton from '#components/BottomSheetButton';
import { BottomSheetContext } from '#contexts/BottomSheetContext';
import { DeleteGalerieUserModalContext } from '#contexts/DeleteGalerieUserModalContext';
import { selectUsersLoadingDelete } from '#store/users';

type Props = {
    galerie: Store.Models.Galerie;
    hide: boolean;
    user: Store.Models.User;
};

const DeleteBanButton = ({ galerie, hide, user }: Props) => {
    const { closeBottomSheet } = React.useContext(BottomSheetContext);
    const { handleOpenModal } = React.useContext(DeleteGalerieUserModalContext);

    const loading = useSelector(selectUsersLoadingDelete);

    const handlePress = React.useCallback(() => {
        closeBottomSheet();
        if (!loading.includes('LOADING')) handleOpenModal(galerie.id, user.id);
    }, [galerie, handleOpenModal, loading, user]);

    if (hide) return null;

    return <BottomSheetButton onPress={handlePress} title="delete/ban user" />;
};

export default React.memo(DeleteBanButton);
