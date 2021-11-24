import { useFocusEffect } from '@react-navigation/native';
import { useFormik } from 'formik';
import * as React from 'react';
import { useDispatch, useSelector } from 'react-redux';

import { CustomButton, CustomTextInput, OptionSlice } from '#components';
import { putUserPassword } from '#helpers/schemas';
import {
    putMePassword,
    selectMeFieldsError,
    selectMeLoadingPut,
    updateMeFieldsError,
} from '#store/me';

const initialValues = {
    confirmNewPassword: '',
    currentPassword: '',
    newPassword: '',
};

const UpdatePassword = () => {
    const dispatch = useDispatch();

    const fieldsError = useSelector(selectMeFieldsError);
    const loading = useSelector(selectMeLoadingPut);

    const formik = useFormik({
        onSubmit: (values) => {
            dispatch(putMePassword(values));
        },
        initialValues,
        validateOnBlur: false,
        validateOnChange: true,
        validationSchema: putUserPassword,
        enableReinitialize: true,
    });

    const confirmNewPasswordError = React.useMemo(
        () =>
            formik.errors.confirmNewPassword || fieldsError.confirmNewPassword,
        [fieldsError, formik.errors]
    );
    const currentPasswordError = React.useMemo(
        () => formik.errors.currentPassword || fieldsError.confirmNewPassword,
        [fieldsError, formik.errors]
    );
    const disableButton = React.useMemo(() => {
        const clientHasError =
            !!formik.errors.confirmNewPassword ||
            !!formik.errors.currentPassword ||
            !!formik.errors.newPassword;
        const serverHasError =
            !!fieldsError.confirmNewPassword ||
            !!fieldsError.currentPassword ||
            !!fieldsError.newPassword;
        return clientHasError || serverHasError;
    }, [fieldsError, formik.errors]);
    const newPasswordError = React.useMemo(
        () => formik.errors.newPassword || fieldsError.newPassword,
        [fieldsError, formik.errors]
    );

    const handleChangeConfirmNewPasswordText = React.useCallback(
        (e: string) => {
            if (fieldsError.confirmNewPassword)
                dispatch(updateMeFieldsError({ confirmNewPassword: '' }));
            if (formik.errors.confirmNewPassword)
                formik.setFieldError('confirmNewPassword', '');
            formik.setFieldValue('confirmNewPassword', e);
        },
        [fieldsError, formik.errors]
    );
    const handleChangeCurrentPasswordText = React.useCallback(
        (e: string) => {
            if (fieldsError.currentPassword)
                dispatch(updateMeFieldsError({ currentPassword: '' }));
            if (formik.errors.currentPassword)
                formik.setFieldError('currentPassword', '');
            formik.setFieldValue('currentPassword', e);
        },
        [fieldsError, formik.errors]
    );
    const handleChangeNewPasswordText = React.useCallback(
        (e: string) => {
            if (fieldsError.newPassword)
                dispatch(updateMeFieldsError({ newPassword: '' }));
            if (formik.errors.newPassword)
                formik.setFieldError('newPassword', '');
            formik.setFieldValue('newPassword', e);
        },
        [fieldsError, formik.errors]
    );

    useFocusEffect(
        React.useCallback(
            () => () => {
                formik.resetForm();
            },
            []
        )
    );
    useFocusEffect(
        React.useCallback(() => {
            if (loading !== 'SUCCESS') return;
            formik.resetForm();
        }, [loading])
    );

    return (
        <OptionSlice separaror title="update password">
            <CustomTextInput
                error={currentPasswordError}
                label="current password"
                loading={loading.includes('LOADING')}
                onBlur={formik.handleBlur('currentPassword')}
                onChangeText={handleChangeCurrentPasswordText}
                removeEmoji
                secureTextEntry
                touched={formik.touched.currentPassword || false}
                value={formik.values.currentPassword}
            />
            <CustomTextInput
                error={newPasswordError}
                label="new password"
                loading={loading.includes('LOADING')}
                onBlur={formik.handleBlur('newPassword')}
                onChangeText={handleChangeNewPasswordText}
                removeEmoji
                secureTextEntry
                touched={formik.touched.newPassword || false}
                value={formik.values.newPassword}
            />
            <CustomTextInput
                error={confirmNewPasswordError}
                label="confirm new password"
                loading={loading.includes('LOADING')}
                onBlur={formik.handleBlur('confirmNewPassword')}
                onChangeText={handleChangeConfirmNewPasswordText}
                removeEmoji
                secureTextEntry
                touched={formik.touched.confirmNewPassword || false}
                value={formik.values.confirmNewPassword}
            />
            <CustomButton
                disable={disableButton}
                loading={loading.includes('LOADING')}
                onPress={formik.handleSubmit}
                title="update password"
            />
        </OptionSlice>
    );
};

export default UpdatePassword;
