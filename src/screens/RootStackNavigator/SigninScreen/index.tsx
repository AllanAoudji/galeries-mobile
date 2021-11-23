import { useFocusEffect } from '@react-navigation/native';
import { useFormik } from 'formik';
import {
    BackHandler,
    KeyboardAvoidingView,
    Platform,
    StyleSheet,
} from 'react-native';
import * as React from 'react';
import { useDispatch, useSelector } from 'react-redux';

import { CustomButton, CustomTextInput, Typography } from '#components';
import { GLOBAL_STYLE } from '#helpers/constants';
import { signinSchema } from '#helpers/schemas';
import {
    resetSigninStatus,
    selectSigninFieldsError,
    selectSigninStatus,
    signin,
    updateSigninFieldsError,
} from '#store/signin';

import FooterNavigation from '../FooterNavigation';

import {
    ButtonContainer,
    Container,
    ScrollViewStyle,
    TextContainer,
} from './styles';

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
    const fieldsError = useSelector(selectSigninFieldsError);
    const status = useSelector(selectSigninStatus);

    const formik = useFormik({
        initialValues,
        onSubmit: async (values) => {
            dispatch(signin(values));
        },
        validateOnBlur: true,
        validateOnChange: false,
        validationSchema: signinSchema,
    });

    const betaKeyError = React.useMemo(
        () => formik.errors.betaKey || fieldsError.betaKey,
        [fieldsError, formik.errors.betaKey]
    );
    const confirmPasswordError = React.useMemo(
        () => formik.errors.confirmPassword,
        [formik.errors.confirmPassword]
    );
    const disableButton = React.useMemo(() => {
        const clientHasError =
            !!formik.errors.betaKey ||
            !!formik.errors.confirmPassword ||
            !!formik.errors.email ||
            !!formik.errors.password ||
            !!formik.errors.userName;
        const serverHasError =
            !!fieldsError.betaKey ||
            !!fieldsError.confirmPassword ||
            !!fieldsError.email ||
            !!fieldsError.password ||
            !!fieldsError.userName;
        return clientHasError || serverHasError;
    }, [formik.submitCount, formik.errors]);
    const emailError = React.useMemo(
        () => formik.errors.email || fieldsError.email,
        [fieldsError, formik.errors.email]
    );
    const passwordError = React.useMemo(
        () => formik.errors.password || fieldsError.password,
        [fieldsError, formik.errors.password]
    );
    const userNameError = React.useMemo(
        () => formik.errors.userName || fieldsError.userName,
        [fieldsError, formik.errors.userName]
    );

    const handleChangeBetaKeyText = React.useCallback(
        (e: string) => {
            if (fieldsError.betaKey)
                dispatch(updateSigninFieldsError({ betaKey: '' }));
            if (formik.errors.betaKey) formik.setFieldError('betaKey', '');
            formik.setFieldValue('betaKey', e);
        },
        [fieldsError, formik.errors]
    );
    const handleChangeConfirmPasswordText = React.useCallback(
        (e: string) => {
            if (fieldsError.confirmPassword)
                dispatch(updateSigninFieldsError({ confirmPassword: '' }));
            if (formik.errors.confirmPassword)
                formik.setFieldError('confirmPassword', '');
            formik.setFieldValue('confirmPassword', e);
        },
        [fieldsError, formik.errors]
    );
    const handleChangeEmailText = React.useCallback(
        (e: string) => {
            if (fieldsError.email)
                dispatch(updateSigninFieldsError({ email: '' }));
            if (formik.errors.email) formik.setFieldError('email', '');
            formik.setFieldValue('email', e);
        },
        [fieldsError, formik]
    );
    const handleChangePasswordText = React.useCallback(
        (e: string) => {
            if (fieldsError.password)
                dispatch(updateSigninFieldsError({ password: '' }));
            if (formik.errors.password) formik.setFieldError('password', '');
            formik.setFieldValue('password', e);
        },
        [fieldsError, formik.errors]
    );
    const handeChangeUserNameText = React.useCallback(
        (e: string) => {
            if (fieldsError.userName)
                dispatch(updateSigninFieldsError({ userName: '' }));
            if (formik.errors.userName) formik.setFieldError('userName', '');
            formik.setFieldValue('userName', e);
        },
        [fieldsError, formik.errors]
    );
    const handlePressLogin = React.useCallback(() => {
        if (!status.includes('LOADING')) navigation.navigate('Login');
    }, [status, navigation]);

    useFocusEffect(
        React.useCallback(() => {
            if (status === 'SUCCESS') {
                dispatch(resetSigninStatus());
                navigation.navigate('ConfirmYourAccount');
            }
        }, [status])
    );

    useFocusEffect(
        React.useCallback(() => {
            let BackHandlerListerner: any;
            if (status.includes('LOADING'))
                BackHandlerListerner = BackHandler.addEventListener(
                    'hardwareBackPress',
                    () => true
                );
            else if (BackHandlerListerner) BackHandlerListerner.remove();
            return () => {
                if (BackHandlerListerner) BackHandlerListerner.remove();
            };
        }, [status])
    );

    return (
        <Container>
            <KeyboardAvoidingView
                behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
                keyboardVerticalOffset={GLOBAL_STYLE.HEADER_TAB_HEIGHT}
                style={styles.keyboardAvoidingViewStyle}
            >
                <ScrollViewStyle
                    keyboardShouldPersistTaps="handled"
                    overScrollMode="never"
                    showsVerticalScrollIndicator={false}
                >
                    <TextContainer>
                        <Typography
                            color="primary"
                            fontFamily="bold"
                            fontSize={36}
                        >
                            create account
                        </Typography>
                        <Typography fontSize={18}>
                            let's us know what your user name, your email and
                            your password
                        </Typography>
                    </TextContainer>
                    <CustomTextInput
                        error={userNameError}
                        loading={status.includes('LOADING')}
                        label="user name"
                        mt="normal"
                        onBlur={formik.handleBlur('userName')}
                        onChangeText={handeChangeUserNameText}
                        touched={formik.touched.userName || false}
                        value={formik.values.userName}
                    />
                    <CustomTextInput
                        error={emailError}
                        keyboardType="email-address"
                        loading={status.includes('LOADING')}
                        label="email"
                        onBlur={formik.handleBlur('email')}
                        onChangeText={handleChangeEmailText}
                        touched={formik.touched.email || false}
                        value={formik.values.email}
                    />
                    <CustomTextInput
                        error={passwordError}
                        loading={status.includes('LOADING')}
                        label="password"
                        onBlur={formik.handleBlur('password')}
                        onChangeText={handleChangePasswordText}
                        touched={formik.touched.password || false}
                        secureTextEntry
                        value={formik.values.password}
                    />
                    <CustomTextInput
                        error={confirmPasswordError}
                        loading={status.includes('LOADING')}
                        label="confirm password"
                        onBlur={formik.handleBlur('confirmPassword')}
                        onChangeText={handleChangeConfirmPasswordText}
                        touched={formik.touched.confirmPassword || false}
                        secureTextEntry
                        value={formik.values.confirmPassword}
                    />
                    <CustomTextInput
                        error={betaKeyError}
                        loading={status.includes('LOADING')}
                        label="beta key"
                        onBlur={formik.handleBlur('betaKey')}
                        onChangeText={handleChangeBetaKeyText}
                        touched={formik.touched.betaKey || false}
                        value={formik.values.betaKey}
                    />
                    <ButtonContainer>
                        <CustomButton
                            disable={disableButton}
                            loading={status.includes('LOADING')}
                            mt="normal"
                            onPress={formik.handleSubmit}
                            title="sign-in"
                        />
                    </ButtonContainer>
                </ScrollViewStyle>
            </KeyboardAvoidingView>
            <FooterNavigation
                onPress={handlePressLogin}
                title="You already have an account?"
            />
        </Container>
    );
};

const styles = StyleSheet.create({
    keyboardAvoidingViewStyle: {
        flex: 1,
    },
});

export default SigninScreen;
