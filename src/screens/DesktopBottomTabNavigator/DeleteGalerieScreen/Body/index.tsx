import { useFocusEffect, useNavigation } from '@react-navigation/native';
import { useFormik } from 'formik';
import * as React from 'react';
import { BackHandler } from 'react-native';
import { useDispatch, useSelector } from 'react-redux';

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

import {
    ButtonContainer,
    Container,
    FieldsContainer,
    ScrollViewStyle,
    TypographyContainer,
} from './styles';

type Props = {
    galerie: Store.Models.Galerie;
};

const initialValues = {
    name: '',
    password: '',
};

const Body = ({ galerie }: Props) => {
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
        const clientHasError = !!formik.errors.name || !!formik.errors.password;
        const serverHasError =
            !!galeriesFieldsError.name || !!galeriesFieldsError.password;
        return clientHasError || serverHasError;
    }, [formik.errors, galeriesFieldsError]);
    const nameError = React.useMemo(
        () => formik.errors.name || galeriesFieldsError.name,
        [formik.errors.name, galeriesFieldsError.name]
    );
    const passwordError = React.useMemo(
        () => formik.errors.password || galeriesFieldsError.password,
        [formik.errors.password || galeriesFieldsError.password]
    );

    const handleChangeNameText = React.useCallback(
        (e: string) => {
            if (galeriesFieldsError.name)
                dispatch(updateGaleriesFieldsError({ name: '' }));
            if (formik.errors.name) formik.setFieldError('name', '');
            formik.setFieldValue('name', e);
        },
        [formik.errors, galeriesFieldsError]
    );
    const handleChangePasswordText = React.useCallback(
        (e: string) => {
            if (galeriesFieldsError.password)
                dispatch(updateGaleriesFieldsError({ password: '' }));
            if (formik.errors.password) formik.setFieldError('password', '');
            formik.setFieldValue('password', e);
        },
        [formik.errors, galeriesFieldsError]
    );
    const handlePressBack = React.useCallback(() => {
        if (loading.includes('LOADING')) return;
        if (navigation.canGoBack()) navigation.goBack();
        else navigation.navigate('Home');
    }, [navigation]);

    useFocusEffect(
        React.useCallback(
            () => () => {
                dispatch(resetGaleriesLoadingDelete());
                dispatch(resetGaleriesFieldsError());
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
        <Container>
            <ScrollViewStyle
                keyboardShouldPersistTaps="handled"
                overScrollMode="never"
                showsVerticalScrollIndicator={false}
            >
                <FieldsContainer>
                    <TypographyContainer>
                        <Typography color="danger">
                            To delete this galerie, register the galerie's name
                            and your password.
                        </Typography>
                    </TypographyContainer>
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
                </FieldsContainer>
                <ButtonContainer>
                    <CustomButton
                        color="danger"
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
                </ButtonContainer>
            </ScrollViewStyle>
        </Container>
    );
};

export default Body;
