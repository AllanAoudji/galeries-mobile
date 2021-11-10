import { useNavigation } from '@react-navigation/native';
import { Camera } from 'expo-camera';
import * as React from 'react';

import { BottomSheetButton } from '#components';
import { BottomSheetContext } from '#contexts/BottomSheetContext';

const NavigateCameraButton = () => {
    const navigation =
        useNavigation<Screen.CreateFrameStack.AddPicturesNavigationProp>();

    const { closeBottomSheet } = React.useContext(BottomSheetContext);

    const mounted = React.useRef(false);

    const handlePress = React.useCallback(() => {
        (async () => {
            closeBottomSheet();
            const { status } = await Camera.requestCameraPermissionsAsync();
            if (status === 'granted' && mounted.current)
                navigation.navigate('CreateFrameCamera');
        })();
    }, []);

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

export default NavigateCameraButton;
