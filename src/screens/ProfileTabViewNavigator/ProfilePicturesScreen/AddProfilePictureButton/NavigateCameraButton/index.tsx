import { useNavigation } from '@react-navigation/native';
import { Camera } from 'expo-camera';
import * as React from 'react';
import { useSelector } from 'react-redux';

import { BottomSheetButton } from '#components';
import { BottomSheetContext } from '#contexts/BottomSheetContext';
import { selectProfilePicturesLoadingPost } from '#store/profilePictures';

const NavigateCameraButton = () => {
    const navigation =
        useNavigation<Screen.DesktopBottomTab.ProfileNavigationProp>();

    const { closeBottomSheet } = React.useContext(BottomSheetContext);

    const loading = useSelector(selectProfilePicturesLoadingPost);

    const mounted = React.useRef(false);

    const handlePress = React.useCallback(() => {
        closeBottomSheet();
        if (loading !== 'PENDING') return;
        (async () => {
            const { status } = await Camera.requestCameraPermissionsAsync();
            if (status === 'granted' && mounted.current)
                navigation.navigate('CreateProfilePictureCamera');
        })();
    }, [closeBottomSheet, loading]);

    React.useEffect(() => {
        mounted.current = true;
        return () => {
            mounted.current = false;
        };
    }, []);

    return (
        <BottomSheetButton
            onPress={handlePress}
            pictogram="camera-fill"
            title="take a picture"
        />
    );
};

export default React.memo(NavigateCameraButton);
