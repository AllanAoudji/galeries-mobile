import { useFormik } from 'formik';
import * as React from 'react';

import {
    CustomButton,
    CustomTextInput,
    FormContainer,
    Logo,
    Typography,
} from '#components';
import { loginSchema } from '#helpers/schemas';
import { usePostLogin } from '#hooks';

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
    const { loading, login, resetServerErrorField, serverErrors } =
        usePostLogin();

    const formik = useFormik({
        initialValues,
        onSubmit: (values) => login(values),
        validateOnBlur: true,
        validateOnChange: false,
        validationSchema: loginSchema,
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
        resetServerErrorField('password');
        formik.setFieldError('password', '');
        formik.setFieldValue('password', e);
    }, []);
    const handleChangeUserNameOrEmailText = React.useCallback((e: string) => {
        resetServerErrorField('userNameOrEmail');
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
