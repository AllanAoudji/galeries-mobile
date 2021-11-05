import * as React from 'react';
import { useDispatch } from 'react-redux';

import { BottomSheetContext } from '#contexts/BottomSheetContext';
import BottomSheetButton from '#components/BottomSheetButton';
import { putGalerieUserRole } from '#store/galerieRoles';

type Props = {
    galerie: Store.Models.Galerie;
    user: Store.Models.User;
    role: Store.Role;
};

const ChangeRoleBottom = ({ galerie, user, role }: Props) => {
    const dispatch = useDispatch();

    const { closeBottomSheet } = React.useContext(BottomSheetContext);

    const handlePress = React.useCallback(() => {
        closeBottomSheet();
        dispatch(putGalerieUserRole(galerie.id, user.id));
    }, [galerie, user]);

    if (galerie.role !== 'admin') return null;
    if (role === 'admin') return null;

    return (
        <BottomSheetButton
            onPress={handlePress}
            title={`change role for ${
                role === 'moderator' ? 'user' : 'moderator'
            }`}
        />
    );
};

export default ChangeRoleBottom;
