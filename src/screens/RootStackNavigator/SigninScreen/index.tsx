import * as React from 'react';
import { useFormik } from 'formik';

import { useSelector } from 'react-redux';
import {
    CustomButton,
    CustomTextInput,
    FormContainer,
    Logo,
} from '#components';
import { signinSchema } from '#helpers/schemas';

import FooterNavigation from '../FooterNavigation';
import { selectLoading } from '#store/loading';

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
    const loading = useSelector(selectLoading);

    const formik = useFormik({
        initialValues,
        onSubmit: async (values) => console.log(values),
        validateOnBlur: true,
        validateOnChange: false,
        validationSchema: signinSchema,
    });

    const betaKeyError = React.useMemo(
        () => formik.errors.betaKey,
        [formik.errors.betaKey]
    );
    const confirmPasswordError = React.useMemo(
        () => formik.errors.confirmPassword,
        [formik.errors.confirmPassword]
    );
    const disableButton = React.useMemo(() => {
        const clientHasError =
            formik.submitCount > 0 &&
            (!!formik.errors.betaKey ||
                !!formik.errors.confirmPassword ||
                !!formik.errors.email ||
                !!formik.errors.password ||
                !!formik.errors.userName);
        return clientHasError;
    }, [formik.submitCount, formik.errors]);
    const emailError = React.useMemo(
        () => formik.errors.email,
        [formik.errors.email]
    );
    const passwordError = React.useMemo(
        () => formik.errors.password,
        [formik.errors.password]
    );
    const userNameError = React.useMemo(
        () => formik.errors.userName,
        [formik.errors.userName]
    );

    const handleChangeBetaKeyText = React.useCallback((e: string) => {
        formik.setFieldError('betaKey', '');
        formik.setFieldValue('betaKey', e);
    }, []);
    const handleChangeConfirmPasswordText = React.useCallback((e: string) => {
        formik.setFieldError('confirmPassword', '');
        formik.setFieldValue('confirmPassword', e);
    }, []);
    const handleChangeEmailText = React.useCallback((e: string) => {
        formik.setFieldError('email', '');
        formik.setFieldValue('email', e);
    }, []);
    const handleChangePasswordText = React.useCallback((e: string) => {
        formik.setFieldError('password', '');
        formik.setFieldValue('password', e);
    }, []);
    const handeChangeUserNameText = React.useCallback((e: string) => {
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
