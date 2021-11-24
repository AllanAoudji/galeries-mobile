import { useFocusEffect } from '@react-navigation/native';
import { useFormik } from 'formik';
import * as React from 'react';
import { useDispatch, useSelector } from 'react-redux';

import { CustomButton, CustomTextInput, OptionSlice } from '#components';
import { putUserPseudonym } from '#helpers/schemas';
import {
    putMePseudonym,
    selectMeFieldsError,
    selectMeLoadingPut,
    updateMeFieldsError,
} from '#store/me';

type Props = {
    user: Store.Models.User;
};

const ChangePseudonym = ({ user }: Props) => {
    const dispatch = useDispatch();

    const fieldsError = useSelector(selectMeFieldsError);
    const loading = useSelector(selectMeLoadingPut);

    const formik = useFormik({
        onSubmit: (values) => {
            dispatch(putMePseudonym(values));
        },
        initialValues: { pseudonym: user.pseudonym },
        validateOnBlur: false,
        validateOnChange: true,
        validationSchema: putUserPseudonym,
        enableReinitialize: true,
    });

    const pseudonymError = React.useMemo(
        () => formik.errors.pseudonym || fieldsError.pseudonym,
        [fieldsError, formik.errors]
    );
    const disableButton = React.useMemo(() => {
        const clientHasError = !!formik.errors.pseudonym;
        const serverHasError = !!fieldsError.pseudonym;
        const noChangeCommited = formik.values.pseudonym === user.pseudonym;
        return clientHasError || serverHasError || noChangeCommited;
    }, [fieldsError, formik.errors, formik.values, user]);

    const handleChangePseudonymText = React.useCallback(
        (e: string) => {
            if (fieldsError.pseudonym)
                dispatch(updateMeFieldsError({ pseudonym: '' }));
            if (formik.errors.pseudonym) formik.setFieldError('pseudonym', '');
            formik.setFieldValue('pseudonym', e);
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

    return (
        <OptionSlice mt="normal" separaror title="change pseudonym">
            <CustomTextInput
                error={pseudonymError}
                label="pseudonym"
                loading={loading.includes('LOADING')}
                onBlur={formik.handleBlur('pseudonym')}
                onChangeText={handleChangePseudonymText}
                touched={formik.touched.pseudonym || false}
                value={formik.values.pseudonym}
            />
            <CustomButton
                disable={disableButton}
                loading={loading.includes('LOADING')}
                onPress={formik.handleSubmit}
                title="change pseudonym"
            />
        </OptionSlice>
    );
};

export default ChangePseudonym;
