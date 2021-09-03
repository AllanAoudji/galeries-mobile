import * as React from 'react';

import { CustomCamera } from '#components';
import { CreateFrameContext } from '#contexts/CreateFrameContext';

type Props = {
    navigation: Screen.CreateFrameStack.CameraNavigationProp;
};

const CameraScreen = ({ navigation }: Props) => {
    const { addPictures } = React.useContext(CreateFrameContext);

    const handlePressBack = React.useCallback(() => {
        navigation.navigate('AddPictures');
    }, [navigation]);

    const handleSavePictureUri = React.useCallback(
        (uri: string) => {
            addPictures(uri, () => navigation.navigate('AddPictures'));
        },
        [addPictures, navigation]
    );

    return (
        <CustomCamera
            onPressBack={handlePressBack}
            onSavePictureUri={handleSavePictureUri}
        />
    );
};

export default CameraScreen;
