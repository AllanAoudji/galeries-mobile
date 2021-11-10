import * as React from 'react';
import { useDispatch, useSelector } from 'react-redux';

import { CustomButton } from '#components';
import {
    putGalerieUserRole,
    selectGalerieUserRolesLoadingPut,
} from '#store/galerieRoles';

import DeleteBanButton from './DeleteBanButton';

import { Container } from './styles';

type Props = {
    galerie: Store.Models.Galerie;
    role?: Store.Role;
    user: Store.Models.User;
};

const ButtonsContainer = ({ galerie, role, user }: Props) => {
    const dispatch = useDispatch();

    const loadingGalerieRole = useSelector(selectGalerieUserRolesLoadingPut);

    const handlePressChangeRole = React.useCallback(() => {
        if (loadingGalerieRole.includes('loading')) return;
        dispatch(putGalerieUserRole(galerie.id, user.id));
    }, [galerie, loadingGalerieRole, user]);

    if (galerie.role === 'user') return null;

    return (
        <Container>
            {galerie.role === 'admin' && !!role && (
                <CustomButton
                    loading={loadingGalerieRole.includes('LOADING')}
                    mb="smallest"
                    onPress={handlePressChangeRole}
                    title={`change role for ${
                        role === 'moderator' ? 'user' : 'moderator'
                    }`}
                />
            )}
            <DeleteBanButton galerie={galerie} role={role} user={user} />
        </Container>
    );
};

export default ButtonsContainer;
