import { useFocusEffect } from '@react-navigation/native';
import * as React from 'react';
import { KeyboardAvoidingView, Platform, StyleSheet } from 'react-native';
import { useSelector } from 'react-redux';

import { GLOBAL_STYLE } from '#helpers/constants';
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
        <KeyboardAvoidingView
            behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
            keyboardVerticalOffset={GLOBAL_STYLE.HEADER_TAB_HEIGHT}
            style={styles.keyboardAvoidingViewStyle}
        >
            <Form
                description={currentFrame.description}
                frameId={currentFrame.id}
            />
        </KeyboardAvoidingView>
    );
};

const styles = StyleSheet.create({
    keyboardAvoidingViewStyle: {
        flex: 1,
    },
});

export default UpdateFrameScreen;
