import { StackHeaderProps } from '@react-navigation/stack';
import * as React from 'react';
import { useSelector } from 'react-redux';

import { DefaultHeader } from '#components';
import { selectResetPasswordStatus } from '#store/resetPassword';

const ForgotYourPasswordHeader = ({ navigation }: StackHeaderProps) => {
    const loading = useSelector(selectResetPasswordStatus);

    const handlePress = React.useCallback(() => {
        if (loading.includes('loading')) return;
        navigation.navigate('Landing');
    }, [loading, navigation]);

    return (
        <DefaultHeader
            color="primary-dark"
            onPress={handlePress}
            textColor="secondary-light"
            title="forgot your password?"
            variant="secondary"
        />
    );
};

export default ForgotYourPasswordHeader;
