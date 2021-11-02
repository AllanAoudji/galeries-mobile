import * as React from 'react';
import { useSelector } from 'react-redux';

import { CustomButton } from '#components';
import { DeleteGalerieUserModalContext } from '#contexts/DeleteGalerieUserModalContext';
import { selectUsersLoadingDelete } from '#store/users';

type Props = {
    galerie: Store.Models.Galerie;
    role?: Store.Role;
    user: Store.Models.User;
};

const DeleteBanButton = ({ galerie, role, user }: Props) => {
    const { handleOpenModal } = React.useContext(DeleteGalerieUserModalContext);

    const loading = useSelector(selectUsersLoadingDelete);

    const handlePress = React.useCallback(() => {
        if (!loading.includes('LOADING')) handleOpenModal(galerie.id, user.id);
    }, [galerie, loading, user]);

    if (galerie.role === 'user') return null;
    if (!role) return null;
    if (role === 'admin') return null;
    if (role === 'moderator' && galerie.role === 'moderator') return null;

    return (
        <CustomButton
            onPress={handlePress}
            title="delete/ban user"
            variant="stroke"
        />
    );
};

export default DeleteBanButton;
