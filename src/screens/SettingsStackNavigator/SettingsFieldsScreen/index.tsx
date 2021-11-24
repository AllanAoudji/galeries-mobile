import { useSelector } from 'react-redux';
import * as React from 'react';
import {
    KeyboardAvoidingView,
    Platform,
    StyleProp,
    StyleSheet,
    ViewStyle,
} from 'react-native';
import { useTheme } from 'styled-components';

import { FullScreenContainer, OptionSlice } from '#components';
import convertPixelToNum from '#helpers/convertPixelToNum';
import { selectMe } from '#store/me';

import ChangePseudonym from './ChangePseudonym';

import { ScrollViewStyle } from './styles';

const SettingsScreen = () => {
    const theme = useTheme();
    const me = useSelector(selectMe);

    const stylesProps = React.useMemo(
        () => ({
            paddingBottom: convertPixelToNum(theme.spacings.large),
        }),
        [theme]
    );

    if (!me) return null;

    return (
        <KeyboardAvoidingView
            behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
            style={styles(stylesProps).keyboardAvoidingViewStyle}
        >
            <FullScreenContainer>
                <ScrollViewStyle
                    contentContainerStyle={
                        styles(stylesProps).scrollViewContentContainerStyle
                    }
                    overScrollMode="never"
                    showsVerticalScrollIndicator={false}
                >
                    <ChangePseudonym user={me} />
                    <OptionSlice
                        separaror
                        title="update password"
                    ></OptionSlice>
                    <OptionSlice
                        separaror
                        subTitle="Register your new email. A mail gonna be send to you. Click on the link on this mail to change your email"
                        title="update email"
                    ></OptionSlice>
                    <OptionSlice
                        subTitle="Once you delete your account, there is no going back. Please be certain."
                        title="delete account"
                        titleColor="danger"
                    ></OptionSlice>
                </ScrollViewStyle>
            </FullScreenContainer>
        </KeyboardAvoidingView>
    );
};

const styles: ({ paddingBottom }: { paddingBottom: number }) => {
    keyboardAvoidingViewStyle: StyleProp<ViewStyle>;
    scrollViewContentContainerStyle: StyleProp<ViewStyle>;
} = StyleSheet.create(({ paddingBottom }) => ({
    keyboardAvoidingViewStyle: {
        flex: 1,
    },
    scrollViewContentContainerStyle: {
        paddingBottom,
    },
}));

export default SettingsScreen;
