import axios from 'axios';
import * as React from 'react';
import { Keyboard, View } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { useFormik } from 'formik';

import { END_POINT, ERROR_MESSAGE } from '#helpers/constants';
import request from '#helpers/request';
import { loginSchema } from '#helpers/schemas';

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

const initialValues = {
    password: '',
    userNameOrEmail: '',
};

const LoginScreen = () => {
    const formik = useFormik({
        initialValues,
        onSubmit: async (values) => {
            Keyboard.dismiss();
            try {
                request({
                    body: values,
                    authToken: '',
                    method: 'POST',
                    url: END_POINT.LOGIN,
                });
            } catch (err) {
                if (
                    axios.isAxiosError(err) &&
                    err.response &&
                    err.response.data.errors
                ) {
                    if (typeof err.response.data.errors === 'object') {
                        if (
                            err.response.data.errors.password ||
                            err.response.data.errors.userNameOrEmail
                        ) {
                            setServerErrors({
                                password: err.response.data.errors.password,
                                userNameOrEmail:
                                    err.response.data.errors.userNameOrEmail,
                            });
                        } else {
                            console.log(ERROR_MESSAGE.DEFAULT_ERROR_MESSAGE);
                        }
                    } else {
                        console.log(err.response.data.errors);
                    }
                } else {
                    console.log(ERROR_MESSAGE.DEFAULT_ERROR_MESSAGE);
                }
            }
        },
        validateOnBlur: true,
        validateOnChange: false,
        validationSchema: loginSchema,
    });
    const navigation = useNavigation<Screen.Home.LoginScreenNavigationProp>();
    const [serverErrors, setServerErrors] = React.useState<{
        password?: string;
        userNameOrEmail?: string;
    }>({});

    const handleOnPressForgotYourPassword = () =>
        navigation.navigate('ForgotYourPassword');
    const handleOnPressReturn = () => navigation.navigate('Landing');
    const handleOnPressSignin = () => navigation.navigate('Signin');

    return (
        <FormScreen
            body={
                <View>
                    <TextInputsContainer>
                        <CustomTextInput
                            error={
                                formik.errors.userNameOrEmail ||
                                serverErrors.userNameOrEmail
                            }
                            label="email or user name"
                            onBlur={formik.handleBlur('userNameOrEmail')}
                            onChangeText={(e: string) => {
                                setServerErrors((prevState) => ({
                                    ...prevState,
                                    userNameOrEmail: '',
                                }));
                                formik.setFieldError('userNameOrEmail', '');
                                formik.setFieldValue('userNameOrEmail', e);
                            }}
                            touched={formik.touched.userNameOrEmail || false}
                            value={formik.values.userNameOrEmail}
                        />
                        <CustomTextInput
                            error={
                                formik.errors.password || serverErrors.password
                            }
                            label="password"
                            onBlur={formik.handleBlur('password')}
                            onChangeText={(e: string) => {
                                setServerErrors((prevState) => ({
                                    ...prevState,
                                    password: '',
                                }));
                                formik.setFieldError('password', '');
                                formik.setFieldValue('password', e);
                            }}
                            touched={formik.touched.password || false}
                            value={formik.values.password}
                        />
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
                    <CustomButton title="login" onPress={formik.handleSubmit} />
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
