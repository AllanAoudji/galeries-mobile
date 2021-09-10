import { AxiosError } from 'axios';
import { useFormik } from 'formik';
import * as React from 'react';
import { useDispatch } from 'react-redux';

import {
    CustomButton,
    CustomTextInput,
    FormScreen,
    TextInputsContainer,
} from '#components';
import {
    END_POINT,
    ERROR_MESSAGE,
    FIELD_REQUIREMENT,
} from '#helpers/constants';
import request from '#helpers/request';
import normalizeData from '#helpers/normalizeData';
import { createGaleriesSchema } from '#helpers/schemas';
import {
    resetGaleries,
    setCurrentGalerieId,
    setGaleries,
    setNotification,
} from '#store/actions';

type Props = {
    navigation: Screen.DesktopStack.CreateGalerieNavigationProp;
};

const initialValues = {
    description: '',
    name: '',
};

const CreateGalerieScreen = ({ navigation }: Props) => {
    const dispatch = useDispatch();
    const formik = useFormik({
        onSubmit: async (values) => {
            setLoading(true);
            request({
                body: values,
                method: 'POST',
                url: END_POINT.GALERIES,
            })
                .then((res) => {
                    if (
                        res.data.data &&
                        res.data.data.galerie &&
                        typeof res.data.data.galerie === 'object'
                    ) {
                        const normalizedGalerie = {
                            ...res.data.data.galerie,
                            frames: {
                                allIds: [],
                                end: true,
                                status: 'SUCCESS',
                            },
                            users: {
                                allIds: [],
                                end: true,
                                status: 'SUCCESS',
                            },
                        };
                        const normalizedData = normalizeData(normalizedGalerie);
                        dispatch(
                            setGaleries({
                                data: normalizedData,
                                meta: {},
                            })
                        );
                        dispatch(resetGaleries());
                        setGalerieId(res.data.data.galerie.id);
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
                            if (
                                err.response.data.errors.name ||
                                err.response.data.errors.description
                            ) {
                                setServerErrors({
                                    description:
                                        err.response.data.errors.description ||
                                        '',
                                    name: err.response.data.errors.name || '',
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
                            typeof err.response.data.errors === 'string'
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
                .finally(() => {
                    setLoading(false);
                });
        },
        initialValues,
        validateOnBlur: true,
        validateOnChange: false,
        validationSchema: createGaleriesSchema,
    });

    const [galerieId, setGalerieId] = React.useState<string | null>(null);
    const [loading, setLoading] = React.useState<boolean>(false);
    const [serverErrors, setServerErrors] = React.useState<
        typeof initialValues
    >({
        description: '',
        name: '',
    });

    const disableButton = React.useMemo(() => {
        const clientHasError =
            formik.submitCount > 0 &&
            (!!formik.errors.description || !!formik.errors.name);
        const serverHasError =
            !!serverErrors.description || !!serverErrors.name;
        return clientHasError || serverHasError;
    }, [formik.submitCount, formik.errors, serverErrors]);

    const handlePressBack = React.useCallback(() => {
        if (navigation.canGoBack()) navigation.goBack();
        else
            navigation.navigate('Navigation', {
                screen: 'Main',
                params: { screen: 'Home' },
            });
    }, [navigation]);

    React.useEffect(() => {
        if (galerieId) {
            dispatch(setCurrentGalerieId(galerieId));
            navigation.navigate('Navigation', {
                screen: 'Main',
                params: { screen: 'Galerie' },
            });
        }
    }, [galerieId, navigation]);

    return (
        <FormScreen
            handleOnPressReturn={handlePressBack}
            renderTop={
                <TextInputsContainer>
                    <CustomTextInput
                        error={formik.errors.name || serverErrors.name}
                        label="name"
                        loading={loading}
                        maxLength={FIELD_REQUIREMENT.GALERIE_NAME_MAX_LENGTH}
                        onBlur={formik.handleBlur('name')}
                        onChangeText={(e: string) => {
                            setServerErrors((prevState) => ({
                                ...prevState,
                                name: '',
                            }));
                            formik.setFieldError('name', '');
                            formik.setFieldValue('name', e);
                        }}
                        touched={formik.touched.name || false}
                        value={formik.values.name}
                    />
                    <CustomTextInput
                        error={
                            formik.errors.description ||
                            serverErrors.description
                        }
                        label="description"
                        loading={loading}
                        maxLength={
                            FIELD_REQUIREMENT.GALERIE_DESCRIPTION_MAX_LENGTH
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
            renderBottom={
                <>
                    <CustomButton
                        disable={disableButton}
                        loading={loading}
                        mb="smallest"
                        onPress={formik.handleSubmit}
                        title="create galerie"
                    />
                    <CustomButton
                        disable={loading}
                        onPress={handlePressBack}
                        title="cancel"
                        variant="stroke"
                    />
                </>
            }
            title="create galerie"
        />
    );
};

export default CreateGalerieScreen;
