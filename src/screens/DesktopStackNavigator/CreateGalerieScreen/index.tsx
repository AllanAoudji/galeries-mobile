import { useFormik } from 'formik';
import * as React from 'react';

import { useDispatch } from 'react-redux';
import { CustomButton, CustomTextInput, FormContainer } from '#components';
import { FIELD_REQUIREMENT } from '#helpers/constants';
import { createGaleriesSchema } from '#helpers/schemas';
import { usePostGalerie } from '#hooks';

import { ButtonsContainer, Container } from './styles';
import { setCurrentGalerieId } from '#store/actions';

type Props = {
    navigation: Screen.DesktopStack.CreateGalerieNavigationProp;
};

const initialValues = {
    description: '',
    name: '',
};

const CreateGalerieScreen = ({ navigation }: Props) => {
    const dispatch = useDispatch();
    const { loading, postGalerie, resetServerErrorField, serverErrors } =
        usePostGalerie();
    const formik = useFormik({
        onSubmit: async (values) => postGalerie(values, postGalerieCallBack),
        initialValues,
        validateOnBlur: true,
        validateOnChange: false,
        validationSchema: createGaleriesSchema,
    });

    const descriptionError = React.useMemo(
        () => formik.errors.description || serverErrors.description,
        [formik.errors.description, serverErrors.description]
    );
    const disableButton = React.useMemo(() => {
        const clientHasError =
            formik.submitCount > 0 &&
            (!!formik.errors.description || !!formik.errors.name);
        const serverHasError =
            !!serverErrors.description || !!serverErrors.name;
        return clientHasError || serverHasError;
    }, [formik.submitCount, formik.errors, serverErrors]);
    const nameError = React.useMemo(
        () => formik.errors.name || serverErrors.name,
        [formik.errors.name, serverErrors.name]
    );

    const postGalerieCallBack = React.useCallback(
        ({ id }: Store.Models.Galerie) => {
            dispatch(setCurrentGalerieId(id));
            navigation.navigate('Navigation', {
                screen: 'Main',
                params: { screen: 'Galerie' },
            });
        },
        []
    );
    const handleChangeDescriptionText = React.useCallback((e: string) => {
        resetServerErrorField('description');
        formik.setFieldError('description', '');
        formik.setFieldValue('description', e);
    }, []);
    const handleChangeNameText = React.useCallback((e: string) => {
        resetServerErrorField('name');
        formik.setFieldError('name', '');
        formik.setFieldValue('name', e);
    }, []);
    const handlePressBack = React.useCallback(() => {
        if (navigation.canGoBack()) navigation.goBack();
        else
            navigation.navigate('Navigation', {
                screen: 'Main',
                params: { screen: 'Home' },
            });
    }, [navigation]);

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
