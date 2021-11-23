import { StackHeaderProps } from '@react-navigation/stack';
import * as React from 'react';

import { DefaultHeader } from '#components';

const ForgotYourPasswordLandingHeader = ({ navigation }: StackHeaderProps) => {
    const handlePress = React.useCallback(() => {
        navigation.navigate('Landing');
    }, [navigation]);

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

export default ForgotYourPasswordLandingHeader;
