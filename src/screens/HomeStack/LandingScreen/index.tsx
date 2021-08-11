import * as React from 'react';
import { View } from 'react-native';

import { CustomButton, Typography } from '#components';

const LandingScreen = () => {
    return (
        <View>
            <Typography fontFamily="light" fontSize={36}>
                Welcome to
            </Typography>
            <Typography fontFamily="bold" fontSize={36}>
                GALERIES
            </Typography>
            <Typography fontFamily="light" fontSize={18}>
                An app to share pictures with
            </Typography>
            <Typography fontFamily="light" fontSize={18}>
                your friends and famiy
            </Typography>
            <CustomButton title="login" />
            <CustomButton title="signin" variant="stroke" />
        </View>
    );
};

export default LandingScreen;
