import * as React from 'react';

import { CustomCamera } from '#components';
import { CreateFrameContext } from '#contexts/CreateFrameContext';

type Props = {
    navigation: Screen.CreateFrameStack.CreateFrameCameraNavigationProp;
};

const CreateFrameCameraScreen = ({ navigation }: Props) => {
    const { addPictures } = React.useContext(CreateFrameContext);

    const handlePressBack = React.useCallback(
        () => navigation.navigate('AddPictures'),
        []
    );

    const handleSavePictureUri = React.useCallback(
        (uri: string) =>
            addPictures(uri, () => navigation.navigate('AddPictures')),
        [addPictures]
    );

    return (
        <CustomCamera
            onPressBack={handlePressBack}
            onSavePictureUri={handleSavePictureUri}
        />
    );
};

export default CreateFrameCameraScreen;
