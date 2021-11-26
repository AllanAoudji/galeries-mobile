import { useFocusEffect } from '@react-navigation/native';
import * as React from 'react';
import {
    BackHandler,
    KeyboardAvoidingView,
    Platform,
    StyleSheet,
} from 'react-native';
import { useDispatch, useSelector } from 'react-redux';
import { useFormik } from 'formik';

import {
    CustomButton,
    CustomTextInput,
    FullScreenContainer,
} from '#components';
import { GLOBAL_STYLE } from '#helpers/constants';
import { deleteMeSchema } from '#helpers/schemas';
import {
    deleteMe,
    resetMeFieldsError,
    resetMeLoadingDelete,
    selectMeFieldsError,
    selectMeLoadingDelete,
    updateMeFieldsError,
} from '#store/me';

import { ButtonContainer, ScrollViewStyle } from './styles';

type Props = {
    navigation: Screen.SettingsStack.DeleteAccountScreenNavigationProp;
};

const initialValues = {
    deleteAccountSentence: '',
    deletePassword: '',
    userNameOrEmail: '',
};

const DeleteAccountScreen = ({ navigation }: Props) => {
    const dispatch = useDispatch();

    const fieldsError = useSelector(selectMeFieldsError);
    const loading = useSelector(selectMeLoadingDelete);

    const formik = useFormik({
        onSubmit: (values) => {
            dispatch(
                deleteMe({
                    ...values,
                    password: values.deletePassword,
                })
            );
        },
        initialValues,
        validateOnBlur: true,
        validateOnChange: false,
        validationSchema: deleteMeSchema,
    });

    const deleteAccountSentenceError = React.useMemo(
        () =>
            formik.errors.deleteAccountSentence ||
            fieldsError.deleteAccountSentence,
        [formik.errors, fieldsError]
    );
    const deletePasswordError = React.useMemo(
        () => formik.errors.deletePassword || fieldsError.deletePassword,
        [formik.errors, fieldsError]
    );
    const disableButton = React.useMemo(() => {
        const clientHasError =
            !!formik.errors.deleteAccountSentence ||
            !!formik.errors.deletePassword ||
            !!formik.errors.userNameOrEmail;
        const serverHasError =
            !!fieldsError.deleteAccountSentence ||
            !!fieldsError.deletePassword ||
            !!fieldsError.userNameOrEmail;
        return clientHasError || serverHasError;
    }, [formik.errors, fieldsError]);

    console.log(disableButton, formik.errors, fieldsError);

    const userNameOrEmailError = React.useMemo(
        () => formik.errors.userNameOrEmail || fieldsError.userNameOrEmail,
        [fieldsError, formik.errors]
    );

    const handleChangeDeleteAccountSentence = React.useCallback(
        (e: string) => {
            if (fieldsError.deleteAccountSentence)
                dispatch(updateMeFieldsError({ deleteAccountSentence: '' }));
            if (formik.errors.deleteAccountSentence)
                formik.setFieldError('deleteAccountSentence', '');
            formik.setFieldValue('deleteAccountSentence', e);
        },
        [formik.errors, fieldsError]
    );
    const handleChangeDeletePasswordSentence = React.useCallback(
        (e: string) => {
            if (fieldsError.deletePassword)
                dispatch(updateMeFieldsError({ deletePassword: '' }));
            if (formik.errors.deletePassword)
                formik.setFieldError('deletePassword', '');
            formik.setFieldValue('deletePassword', e);
        },
        [formik.errors, fieldsError]
    );
    const handleChangeUserNameOrEmail = React.useCallback(
        (e: string) => {
            if (fieldsError.userNameOrEmail)
                dispatch(updateMeFieldsError({ userNameOrEmail: '' }));
            if (formik.errors.userNameOrEmail)
                formik.setFieldValue('userNameOrEmail', '');
            formik.setFieldValue('userNameOrEmail', e);
        },
        [formik.errors, fieldsError]
    );
    const handlePressBack = React.useCallback(() => {
        if (loading.includes('LOADING')) return;
        navigation.navigate('SettingsFields');
    }, [loading, navigation]);

    useFocusEffect(
        React.useCallback(
            () => () => {
                dispatch(resetMeLoadingDelete());
                dispatch(resetMeFieldsError());
                formik.resetForm();
            },
            []
        )
    );
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
        <KeyboardAvoidingView
            behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
            keyboardVerticalOffset={GLOBAL_STYLE.HEADER_TAB_HEIGHT}
            style={styles.keyboardAvoidingViewStyle}
        >
            <FullScreenContainer>
                <ScrollViewStyle
                    keyboardShouldPersistTaps="handled"
                    overScrollMode="never"
                    showsVerticalScrollIndicator={false}
                >
                    <CustomTextInput
                        error={userNameOrEmailError}
                        label="user name or email"
                        loading={loading.includes('LOADING')}
                        mt="normal"
                        onBlur={formik.handleBlur('userNameOrEmail')}
                        onChangeText={handleChangeUserNameOrEmail}
                        touched={formik.touched.userNameOrEmail || false}
                        value={formik.values.userNameOrEmail}
                    />
                    <CustomTextInput
                        error={deleteAccountSentenceError}
                        label="to verify, type 'delete my account' below"
                        loading={loading.includes('LOADING')}
                        onBlur={formik.handleBlur('deleteAccountSentence')}
                        onChangeText={handleChangeDeleteAccountSentence}
                        optional
                        touched={formik.touched.deleteAccountSentence || false}
                        value={formik.values.deleteAccountSentence}
                    />
                    <CustomTextInput
                        error={deletePasswordError}
                        label="password"
                        loading={loading.includes('LOADING')}
                        onBlur={formik.handleBlur('deletePassword')}
                        onChangeText={handleChangeDeletePasswordSentence}
                        optional
                        secureTextEntry
                        touched={formik.touched.deletePassword || false}
                        value={formik.values.deletePassword}
                    />
                    <ButtonContainer>
                        <CustomButton
                            color="danger"
                            disable={disableButton}
                            loading={loading.includes('LOADING')}
                            mb="smallest"
                            mt="normal"
                            onPress={formik.handleSubmit}
                            title="delete my account"
                        />
                        <CustomButton
                            disable={loading.includes('LOADING')}
                            onPress={handlePressBack}
                            title="cancel"
                            variant="stroke"
                        />
                    </ButtonContainer>
                </ScrollViewStyle>
            </FullScreenContainer>
        </KeyboardAvoidingView>
    );
};

const styles = StyleSheet.create({
    keyboardAvoidingViewStyle: {
        flex: 1,
    },
});

export default DeleteAccountScreen;
