import { useFocusEffect } from '@react-navigation/native';
import * as React from 'react';

import { useDispatch, useSelector } from 'react-redux';
import {
    BackHandler,
    KeyboardAvoidingView,
    Platform,
    StyleSheet,
    View,
} from 'react-native';
import { CustomButton, CustomRadio, Typography } from '#components';
import { resetCommentsCurrent, selectCommentCurrent } from '#store/comments';

import { ButtonContainer, Container, ScrollViewStyle } from './styles';
import { GLOBAL_STYLE } from '#helpers/constants';
import {
    postReports,
    resetReportsLoadingPost,
    selectReportsLoadingPost,
} from '#store/reports';

type Props = {
    navigation: Screen.DesktopBottomTab.ReportCommentNavigationProp;
};

const ReportCommentScreen = ({ navigation }: Props) => {
    const dispatch = useDispatch();

    const currentComment = useSelector(selectCommentCurrent);
    const loading = useSelector(selectReportsLoadingPost);

    const handlePressBack = React.useCallback(() => {
        if (loading.includes('LOADING')) return;
        if (navigation.canGoBack()) navigation.goBack();
        else navigation.navigate('Home');
    }, [loading, navigation]);

    useFocusEffect(
        React.useCallback(() => {
            if (!currentComment) {
                if (navigation.canGoBack()) navigation.goBack();
                else navigation.navigate('Home');
            }
        }, [currentComment, navigation])
    );
    useFocusEffect(
        React.useCallback(
            () => () => {
                dispatch(resetCommentsCurrent());
                dispatch(resetReportsLoadingPost());
            },
            []
        )
    );
    useFocusEffect(
        React.useCallback(() => {
            let BackHandlerListerner: any;
            if (loading.includes('LOADING'))
                BackHandlerListerner = BackHandler.addEventListener(
                    'hardwareBackPress',
                    () => true
                );
            else if (BackHandlerListerner) BackHandlerListerner.remove();
            return () => {
                if (BackHandlerListerner) BackHandlerListerner.remove();
            };
        }, [loading])
    );
    useFocusEffect(
        React.useCallback(() => {
            if (currentComment)
                dispatch(
                    postReports(
                        currentComment,
                        { reason: 'disinformation' },
                        'commentId'
                    )
                );
        }, [currentComment])
    );

    if (!currentComment) return null;

    return (
        <KeyboardAvoidingView
            behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
            keyboardVerticalOffset={GLOBAL_STYLE.HEADER_TAB_HEIGHT}
            style={styles.keyboardAvoidingViewStyle}
        >
            <Container>
                <ScrollViewStyle
                    keyboardShouldPersistTaps="handled"
                    overScrollMode="never"
                    showsVerticalScrollIndicator={false}
                >
                    <Typography fontSize={24}>
                        Why did you want to report this comment?
                    </Typography>
                    <Typography fontSize={18}>
                        Your report is anonymous
                    </Typography>
                    {/* <View><CustomRadio /></View> */}
                    <ButtonContainer>
                        <CustomButton
                            // disable={disableButton}
                            loading={loading.includes('LOADING')}
                            mb="smallest"
                            mt="normal"
                            onPress={() => {}}
                            title="create galerie"
                        />
                        <CustomButton
                            disable={loading.includes('LOADING')}
                            onPress={handlePressBack}
                            title="cancel"
                            variant="stroke"
                        />
                    </ButtonContainer>
                </ScrollViewStyle>
            </Container>
        </KeyboardAvoidingView>
    );
};

const styles = StyleSheet.create({
    keyboardAvoidingViewStyle: {
        flex: 1,
    },
});

export default ReportCommentScreen;
