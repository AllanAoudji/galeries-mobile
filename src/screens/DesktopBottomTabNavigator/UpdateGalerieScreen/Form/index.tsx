import { useNavigation, useFocusEffect } from '@react-navigation/native';
import { useFormik } from 'formik';
import * as React from 'react';
import { useDispatch, useSelector } from 'react-redux';

import { BackHandler } from 'react-native';
import { CustomButton, CustomTextInput } from '#components';
import { FIELD_REQUIREMENT } from '#helpers/constants';
import { putGalerieSchema } from '#helpers/schemas';
import {
    putGalerie,
    resetGaleriesLoadingPut,
    selectGaleriesFieldsError,
    selectGaleriesLoadingPut,
    updateGaleriesFieldsError,
} from '#store/galeries';

import { ButtonContainer, Container, ScrollViewStyle } from './styles';

type Props = {
    galerie: Store.Models.Galerie;
};

const Form = ({ galerie }: Props) => {
    const dispatch = useDispatch();
    const navigation =
        useNavigation<Screen.DesktopBottomTab.UpdateGalerieNavigationProp>();

    const galeriesFieldsError = useSelector(selectGaleriesFieldsError);
    const loading = useSelector(selectGaleriesLoadingPut);

    const formik = useFormik({
        onSubmit: (values) => {
            dispatch(putGalerie(galerie.id, values));
        },
        initialValues: { name: galerie.name, description: galerie.description },
        validateOnBlur: false,
        validateOnChange: true,
        validationSchema: putGalerieSchema,
        enableReinitialize: true,
    });

    const navigate = React.useCallback(() => {
        dispatch(resetGaleriesLoadingPut());
        if (navigation.canGoBack()) navigation.goBack();
        else navigation.navigate('Home');
    }, [navigation]);

    const descriptionError = React.useMemo(
        () => formik.errors.description || galeriesFieldsError.description,
        [formik.errors, galeriesFieldsError]
    );
    const disableButton = React.useMemo(() => {
        const clientHasError =
            !!formik.errors.description || !!formik.errors.name;
        const serverHasError =
            !!galeriesFieldsError.description || !!galeriesFieldsError.name;
        const noChangeCommited =
            formik.values.description === galerie.description &&
            formik.values.name === galerie.name;
        return clientHasError || serverHasError || noChangeCommited;
    }, [formik.errors, formik.values, galerie, galeriesFieldsError]);
    const nameError = React.useMemo(
        () => formik.errors.name || galeriesFieldsError.name,
        [formik.errors, galeriesFieldsError]
    );

    const handleChangeDescriptionText = React.useCallback(
        (e: string) => {
            if (galeriesFieldsError.description)
                dispatch(updateGaleriesFieldsError({ description: '' }));
            if (formik.errors.description)
                formik.setFieldError('description', '');
            formik.setFieldValue('description', e);
        },
        [formik.errors, galeriesFieldsError]
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
    const handlePressGoBack = React.useCallback(() => {
        if (!loading.includes('LOADING')) navigate();
    }, [loading, navigate]);

    useFocusEffect(
        React.useCallback(() => {
            if (loading === 'SUCCESS') navigate();
        }, [loading, navigate])
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
                <CustomTextInput
                    error={nameError}
                    label="name"
                    loading={loading.includes('LOADING')}
                    mt="normal"
                    onBlur={formik.handleBlur('name')}
                    onChangeText={handleChangeNameText}
                    touched={formik.touched.name || false}
                    value={formik.values.name}
                />
                <CustomTextInput
                    error={descriptionError}
                    label="description"
                    loading={loading.includes('LOADING')}
                    maxLength={FIELD_REQUIREMENT.FRAME_DESCRIPTION_MAX_LENGTH}
                    multiline
                    onBlur={formik.handleBlur('description')}
                    onChangeText={handleChangeDescriptionText}
                    optional
                    touched={formik.touched.description || false}
                    value={formik.values.description}
                />
                <ButtonContainer>
                    <CustomButton
                        disable={disableButton}
                        loading={loading.includes('LOADING')}
                        mb="smallest"
                        mt="normal"
                        onPress={formik.handleSubmit}
                        title="update galerie"
                    />
                    <CustomButton
                        disable={loading.includes('LOADING')}
                        onPress={handlePressGoBack}
                        title="cancel"
                        variant="stroke"
                    />
                </ButtonContainer>
            </ScrollViewStyle>
        </Container>
    );
};

export default Form;
