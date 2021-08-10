import { Link } from '@react-navigation/native';
import * as React from 'react';
import { View } from 'react-native';

import { CustomButton, CustomTextInput, Typography } from '../../../components';

const SigninScreen = () => (
    <View>
        <Typography color="secondary-light" fontFamily="light" fontSize={36}>
            SIGNIN
        </Typography>
        <View>
            <CustomTextInput label="user name" />
            <CustomTextInput label="email" />
            <CustomTextInput label="password" />
            <CustomTextInput label="confirm password" />
            <CustomTextInput label="beta key" />
            <CustomButton title="signin" />
            <View>
                <Link to={{ screen: 'Login' }}>
                    <Typography color="primary-dark" fontFamily="light">
                        You already have an account?
                    </Typography>
                    <Typography color="primary-dark">Click here.</Typography>
                </Link>
            </View>
        </View>
    </View>
);

export default SigninScreen;
