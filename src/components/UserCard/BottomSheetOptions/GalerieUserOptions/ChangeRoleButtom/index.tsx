import * as React from 'react';
import { useDispatch } from 'react-redux';

import { BottomSheetContext } from '#contexts/BottomSheetContext';
import BottomSheetButton from '#components/BottomSheetButton';
import { putGalerieUserRole } from '#store/galerieRoles';

type Props = {
    galerie: Store.Models.Galerie;
    hide: boolean;
    role: Store.Role;
    user: Store.Models.User;
};

const ChangeRoleBottom = ({ galerie, hide, role, user }: Props) => {
    const dispatch = useDispatch();

    const { closeBottomSheet } = React.useContext(BottomSheetContext);

    const handlePress = React.useCallback(() => {
        closeBottomSheet();
        dispatch(putGalerieUserRole(galerie.id, user.id));
    }, [closeBottomSheet, galerie, user]);

    if (hide) return null;

    return (
        <BottomSheetButton
            onPress={handlePress}
            title={`change role for ${
                role === 'moderator' ? 'user' : 'moderator'
            }`}
        />
    );
};

export default React.memo(ChangeRoleBottom);
