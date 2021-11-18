import { useNavigation } from '@react-navigation/native';
import * as MediaLibrary from 'expo-media-library';
import * as React from 'react';

import { useSelector } from 'react-redux';
import { BottomSheetButton } from '#components';
import { BottomSheetContext } from '#contexts/BottomSheetContext';
import { selectProfilePicturesLoadingPost } from '#store/profilePictures';

const NavigateGaleryButton = () => {
    const navigation =
        useNavigation<Screen.DesktopBottomTab.ProfileNavigationProp>();

    const loading = useSelector(selectProfilePicturesLoadingPost);

    const { closeBottomSheet } = React.useContext(BottomSheetContext);

    const mounted = React.useRef(false);

    const handlePress = React.useCallback(() => {
        closeBottomSheet();
        if (loading !== 'PENDING') return;
        (async () => {
            const { status } = await MediaLibrary.requestPermissionsAsync();
            closeBottomSheet();
            if (status === 'granted' && mounted.current)
                navigation.navigate('CreateProfilePictureGalerie');
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
            pictogram="upload"
            title="upload a picture"
        />
    );
};

export default React.memo(NavigateGaleryButton);
