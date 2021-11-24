import { useFocusEffect } from '@react-navigation/native';
import { useFormik } from 'formik';
import * as React from 'react';
import { useDispatch, useSelector } from 'react-redux';

import { CustomButton, CustomTextInput, OptionSlice } from '#components';
import { putUserEmail } from '#helpers/schemas';
import {
    putMeEmail,
    selectMeFieldsError,
    selectMeLoadingPut,
    updateMeFieldsError,
} from '#store/me';

const initialValues = {
    emailPassword: '',
};

const UpdateEmail = () => {
    const dispatch = useDispatch();

    const fieldsError = useSelector(selectMeFieldsError);
    const loading = useSelector(selectMeLoadingPut);

    const formik = useFormik({
        onSubmit: (values) => {
            dispatch(putMeEmail({ password: values.emailPassword }));
        },
        initialValues,
        validateOnBlur: false,
        validateOnChange: true,
        validationSchema: putUserEmail,
        enableReinitialize: true,
    });

    const emailPasswordError = React.useMemo(
        () => formik.errors.emailPassword || fieldsError.emailPassword,
        [fieldsError, formik.errors]
    );
    const disableButton = React.useMemo(() => {
        const clientHasError = !!formik.errors.emailPassword;
        const serverHasError = !!fieldsError.emailPassword;
        return clientHasError || serverHasError;
    }, [fieldsError, formik.errors]);

    const handleChangeEmailPasswordText = React.useCallback(
        (e: string) => {
            if (fieldsError.emailPassword)
                dispatch(updateMeFieldsError({ emailPassword: '' }));
            if (formik.errors.emailPassword)
                formik.setFieldError('emailPassword', '');
            formik.setFieldValue('emailPassword', e);
        },
        [fieldsError, formik.errors]
    );

    useFocusEffect(
        React.useCallback(() => {
            if (loading !== 'SUCCESS') return;
            formik.resetForm();
        }, [loading])
    );
    useFocusEffect(
        React.useCallback(
            () => () => {
                formik.resetForm();
            },
            []
        )
    );

    return (
        <OptionSlice
            separaror
            subTitle="Register your password. A mail gonna be send to you. Click on the link on this mail to change your email"
            title="update email"
        >
            <CustomTextInput
                error={emailPasswordError}
                label="password"
                loading={loading.includes('LOADING')}
                onBlur={formik.handleBlur('emailPassword')}
                onChangeText={handleChangeEmailPasswordText}
                secureTextEntry
                touched={formik.touched.emailPassword || false}
                value={formik.values.emailPassword}
            />
            <CustomButton
                disable={disableButton}
                loading={loading.includes('LOADING')}
                onPress={formik.handleSubmit}
                title="update email"
            />
        </OptionSlice>
    );
};

export default UpdateEmail;
