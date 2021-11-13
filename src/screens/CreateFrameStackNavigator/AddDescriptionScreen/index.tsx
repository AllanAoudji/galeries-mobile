import { NavigationProp, useFocusEffect } from '@react-navigation/native';
import { useFormik } from 'formik';
import * as React from 'react';
import {
    BackHandler,
    KeyboardAvoidingView,
    Platform,
    StyleSheet,
} from 'react-native';
import { useDispatch, useSelector } from 'react-redux';

import { CustomButton, CustomTextInput } from '#components';
import { CreateFrameContext } from '#contexts/CreateFrameContext';
import CheckImageExtension from '#helpers/CheckImageExtension';
import { FIELD_REQUIREMENT, GLOBAL_STYLE } from '#helpers/constants';
import { frameDescriptionSchema } from '#helpers/schemas';
import {
    postFrame,
    resetFramesFieldsError,
    resetFramesLoadingPost,
    selectFramesFieldsError,
    selectFramesLoadingPost,
    updateFramesFieldsError,
} from '#store/frames';
import { selectCurrentGalerie } from '#store/galeries';

import { ButtonContainer, Container, ScrollViewStyle } from './styles';

type Props = {
    navigation: Screen.CreateFrameStack.AddDescriptionNavigationProp;
};

const initialValues = {
    description: '',
};

const AddDescriptionScreen = ({ navigation }: Props) => {
    const dispatch = useDispatch();

    const { picturesUri, resetPictures } = React.useContext(CreateFrameContext);

    const currentGalerie = useSelector(selectCurrentGalerie);
    const framesFieldsError = useSelector(selectFramesFieldsError);
    const loading = useSelector(selectFramesLoadingPost);

    const formik = useFormik({
        onSubmit: (values) => {
            if (currentGalerie) {
                const formData = new FormData();
                picturesUri.forEach((pictureUri) => {
                    const type = CheckImageExtension(pictureUri);
                    if (type)
                        formData.append('image', {
                            // @ts-ignore
                            uri: pictureUri,
                            type,
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
        const clientHasError = !!formik.errors.description;
        const serverHasError = !!framesFieldsError.description;
        return clientHasError || serverHasError;
    }, [formik.errors, framesFieldsError]);

    const handleChangeDescriptionText = React.useCallback(
        (e: string) => {
            if (framesFieldsError.description)
                dispatch(updateFramesFieldsError({ descritpion: '' }));
            if (formik.errors.description)
                formik.setFieldError('description', '');
            formik.setFieldValue('description', e);
        },
        [formik.errors, framesFieldsError]
    );
    const handleReturn = React.useCallback(() => {
        if (!loading.includes('LOADING')) navigation.navigate('AddPictures');
    }, [loading, navigation]);

    useFocusEffect(
        React.useCallback(() => {
            if (loading === 'SUCCESS') {
                resetPictures();
                navigation
                    .getParent<
                        NavigationProp<Screen.DesktopBottomTab.ParamList>
                    >()
                    .reset({
                        index: 0,
                        routes: [{ name: 'Galerie' }],
                    });
            }
        }, [loading, navigation, resetPictures])
    );
    useFocusEffect(
        React.useCallback(
            () => () => {
                dispatch(resetFramesLoadingPost());
                dispatch(resetFramesFieldsError());
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
        <KeyboardAvoidingView
            behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
            keyboardVerticalOffset={GLOBAL_STYLE.HEADER_TAB_HEIGHT}
            style={styles.keyboardAvoidingViewStyle}
        >
            <Container>
                <ScrollViewStyle
                    keyboardShouldPersistTaps="handled"
                    overScrollMode="never"
                    showsVerticalScrollIndicator={false}
                >
                    <CustomTextInput
                        error={descriptionError}
                        label="description"
                        loading={loading.includes('LOADING')}
                        maxLength={
                            FIELD_REQUIREMENT.FRAME_DESCRIPTION_MAX_LENGTH
                        }
                        mt="normal"
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
                            onPress={formik.handleSubmit}
                            loading={loading.includes('LOADING')}
                            mb="smallest"
                            mt="normal"
                            title="post frame"
                        />
                        <CustomButton
                            disable={loading.includes('LOADING')}
                            title="cancel"
                            onPress={handleReturn}
                            variant="stroke"
                        />
                    </ButtonContainer>
                </ScrollViewStyle>
            </Container>
        </KeyboardAvoidingView>
    );
};

const styles = StyleSheet.create({
    keyboardAvoidingViewStyle: {
        flex: 1,
    },
});

export default AddDescriptionScreen;
