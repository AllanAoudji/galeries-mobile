import { useFocusEffect, useNavigation } from '@react-navigation/native';
import * as React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useFormik } from 'formik';

import { View } from 'react-native';
import { CustomButton, CustomTextInput, Typography } from '#components';

import { deleteGalerieSchema } from '#helpers/schemas';
import {
    deleteGalerie,
    resetGaleriesFieldsError,
    resetGaleriesLoadingDelete,
    selectGaleriesFieldsError,
    selectGaleriesLoadingDelete,
    updateGaleriesFieldsError,
} from '#store/galeries';

import { Container } from './styles';

type Props = {
    galerie: Store.Models.Galerie;
};

const initialValues = {
    password: '',
    name: '',
};

const Form = ({ galerie }: Props) => {
    const dispatch = useDispatch();
    const navigation =
        useNavigation<Screen.DesktopBottomTab.DeleteGalerieNavigationProp>();

    const galeriesFieldsError = useSelector(selectGaleriesFieldsError);
    const loading = useSelector(selectGaleriesLoadingDelete);

    const formik = useFormik({
        onSubmit: (values) => {
            dispatch(deleteGalerie(galerie.id, values));
        },
        initialValues,
        validateOnBlur: true,
        validateOnChange: false,
        validationSchema: deleteGalerieSchema,
    });

    const disableButton = React.useMemo(() => {
        const clientHasError =
            formik.submitCount > 0 &&
            (!!formik.errors.name || !!formik.errors.password);
        const serverHasError =
            !!galeriesFieldsError.name || !!galeriesFieldsError.password;
        return clientHasError || serverHasError;
    }, [formik.submitCount, formik.errors, galeriesFieldsError]);
    const nameError = React.useMemo(
        () => formik.errors.name || galeriesFieldsError.name,
        [formik.errors.name, galeriesFieldsError.name]
    );
    const passwordError = React.useMemo(
        () => formik.errors.password || galeriesFieldsError.password,
        [formik.errors.password || galeriesFieldsError.password]
    );

    const handleChangeNameText = React.useCallback((e: string) => {
        dispatch(updateGaleriesFieldsError({ name: '' }));
        formik.setFieldError('name', '');
        formik.setFieldValue('name', e);
    }, []);
    const handleChangePasswordText = React.useCallback((e: string) => {
        dispatch(updateGaleriesFieldsError({ password: '' }));
        formik.setFieldError('password', '');
        formik.setFieldValue('password', e);
    }, []);

    const handlePressBack = React.useCallback(() => {
        if (navigation.canGoBack()) navigation.goBack();
        else navigation.navigate('Home');
    }, [navigation]);

    useFocusEffect(
        React.useCallback(() => {
            if (loading === 'SUCCESS') {
                dispatch(resetGaleriesLoadingDelete());
                dispatch(resetGaleriesFieldsError());
                navigation.navigate('Home');
            }
        }, [loading])
    );

    return (
        <Container>
            <View>
                <Typography>
                    To delete this galerie, register the galerie's name and your
                    password.
                </Typography>
                <View>
                    <CustomTextInput
                        error={nameError}
                        label="name"
                        loading={loading.includes('LOADING')}
                        onBlur={formik.handleBlur('name')}
                        onChangeText={handleChangeNameText}
                        touched={formik.touched.name || false}
                        value={formik.values.name}
                    />
                    <CustomTextInput
                        error={passwordError}
                        label="password"
                        loading={loading.includes('LOADING')}
                        onBlur={formik.handleBlur('password')}
                        onChangeText={handleChangePasswordText}
                        secureTextEntry
                        touched={formik.touched.password || false}
                        value={formik.values.password}
                    />
                </View>
            </View>
            <View>
                <CustomButton
                    disable={disableButton}
                    loading={loading.includes('LOADING')}
                    mb="smallest"
                    onPress={formik.handleSubmit}
                    title="delete galerie"
                />
                <CustomButton
                    disable={loading.includes('LOADING')}
                    onPress={handlePressBack}
                    variant="stroke"
                    title="return"
                />
            </View>
        </Container>
    );
};

export default Form;
