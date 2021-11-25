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
} from '#components';
import { FIELD_REQUIREMENT, GLOBAL_STYLE } from '#helpers/constants';
import { createTicketSchema } from '#helpers/schemas';
import {
    postTickets,
    selectTicketFieldsError,
    selectTicketsLoadingPost,
    resetTicketLoadingPost,
    resetTicketsFieldsError,
    updateTicketsFieldsError,
} from '#store/tickets';

import { ButtonContainer, ScrollViewStyle } from './styles';

type Props = {
    navigation: Screen.DesktopBottomTab.SendTicketNavigationProp;
};

const initialValues = {
    header: '',
    body: '',
};

const SendTicketScreen = ({ navigation }: Props) => {
    const dispatch = useDispatch();

    const fieldsError = useSelector(selectTicketFieldsError);
    const loading = useSelector(selectTicketsLoadingPost);

    const formik = useFormik({
        onSubmit: (values) => {
            dispatch(postTickets(values));
        },
        initialValues,
        validateOnBlur: true,
        validateOnChange: false,
        validationSchema: createTicketSchema,
    });

    const bodyError = React.useMemo(
        () => formik.errors.body || fieldsError.body,
        [fieldsError, formik.errors]
    );
    const disableButton = React.useMemo(() => {
        const clientHasError = !!formik.errors.body || !!formik.errors.header;
        const serverHasError = !!fieldsError.body || !!fieldsError.header;
        return clientHasError || serverHasError;
    }, [formik.errors, fieldsError]);
    const headerError = React.useMemo(
        () => formik.errors.header || fieldsError.header,
        [fieldsError, formik.errors]
    );

    const handleChangeBodyText = React.useCallback(
        (e: string) => {
            if (fieldsError.body)
                dispatch(updateTicketsFieldsError({ body: '' }));
            if (formik.errors.body) formik.setFieldError('body', '');
            formik.setFieldValue('body', e);
        },
        [formik.errors, fieldsError]
    );
    const handleChangeHeaderText = React.useCallback(
        (e: string) => {
            if (fieldsError.header)
                dispatch(updateTicketsFieldsError({ header: '' }));
            if (formik.errors.header) formik.setFieldError('header', '');
            formik.setFieldValue('header', e);
        },
        [formik.errors, fieldsError]
    );
    const handlePressBack = React.useCallback(() => {
        if (loading.includes('LOADING')) return;
        if (navigation.canGoBack()) navigation.goBack();
        else navigation.navigate('Home');
    }, [loading, navigation]);

    useFocusEffect(
        React.useCallback(() => {
            if (loading === 'SUCCESS') {
                dispatch(resetTicketLoadingPost());
                navigation.navigate('Home');
            }
        }, [loading, navigation])
    );
    useFocusEffect(
        React.useCallback(
            () => () => {
                dispatch(resetTicketLoadingPost());
                dispatch(resetTicketsFieldsError());
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
                        error={headerError}
                        label="header"
                        loading={loading.includes('LOADING')}
                        maxLength={FIELD_REQUIREMENT.TICKET_HEADER_MAX_LENGTH}
                        mt="normal"
                        onBlur={formik.handleBlur('header')}
                        onChangeText={handleChangeHeaderText}
                        touched={formik.touched.header || false}
                        value={formik.values.header}
                    />
                    <CustomTextInput
                        error={bodyError}
                        label="body"
                        loading={loading.includes('LOADING')}
                        maxLength={FIELD_REQUIREMENT.TICKET_BODY_MAX_LENGTH}
                        multiline
                        onBlur={formik.handleBlur('body')}
                        onChangeText={handleChangeBodyText}
                        optional
                        touched={formik.touched.body || false}
                        value={formik.values.body}
                    />
                    <ButtonContainer>
                        <CustomButton
                            disable={disableButton}
                            loading={loading.includes('LOADING')}
                            mb="smallest"
                            mt="normal"
                            onPress={formik.handleSubmit}
                            title="create galerie"
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

export default SendTicketScreen;
