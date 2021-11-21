import * as React from 'react';

import { BottomSheetButton } from '#components';
import { BottomSheetContext } from '#contexts/BottomSheetContext';
import { DeleteProfilePictureModalContext } from '#contexts/DeleteProfilePictureModalContext';

type Props = {
    profilePicture?: Store.Models.ProfilePicture;
};

const DeleteProfilePictureButton = ({ profilePicture }: Props) => {
    const { closeBottomSheet } = React.useContext(BottomSheetContext);
    const { handleOpenModal } = React.useContext(
        DeleteProfilePictureModalContext
    );
    const handlePress = React.useCallback(() => {
        closeBottomSheet();
        if (!profilePicture) return;
        handleOpenModal(profilePicture.id);
    }, [profilePicture]);

    if (!profilePicture) return null;

    return (
        <BottomSheetButton
            onPress={handlePress}
            title="delete this profile picture..."
        />
    );
};

export default React.memo(DeleteProfilePictureButton);
