import { useFocusEffect } from '@react-navigation/native';
import * as React from 'react';
import { useDispatch, useSelector } from 'react-redux';

import { CustomButton, FullScreenContainer, Typography } from '#components';
import { resetUserCurrent, selectCurrentUser } from '#store/users';
import {
    postConfirmAccount,
    selectConfirmAccountStatus,
} from '#store/confirmAccount';

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
            <Typography fontSize={18}>
                An email has been sent to you. To confirm your account, click on
                the link in this email.
            </Typography>
            <Typography fontFamily="light" fontSize={18}>
                This email is only active during one week.
            </Typography>
            <Typography>No email in your mailbox?</Typography>
            <CustomButton
                loading={status.includes('LOADING')}
                onPress={handlePress}
                small
                title="resend email"
            />
        </FullScreenContainer>
    );
};

export default React.memo(ConfirmYourAccountScreen);
