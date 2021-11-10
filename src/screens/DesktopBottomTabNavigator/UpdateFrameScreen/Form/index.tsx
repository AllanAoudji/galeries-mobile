import { useNavigation, useFocusEffect } from '@react-navigation/native';
import { useFormik } from 'formik';
import * as React from 'react';
import { useDispatch, useSelector } from 'react-redux';

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
    }, []);

    const descriptionError = React.useMemo(
        () => formik.errors.description || framesFieldsError.description,
        [formik.errors.description, framesFieldsError]
    );

    const disableButton = React.useMemo(() => {
        const clientHasError =
            formik.submitCount > 0 && !!formik.errors.description;
        const serverHasError = !!framesFieldsError.description;
        const noChangeCommited = formik.values.description === description;
        return clientHasError || serverHasError || noChangeCommited;
    }, [
        formik.submitCount,
        formik.errors,
        formik.values.description,
        description,
        framesFieldsError,
    ]);

    const handleChangeDescriptionText = React.useCallback((e: string) => {
        dispatch(updateFramesFieldsError({ descritpion: '' }));
        formik.setFieldError('description', '');
        formik.setFieldValue('description', e);
    }, []);
    const handlePressGoBack = React.useCallback(() => {
        if (!loading.includes('LOADING')) navigate();
    }, [loading, navigate]);

    useFocusEffect(
        React.useCallback(() => {
            if (loading === 'SUCCESS') navigate();
        }, [loading, navigate])
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
                        title="post frame"
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
