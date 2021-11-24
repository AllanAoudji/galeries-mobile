import { useFocusEffect } from '@react-navigation/native';
import * as React from 'react';
import { useDispatch, useSelector } from 'react-redux';

import { CustomButton, FullScreenContainer, Typography } from '#components';
import {
    postConfirmAccount,
    selectConfirmAccountStatus,
} from '#store/confirmAccount';
import { resetUserCurrent, selectCurrentUser } from '#store/users';

import {
    ButtonContainer,
    Container,
    TextContainer,
    TitleContainer,
} from './styles';

type Props = {
    navigation: Screen.RootStack.ConfirmYourAccountNavigationProp;
};

const ConfirmYourAccountScreen = ({ navigation }: Props) => {
    const dispatch = useDispatch();

    const currentUser = useSelector(selectCurrentUser);
    const status = useSelector(selectConfirmAccountStatus);

    const handlePress = React.useCallback(() => {
        if (!currentUser) return;
        if (status.includes('LOADING')) return;
        dispatch(postConfirmAccount({ email: currentUser.email }));
    }, [currentUser]);

    useFocusEffect(
        React.useCallback(() => {
            if (currentUser) return;
            navigation.navigate('Landing');
        }, [currentUser])
    );
    useFocusEffect(
        React.useCallback(() => () => dispatch(resetUserCurrent()), [])
    );
    useFocusEffect(
        React.useCallback(() => {
            if (status !== 'PENDING') return;
            if (!currentUser) return;
            dispatch(postConfirmAccount({ email: currentUser.email }));
        }, [currentUser, status])
    );

    return (
        <FullScreenContainer>
            <Container>
                <TitleContainer>
                    <Typography fontSize={18}>
                        An email has been sent to you.
                    </Typography>
                    <Typography fontSize={18}>
                        To confirm your account, click on the link in this
                        email.
                    </Typography>
                </TitleContainer>
                <TextContainer>
                    <Typography fontFamily="light" fontSize={18}>
                        This email is only active during one week.
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

export default React.memo(ConfirmYourAccountScreen);
