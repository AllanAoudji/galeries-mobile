import { NavigationProp } from '@react-navigation/native';
import { useFormik } from 'formik';
import * as React from 'react';

import { CustomButton, CustomTextInput, FormContainer } from '#components';
import { CreateFrameContext } from '#contexts/CreateFrameContext';
import { FIELD_REQUIREMENT } from '#helpers/constants';
import { frameDescriptionSchema } from '#helpers/schemas';
import { usePostFrame } from '#hooks';

import { ButtonsContainer, Container } from './styles';

type Props = {
    navigation: Screen.CreateFrameStack.AddDescriptionNavigationProp;
};

const initialValues = {
    description: '',
};

const AddDescriptionScreen = ({ navigation }: Props) => {
    const { loading, postFrame, resetServerErrorField, serverErrors } =
        usePostFrame();

    const { picturesUri } = React.useContext(CreateFrameContext);

    const formik = useFormik({
        onSubmit: (values) => postFrame(values, picturesUri, successCallback),
        initialValues,
        validateOnBlur: true,
        validateOnChange: false,
        validationSchema: frameDescriptionSchema,
    });

    const descriptionError = React.useMemo(
        () => formik.errors.description || serverErrors.description,
        [formik.errors.description, serverErrors.description]
    );

    const disableButton = React.useMemo(() => {
        const clientHasError =
            formik.submitCount > 0 && !!formik.errors.description;
        const serverHasError = !!serverErrors.description;
        return clientHasError || serverHasError;
    }, [formik.submitCount, formik.errors, serverErrors]);

    const handleChangeDescriptionText = React.useCallback((e: string) => {
        resetServerErrorField('description');
        formik.setFieldError('description', '');
        formik.setFieldValue('description', e);
    }, []);
    const handleReturn = React.useCallback(() => {
        if (!loading) navigation.navigate('AddPictures');
    }, [navigation]);
    const successCallback = React.useCallback(() => {
        navigation
            .getParent<NavigationProp<Screen.DesktopBottomTab.ParamList>>()
            .navigate('Galerie');
    }, []);

    return (
        <FormContainer>
            <Container>
                <CustomTextInput
                    error={descriptionError}
                    label="description"
                    loading={loading}
                    maxLength={FIELD_REQUIREMENT.FRAME_DESCRIPTION_MAX_LENGTH}
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
                    title="post frame"
                />
                <CustomButton
                    disable={loading}
                    onPress={handleReturn}
                    title="return"
                    variant="stroke"
                />
            </ButtonsContainer>
        </FormContainer>
    );
};

export default AddDescriptionScreen;
