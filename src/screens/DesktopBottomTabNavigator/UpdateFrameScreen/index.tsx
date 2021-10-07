import { useFocusEffect } from '@react-navigation/native';
import * as React from 'react';
import { useSelector } from 'react-redux';

import { selectCurrentFrame } from '#store/frames';

import Form from './Form';

type Props = {
    navigation: Screen.DesktopBottomTab.UpdateFrameProp;
};

const UpdateFrameScreen = ({ navigation }: Props) => {
    const currentFrame = useSelector(selectCurrentFrame);

    useFocusEffect(
        React.useCallback(() => {
            if (!currentFrame) {
                if (navigation.canGoBack()) navigation.goBack();
                else navigation.navigate('Home');
            }
        }, [currentFrame])
    );

    if (!currentFrame) return null;

    return (
        <Form
            description={currentFrame.description}
            frameId={currentFrame.id}
        />
    );
};

export default UpdateFrameScreen;
