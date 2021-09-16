import { useFocusEffect } from '@react-navigation/native';
import { AxiosError } from 'axios';
import { useFormik } from 'formik';
import * as React from 'react';
import {
    LayoutChangeEvent,
    NativeSyntheticEvent,
    TextInputContentSizeChangeEventData,
} from 'react-native';
import { useDispatch } from 'react-redux';
import { useTheme } from 'styled-components/native';

import { Typography } from '#components';
import {
    END_POINT,
    ERROR_MESSAGE,
    FIELD_REQUIREMENT,
} from '#helpers/constants';
import { createCommentSchema } from '#helpers/schemas';
import request from '#helpers/request';
import { setComments, setFrames, setNotification } from '#store/actions';

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
    const dispatch = useDispatch();
    const theme = useTheme();

    const formik = useFormik({
        onSubmit: async (values) => {
            if (!loading) {
                setLoading(true);
                request({
                    body: values,
                    method: 'POST',
                    url: END_POINT.COMMENTS(frame.id),
                })
                    .then((res) => {
                        if (
                            res.data.data.comment &&
                            typeof res.data.data.comment === 'object'
                        ) {
                            const { id } = res.data.data.comment;
                            const numOfComments =
                                res.data.data.numOfComments &&
                                typeof res.data.data.numOfComments === 'number'
                                    ? res.data.data.numOfComments
                                    : frame.numOfComments;

                            scrollToTop();
                            dispatch(
                                setComments({
                                    data: {
                                        byId: {
                                            [id]: {
                                                ...res.data.data.comment,
                                                comments: {
                                                    allIds: [],
                                                    status: 'SUCCESS',
                                                    end: true,
                                                },
                                            },
                                        },
                                    },
                                })
                            );
                            dispatch(
                                setFrames({
                                    data: {
                                        byId: {
                                            [frame.id]: {
                                                ...frame,
                                                comments: {
                                                    ...frame.comments,
                                                    allIds: [
                                                        id,
                                                        ...frame.comments
                                                            .allIds,
                                                    ],
                                                },
                                                numOfComments,
                                            },
                                        },
                                    },
                                })
                            );
                        } else {
                            dispatch(
                                setNotification({
                                    status: 'error',
                                    text: ERROR_MESSAGE.DEFAULT_ERROR_MESSAGE,
                                })
                            );
                        }
                    })
                    .catch((err: AxiosError) => {
                        if (err.response && err.response.data.errors) {
                            if (typeof err.response.data.errors === 'object') {
                                if (err.response.data.errors.body) {
                                    dispatch(
                                        setNotification({
                                            status: 'error',
                                            text: err.response.data.errors.body,
                                        })
                                    );
                                } else {
                                    setNotification({
                                        status: 'error',
                                        text: ERROR_MESSAGE.DEFAULT_ERROR_MESSAGE,
                                    });
                                }
                            } else if (
                                typeof err.response.data.errors === 'string'
                            ) {
                                dispatch(
                                    setNotification({
                                        status: 'error',
                                        text: err.response.data.errors,
                                    })
                                );
                            } else {
                                dispatch(
                                    setNotification({
                                        status: 'error',
                                        text: ERROR_MESSAGE.DEFAULT_ERROR_MESSAGE,
                                    })
                                );
                            }
                        } else {
                            dispatch(
                                setNotification({
                                    status: 'error',
                                    text: ERROR_MESSAGE.DEFAULT_ERROR_MESSAGE,
                                })
                            );
                        }
                    })
                    .finally(() => {
                        setLoading(false);
                        setTextInputHeight(0);
                        formik.setValues(formik.initialValues);
                    });
            }
        },
        initialValues,
        validateOnBlur: false,
        validateOnChange: true,
        validationSchema: createCommentSchema,
    });

    const [loading, setLoading] = React.useState<boolean>(false);
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

    useFocusEffect(
        React.useCallback(() => {
            return () => {
                setLoading(false);
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
