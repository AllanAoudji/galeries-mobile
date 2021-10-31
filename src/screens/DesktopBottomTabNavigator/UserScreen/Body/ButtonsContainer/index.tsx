import * as React from 'react';
import { useDispatch, useSelector } from 'react-redux';

import { CustomButton } from '#components';
import {
    putGalerieUserRole,
    selectGalerieUserRolesLoadingPut,
} from '#store/galerieRoles';

import { Container } from './styles';

type Props = {
    galerie: Store.Models.Galerie;
    role?: Store.Role;
    user: Store.Models.User;
};

const handlePress = () => {};

const ButtonsContainer = ({ galerie, role, user }: Props) => {
    const dispatch = useDispatch();

    if (galerie.role === 'user') return null;

    const loadingGalerieRole = useSelector(selectGalerieUserRolesLoadingPut);

    const handlePressChangeRole = React.useCallback(() => {
        if (!loadingGalerieRole.includes('loading')) {
            dispatch(putGalerieUserRole(galerie.id, user.id));
        }
    }, [loadingGalerieRole, galerie, user]);

    return (
        <Container>
            {galerie.role === 'admin' && !!role && (
                <CustomButton
                    onPress={handlePressChangeRole}
                    loading={loadingGalerieRole.includes('LOADING')}
                    mb="smallest"
                    title={`change role for ${
                        role === 'moderator' ? 'user' : 'moderator'
                    }`}
                />
            )}
            <CustomButton
                onPress={handlePress}
                title="delete/ban user"
                variant="stroke"
            />
        </Container>
    );
};

export default ButtonsContainer;
