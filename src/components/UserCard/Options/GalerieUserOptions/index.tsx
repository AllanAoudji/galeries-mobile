import * as React from 'react';

import Pictogram from '#components/Pictogram';
import { BottomSheetContext } from '#contexts/BottomSheetContext';

import ChangeRoleBottom from './ChangeRoleBottom';
import DeleteBanButton from './DeleteBanButton';
import ReportProfilePictureButton from './ReportProfilePictureButton';

type Props = {
    galerie: Store.Models.Galerie;
    role: Store.Role;
    user: Store.Models.User;
};

const GalerieUserOptions = ({ galerie, role, user }: Props) => {
    const { openBottomSheet } = React.useContext(BottomSheetContext);

    const bottomSheetContent = React.useCallback(() => {
        return (
            <>
                <ChangeRoleBottom galerie={galerie} role={role} user={user} />
                <DeleteBanButton galerie={galerie} role={role} user={user} />
                <ReportProfilePictureButton />
            </>
        );
    }, [galerie, role, user]);

    const handlePress = React.useCallback(() => {
        openBottomSheet(bottomSheetContent);
    }, [bottomSheetContent]);

    return (
        <Pictogram
            onPress={handlePress}
            pb="smallest"
            pl="small"
            pt="smallest"
            size="small"
            variant="option-vertical"
        />
    );
};

export default GalerieUserOptions;
