import { useFormik } from 'formik';
import * as React from 'react';

import { useDispatch, useSelector } from 'react-redux';
import { CustomButton, CustomTextInput, FormContainer } from '#components';
import { FIELD_REQUIREMENT } from '#helpers/constants';
import { createGaleriesSchema } from '#helpers/schemas';

import { ButtonsContainer, Container } from './styles';
import {
    postGalerie,
    selectGaleriesFieldsError,
    setGaleriesFieldsError,
} from '#store/galeries';
import { selectLoading } from '#store/loading';

type Props = {
    navigation: Screen.DesktopBottomTab.CreateGalerieProp;
};

const initialValues = {
    description: '',
    name: '',
};

const CreateGalerieScreen = ({ navigation }: Props) => {
    const dispatch = useDispatch();

    const galeriesFieldsError = useSelector(selectGaleriesFieldsError);
    const loading = useSelector(selectLoading);

    const formik = useFormik({
        onSubmit: async (values) => dispatch(postGalerie(values)),
        initialValues,
        validateOnBlur: true,
        validateOnChange: false,
        validationSchema: createGaleriesSchema,
    });

    const descriptionError = React.useMemo(
        () => formik.errors.description || galeriesFieldsError.description,
        [formik.errors.description, galeriesFieldsError.description]
    );
    const disableButton = React.useMemo(() => {
        const clientHasError =
            formik.submitCount > 0 &&
            (!!formik.errors.description || !!formik.errors.name);
        const serverHasError =
            !!galeriesFieldsError.description || !!galeriesFieldsError.name;
        return clientHasError || serverHasError;
    }, [formik.submitCount, formik.errors, galeriesFieldsError]);
    const nameError = React.useMemo(
        () => formik.errors.name || galeriesFieldsError.name,
        [formik.errors.name, galeriesFieldsError.name]
    );

    const handleChangeDescriptionText = React.useCallback((e: string) => {
        dispatch(setGaleriesFieldsError({ description: '' }));
        formik.setFieldError('description', '');
        formik.setFieldValue('description', e);
    }, []);
    const handleChangeNameText = React.useCallback((e: string) => {
        dispatch(setGaleriesFieldsError({ name: '' }));
        formik.setFieldError('name', '');
        formik.setFieldValue('name', e);
    }, []);
    const handlePressBack = React.useCallback(() => {
        if (navigation.canGoBack()) navigation.goBack();
        else navigation.navigate('Home');
    }, [navigation]);
    // TODO: need to trigger callback when postGalerie === success
    const successCallback = React.useCallback(
        () => navigation.navigate('Galerie'),
        []
    );

    return (
        <FormContainer>
            <Container>
                <CustomTextInput
                    error={nameError}
                    label="name"
                    loading={loading}
                    maxLength={FIELD_REQUIREMENT.GALERIE_NAME_MAX_LENGTH}
                    onBlur={formik.handleBlur('name')}
                    onChangeText={handleChangeNameText}
                    touched={formik.touched.name || false}
                    value={formik.values.name}
                />
                <CustomTextInput
                    error={descriptionError}
                    label="description"
                    loading={loading}
                    maxLength={FIELD_REQUIREMENT.GALERIE_DESCRIPTION_MAX_LENGTH}
                    multiline
                    onBlur={formik.handleBlur('description')}
                    onChangeText={handleChangeDescriptionText}
                    optional
                    touched={formik.touched.description || false}
                    value={formik.values.description}
                />
            </Container>
            <ButtonsContainer>
                <CustomButton
                    disable={disableButton}
                    loading={loading}
                    mb="smallest"
                    onPress={formik.handleSubmit}
                    title="create galerie"
                />
                <CustomButton
                    disable={loading}
                    onPress={handlePressBack}
                    title="cancel"
                    variant="stroke"
                />
            </ButtonsContainer>
        </FormContainer>
    );
};

export default CreateGalerieScreen;
