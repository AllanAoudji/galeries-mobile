import * as React from 'react';
import { useSelector } from 'react-redux';

import BottomSheetButton from '#components/BottomSheetButton';
import { BottomSheetContext } from '#contexts/BottomSheetContext';
import { selectUserCurrentProfilePictureId } from '#store/profilePictures';

type Props = {
    user: Store.Models.User;
};

const ReportProfilePictureButton = ({ user }: Props) => {
    const { closeBottomSheet } = React.useContext(BottomSheetContext);

    const currentProfilePictureIdSelector = React.useMemo(
        () => selectUserCurrentProfilePictureId(user.id),
        [user]
    );
    const currentProfilePictureId = useSelector(
        currentProfilePictureIdSelector
    );

    const handlePress = React.useCallback(() => {
        closeBottomSheet();
    }, [closeBottomSheet]);

    if (!currentProfilePictureId) return null;

    return (
        <BottomSheetButton
            onPress={handlePress}
            title="report profile picture"
        />
    );
};

export default ReportProfilePictureButton;
