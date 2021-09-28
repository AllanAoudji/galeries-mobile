import { NavigationProp } from '@react-navigation/native';
import { useFormik } from 'formik';
import * as React from 'react';

import { useDispatch, useSelector } from 'react-redux';
import { CustomButton, CustomTextInput, FormContainer } from '#components';
import { CreateFrameContext } from '#contexts/CreateFrameContext';
import { FIELD_REQUIREMENT } from '#helpers/constants';
import { frameDescriptionSchema } from '#helpers/schemas';

import { ButtonsContainer, Container } from './styles';
import {
    postFrame,
    selectFramesFieldsError,
    selectFramesLoadingPost,
    updateFramesFieldsError,
} from '#store/frames';
import { selectCurrentGalerie } from '#store/galeries';

type Props = {
    navigation: Screen.CreateFrameStack.AddDescriptionNavigationProp;
};

const initialValues = {
    description: '',
};

const AddDescriptionScreen = ({ navigation }: Props) => {
    const dispatch = useDispatch();

    const currentGalerie = useSelector(selectCurrentGalerie);
    const loading = useSelector(selectFramesLoadingPost);

    const framesFieldsError = useSelector(selectFramesFieldsError);
    const { picturesUri, resetPictures } = React.useContext(CreateFrameContext);

    const formik = useFormik({
        onSubmit: (values) => {
            if (currentGalerie) {
                const formData = new FormData();
                picturesUri.forEach((pictureUri) => {
                    formData.append('image', {
                        // @ts-ignore
                        uri: pictureUri,
                        // TODO: Should transform pictureUri to 'image/...' and check if all files are images.
                        type: 'image/jpg',
                        name: pictureUri,
                    });
                });
                if (values.description !== '')
                    formData.append('description', values.description);
                dispatch(postFrame(currentGalerie.id, formData));
            }
        },
        initialValues,
        validateOnBlur: true,
        validateOnChange: false,
        validationSchema: frameDescriptionSchema,
    });

    const descriptionError = React.useMemo(
        () => formik.errors.description || framesFieldsError.description,
        [formik.errors.description, framesFieldsError]
    );

    const disableButton = React.useMemo(() => {
        const clientHasError =
            formik.submitCount > 0 && !!formik.errors.description;
        const serverHasError = !!framesFieldsError.description;
        return clientHasError || serverHasError;
    }, [formik.submitCount, formik.errors, framesFieldsError]);

    const handleChangeDescriptionText = React.useCallback((e: string) => {
        dispatch(updateFramesFieldsError({ descritpion: '' }));
        formik.setFieldError('description', '');
        formik.setFieldValue('description', e);
    }, []);
    const handleReturn = React.useCallback(() => {
        if (!loading) navigation.navigate('AddPictures');
    }, [navigation]);
    // TODO: how to redirect after successfully post a frame ?
    // and not when an error appear.
    const successCallback = React.useCallback(() => {
        resetPictures();
        navigation
            .getParent<NavigationProp<Screen.DesktopBottomTab.ParamList>>()
            .navigate('Galerie');
    }, []);

    React.useEffect(() => {
        if (loading === 'SUCCESS') successCallback();
    }, [loading]);

    return (
        <FormContainer>
            <Container>
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
            </Container>
            <ButtonsContainer>
                <CustomButton
                    disable={disableButton}
                    loading={loading.includes('LOADING')}
                    mb="smallest"
                    onPress={formik.handleSubmit}
                    title="post frame"
                />
                <CustomButton
                    disable={loading.includes('LOADING')}
                    onPress={handleReturn}
                    title="return"
                    variant="stroke"
                />
            </ButtonsContainer>
        </FormContainer>
    );
};

export default AddDescriptionScreen;
