import { useNavigation } from '@react-navigation/native';
import { useFormik } from 'formik';
import * as React from 'react';
import { useDispatch, useSelector } from 'react-redux';

import { putFrameSchema } from '#helpers/schemas';
import {
    putFrame,
    selectFramesFieldsError,
    selectFramesLoadingPut,
    updateFramesFieldsError,
} from '#store/frames';

import { ButtonsContainer, Container } from './styles';
import { CustomButton, CustomTextInput } from '#components';
import { FIELD_REQUIREMENT } from '#helpers/constants';

type Props = {
    description: string;
    frameId: string;
};

const Form = ({ description, frameId }: Props) => {
    const navigation = useNavigation<Screen.DesktopBottomTab.UpdateFrameProp>();
    const dispatch = useDispatch();

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
    const handlePressReturn = React.useCallback(() => {
        if (!loading.includes('LOADING')) {
            if (navigation.canGoBack()) navigation.goBack();
            else navigation.navigate('Home');
        }
    }, [loading]);

    return (
        <>
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
                    onPress={handlePressReturn}
                    title="return"
                    variant="stroke"
                />
            </ButtonsContainer>
        </>
    );
};

export default React.memo(Form);
