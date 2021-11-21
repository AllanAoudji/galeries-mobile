import { useNavigation } from '@react-navigation/native';
import * as React from 'react';

import { useDispatch } from 'react-redux';
import BottomSheetButton from '#components/BottomSheetButton';
import { BottomSheetContext } from '#contexts/BottomSheetContext';
import { updateProfilePicturesCurrent } from '#store/profilePictures';

type Props = {
    hide: boolean;
    profilePictureId?: string;
};

const ReportProfilePictureButton = ({ hide, profilePictureId }: Props) => {
    const dispatch = useDispatch();
    const navigation = useNavigation<
        | Screen.DesktopBottomTab.LikesNavigationProp
        | Screen.DesktopBottomTab.GalerieNavigationProp
    >();
    const { closeBottomSheet } = React.useContext(BottomSheetContext);

    const handlePress = React.useCallback(() => {
        closeBottomSheet();
        if (!profilePictureId) return;
        dispatch(updateProfilePicturesCurrent(profilePictureId));
        navigation.navigate('ReportProfilePicture');
    }, [closeBottomSheet, navigation, profilePictureId]);

    if (hide) return null;

    return (
        <BottomSheetButton
            onPress={handlePress}
            title="report profile picture"
        />
    );
};

export default React.memo(ReportProfilePictureButton);
