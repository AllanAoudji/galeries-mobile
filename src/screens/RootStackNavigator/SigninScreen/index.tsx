import { AxiosError } from 'axios';
import * as React from 'react';
import { useDispatch } from 'react-redux';
import { useFormik } from 'formik';

import { END_POINT, ERROR_MESSAGE } from '#helpers/constants';
import request from '#helpers/request';
import {
    CustomButton,
    CustomTextInput,
    FormContainer,
    Logo,
} from '#components';
import { signinSchema } from '#helpers/schemas';
import { setNotification } from '#store/actions';

import FooterNavigation from '../FooterNavigation';

const initialValues = {
    betaKey: '',
    confirmPassword: '',
    email: '',
    password: '',
    userName: '',
};

type Props = {
    navigation: Screen.RootStack.SigninScreenNavigationProp;
};

const SigninScreen = ({ navigation }: Props) => {
    const dispatch = useDispatch();
    const formik = useFormik({
        initialValues,
        onSubmit: async (values) => {
            setLoading(true);
            request({
                body: values,
                method: 'POST',
                url: END_POINT.SIGNIN,
            })
                .then((res) => {
                    console.log('success', res);
                })
                .catch((err: AxiosError) => {
                    if (err.response && err.response.data.errors) {
                        if (typeof err.response.data.errors === 'object') {
                            if (
                                err.response.data.errors.betaKey ||
                                err.response.data.errors.confirmPassword ||
                                err.response.data.errors.email ||
                                err.response.data.errors.password ||
                                err.response.data.errors.userName
                            ) {
                                setServerErrors({
                                    betaKey: err.response.data.errors.betaKey,
                                    confirmPassword:
                                        err.response.data.errors
                                            .confirmPassword,
                                    email: err.response.data.errors.email,
                                    password: err.response.data.errors.password,
                                    userName: err.response.data.errors.userName,
                                });
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
                })
                .finally(() => {
                    setLoading(false);
                });
        },
        validateOnBlur: true,
        validateOnChange: false,
        validationSchema: signinSchema,
    });
    const [loading, setLoading] = React.useState<boolean>(false);
    const [serverErrors, setServerErrors] = React.useState<{
        betaKey: string;
        confirmPassword: string;
        email: string;
        password: string;
        userName: string;
    }>({
        betaKey: '',
        confirmPassword: '',
        email: '',
        password: '',
        userName: '',
    });

    const betaKeyError = React.useMemo(
        () => formik.errors.betaKey || serverErrors.betaKey,
        [formik.errors.betaKey, serverErrors.betaKey]
    );
    const confirmPasswordError = React.useMemo(
        () => formik.errors.confirmPassword || serverErrors.confirmPassword,
        [formik.errors.confirmPassword, serverErrors.confirmPassword]
    );
    const disableButton = React.useMemo(() => {
        const clientHasError =
            formik.submitCount > 0 &&
            (!!formik.errors.betaKey ||
                !!formik.errors.confirmPassword ||
                !!formik.errors.email ||
                !!formik.errors.password ||
                !!formik.errors.userName);
        const serverHasError =
            !!serverErrors.betaKey ||
            !!serverErrors.confirmPassword ||
            !!serverErrors.email ||
            !!serverErrors.password ||
            !!serverErrors.userName;
        return clientHasError || serverHasError;
    }, [formik.submitCount, formik.errors, serverErrors]);
    const emailError = React.useMemo(
        () => formik.errors.email || serverErrors.email,
        [formik.errors.email, serverErrors.email]
    );
    const passwordError = React.useMemo(
        () => formik.errors.password || serverErrors.password,
        [formik.errors.password, serverErrors.password]
    );
    const userNameError = React.useMemo(
        () => formik.errors.userName || serverErrors.userName,
        [formik.errors.userName, serverErrors.userName]
    );

    const handleChangeBetaKeyText = React.useCallback((e: string) => {
        setServerErrors((prevState) => ({
            ...prevState,
            betaKey: '',
        }));
        formik.setFieldError('betaKey', '');
        formik.setFieldValue('betaKey', e);
    }, []);
    const handleChangeConfirmPasswordText = React.useCallback((e: string) => {
        setServerErrors((prevState) => ({
            ...prevState,
            confirmPassword: '',
        }));
        formik.setFieldError('confirmPassword', '');
        formik.setFieldValue('confirmPassword', e);
    }, []);
    const handleChangeEmailText = React.useCallback((e: string) => {
        setServerErrors((prevState) => ({
            ...prevState,
            email: '',
        }));
        formik.setFieldError('email', '');
        formik.setFieldValue('email', e);
    }, []);
    const handleChangePasswordText = React.useCallback((e: string) => {
        setServerErrors((prevState) => ({
            ...prevState,
            password: '',
        }));
        formik.setFieldError('password', '');
        formik.setFieldValue('password', e);
    }, []);
    const handeChangeUserNameText = React.useCallback((e: string) => {
        setServerErrors((prevState) => ({
            ...prevState,
            userName: '',
        }));
        formik.setFieldError('userName', '');
        formik.setFieldValue('userName', e);
    }, []);
    const handlePressLogin = React.useCallback(() => {
        if (!loading) navigation.navigate('Login');
    }, [loading, navigation]);

    return (
        <FormContainer justifyContent="center">
            <Logo mb="small" size="smallest" variant="text" />
            <CustomTextInput
                error={userNameError}
                label="user name"
                onBlur={formik.handleBlur('userName')}
                onChangeText={handeChangeUserNameText}
                touched={formik.touched.userName || false}
                value={formik.values.userName}
            />
            <CustomTextInput
                error={emailError}
                keyboardType="email-address"
                label="email"
                onBlur={formik.handleBlur('email')}
                onChangeText={handleChangeEmailText}
                touched={formik.touched.email || false}
                value={formik.values.email}
            />
            <CustomTextInput
                error={passwordError}
                label="password"
                onBlur={formik.handleBlur('password')}
                onChangeText={handleChangePasswordText}
                touched={formik.touched.password || false}
                secureTextEntry
                value={formik.values.password}
            />
            <CustomTextInput
                error={confirmPasswordError}
                label="confirm password"
                onBlur={formik.handleBlur('confirmPassword')}
                onChangeText={handleChangeConfirmPasswordText}
                touched={formik.touched.confirmPassword || false}
                secureTextEntry
                value={formik.values.confirmPassword}
            />
            <CustomTextInput
                error={betaKeyError}
                label="beta key"
                onBlur={formik.handleBlur('betaKey')}
                onChangeText={handleChangeBetaKeyText}
                touched={formik.touched.betaKey || false}
                value={formik.values.betaKey}
            />
            <CustomButton
                disable={disableButton}
                loading={loading}
                mt="smallest"
                onPress={formik.handleSubmit}
                title="sign-in"
            />
            <FooterNavigation
                onPress={handlePressLogin}
                title="You already have an account?"
            />
        </FormContainer>
    );
};

export default SigninScreen;
