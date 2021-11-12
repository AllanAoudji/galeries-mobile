import { useFocusEffect } from '@react-navigation/native';
import * as React from 'react';
import {
    BackHandler,
    KeyboardAvoidingView,
    Platform,
    StyleSheet,
} from 'react-native';
import { useDispatch, useSelector } from 'react-redux';

import { CustomButton, ReportRadioButton, Typography } from '#components';
import { GLOBAL_STYLE, REPORT_REASONS } from '#helpers/constants';
import { selectCurrentProfilepictureId } from '#store/profilePictures';
import {
    postReports,
    resetReportsLoadingPost,
    selectReportsLoadingPost,
} from '#store/reports';

import {
    ButtonContainer,
    Container,
    ReasonsContainer,
    ScrollViewStyle,
} from './styles';

type Props = {
    navigation: Screen.DesktopBottomTab.ReportCommentNavigationProp;
};

const ReportProfilePictureScreen = ({ navigation }: Props) => {
    const dispatch = useDispatch();

    const [value, setValue] = React.useState<ReportReason | null>();

    const currentProfilePicture = useSelector(selectCurrentProfilepictureId);
    const loading = useSelector(selectReportsLoadingPost);

    const handlePress = React.useCallback((reason: ReportReason) => {
        setValue(reason);
    }, []);
    const handlePressPostReport = React.useCallback(() => {
        if (!currentProfilePicture) return;
        if (!value) return;
        if (loading.includes('LOADING')) return;
        dispatch(postReports(currentProfilePicture, value, 'commentId'));
    }, [currentProfilePicture, loading, value]);
    const handlePressBack = React.useCallback(() => {
        if (loading.includes('LOADING')) return;
        if (navigation.canGoBack()) navigation.goBack();
        else navigation.navigate('Home');
    }, [loading, navigation]);

    useFocusEffect(
        React.useCallback(() => {
            if (!currentProfilePicture) {
                if (navigation.canGoBack()) navigation.goBack();
                else navigation.navigate('Home');
            }
        }, [currentProfilePicture, navigation])
    );
    useFocusEffect(
        React.useCallback(() => {
            if (loading === 'SUCCESS') {
                if (navigation.canGoBack()) navigation.goBack();
                else navigation.navigate('Home');
            }
        }, [loading, navigation])
    );
    useFocusEffect(
        React.useCallback(
            () => () => {
                dispatch(resetReportsLoadingPost());
                setValue(null);
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
                        Why did you want to report this profile picture?
                    </Typography>
                    <Typography fontFamily="light" fontSize={18}>
                        Your report is anonymous
                    </Typography>
                    <ReasonsContainer>
                        {REPORT_REASONS.map((reason) => (
                            <ReportRadioButton
                                key={reason}
                                onPress={handlePress}
                                reason={reason}
                                value={reason === value}
                            />
                        ))}
                    </ReasonsContainer>
                    <ButtonContainer>
                        <CustomButton
                            disable={value === null}
                            loading={loading.includes('LOADING')}
                            mb="smallest"
                            mt="normal"
                            onPress={handlePressPostReport}
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

export default ReportProfilePictureScreen;
