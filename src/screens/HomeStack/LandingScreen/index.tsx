import { useNavigation } from '@react-navigation/native';
import * as React from 'react';
import { View } from 'react-native';

import { CustomButton, Typography } from '#components';

const LandingScreen = () => {
    const navigation = useNavigation<Screen.Home.LandingScreenNavigationProp>();

    const handleOnPressLogin = () => navigation.navigate('Login');
    const handleOnPressSignin = () => navigation.navigate('Signin');

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
            <CustomButton onPress={handleOnPressLogin} title="login" />
            <CustomButton
                onPress={handleOnPressSignin}
                title="signin"
                variant="stroke"
            />
        </View>
    );
};

export default LandingScreen;
