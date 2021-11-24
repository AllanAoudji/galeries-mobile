import { useFocusEffect } from '@react-navigation/native';
import { useFormik } from 'formik';
import * as React from 'react';
import {
    BackHandler,
    KeyboardAvoidingView,
    Platform,
    StyleSheet,
} from 'react-native';
import { useDispatch, useSelector } from 'react-redux';

import {
    CustomButton,
    CustomTextInput,
    FullScreenContainer,
} from '#components';
import { FIELD_REQUIREMENT, GLOBAL_STYLE } from '#helpers/constants';
import { createGaleriesSchema } from '#helpers/schemas';
import {
    postGalerie,
    selectGaleriesFieldsError,
    updateGaleriesFieldsError,
    selectGaleriesLoadingPost,
    resetGaleriesLoadingPost,
    resetGaleriesFieldsError,
} from '#store/galeries';

import { ButtonContainer, ScrollViewStyle } from './styles';

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
    const loading = useSelector(selectGaleriesLoadingPost);

    const formik = useFormik({
        onSubmit: (values) => {
            dispatch(postGalerie(values));
        },
        initialValues,
        validateOnBlur: true,
        validateOnChange: false,
        validationSchema: createGaleriesSchema,
    });

    const descriptionError = React.useMemo(
        () => formik.errors.description || galeriesFieldsError.description,
        [formik.errors.description, galeriesFieldsError]
    );
    const disableButton = React.useMemo(() => {
        const clientHasError =
            !!formik.errors.description || !!formik.errors.name;
        const serverHasError =
            !!galeriesFieldsError.description || !!galeriesFieldsError.name;
        return clientHasError || serverHasError;
    }, [formik.errors, galeriesFieldsError]);
    const nameError = React.useMemo(
        () => formik.errors.name || galeriesFieldsError.name,
        [formik.errors.name, galeriesFieldsError]
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
    const handlePressBack = React.useCallback(() => {
        if (loading.includes('LOADING')) return;
        if (navigation.canGoBack()) navigation.goBack();
        else navigation.navigate('Home');
    }, [loading, navigation]);

    useFocusEffect(
        React.useCallback(() => {
            if (loading === 'SUCCESS') {
                dispatch(resetGaleriesLoadingPost());
                navigation.navigate('Galerie');
            }
        }, [loading, navigation])
    );
    useFocusEffect(
        React.useCallback(
            () => () => {
                dispatch(resetGaleriesLoadingPost());
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
        <KeyboardAvoidingView
            behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
            keyboardVerticalOffset={GLOBAL_STYLE.HEADER_TAB_HEIGHT}
            style={styles.keyboardAvoidingViewStyle}
        >
            <FullScreenContainer>
                <ScrollViewStyle
                    keyboardShouldPersistTaps="handled"
                    overScrollMode="never"
                    showsVerticalScrollIndicator={false}
                >
                    <CustomTextInput
                        error={nameError}
                        label="name"
                        loading={loading.includes('LOADING')}
                        maxLength={FIELD_REQUIREMENT.GALERIE_NAME_MAX_LENGTH}
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
                        maxLength={
                            FIELD_REQUIREMENT.GALERIE_DESCRIPTION_MAX_LENGTH
                        }
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
                            title="create galerie"
                        />
                        <CustomButton
                            disable={loading.includes('LOADING')}
                            onPress={handlePressBack}
                            title="cancel"
                            variant="stroke"
                        />
                    </ButtonContainer>
                </ScrollViewStyle>
            </FullScreenContainer>
        </KeyboardAvoidingView>
    );
};

const styles = StyleSheet.create({
    keyboardAvoidingViewStyle: {
        flex: 1,
    },
});

export default CreateGalerieScreen;
