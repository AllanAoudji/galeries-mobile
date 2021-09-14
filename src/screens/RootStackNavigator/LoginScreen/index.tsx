import AsyncStorage from '@react-native-async-storage/async-storage';
import { AxiosError } from 'axios';
import { useFormik } from 'formik';
import moment from 'moment';
import * as React from 'react';
import { useDispatch } from 'react-redux';

import {
    CustomButton,
    CustomTextInput,
    FormContainer,
    Logo,
    Typography,
} from '#components';
import { ASYNC_STORAGE, END_POINT, ERROR_MESSAGE } from '#helpers/constants';
import request from '#helpers/request';
import { loginSchema } from '#helpers/schemas';
import { fetchMe, setNotification } from '#store/actions';

import FooterNavigation from '../FooterNavigation';

import { ForgotYourPasswordContainer } from './styles';

const initialValues = {
    password: '',
    userNameOrEmail: '',
};

type Props = {
    navigation: Screen.RootStack.LoginScreenNavigationProp;
};

const LoginScreen = ({ navigation }: Props) => {
    const dispatch = useDispatch();

    const formik = useFormik({
        initialValues,
        onSubmit: async (values) => {
            setLoading(true);
            request({
                body: values,
                method: 'POST',
                url: END_POINT.LOGIN,
            })
                .then(async (res) => {
                    if (
                        !res.data.data &&
                        !res.data.data.expiresIn &&
                        typeof res.data.data.expiresIn !== 'number' &&
                        !res.data.data.token &&
                        typeof res.data.data.token !== 'string'
                    ) {
                        dispatch(
                            setNotification({
                                text: ERROR_MESSAGE.DEFAULT_ERROR_MESSAGE,
                                status: 'error',
                            })
                        );
                    } else {
                        try {
                            const normalizeExpiredIn = moment()
                                .add(res.data.data.expiresIn, 's')
                                .valueOf()
                                .toString();
                            await AsyncStorage.setItem(
                                ASYNC_STORAGE.AUTH_TOKEN_EXPIRES_IN,
                                normalizeExpiredIn
                            );
                            await AsyncStorage.setItem(
                                ASYNC_STORAGE.AUTH_TOKEN_TOKEN,
                                res.data.data.token
                            );
                            dispatch(fetchMe());
                        } catch (err) {
                            dispatch(
                                setNotification({
                                    text: ERROR_MESSAGE.DEFAULT_ERROR_MESSAGE,
                                    status: 'error',
                                })
                            );
                        }
                    }
                })
                .catch((err: AxiosError) => {
                    if (err.response && err.response.data.errors) {
                        if (typeof err.response.data.errors === 'object') {
                            if (
                                err.response.data.errors.password ||
                                err.response.data.errors.userNameOrEmail
                            ) {
                                setServerErrors({
                                    password:
                                        err.response.data.errors.password || '',
                                    userNameOrEmail:
                                        err.response.data.errors
                                            .userNameOrEmail || '',
                                });
                            } else {
                                dispatch(
                                    setNotification({
                                        text: ERROR_MESSAGE.DEFAULT_ERROR_MESSAGE,
                                        status: 'error',
                                    })
                                );
                            }
                        } else if (
                            typeof err.response.data.errors === 'string'
                        ) {
                            if (
                                err.response.data.errors ===
                                ERROR_MESSAGE.USER_SHOULD_NOT_BE_AUTHENTICATED
                            ) {
                                dispatch(fetchMe());
                            } else {
                                dispatch(
                                    setNotification({
                                        text: err.response.data.errors,
                                        status: 'error',
                                    })
                                );
                            }
                        } else {
                            dispatch(
                                setNotification({
                                    text: ERROR_MESSAGE.DEFAULT_ERROR_MESSAGE,
                                    status: 'error',
                                })
                            );
                        }
                    } else {
                        dispatch(
                            setNotification({
                                text: ERROR_MESSAGE.DEFAULT_ERROR_MESSAGE,
                                status: 'error',
                            })
                        );
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

    const [loading, setLoading] = React.useState<boolean>(false);
    const [serverErrors, setServerErrors] = React.useState<
        typeof initialValues
    >({
        password: '',
        userNameOrEmail: '',
    });

    const disableButton = React.useMemo(() => {
        const clientHasError =
            formik.submitCount > 0 &&
            (!!formik.errors.password || !!formik.errors.userNameOrEmail);
        const serverHasError =
            !!serverErrors.password || !!serverErrors.userNameOrEmail;
        return clientHasError || serverHasError;
    }, [formik.submitCount, formik.errors, serverErrors]);
    const passwordError = React.useMemo(
        () => formik.errors.password || serverErrors.password,
        [formik.errors.password, serverErrors.password]
    );
    const userNameOrEmailError = React.useMemo(
        () => formik.errors.userNameOrEmail || serverErrors.userNameOrEmail,
        [formik.errors.userNameOrEmail, serverErrors.userNameOrEmail]
    );

    const handleChangePasswordText = React.useCallback((e: string) => {
        setServerErrors((prevState) => ({
            ...prevState,
            password: '',
        }));
        formik.setFieldError('password', '');
        formik.setFieldValue('password', e);
    }, []);
    const handleChangeUserNameOrEmailText = React.useCallback((e: string) => {
        setServerErrors((prevState) => ({
            ...prevState,
            userNameOrEmail: '',
        }));
        formik.setFieldError('userNameOrEmail', '');
        formik.setFieldValue('userNameOrEmail', e);
    }, []);
    const handlePressForgotYourPassword = React.useCallback(() => {
        if (!loading) navigation.navigate('ForgotYourPassword');
    }, [loading, navigation]);
    const handlePressSignin = React.useCallback(() => {
        if (!loading) navigation.navigate('Signin');
    }, [loading, navigation]);

    return (
        <FormContainer justifyContent="center">
            <Logo mb="small" size="smallest" variant="text" />
            <CustomTextInput
                error={userNameOrEmailError}
                label="email or user name"
                loading={loading}
                onBlur={formik.handleBlur('userNameOrEmail')}
                onChangeText={handleChangeUserNameOrEmailText}
                touched={formik.touched.userNameOrEmail || false}
                value={formik.values.userNameOrEmail}
            />
            <CustomTextInput
                error={passwordError}
                label="password"
                loading={loading}
                onBlur={formik.handleBlur('password')}
                onChangeText={handleChangePasswordText}
                secureTextEntry
                touched={formik.touched.password || false}
                value={formik.values.password}
            />
            <CustomButton
                disable={disableButton}
                loading={loading}
                mt="smallest"
                onPress={formik.handleSubmit}
                title="log-in"
            />
            <ForgotYourPasswordContainer
                onPress={handlePressForgotYourPassword}
            >
                <Typography color="primary-dark">
                    Forgot your password?
                </Typography>
            </ForgotYourPasswordContainer>
            <FooterNavigation
                onPress={handlePressSignin}
                title="You don't have an account yet?"
            />
        </FormContainer>
    );
};

export default LoginScreen;
