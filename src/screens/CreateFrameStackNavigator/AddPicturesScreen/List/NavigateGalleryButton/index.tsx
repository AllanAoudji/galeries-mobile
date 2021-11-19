import { useNavigation } from '@react-navigation/native';
import * as MediaLibrary from 'expo-media-library';
import * as React from 'react';

import { BottomSheetButton } from '#components';
import { BottomSheetContext } from '#contexts/BottomSheetContext';

const NavigateGalleryButton = () => {
    const navigation =
        useNavigation<Screen.CreateFrameStack.AddPicturesNavigationProp>();

    const { closeBottomSheet } = React.useContext(BottomSheetContext);

    const mounted = React.useRef(false);

    const handlePress = React.useCallback(() => {
        (async () => {
            const { status } = await MediaLibrary.requestPermissionsAsync();
            if (!mounted.current) return;
            closeBottomSheet();
            if (status === 'granted') navigation.navigate('CreateFrameGallery');
        })();
    }, [closeBottomSheet]);

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

export default NavigateGalleryButton;
