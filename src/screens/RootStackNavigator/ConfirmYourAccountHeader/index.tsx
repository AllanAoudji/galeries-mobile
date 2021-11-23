import { StackHeaderProps } from '@react-navigation/stack';
import * as React from 'react';

import { DefaultHeader } from '#components';

const ConfirmYourAccountHeader = ({ navigation }: StackHeaderProps) => {
    const handlePress = React.useCallback(() => {
        navigation.navigate('Landing');
    }, [navigation]);

    return (
        <DefaultHeader
            color="primary-dark"
            onPress={handlePress}
            textColor="secondary-light"
            title="confirm your account"
            variant="secondary"
        />
    );
};

export default ConfirmYourAccountHeader;
