import { useFocusEffect } from '@react-navigation/native';
import * as React from 'react';
import { BackHandler } from 'react-native';
import { useSelector } from 'react-redux';

import Pictogram from '#components/Pictogram';
import { BottomSheetContext } from '#contexts/BottomSheetContext';
import { DeleteGalerieUserModalContext } from '#contexts/DeleteGalerieUserModalContext';
import { selectUserCurrentProfilePictureId } from '#store/profilePictures';

import ChangeRoleButtom from './ChangeRoleButtom';
import DeleteBanButton from './DeleteBanButton';
import ReportProfilePictureButton from './ReportProfilePictureButton';

type Props = {
    galerie: Store.Models.Galerie;
    role: Store.Role;
    user: Store.Models.User;
};

const GalerieUserOptions = ({ galerie, role, user }: Props) => {
    const { openBottomSheet } = React.useContext(BottomSheetContext);
    const { handleCloseModal, openModal } = React.useContext(
        DeleteGalerieUserModalContext
    );

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
                    profilePictureId={currentProfilePictureId}
                    hide={hideReportProfilePuctureButton}
                />
            </>
        );
    }, [
        currentProfilePictureId,
        galerie,
        hideChangeRoleButton,
        hideDeleteBanButton,
        hideReportProfilePuctureButton,
        role,
        user,
    ]);

    useFocusEffect(
        React.useCallback(() => () => handleCloseModal(), [handleCloseModal])
    );
    useFocusEffect(
        React.useCallback(() => {
            let BackHandlerListerner: any;
            if (openModal)
                BackHandlerListerner = BackHandler.addEventListener(
                    'hardwareBackPress',
                    () => {
                        handleCloseModal();
                        return true;
                    }
                );
            else if (BackHandlerListerner) BackHandlerListerner.remove();
            return () => {
                if (BackHandlerListerner) BackHandlerListerner.remove();
            };
        }, [handleCloseModal, openModal])
    );

    const handlePress = React.useCallback(() => {
        if (!hideOptionsPictogram) openBottomSheet(bottomSheetContent);
    }, [bottomSheetContent, hideOptionsPictogram, openBottomSheet]);

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

export default React.memo(GalerieUserOptions);
