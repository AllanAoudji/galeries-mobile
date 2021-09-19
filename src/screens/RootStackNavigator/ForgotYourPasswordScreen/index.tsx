import { useFormik } from 'formik';
import * as React from 'react';

import {
    CustomButton,
    CustomTextInput,
    FormContainer,
    Logo,
    Typography,
} from '#components';
import { forgotPassworSchema } from '#helpers/schemas';
import { useForgotPassword } from '#hooks';

import { TextContainer } from './styles';

type Props = {
    navigation: Screen.RootStack.ForgotYourPasswordNavigationProp;
};

const initialValues = { email: '' };

const ForgotYourPasswordScreen = ({ navigation }: Props) => {
    const { forgotPassword, loading, serverErrors, resetServerErrorField } =
        useForgotPassword();
    const formik = useFormik({
        initialValues,
        onSubmit: (values) => forgotPassword(values),
        validateOnBlur: true,
        validateOnChange: false,
        validationSchema: forgotPassworSchema,
    });

    const disableButton = React.useMemo(() => {
        const clientHasError = formik.submitCount > 0 && !!formik.errors.email;
        const serverHasError = !!serverErrors.email;
        return clientHasError || serverHasError;
    }, [formik.submitCount, formik.errors, serverErrors]);
    const emailError = React.useMemo(
        () => formik.errors.email || serverErrors.email,
        [formik.errors.email, serverErrors.email]
    );

    const handleChangeEmailText = React.useCallback((e: string) => {
        resetServerErrorField('email');
        formik.setFieldError('email', '');
        formik.setFieldValue('email', e);
    }, []);
    const handlePressReturn = React.useCallback(() => {
        if (!loading) navigation.navigate('Login');
    }, []);

    return (
        <FormContainer justifyContent="center">
            <Logo size="smallest" variant="text" />
            <TextContainer>
                <Typography
                    color="primary-dark"
                    fontFamily="light"
                    fontSize={18}
                >
                    Register your email to reset your password.
                </Typography>
            </TextContainer>
            <CustomTextInput
                error={emailError}
                keyboardType="email-address"
                label="email"
                loading={loading}
                onBlur={formik.handleBlur('email')}
                onChangeText={handleChangeEmailText}
                touched={formik.touched.email || false}
                value={formik.values.email}
            />
            <CustomButton
                disable={disableButton}
                loading={loading}
                mb="smallest"
                mt="smallest"
                onPress={formik.handleSubmit}
                title="reset your password"
            />
            <CustomButton
                onPress={handlePressReturn}
                title="cancel"
                variant="stroke"
            />
        </FormContainer>
    );
};

export default ForgotYourPasswordScreen;
