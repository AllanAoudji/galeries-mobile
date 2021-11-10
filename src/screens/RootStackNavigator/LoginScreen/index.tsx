import { useFocusEffect } from '@react-navigation/native';
import { useFormik } from 'formik';
import * as React from 'react';
import {
    BackHandler,
    KeyboardAvoidingView,
    Platform,
    StyleSheet,
} from 'react-native';
import { useDispatch, useSelector } from 'react-redux';

import { CustomButton, CustomTextInput, Typography } from '#components';
import { GLOBAL_STYLE } from '#helpers/constants';
import { loginSchema } from '#helpers/schemas';
import {
    login,
    selectLoginFieldsError,
    selectLoginStatus,
    updateLoginFieldsError,
} from '#store/login';

import FooterNavigation from '../FooterNavigation';

import {
    ButtonContainer,
    Container,
    ForgotYourPasswordContainer,
    ScrollViewStyle,
    TextContainer,
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

    const fieldsError = useSelector(selectLoginFieldsError);
    const loading = useSelector(selectLoginStatus);

    const formik = useFormik({
        initialValues,
        onSubmit: (values) => {
            dispatch(login(values));
        },
        validateOnBlur: true,
        validateOnChange: false,
        validationSchema: loginSchema,
    });

    const disableButton = React.useMemo(() => {
        const clientHasError =
            !!formik.errors.password || !!formik.errors.userNameOrEmail;
        const serverHasError =
            !!fieldsError.password || !!fieldsError.userNameOrEmail;
        return clientHasError || serverHasError;
    }, [fieldsError, formik.errors]);
    const passwordError = React.useMemo(
        () => formik.errors.password || fieldsError.password,
        [fieldsError, formik.errors.password]
    );
    const userNameOrEmailError = React.useMemo(
        () => formik.errors.userNameOrEmail || fieldsError.userNameOrEmail,
        [fieldsError, formik.errors.userNameOrEmail]
    );

    const handleChangePasswordText = React.useCallback(
        (e: string) => {
            if (fieldsError.password !== '')
                dispatch(updateLoginFieldsError({ password: '' }));
            if (formik.errors.password) formik.setFieldError('password', '');
            formik.setFieldValue('password', e);
        },
        [fieldsError, formik.errors]
    );
    const handleChangeUserNameOrEmailText = React.useCallback(
        (e: string) => {
            if (fieldsError.userNameOrEmail !== '')
                dispatch(updateLoginFieldsError({ userNameOrEmail: '' }));
            if (formik.errors.userNameOrEmail)
                formik.setFieldError('userNameOrEmail', '');
            formik.setFieldValue('userNameOrEmail', e);
        },
        [fieldsError, formik.errors]
    );
    const handlePressForgotYourPassword = React.useCallback(() => {
        if (!loading.includes('LOADING'))
            navigation.navigate('ForgotYourPassword');
    }, [loading, navigation]);
    const handlePressSignin = React.useCallback(() => {
        if (!loading.includes('LOADING')) navigation.navigate('Signin');
    }, [loading, navigation]);

    useFocusEffect(
        React.useCallback(() => {
            let BackHandlerListerner: any;
            if (loading.includes('LOADING'))
                BackHandlerListerner = BackHandler.addEventListener(
                    'hardwareBackPress',
                    () => true
                );
            else if (BackHandlerListerner) BackHandlerListerner.remove();
            return () => {
                if (BackHandlerListerner) BackHandlerListerner.remove();
            };
        }, [loading])
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
                            welcome back
                        </Typography>
                        <Typography fontSize={18}>
                            use your credentials below and log-in to your
                            account
                        </Typography>
                    </TextContainer>
                    <CustomTextInput
                        error={userNameOrEmailError}
                        label="email or user name"
                        loading={loading.includes('LOADING')}
                        mt="normal"
                        onBlur={formik.handleBlur('userNameOrEmail')}
                        onChangeText={handleChangeUserNameOrEmailText}
                        touched={formik.touched.userNameOrEmail || false}
                        value={formik.values.userNameOrEmail}
                    />
                    <CustomTextInput
                        error={passwordError}
                        label="password"
                        loading={loading.includes('LOADING')}
                        onBlur={formik.handleBlur('password')}
                        onChangeText={handleChangePasswordText}
                        secureTextEntry
                        touched={formik.touched.password || false}
                        value={formik.values.password}
                    />
                    <ButtonContainer>
                        <CustomButton
                            disable={disableButton}
                            loading={loading.includes('LOADING')}
                            mt="normal"
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
                    </ButtonContainer>
                </ScrollViewStyle>
            </KeyboardAvoidingView>
            <FooterNavigation
                onPress={handlePressSignin}
                title="You don't have an account yet?"
            />
        </Container>
    );
};

const styles = StyleSheet.create({
    keyboardAvoidingViewStyle: {
        flex: 1,
    },
});

export default LoginScreen;
