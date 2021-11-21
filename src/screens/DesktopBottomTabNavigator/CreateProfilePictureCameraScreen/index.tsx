import { useIsFocused } from '@react-navigation/native';
import * as React from 'react';

import { CustomCamera } from '#components';
import { CreateProfilePictureContext } from '#contexts/CreateProfilePictureContext';

type Props = {
    navigation: Screen.DesktopBottomTab.CreateProfilePictureCameraNavigationProp;
};

const CreateProfilePictureCameraScreen = ({ navigation }: Props) => {
    const { addPicture, removePicture } = React.useContext(
        CreateProfilePictureContext
    );

    const isFocused = useIsFocused();
    const handlePressBack = React.useCallback(() => {
        removePicture();
        if (navigation.canGoBack()) navigation.goBack();
        else navigation.navigate('Profile');
    }, [navigation, removePicture]);

    const handleSavePictureUri = React.useCallback(
        (uri: string) => {
            addPicture(uri);
            if (navigation.canGoBack()) navigation.goBack();
            else navigation.navigate('Profile');
        },
        [addPicture, navigation]
    );

    if (!isFocused) return null;

    return (
        <CustomCamera
            onPressBack={handlePressBack}
            onSavePictureUri={handleSavePictureUri}
        />
    );
};

export default CreateProfilePictureCameraScreen;
