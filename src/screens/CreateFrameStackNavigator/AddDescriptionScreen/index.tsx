import { useFormik } from 'formik';
import * as React from 'react';
import { useDispatch, useSelector } from 'react-redux';

import { AxiosError } from 'axios';
import {
    CustomButton,
    CustomTextInput,
    FormScreen,
    TextInputsContainer,
} from '#components';
import { CreateFrameContext } from '#contexts/CreateFrameContext';
import {
    END_POINT,
    ERROR_MESSAGE,
    FIELD_REQUIREMENT,
} from '#helpers/constants';
import request from '#helpers/request';
import { frameDescriptionSchema } from '#helpers/schemas';
import {
    setFrames,
    setGaleriePictures,
    setGaleries,
    setNotification,
} from '#store/actions';
import { currentGalerieSelector } from '#store/selectors';
import normalizeFrame from '#helpers/normalizeFrame';
import normalizeData from '#helpers/normalizeData';

type Props = {
    navigation: Screen.CreateFrameStack.AddDescriptionNavigationProp;
};

const initialValues = {
    description: '',
};

const AddDescriptionScreen = ({ navigation }: Props) => {
    const currentGalerie = useSelector(currentGalerieSelector);
    const dispatch = useDispatch();
    const { picturesUri } = React.useContext(CreateFrameContext);
    const formik = useFormik({
        onSubmit: ({ description }) => {
            // Check if loading
            if (currentGalerie && !loading && picturesUri.length) {
                setLoading(true);
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
                if (description !== '') {
                    formData.append('description', description);
                }
                request({
                    body: formData,
                    method: 'POST',
                    url: END_POINT.GALERIE_FRAMES(currentGalerie.id),
                    contentType: 'multipart/form-data',
                })
                    .then((res) => {
                        if (
                            res.data.data &&
                            res.data.data.frame &&
                            typeof res.data.data.frame === 'object'
                        ) {
                            const { galeriePicturesById, normalizedFrames } =
                                normalizeFrame(res.data.data.frame);
                            dispatch(
                                setGaleriePictures({
                                    byId: galeriePicturesById,
                                })
                            );
                            const { allIds, byId } =
                                normalizeData(normalizedFrames);
                            dispatch(setFrames({ data: { allIds, byId } }));
                            dispatch(
                                setGaleries({
                                    data: {
                                        byId: {
                                            [currentGalerie.id]: {
                                                ...currentGalerie,
                                                frames: {
                                                    ...currentGalerie.frames,
                                                    allIds: [
                                                        ...allIds,
                                                        ...currentGalerie.frames
                                                            .allIds,
                                                    ],
                                                },
                                            },
                                        },
                                    },
                                })
                            );
                            if (navigation.getParent() !== undefined) {
                                // @ts-ignore
                                navigation.getParent().navigate('Navigation', {
                                    screen: 'Main',
                                    params: { screen: 'Galerie' },
                                });
                            }
                        }
                    })
                    .catch((err: AxiosError) => {
                        if (err.response && err.response.data.errors) {
                            if (typeof err.response.data.errors === 'object') {
                                if (err.response.data.errors.description) {
                                    setServerErrors({
                                        description:
                                            err.response.data.errors
                                                .description,
                                    });
                                } else {
                                    dispatch(
                                        setNotification({
                                            text: ERROR_MESSAGE.DEFAULT_ERROR_MESSAGE,
                                            status: 'error',
                                        })
                                    );
                                }
                            } else if (
                                typeof err.response.data.console.errors ===
                                'string'
                            ) {
                                dispatch(
                                    setNotification({
                                        text: err.response.data.errors,
                                        status: 'error',
                                    })
                                );
                            } else {
                                dispatch(
                                    setNotification({
                                        text: ERROR_MESSAGE.DEFAULT_ERROR_MESSAGE,
                                        status: 'error',
                                    })
                                );
                            }
                        } else {
                            dispatch(
                                setNotification({
                                    text: ERROR_MESSAGE.DEFAULT_ERROR_MESSAGE,
                                    status: 'error',
                                })
                            );
                        }
                    })
                    .finally(() => setLoading(false));
            }
        },
        initialValues,
        validateOnBlur: true,
        validateOnChange: false,
        validationSchema: frameDescriptionSchema,
    });

    const [loading, setLoading] = React.useState<boolean>(false);
    const [serverErrors, setServerErrors] = React.useState<
        typeof initialValues
    >({
        description: '',
    });

    const handleReturn = React.useCallback(() => {
        if (!loading) navigation.navigate('AddPictures');
    }, [navigation]);

    const disableButton = React.useMemo(() => {
        const clientHasError =
            formik.submitCount > 0 && !!formik.errors.description;
        const serverHasError = !!serverErrors.description;
        return clientHasError || serverHasError;
    }, [formik.submitCount, formik.errors, serverErrors]);

    return (
        <FormScreen
            handleOnPressReturn={handleReturn}
            renderBottom={
                <>
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
                </>
            }
            renderTop={
                <TextInputsContainer>
                    <CustomTextInput
                        error={
                            formik.errors.description ||
                            serverErrors.description
                        }
                        label="description"
                        loading={loading}
                        maxLength={
                            FIELD_REQUIREMENT.FRAME_DESCRIPTION_MAX_LENGTH
                        }
                        multiline
                        onBlur={formik.handleBlur('description')}
                        onChangeText={(e: string) => {
                            setServerErrors((prevState) => ({
                                ...prevState,
                                description: '',
                            }));
                            formik.setFieldError('description', '');
                            formik.setFieldValue('description', e);
                        }}
                        optional
                        touched={formik.touched.description || false}
                        value={formik.values.description}
                    />
                </TextInputsContainer>
            }
            title="add a description (optinal)"
        />
    );
};

export default AddDescriptionScreen;
