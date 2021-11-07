import * as React from 'react';
import { useSelector } from 'react-redux';

import Pictogram from '#components/Pictogram';
import { BottomSheetContext } from '#contexts/BottomSheetContext';

import ChangeRoleButtom from './ChangeRoleButtom';
import DeleteBanButton from './DeleteBanButton';
import ReportProfilePictureButton from './ReportProfilePictureButton';
import { selectUserCurrentProfilePictureId } from '#store/profilePictures';

type Props = {
    galerie: Store.Models.Galerie;
    role: Store.Role;
    user: Store.Models.User;
};

const GalerieUserOptions = ({ galerie, role, user }: Props) => {
    const { openBottomSheet } = React.useContext(BottomSheetContext);

    const currentProfilePictureIdSelector = React.useMemo(
        () => selectUserCurrentProfilePictureId(user.id),
        [user]
    );
    const currentProfilePictureId = useSelector(
        currentProfilePictureIdSelector
    );

    const hideChangeRoleButton = React.useMemo(
        () => galerie.role !== 'admin' || role === 'admin',
        [galerie, role]
    );
    const hideDeleteBanButton = React.useMemo(
        () =>
            galerie.role === 'user' ||
            role === 'admin' ||
            (role === 'moderator' && galerie.role === 'moderator'),
        [galerie, role]
    );
    const hideReportProfilePuctureButton = React.useMemo(
        () => !currentProfilePictureId,

        [currentProfilePictureId]
    );
    const hideOptionsPictogram = React.useMemo(
        () =>
            hideChangeRoleButton &&
            hideDeleteBanButton &&
            hideReportProfilePuctureButton,
        [
            hideChangeRoleButton,
            hideDeleteBanButton,
            hideReportProfilePuctureButton,
        ]
    );

    const bottomSheetContent = React.useCallback(() => {
        return (
            <>
                <ChangeRoleButtom
                    galerie={galerie}
                    role={role}
                    hide={hideChangeRoleButton}
                    user={user}
                />
                <DeleteBanButton
                    galerie={galerie}
                    hide={hideDeleteBanButton}
                    user={user}
                />
                <ReportProfilePictureButton
                    hide={hideReportProfilePuctureButton}
                />
            </>
        );
    }, [
        galerie,
        hideChangeRoleButton,
        hideDeleteBanButton,
        hideReportProfilePuctureButton,
        role,
        user,
    ]);

    const handlePress = React.useCallback(() => {
        openBottomSheet(bottomSheetContent);
    }, [bottomSheetContent, openBottomSheet]);

    if (hideOptionsPictogram) return null;

    return (
        <Pictogram
            onPress={handlePress}
            pb="smallest"
            pl="small"
            pr="small"
            pt="smallest"
            size="small"
            variant="option-vertical"
        />
    );
};

export default GalerieUserOptions;
