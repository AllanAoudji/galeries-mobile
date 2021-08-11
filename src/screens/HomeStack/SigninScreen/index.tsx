import * as React from 'react';
import { View } from 'react-native';

import {
    CustomButton,
    CustomTextInput,
    FormScreen,
    Typography,
} from '#components';

import { CustomLink, TextContainer, TextInputsContainer } from './styles';

const SigninScreen = () => (
    <FormScreen
        body={
            <View>
                <TextInputsContainer>
                    <CustomTextInput label="user name" />
                    <CustomTextInput label="email" />
                    <CustomTextInput label="password" />
                    <CustomTextInput label="confirm password" />
                    <CustomTextInput label="beta key" />
                </TextInputsContainer>
                <CustomButton title="signin" />
            </View>
        }
        footer={
            <CustomLink to={{ screen: 'Login' }}>
                <TextContainer>
                    <Typography
                        color="primary-dark"
                        fontFamily="light"
                        fontSize={12}
                    >
                        You already have an account?
                    </Typography>
                    <Typography color="primary-dark" fontSize={12}>
                        Click here.
                    </Typography>
                </TextContainer>
            </CustomLink>
        }
        title="signin"
    />
);

export default SigninScreen;
