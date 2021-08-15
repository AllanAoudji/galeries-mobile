import { AxiosError } from 'axios';
import * as React from 'react';
import { View } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { useFormik } from 'formik';

import {
    CustomButton,
    CustomTextInput,
    FormScreen,
    Typography,
} from '#components';
import { END_POINT, ERROR_MESSAGE } from '#helpers/constants';
import request from '#helpers/request';
import { loginSchema } from '#helpers/schemas';

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
            setLoading(true);
            request({
                body: values,
                authToken: '',
                method: 'POST',
                url: END_POINT.LOGIN,
            })
                .then((res) => {
                    console.log(res);
                })
                .catch((err: AxiosError) => {
                    if (err.response && err.response.data.errors) {
                        if (typeof err.response.data.errors === 'object') {
                            if (
                                err.response.data.errors.password ||
                                err.response.data.errors.userNameOrEmail
                            ) {
                                setServerErrors({
                                    password: err.response.data.errors.password,
                                    userNameOrEmail:
                                        err.response.data.errors
                                            .userNameOrEmail,
                                });
                            } else {
                                console.log(
                                    ERROR_MESSAGE.DEFAULT_ERROR_MESSAGE
                                );
                            }
                        } else {
                            console.log(err.response.data.errors);
                        }
                    } else {
                        console.log(ERROR_MESSAGE.DEFAULT_ERROR_MESSAGE);
                    }
                })
                .finally(() => {
                    setLoading(false);
                });
        },
        validateOnBlur: true,
        validateOnChange: false,
        validationSchema: loginSchema,
    });
    const navigation = useNavigation<Screen.Home.LoginScreenNavigationProp>();
    const [loading, setLoading] = React.useState<boolean>(false);
    const [serverErrors, setServerErrors] = React.useState<{
        password: string;
        userNameOrEmail: string;
    }>({
        password: '',
        userNameOrEmail: '',
    });

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
                            secureTextEntry
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
                    <CustomButton
                        loading={loading}
                        onPress={formik.handleSubmit}
                        title="login"
                    />
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
