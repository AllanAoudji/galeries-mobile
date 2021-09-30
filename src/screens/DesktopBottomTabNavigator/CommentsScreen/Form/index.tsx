import { useFocusEffect } from '@react-navigation/native';
import { useFormik } from 'formik';
import * as React from 'react';
import {
    LayoutChangeEvent,
    NativeSyntheticEvent,
    TextInputContentSizeChangeEventData,
} from 'react-native';
import { useDispatch } from 'react-redux';
import { useTheme } from 'styled-components';

import { Typography } from '#components';
import { FIELD_REQUIREMENT } from '#helpers/constants';
import { createCommentSchema } from '#helpers/schemas';
import { postComment } from '#store/comments';

import CurrentComment from './CurrentComment';

import {
    Container,
    FormContainer,
    PostButton,
    TextInputStyled,
} from './styles';

type Props = {
    frameId?: string;
    loading: Store.Status;
    onLayout: (event: LayoutChangeEvent) => void;
    onSuccess: () => void;
};

const TEXT_INPUT_DEFAULT_HEIGHT = 35;
const initialValues = {
    body: '',
};

const Form = ({ frameId, loading, onLayout, onSuccess }: Props) => {
    const dispatch = useDispatch();
    const theme = useTheme();

    const formik = useFormik({
        onSubmit: (values) => {
            if (frameId) dispatch(postComment(values, frameId));
        },
        initialValues,
        validateOnBlur: false,
        validateOnChange: true,
        validationSchema: createCommentSchema,
    });

    const [textInputHeight, setTextInputHeight] = React.useState<number>(0);

    const disableButton = React.useMemo(() => {
        const clientHasError = !!formik.errors.body && formik.submitCount > 0;
        return clientHasError;
    }, [formik.errors, formik.submitCount]);
    const height = React.useMemo(
        () => Math.max(TEXT_INPUT_DEFAULT_HEIGHT, textInputHeight),
        [textInputHeight]
    );

    const handleChangeBodyText = React.useCallback((e: string) => {
        formik.setFieldError('body', '');
        formik.setFieldValue('body', e);
    }, []);
    const handleContentSizeChange = React.useCallback(
        ({
            nativeEvent,
        }: NativeSyntheticEvent<TextInputContentSizeChangeEventData>) => {
            setTextInputHeight(nativeEvent.contentSize.height);
        },
        []
    );
    const handlePress = React.useCallback(() => {
        if (
            loading &&
            !loading.includes('LOADING') &&
            !disableButton &&
            formik.values.body !== ''
        ) {
            formik.handleSubmit();
        }
    }, [disableButton, loading, formik.values.body]);
    const successCallback = React.useCallback(() => {
        onSuccess();
        setTextInputHeight(0);
        formik.setValues(formik.initialValues);
    }, [onSuccess]);

    React.useEffect(() => {
        if (loading === 'SUCCESS') successCallback();
    }, [loading]);

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
            <CurrentComment />
            <FormContainer>
                <TextInputStyled
                    editable={!loading.includes('LOADING')}
                    height={height}
                    loading={loading.includes('LOADING')}
                    maxLength={FIELD_REQUIREMENT.COMMENT_MAX_LENGTH}
                    multiline
                    onChangeText={handleChangeBodyText}
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
            </FormContainer>
        </Container>
    );
};

export default Form;
