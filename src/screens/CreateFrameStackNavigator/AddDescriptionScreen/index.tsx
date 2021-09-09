import * as React from 'react';
import { View } from 'react-native';

import { CustomButton, FormScreen } from '#components';
import { CreateFrameContext } from '#contexts/CreateFrameContext';

type Props = {
    navigation: Screen.CreateFrameStack.AddDescriptionNavigationProp;
};

const AddDescriptionScreen = ({ navigation }: Props) => {
    const { postFrame } = React.useContext(CreateFrameContext);

    const handlePostFrame = React.useCallback(() => {
        postFrame('');
    }, [postFrame]);
    const handleReturn = React.useCallback(() => {
        navigation.navigate('AddPictures');
    }, [navigation]);

    return (
        <FormScreen
            handleOnPressReturn={handleReturn}
            renderBottom={
                <>
                    <CustomButton
                        mb="smallest"
                        onPress={handlePostFrame}
                        title="post frame"
                    />
                    <CustomButton
                        onPress={handleReturn}
                        title="return"
                        variant="stroke"
                    />
                </>
            }
            renderTop={<View></View>}
            title="add a description (optinal)"
        />
    );
};

export default AddDescriptionScreen;
