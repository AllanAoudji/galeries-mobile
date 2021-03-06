import { useNavigation, useFocusEffect } from '@react-navigation/native';
import { useFormik } from 'formik';
import * as React from 'react';
import { useDispatch, useSelector } from 'react-redux';

import { BackHandler } from 'react-native';
import { CustomButton, CustomTextInput } from '#components';
import { FIELD_REQUIREMENT } from '#helpers/constants';
import { putFrameSchema } from '#helpers/schemas';
import {
    putFrame,
    resetFramesLoadingPut,
    selectFramesFieldsError,
    selectFramesLoadingPut,
    updateFramesFieldsError,
} from '#store/frames';

import { ButtonContainer, Container, ScrollViewStyle } from './styles';

type Props = {
    description: string;
    frameId: string;
};

const Form = ({ description, frameId }: Props) => {
    const dispatch = useDispatch();
    const navigation = useNavigation<Screen.DesktopBottomTab.UpdateFrameProp>();

    const framesFieldsError = useSelector(selectFramesFieldsError);
    const loading = useSelector(selectFramesLoadingPut);

    const formik = useFormik({
        onSubmit: (values) => {
            dispatch(putFrame(frameId, values));
        },
        initialValues: { description },
        validateOnBlur: false,
        validateOnChange: true,
        validationSchema: putFrameSchema,
        enableReinitialize: true,
    });

    const navigate = React.useCallback(() => {
        dispatch(resetFramesLoadingPut());
        if (navigation.canGoBack()) navigation.goBack();
        else navigation.navigate('Home');
    }, [navigation]);

    const descriptionError = React.useMemo(
        () => formik.errors.description || framesFieldsError.description,
        [formik.errors, framesFieldsError]
    );
    const disableButton = React.useMemo(() => {
        const clientHasError = !!formik.errors.description;
        const serverHasError = !!framesFieldsError.description;
        const noChangeCommited = formik.values.description === description;
        return clientHasError || serverHasError || noChangeCommited;
    }, [
        formik.errors,
        formik.values.description,
        description,
        framesFieldsError,
    ]);

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
                    error={descriptionError}
                    label="description"
                    loading={loading.includes('LOADING')}
                    maxLength={FIELD_REQUIREMENT.FRAME_DESCRIPTION_MAX_LENGTH}
                    multiline
                    mt="normal"
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
                        title="update frame"
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

export default React.memo(Form);
