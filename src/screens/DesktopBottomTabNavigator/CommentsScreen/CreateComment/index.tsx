import { useFocusEffect } from '@react-navigation/native';
import { useFormik } from 'formik';
import * as React from 'react';
import {
    LayoutChangeEvent,
    NativeSyntheticEvent,
    TextInputContentSizeChangeEventData,
} from 'react-native';
import { useTheme } from 'styled-components/native';

import { Typography } from '#components';
import { FIELD_REQUIREMENT } from '#helpers/constants';
import { createCommentSchema } from '#helpers/schemas';
import { usePostComment } from '#hooks';

import { Container, PostButton, TextInputStyled } from './styles';

type Props = {
    frame: Store.Models.Frame;
    onLayout: (event: LayoutChangeEvent) => void;
    scrollToTop: () => void;
};

const TEXT_INPUT_DEFAULT_HEIGHT = 35;

const initialValues = {
    body: '',
};

const CreateComment = ({ frame, onLayout, scrollToTop }: Props) => {
    const theme = useTheme();

    const { loading, postComment } = usePostComment();

    const formik = useFormik({
        onSubmit: (values) => postComment(values, frame, successCallback),
        initialValues,
        validateOnBlur: false,
        validateOnChange: true,
        validationSchema: createCommentSchema,
    });

    const [textInputHeight, setTextInputHeight] = React.useState<number>(0);

    const disableButton = React.useMemo(() => {
        const clientHasError = formik.submitCount > 0 && !!formik.errors.body;
        return clientHasError;
    }, [formik.submitCount]);
    const height = React.useMemo(
        () => Math.max(TEXT_INPUT_DEFAULT_HEIGHT, textInputHeight),
        [textInputHeight]
    );

    const handleChangeText = React.useCallback((e: string) => {
        formik.setFieldError('body', '');
        formik.setFieldValue('body', e);
    }, []);
    const handleContentSizeChange = React.useCallback(
        ({
            nativeEvent,
        }: NativeSyntheticEvent<TextInputContentSizeChangeEventData>) =>
            setTextInputHeight(nativeEvent.contentSize.height),
        []
    );
    const handlePress = React.useCallback(() => {
        if (!loading && !disableButton && formik.values.body !== '') {
            formik.handleSubmit();
        }
    }, [disableButton, loading, formik.values.body]);
    const successCallback = React.useCallback(() => {
        scrollToTop();
        setTextInputHeight(0);
        formik.setValues(formik.initialValues);
    }, []);

    useFocusEffect(
        React.useCallback(() => {
            return () => {
                setTextInputHeight(0);
                formik.setFieldError('body', '');
                formik.setFieldValue('body', '');
            };
        }, [])
    );

    return (
        <Container onLayout={onLayout}>
            <TextInputStyled
                editable={!loading}
                height={height}
                loading={loading}
                maxLength={FIELD_REQUIREMENT.COMMENT_MAX_LENGTH}
                multiline
                onChangeText={handleChangeText}
                onContentSizeChange={handleContentSizeChange}
                placeholder="post a comment..."
                selectionColor={theme.colors['primary-dark']}
                value={formik.values.body}
            />
            <PostButton onPress={handlePress}>
                <Typography color="primary" fontSize={18}>
                    post
                </Typography>
            </PostButton>
        </Container>
    );
};

export default CreateComment;
