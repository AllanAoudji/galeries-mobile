import * as React from 'react';
import { useDispatch, useSelector } from 'react-redux';

import { CustomButton } from '#components';
import {
    putGalerieUserRole,
    selectGalerieUserRolesLoadingPut,
} from '#store/galerieRoles';

type Props = {
    galerie: Store.Models.Galerie;
    role: Store.Role;
    user: Store.Models.User;
};

const ChangeRoleButton = ({ galerie, role, user }: Props) => {
    const dispatch = useDispatch();

    const loadingGalerieRole = useSelector(selectGalerieUserRolesLoadingPut);

    const handlePressChangeRole = React.useCallback(() => {
        if (loadingGalerieRole.includes('loading')) return;
        dispatch(putGalerieUserRole(galerie.id, user.id));
    }, [galerie, loadingGalerieRole, user]);

    if (galerie.role !== 'admin') return null;

    return (
        <CustomButton
            loading={loadingGalerieRole.includes('LOADING')}
            mb="smallest"
            onPress={handlePressChangeRole}
            title={`change role for ${
                role === 'moderator' ? 'user' : 'moderator'
            }`}
        />
    );
};

export default ChangeRoleButton;
