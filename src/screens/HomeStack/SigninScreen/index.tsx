import axios from 'axios';
import { useNavigation } from '@react-navigation/native';
import * as React from 'react';
import { Keyboard, View } from 'react-native';
import { useFormik } from 'formik';

import { END_POINT, ERROR_MESSAGE } from '#helpers/constants';
import request from '#helpers/request';
import {
    CustomButton,
    CustomTextInput,
    FormScreen,
    Typography,
} from '#components';
import { signinSchema } from '#helpers/schemas';

import { CustomLink, TextContainer, TextInputsContainer } from './styles';

const initialValues = {
    betaKey: '',
    confirmPassword: '',
    email: '',
    password: '',
    userName: '',
};

const SigninScreen = () => {
    const formik = useFormik({
        initialValues,
        onSubmit: async (values) => {
            Keyboard.dismiss();
            try {
                request({
                    body: values,
                    authToken: '',
                    method: 'POST',
                    url: END_POINT.SIGNIN,
                });
            } catch (err) {
                if (
                    axios.isAxiosError(err) &&
                    err.response &&
                    err.response.data.errors
                ) {
                    if (typeof err.response.data.errors === 'object') {
                        if (
                            err.response.data.errors.betaKey ||
                            err.response.data.errors.confirmPassword ||
                            err.response.data.errors.email ||
                            err.response.data.errors.password ||
                            err.response.data.errors.userName
                        ) {
                            setServerErrors({
                                betaKey:
                                    err.response.data.errors.confirmPassword,
                                confirmPassword:
                                    err.response.data.errors.confirmPassword,
                                email: err.response.data.errors.email,
                                password: err.response.data.errors.password,
                                userName: err.response.data.errors.userName,
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
        validationSchema: signinSchema,
    });
    const navigation = useNavigation<Screen.Home.SigninScreenNavigationProp>();
    const [serverErrors, setServerErrors] = React.useState<{
        betaKey?: string;
        confirmPassword?: string;
        email?: string;
        password?: string;
        userName?: string;
    }>({});

    const handleOnPressLogin = () => navigation.navigate('Login');
    const handleOnPressReturn = () => navigation.navigate('Landing');

    return (
        <FormScreen
            body={
                <View>
                    <TextInputsContainer>
                        <CustomTextInput
                            error={
                                formik.errors.userName || serverErrors.userName
                            }
                            label="user name"
                            onBlur={formik.handleBlur('userName')}
                            onChangeText={(e: string) => {
                                formik.setFieldError('userName', '');
                                formik.setFieldValue('userName', e);
                            }}
                            touched={formik.touched.userName || false}
                            value={formik.values.userName}
                        />
                        <CustomTextInput
                            error={formik.errors.email || serverErrors.email}
                            label="email"
                            onBlur={formik.handleBlur('email')}
                            onChangeText={(e: string) => {
                                formik.setFieldError('email', '');
                                formik.setFieldValue('email', e);
                            }}
                            touched={formik.touched.email || false}
                            value={formik.values.email}
                        />
                        <CustomTextInput
                            error={
                                formik.errors.password || serverErrors.password
                            }
                            label="password"
                            onBlur={formik.handleBlur('password')}
                            onChangeText={(e: string) => {
                                formik.setFieldError('password', '');
                                formik.setFieldValue('password', e);
                            }}
                            touched={formik.touched.password || false}
                            value={formik.values.password}
                        />
                        <CustomTextInput
                            error={
                                formik.errors.confirmPassword ||
                                serverErrors.confirmPassword
                            }
                            label="confirm password"
                            onBlur={formik.handleBlur('confirmPassword')}
                            onChangeText={(e: string) => {
                                formik.setFieldError('confirmPassword', '');
                                formik.setFieldValue('confirmPassword', e);
                            }}
                            touched={formik.touched.confirmPassword || false}
                            value={formik.values.confirmPassword}
                        />
                        <CustomTextInput
                            error={
                                formik.errors.betaKey || serverErrors.betaKey
                            }
                            label="beta key"
                            onBlur={formik.handleBlur('betaKey')}
                            onChangeText={(e: string) => {
                                formik.setFieldError('betaKey', '');
                                formik.setFieldValue('betaKey', e);
                            }}
                            touched={formik.touched.betaKey || false}
                            value={formik.values.betaKey}
                        />
                    </TextInputsContainer>
                    <CustomButton
                        onPress={formik.handleSubmit}
                        title="signin"
                    />
                </View>
            }
            footer={
                <CustomLink onPress={handleOnPressLogin}>
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
            handleOnPressReturn={handleOnPressReturn}
            title="signin"
        />
    );
};

export default SigninScreen;
