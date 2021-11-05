import * as React from 'react';
import { useSelector } from 'react-redux';

import BottomSheetButton from '#components/BottomSheetButton';
import { BottomSheetContext } from '#contexts/BottomSheetContext';
import { DeleteGalerieUserModalContext } from '#contexts/DeleteGalerieUserModalContext';
import { selectUsersLoadingDelete } from '#store/users';

type Props = {
    galerie: Store.Models.Galerie;
    role: Store.Role;
    user: Store.Models.User;
};

const DeleteBanButton = ({ galerie, role, user }: Props) => {
    const { closeBottomSheet } = React.useContext(BottomSheetContext);
    const { handleOpenModal } = React.useContext(DeleteGalerieUserModalContext);

    const loading = useSelector(selectUsersLoadingDelete);

    if (galerie.role === 'user') return null;
    if (role === 'admin') return null;
    if (role === 'moderator' && galerie.role === 'moderator') return null;

    const handlePress = React.useCallback(() => {
        closeBottomSheet();
        if (!loading.includes('LOADING')) handleOpenModal(galerie.id, user.id);
    }, [galerie, loading, user]);

    return <BottomSheetButton onPress={handlePress} title="delete/ban user" />;
};

export default DeleteBanButton;
