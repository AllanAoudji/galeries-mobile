import { useFocusEffect } from '@react-navigation/native';
import * as React from 'react';
import { useDispatch, useSelector } from 'react-redux';

import { CustomButton, FullScreenContainer, Typography } from '#components';
import {
    postResetPassword,
    resetResetPasswordCurrent,
    resetResetPasswordStatus,
    selectResetPasswordCurrent,
    selectResetPasswordStatus,
} from '#store/resetPassword';

import {
    ButtonContainer,
    Container,
    TextContainer,
    TitleContainer,
} from './styles';

type Props = {
    navigation: Screen.RootStack.ForgotYourPasswordLandingNavigationProp;
};

const ForgotYourPasswordLandingScreen = ({ navigation }: Props) => {
    const dispatch = useDispatch();

    const email = useSelector(selectResetPasswordCurrent);
    const status = useSelector(selectResetPasswordStatus);

    const handlePress = React.useCallback(() => {
        if (!email) return;
        if (status.includes('LOADING')) return;
        dispatch(postResetPassword({ email }));
    }, [email, status]);

    useFocusEffect(
        React.useCallback(
            () => () => {
                dispatch(resetResetPasswordCurrent());
                dispatch(resetResetPasswordStatus());
            },
            []
        )
    );
    useFocusEffect(
        React.useCallback(() => {
            if (email) return;
            navigation.navigate('Landing');
        }, [email, navigation])
    );

    return (
        <FullScreenContainer>
            <Container>
                <TitleContainer>
                    <Typography fontSize={18}>
                        An email has been sent to you.
                    </Typography>
                    <Typography fontSize={18}>
                        To reset your password, click on the link in this email.
                    </Typography>
                </TitleContainer>
                <TextContainer>
                    <Typography fontFamily="light" fontSize={18}>
                        This email is only active during 2 days.
                    </Typography>
                </TextContainer>
                <TitleContainer>
                    <Typography
                        color="primary"
                        fontFamily="bold"
                        fontSize={18}
                        textAlign="right"
                    >
                        No email in your mailbox?
                    </Typography>
                </TitleContainer>
                <ButtonContainer>
                    <CustomButton
                        loading={status.includes('LOADING')}
                        onPress={handlePress}
                        small
                        title="resend email"
                    />
                </ButtonContainer>
            </Container>
        </FullScreenContainer>
    );
};

export default ForgotYourPasswordLandingScreen;
