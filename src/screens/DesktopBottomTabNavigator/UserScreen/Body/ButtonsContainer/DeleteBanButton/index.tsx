import { useFocusEffect, useNavigation } from '@react-navigation/native';
import * as React from 'react';
import { useDispatch, useSelector } from 'react-redux';

import { CustomButton } from '#components';
import { DeleteGalerieUserModalContext } from '#contexts/DeleteGalerieUserModalContext';
import {
    resetUsersLoadingDelete,
    selectUsersLoadingDelete,
} from '#store/users';

type Props = {
    galerie: Store.Models.Galerie;
    role: Store.Role;
    user: Store.Models.User;
};

const DeleteBanButton = ({ galerie, role, user }: Props) => {
    const dispatch = useDispatch();
    const navigation = useNavigation<Screen.DesktopBottomTab.UserScreen>();
    const { handleOpenModal } = React.useContext(DeleteGalerieUserModalContext);

    const loading = useSelector(selectUsersLoadingDelete);

    const handlePress = React.useCallback(() => {
        if (!loading.includes('LOADING')) handleOpenModal(galerie.id, user.id);
    }, [galerie, loading, user]);

    useFocusEffect(
        React.useCallback(() => {
            if (loading === 'SUCCESS') {
                if (navigation.canGoBack()) navigation.goBack();
                else navigation.navigate('Home');
            }
        }, [loading])
    );
    useFocusEffect(
        React.useCallback(() => {
            dispatch(resetUsersLoadingDelete());
        }, [])
    );

    if (galerie.role === 'user') return null;
    if (role === 'admin') return null;
    if (galerie.role === 'moderator' && role === 'moderator') return null;

    return (
        <CustomButton
            onPress={handlePress}
            title="delete/ban user"
            variant="stroke"
        />
    );
};

export default DeleteBanButton;
