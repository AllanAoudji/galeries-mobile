import { AxiosError } from 'axios';
import { useNavigation } from '@react-navigation/native';
import { useFormik } from 'formik';
import * as React from 'react';
import { BackHandler, View } from 'react-native';
import {
    interpolate,
    runOnJS,
    useAnimatedStyle,
    useSharedValue,
    withTiming,
} from 'react-native-reanimated';
import { useDispatch } from 'react-redux';

import FormScreen from '#components/FormScreen';
import CustomTextInput from '#components/CustomTextInput';
import CustomButton from '#components/CustomButton';
import {
    ANIMATIONS,
    END_POINT,
    ERROR_MESSAGE,
    FIELD_REQUIREMENT,
} from '#helpers/constants';
import request from '#helpers/request';
import { createGaleriesSchema } from '#helpers/schemas';
import {
    GALERIES,
    normalizeData,
    resetGaleries,
    setNotification,
} from '#store/actions';

import { Container, TextInputsContainer } from './styles';

type Props = {
    open: boolean;
    handleClose: () => void;
};

const initialValues = {
    description: '',
    name: '',
};

const CreateGalerieModal = ({ handleClose, open }: Props) => {
    const dispatch = useDispatch();
    const navigation =
        useNavigation<Screen.DesktopBottomTab.GaleriesNavigationProp>();
    const formik = useFormik({
        onSubmit: async (values) => {
            setLoading(true);
            request({
                body: values,
                method: 'POST',
                url: END_POINT.GALERIES,
            })
                .then((res) => {
                    if (res.data.data && res.data.data.galerie) {
                        dispatch(
                            normalizeData({
                                data: {
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
                                },
                                meta: {
                                    entity: GALERIES,
                                },
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

    const [display, setDisplay] = React.useState<boolean>(false);
    const [galerieId, setGalerieId] = React.useState<string | null>(null);
    const [loading, setLoading] = React.useState<boolean>(false);
    const [serverErrors, setServerErrors] = React.useState<
        typeof initialValues
    >({
        description: '',
        name: '',
    });

    const opacity = useSharedValue(0);
    const style = useAnimatedStyle(() => {
        const scale = interpolate(opacity.value, [0, 1], [1.1, 1]);
        return {
            opacity: opacity.value,
            transform: [{ scale }],
        };
    }, []);

    const disableButton = React.useMemo(() => {
        const clientHasError =
            formik.submitCount > 0 &&
            (!!formik.errors.description || !!formik.errors.name);
        const serverHasError =
            !!serverErrors.description || !!serverErrors.name;
        return clientHasError || serverHasError;
    }, [formik.submitCount, formik.errors, serverErrors]);

    React.useEffect(() => {
        let BackHandlerListerner: any;
        if (open) {
            setDisplay(true);
            BackHandlerListerner = BackHandler.addEventListener(
                'hardwareBackPress',
                () => {
                    if (open) {
                        handleClose();
                        return true;
                    }
                    return false;
                }
            );
        } else {
            opacity.value = withTiming(
                0,
                ANIMATIONS.TIMING_CONFIG(),
                (isFinished) => {
                    if (isFinished) runOnJS(setDisplay)(false);
                }
            );
            if (BackHandlerListerner) {
                BackHandlerListerner.remove();
            }
        }
        return () => {
            if (BackHandlerListerner) {
                BackHandlerListerner.remove();
            }
        };
    }, [open]);
    React.useEffect(() => {
        if (display) opacity.value = withTiming(1, ANIMATIONS.TIMING_CONFIG());
    }, [display]);
    React.useEffect(() => {
        if (galerieId) {
            handleClose();
            navigation.navigate('Galerie', { id: galerieId });
        }
    }, [galerieId, navigation]);

    if (!display) return null;

    return (
        <Container style={style}>
            <FormScreen
                renderTop={
                    <View>
                        <TextInputsContainer>
                            <CustomTextInput
                                error={formik.errors.name || serverErrors.name}
                                label="name"
                                loading={loading}
                                maxLength={
                                    FIELD_REQUIREMENT.GALERIE_NAME_MAX_LENGTH
                                }
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
                    </View>
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
                            onPress={handleClose}
                            title="cancel"
                            variant="stroke"
                        />
                    </>
                }
                title="create galerie"
                handleOnPressReturn={handleClose}
            />
        </Container>
    );
};

export default CreateGalerieModal;
