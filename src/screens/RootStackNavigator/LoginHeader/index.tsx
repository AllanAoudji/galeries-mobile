import { StackHeaderProps } from '@react-navigation/stack';
import * as React from 'react';
import { useSelector } from 'react-redux';

import { DefaultHeader } from '#components';
import { selectLoginStatus } from '#store/login';

const LoginHeader = ({ navigation }: StackHeaderProps) => {
    const loading = useSelector(selectLoginStatus);

    const handlePress = React.useCallback(() => {
        if (loading.includes('loading')) return;
        navigation.navigate('Login');
    }, [loading, navigation]);

    return (
        <DefaultHeader
            color="primary-dark"
            onPress={handlePress}
            textColor="secondary-light"
            title="sign-in"
            variant="secondary"
        />
    );
};

export default LoginHeader;
