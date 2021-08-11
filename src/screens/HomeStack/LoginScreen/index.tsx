import * as React from 'react';
import { View } from 'react-native';
import { useNavigation } from '@react-navigation/native';

import {
    CustomButton,
    CustomTextInput,
    FormScreen,
    Typography,
} from '#components';

import { LoginScreenNavigationProp } from '../types';

import {
    CustomLink,
    ForgotYourPasswordLink,
    ForgotYourPasswordLinkContainer,
    TextContainer,
    TextInputsContainer,
} from './styles';

const LoginScreen = () => {
    const navigation = useNavigation<LoginScreenNavigationProp>();

    const handleOnPressForgotYourPassword = () =>
        navigation.navigate('ForgotYourPassword');
    const handleOnPressReturn = () => navigation.navigate('Landing');
    const handleOnPressSignin = () => navigation.navigate('Signin');

    return (
        <FormScreen
            body={
                <View>
                    <TextInputsContainer>
                        <CustomTextInput label="email or user name" />
                        <CustomTextInput label="password" />
                        <ForgotYourPasswordLinkContainer>
                            <ForgotYourPasswordLink
                                onPress={handleOnPressForgotYourPassword}
                            >
                                <Typography
                                    color="primary-dark"
                                    fontFamily="bold"
                                >
                                    Forgot your password?
                                </Typography>
                            </ForgotYourPasswordLink>
                        </ForgotYourPasswordLinkContainer>
                    </TextInputsContainer>
                    <CustomButton title="login" />
                </View>
            }
            footer={
                <CustomLink onPress={handleOnPressSignin}>
                    <TextContainer>
                        <Typography
                            color="primary-dark"
                            fontFamily="light"
                            fontSize={12}
                        >
                            You don't have an account yet?
                        </Typography>
                        <Typography color="primary-dark" fontSize={12}>
                            Click here.
                        </Typography>
                    </TextContainer>
                </CustomLink>
            }
            handleOnPressReturn={handleOnPressReturn}
            title="login"
        />
    );
};

export default LoginScreen;
