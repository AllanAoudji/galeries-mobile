import { StackHeaderProps } from '@react-navigation/stack';
import * as React from 'react';
import { useSelector } from 'react-redux';

import { DefaultHeader } from '#components';
import { selectConfirmAccountStatus } from '#store/confirmAccount';

const ConfirmYourAccountHeader = ({ navigation }: StackHeaderProps) => {
    const status = useSelector(selectConfirmAccountStatus);

    const handlePress = React.useCallback(() => {
        if (status.includes('loading')) return;
        navigation.navigate('Landing');
    }, [navigation, status]);

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

export default ConfirmYourAccountHeader;
