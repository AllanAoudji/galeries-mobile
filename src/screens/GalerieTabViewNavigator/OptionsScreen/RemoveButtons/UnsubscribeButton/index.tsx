import * as React from 'react';
import { CustomButton } from '#components';

const handlePress = () => {};

const UnsubscribeButton = () => {
    return (
        <CustomButton
            mt="large"
            onPress={handlePress}
            title="unsubscribe from this galerie"
        />
    );
};

export default UnsubscribeButton;
