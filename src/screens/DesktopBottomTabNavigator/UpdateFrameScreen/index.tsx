import { useFocusEffect } from '@react-navigation/native';
import * as React from 'react';
import { useSelector } from 'react-redux';

import { DefaultHeader, FormContainer } from '#components';
import { selectCurrentFrame, selectFramesLoadingPut } from '#store/frames';

import Form from './Form';

type Props = {
    navigation: Screen.DesktopBottomTab.UpdateFrameProp;
};

const UpdateFrameScreen = ({ navigation }: Props) => {
    const currentFrame = useSelector(selectCurrentFrame);
    const loading = useSelector(selectFramesLoadingPut);

    const handlePressGoBack = React.useCallback(() => {
        if (!loading.includes('LOADING')) {
            if (navigation.canGoBack()) navigation.goBack();
            else navigation.navigate('Home');
        }
    }, [loading]);
    const successCallback = React.useCallback(() => {
        if (navigation.canGoBack()) navigation.goBack();
        else navigation.navigate('Home');
    }, []);

    useFocusEffect(
        React.useCallback(() => {
            if (!currentFrame) {
                if (navigation.canGoBack()) navigation.goBack();
                else navigation.navigate('Home');
            }
        }, [currentFrame])
    );

    useFocusEffect(
        React.useCallback(() => {
            if (loading === 'SUCCESS') successCallback();
        }, [loading])
    );

    if (!currentFrame) return null;

    return (
        <>
            <DefaultHeader
                onPress={handlePressGoBack}
                variant="secondary"
                title="update frame"
            />
            <FormContainer>
                <Form
                    description={currentFrame.description}
                    frameId={currentFrame.id}
                />
            </FormContainer>
        </>
    );
};

export default UpdateFrameScreen;
