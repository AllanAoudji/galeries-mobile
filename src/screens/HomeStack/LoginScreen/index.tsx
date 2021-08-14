import * as React from 'react';
import { View } from 'react-native';
import { useNavigation } from '@react-navigation/native';

import { END_POINT_LOGIN } from '#helpers/constants';
import request from '#helpers/request';

import {
    CustomButton,
    CustomTextInput,
    FormScreen,
    Typography,
} from '#components';

import {
    CustomLink,
    ForgotYourPasswordLink,
    ForgotYourPasswordLinkContainer,
    TextContainer,
    TextInputsContainer,
} from './styles';

const LoginScreen = () => {
    const navigation = useNavigation<Screen.Home.LoginScreenNavigationProp>();
    let res: any;
    let err: any;

    const handleOnPressForgotYourPassword = () =>
        navigation.navigate('ForgotYourPassword');
    const handleOnPressReturn = () => navigation.navigate('Landing');
    const handleOnPressSignin = () => navigation.navigate('Signin');
    const handleOnPressLogin = () => {
        request({
            body: {},
            authToken: '',
            method: 'POST',
            url: END_POINT_LOGIN,
        })
            .then((response) => {
                res = response;
            })
            .catch((error) => {
                err = error;
                console.log(err.response.data);
            });
    };

    return (
        <FormScreen
            body={
                <View>
                    <TextInputsContainer>
                        {res && res.toJSON()}
                        {err && err.toJSON()}
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
                    <CustomButton title="login" onPress={handleOnPressLogin} />
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

// TODO:
// theme spacing
