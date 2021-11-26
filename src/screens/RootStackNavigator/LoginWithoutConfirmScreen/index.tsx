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

import {
    CustomButton,
    CustomTextInput,
    FullScreenContainer,
    Typography,
} from '#components';
import { resendConfirmationSchema } from '#helpers/schemas';
import {
    postConfirmAccount,
    resetConfirmAccountFieldsError,
    selectConfirmAccountFieldsError,
    selectConfirmAccountStatus,
    updateConfirmAccountFieldsError,
} from '#store/confirmAccount';

import { ButtonContainer, ScrollViewStyle, TextContainer } from './styles';
import { GLOBAL_STYLE } from '#helpers/constants';

const initialValues = {
    email: '',
};

type Props = {
    navigation: Screen.RootStack.LoginWithoutConfirmNavigationProp;
};

const LoginWithoutConfirmHeader = ({ navigation }: Props) => {
    const dispatch = useDispatch();

    const fieldsError = useSelector(selectConfirmAccountFieldsError);
    const status = useSelector(selectConfirmAccountStatus);

    const formik = useFormik({
        initialValues,
        onSubmit: (values) => {
            dispatch(postConfirmAccount(values));
        },
        validateOnBlur: true,
        validateOnChange: false,
        validationSchema: resendConfirmationSchema,
    });

    const disableButton = React.useMemo(() => {
        const clientHasError = !!formik.errors.email;
        const serverHasError = !!fieldsError.email;
        return clientHasError || serverHasError;
    }, [fieldsError, formik.errors]);
    const emailError = React.useMemo(
        () => formik.errors.email || fieldsError.email,
        [fieldsError, formik.errors]
    );

    const handleChangeEmailText = React.useCallback(
        (e: string) => {
            if (fieldsError.email !== '')
                dispatch(updateConfirmAccountFieldsError({ email: '' }));
            if (formik.errors.email) formik.setFieldError('email', '');
            formik.setFieldValue('email', e);
        },
        [fieldsError, formik.errors]
    );
    const handlePressBack = React.useCallback(() => {
        if (status === 'LOADING') return;
        navigation.navigate('Landing');
    }, [status]);

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
    useFocusEffect(
        React.useCallback(
            () => () => {
                dispatch(resetConfirmAccountFieldsError());
                formik.resetForm();
            },
            []
        )
    );

    return (
        <FullScreenContainer>
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
                            fontSize={24}
                        >
                            your account need to be confirmed
                        </Typography>
                        <Typography fontSize={18}>
                            register you're email to receive a confirmation mail
                        </Typography>
                    </TextContainer>
                    <CustomTextInput
                        error={emailError}
                        label="email"
                        loading={status.includes('LOADING')}
                        mt="normal"
                        onBlur={formik.handleBlur('email')}
                        onChangeText={handleChangeEmailText}
                        touched={formik.touched.email || false}
                        value={formik.values.email}
                    />
                    <ButtonContainer>
                        <CustomButton
                            disable={disableButton}
                            loading={status.includes('LOADING')}
                            mb="smallest"
                            mt="normal"
                            onPress={formik.handleSubmit}
                            title="resend confirmation"
                        />
                        <CustomButton
                            disable={status.includes('LOADING')}
                            onPress={handlePressBack}
                            title="cancel"
                            variant="stroke"
                        />
                    </ButtonContainer>
                </ScrollViewStyle>
            </KeyboardAvoidingView>
        </FullScreenContainer>
    );
};

const styles = StyleSheet.create({
    keyboardAvoidingViewStyle: {
        flex: 1,
    },
});

export default LoginWithoutConfirmHeader;
