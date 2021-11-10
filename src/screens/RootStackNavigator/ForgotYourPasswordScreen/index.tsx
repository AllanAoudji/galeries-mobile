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
import { forgotPassworSchema } from '#helpers/schemas';
import {
    selectForgotYourPasswordFieldsError,
    selectForgotYourPasswordStatus,
    updateForgotYourPasswordFieldsError,
} from '#store/forgotYourPassword';

import {
    ButtonContainer,
    Container,
    ScrollViewStyle,
    TextContainer,
} from './styles';
import { GLOBAL_STYLE } from '#helpers/constants';

type Props = {
    navigation: Screen.RootStack.ForgotYourPasswordNavigationProp;
};

const initialValues = { email: '' };

const ForgotYourPasswordScreen = ({ navigation }: Props) => {
    const dispatch = useDispatch();

    const fieldsError = useSelector(selectForgotYourPasswordFieldsError);
    const loading = useSelector(selectForgotYourPasswordStatus);

    const formik = useFormik({
        initialValues,
        onSubmit: (values) => console.log(values),
        validateOnBlur: true,
        validateOnChange: false,
        validationSchema: forgotPassworSchema,
    });

    const disableButton = React.useMemo(() => {
        const clientHasError = !!formik.errors.email;
        const serverHasError = !!fieldsError.email;
        return clientHasError || serverHasError;
    }, [formik.submitCount, formik.errors]);
    const emailError = React.useMemo(
        () => formik.errors.email,
        [formik.errors.email]
    );

    const handleChangeEmailText = React.useCallback(
        (e: string) => {
            if (fieldsError.email)
                dispatch(updateForgotYourPasswordFieldsError({ email: '' }));
            if (formik.errors.email) formik.setFieldError('email', '');
            formik.setFieldValue('email', e);
        },
        [fieldsError, formik.errors]
    );

    const handlePressReturn = React.useCallback(() => {
        if (!loading.includes('LOADING')) navigation.navigate('Login');
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
                        <Typography fontSize={18}>
                            Register your email to reset your password.
                        </Typography>
                    </TextContainer>
                    <CustomTextInput
                        error={emailError}
                        keyboardType="email-address"
                        label="email"
                        loading={loading.includes('LOADING')}
                        mt="normal"
                        onBlur={formik.handleBlur('email')}
                        onChangeText={handleChangeEmailText}
                        touched={formik.touched.email || false}
                        value={formik.values.email}
                    />
                    <ButtonContainer>
                        <CustomButton
                            disable={disableButton}
                            loading={loading.includes('LOADING')}
                            mb="smallest"
                            mt="normal"
                            onPress={formik.handleSubmit}
                            title="reset your password"
                        />
                        <CustomButton
                            disable={loading.includes('LOADING')}
                            onPress={handlePressReturn}
                            title="cancel"
                            variant="stroke"
                        />
                    </ButtonContainer>
                </ScrollViewStyle>
            </KeyboardAvoidingView>
        </Container>
    );
};

const styles = StyleSheet.create({
    keyboardAvoidingViewStyle: {
        flex: 1,
    },
});

export default ForgotYourPasswordScreen;
