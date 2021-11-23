import { useFocusEffect } from '@react-navigation/native';
import * as React from 'react';
import { useDispatch, useSelector } from 'react-redux';

import { CustomButton, FullScreenContainer, Typography } from '#components';
import { resetUserCurrent, selectCurrentUser } from '#store/users';

type Props = {
    navigation: Screen.RootStack.ConfirmYourAccountNavigationProp;
};

const ConfirmYourAccountScreen = ({ navigation }: Props) => {
    const dispatch = useDispatch();

    const currentUser = useSelector(selectCurrentUser);

    const handlePress = React.useCallback(() => {
        // TODO:
        // send POST /users/confirmation
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
            <CustomButton onPress={handlePress} small title="resend email" />
        </FullScreenContainer>
    );
};

export default React.memo(ConfirmYourAccountScreen);
