import { Link } from '@react-navigation/native';
import * as React from 'react';
import { Pressable, Text, View } from 'react-native';

import { CustomButton, CustomTextInput, Typography } from '../../../components';

const LoginScreen = () => {
    return (
        <View>
            <Typography
                color="secondary-light"
                fontFamily="light"
                fontSize={36}
            >
                LOGIN
            </Typography>
            <View>
                <CustomTextInput label="email or user name" />
                <CustomTextInput label="password" />
                <Link to={{ screen: 'ForgotYourPassword' }}>
                    <Typography color="primary-dark" fontFamily="bold">
                        Forgot your password?
                    </Typography>
                </Link>
                <CustomButton title="login" />
                <View>
                    <Link to={{ screen: 'Signin' }}>
                        <Typography color="primary-dark" fontFamily="light">
                            You don't have an account yet?
                        </Typography>
                        <Typography color="primary-dark">
                            Click here.
                        </Typography>
                    </Link>
                </View>
            </View>
        </View>
    );
};

export default LoginScreen;
