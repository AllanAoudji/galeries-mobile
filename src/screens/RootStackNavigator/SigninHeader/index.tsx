import { StackHeaderProps } from '@react-navigation/stack';
import * as React from 'react';
import { useSelector } from 'react-redux';

import { DefaultHeader } from '#components';
import { selectSigninStatus } from '#store/signin';

const SigninHeader = ({ navigation }: StackHeaderProps) => {
    const loading = useSelector(selectSigninStatus);

    const handlePress = React.useCallback(() => {
        if (loading.includes('loading')) return;
        navigation.navigate('Landing');
    }, [loading]);

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

export default SigninHeader;
