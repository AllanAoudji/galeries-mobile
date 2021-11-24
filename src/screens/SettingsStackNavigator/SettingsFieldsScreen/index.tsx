import { useFocusEffect } from '@react-navigation/native';
import { useDispatch, useSelector } from 'react-redux';
import * as React from 'react';
import {
    KeyboardAvoidingView,
    Platform,
    StyleProp,
    StyleSheet,
    ViewStyle,
} from 'react-native';
import { useTheme } from 'styled-components';

import { FullScreenContainer } from '#components';
import convertPixelToNum from '#helpers/convertPixelToNum';
import { resetMeFieldsError, selectMe } from '#store/me';

import ChangePseudonym from './ChangePseudonym';
import DeleteAccount from './DeleteAccount';
import UpdateEmail from './UpdateEmail';
import UpdatePassword from './UpdatePassword';

import { ScrollViewStyle } from './styles';

const SettingsScreen = () => {
    const dispatch = useDispatch();
    const theme = useTheme();

    const me = useSelector(selectMe);

    const stylesProps = React.useMemo(
        () => ({
            paddingBottom: convertPixelToNum(theme.spacings.largest),
        }),
        [theme]
    );

    useFocusEffect(
        React.useCallback(() => () => dispatch(resetMeFieldsError()), [])
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
                    <UpdatePassword />
                    <UpdateEmail />
                    <DeleteAccount />
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
