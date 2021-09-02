import * as React from 'react';

import { CustomCamera } from '#components';

type Props = {
    navigation: Screen.CreateFrameStack.CameraNavigationProp;
};

const CameraScreen = ({ navigation }: Props) => {
    const handlePressBack = React.useCallback(() => {
        navigation.navigate('AddPictures');
    }, [navigation]);

    const [photoUri, setPhotoUri] = React.useState<string | null>(null);

    return (
        <CustomCamera
            onPressBack={handlePressBack}
            photoUri={photoUri}
            setPhotoUri={setPhotoUri}
        />
    );
};

export default CameraScreen;
