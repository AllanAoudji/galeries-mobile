import AsyncStorage from '@react-native-async-storage/async-storage';
import { AxiosError } from 'axios';
import * as React from 'react';
import { View } from 'react-native';
import { useDispatch } from 'react-redux';
import { useFormik } from 'formik';

import moment from 'moment';
import {
    CustomButton,
    CustomTextInput,
    FormScreen,
    Typography,
} from '#components';
import { ASYNC_STORAGE, END_POINT, ERROR_MESSAGE } from '#helpers/constants';
import request from '#helpers/request';
import { loginSchema } from '#helpers/schemas';
import { fetchUser, setNotification } from '#store/actions';

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
                        !res.data.data.token
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
                            dispatch(fetchUser());
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
                                dispatch(fetchUser());
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

    const handleOnPressForgotYourPassword = React.useCallback(() => {
        if (!loading) navigation.navigate('ForgotYourPassword');
    }, [loading, navigation]);
    const handleOnPressReturn = React.useCallback(() => {
        if (!loading) navigation.navigate('Landing');
    }, [loading, navigation]);
    const handleOnPressSignin = React.useCallback(() => {
        if (!loading) navigation.navigate('Signin');
    }, [loading, navigation]);

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
                            loading={loading}
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
                            loading={loading}
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
                        disable={disableButton}
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
