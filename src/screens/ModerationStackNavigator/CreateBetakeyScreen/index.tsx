import { useFocusEffect } from '@react-navigation/native';
import * as React from 'react';
import { useFormik } from 'formik';
import { useDispatch, useSelector } from 'react-redux';

import {
    BackHandler,
    KeyboardAvoidingView,
    Platform,
    StyleSheet,
} from 'react-native';
import { createBetaKeySchema } from '#helpers/schemas';
import {
    postBetaKey,
    resetBetaKeysLoadingPost,
    selectBetaKeysFieldsError,
    selectBetaKeysLoadingPost,
    updateBetaKeysFieldsError,
} from '#store/betaKeys';
import { GLOBAL_STYLE } from '#helpers/constants';
import {
    CustomButton,
    CustomTextInput,
    FullScreenContainer,
} from '#components';

import { ButtonContainer, ScrollViewStyle } from './styles';

type Props = {
    navigation: Screen.ModeratorStack.CreateBetaKeyScreenNavigationProp;
};

const initialValues = {
    email: '',
};

const CreateBetakeyScreen = ({ navigation }: Props) => {
    const dispatch = useDispatch();

    const fieldsError = useSelector(selectBetaKeysFieldsError);
    const loading = useSelector(selectBetaKeysLoadingPost);

    const formik = useFormik({
        onSubmit: (values) => {
            dispatch(postBetaKey(values));
        },
        initialValues,
        validateOnBlur: true,
        validateOnChange: false,
        validationSchema: createBetaKeySchema,
    });

    const emailError = React.useMemo(
        () => formik.errors.email || fieldsError.email,
        [formik.errors, fieldsError]
    );
    const disableButton = React.useMemo(() => {
        const clientHasError = !!formik.errors.email;
        const serverHasError = !!fieldsError.email;
        return clientHasError || serverHasError;
    }, [formik.errors, fieldsError]);

    const handleChangeEmailText = React.useCallback(
        (e: string) => {
            if (fieldsError.email)
                dispatch(updateBetaKeysFieldsError({ email: '' }));
            if (formik.errors.email) formik.setFieldError('email', '');
            formik.setFieldValue('email', e);
        },
        [formik.errors, fieldsError]
    );
    const handlePressBack = React.useCallback(() => {
        if (loading.includes('LOADING')) return;
        navigation.navigate('BetakeysScreen');
    }, [loading, navigation]);

    useFocusEffect(
        React.useCallback(() => {
            if (loading === 'SUCCESS') {
                dispatch(resetBetaKeysLoadingPost());
                navigation.navigate('CreateBetakeyScreen');
            }
        }, [loading, navigation])
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
                        keyboardType="email-address"
                        error={emailError}
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
                            title="create beta key"
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

export default CreateBetakeyScreen;
