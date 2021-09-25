import { useFormik } from 'formik';
import * as React from 'react';

import { useDispatch, useSelector } from 'react-redux';
import {
    CustomButton,
    CustomTextInput,
    FormContainer,
    Logo,
    Typography,
} from '#components';
import { loginSchema } from '#helpers/schemas';

import FooterNavigation from '../FooterNavigation';

import { ForgotYourPasswordContainer } from './styles';
import {
    login,
    selectLoginFieldsError,
    updateLoginFieldsError,
} from '#store/login';
import { selectLoading } from '#store/loading';

const initialValues = {
    password: '',
    userNameOrEmail: '',
};

type Props = {
    navigation: Screen.RootStack.LoginScreenNavigationProp;
};

const LoginScreen = ({ navigation }: Props) => {
    const dispatch = useDispatch();

    const loading = useSelector(selectLoading);
    const loginFieldsError = useSelector(selectLoginFieldsError);

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
            formik.submitCount > 0 &&
            (!!formik.errors.password || !!formik.errors.userNameOrEmail);
        const serverHasError =
            !!loginFieldsError.password || !!loginFieldsError.userNameOrEmail;
        return clientHasError || serverHasError;
    }, [formik.submitCount, formik.errors, loginFieldsError]);
    const passwordError = React.useMemo(
        () => formik.errors.password || loginFieldsError.password,
        [formik.errors.password, loginFieldsError.password]
    );
    const userNameOrEmailError = React.useMemo(
        () => formik.errors.userNameOrEmail || loginFieldsError.userNameOrEmail,
        [formik.errors.userNameOrEmail, loginFieldsError.userNameOrEmail]
    );

    const handleChangePasswordText = React.useCallback((e: string) => {
        dispatch(updateLoginFieldsError({ password: '' }));
        formik.setFieldError('password', '');
        formik.setFieldValue('password', e);
    }, []);
    const handleChangeUserNameOrEmailText = React.useCallback((e: string) => {
        dispatch(updateLoginFieldsError({ userNameOrEmail: '' }));
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
