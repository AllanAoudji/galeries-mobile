import { useFocusEffect } from '@react-navigation/native';
import * as React from 'react';
import { KeyboardAvoidingView, Platform, StyleSheet } from 'react-native';
import { useSelector } from 'react-redux';

import { GLOBAL_STYLE } from '#helpers/constants';
import { selectCurrentGalerie } from '#store/galeries';

import Form from './Form';

type Props = {
    navigation: Screen.DesktopBottomTab.UpdateGalerieNavigationProp;
};

const UpdateGalerieScreen = ({ navigation }: Props) => {
    const currentGalerie = useSelector(selectCurrentGalerie);

    useFocusEffect(
        React.useCallback(() => {
            if (!currentGalerie) {
                if (navigation.canGoBack()) navigation.goBack();
                else navigation.navigate('Home');
            }
        }, [currentGalerie])
    );

    if (!currentGalerie) return null;

    return (
        <KeyboardAvoidingView
            behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
            keyboardVerticalOffset={GLOBAL_STYLE.HEADER_TAB_HEIGHT}
            style={styles.keyboardAvoidingViewStyle}
        >
            <Form galerie={currentGalerie} />
        </KeyboardAvoidingView>
    );
};

const styles = StyleSheet.create({
    keyboardAvoidingViewStyle: {
        flex: 1,
    },
});

export default UpdateGalerieScreen;
