import * as React from 'react';
import { View } from 'react-native';
import { useFormik } from 'formik';
import { useDispatch } from 'react-redux';

import { AxiosError } from 'axios';
import {
    CustomButton,
    CustomTextInput,
    FormScreen,
    PageTransition,
} from '#components';
import { END_POINT, ERROR_MESSAGE } from '#helpers/constants';
import request from '#helpers/request';
import { createGaleriesSchema } from '#helpers/schemas';
import { GALERIES, normalizeData, setNotification } from '#store/actions';

import { TextInputsContainer } from './styled';

type Props = {
    navigation: Screen.DesktopBottomTab.CreateGalerieNavigationProp;
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
                    dispatch(normalizeData(res.data.data.galerie, GALERIES));
                    setGalerieId(res.data.data.galerie.id);
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

    const [loading, setLoading] = React.useState<boolean>(false);
    const [serverErrors, setServerErrors] = React.useState<
        typeof initialValues
    >({
        description: '',
        name: '',
    });
    const [galerieId, setGalerieId] = React.useState<string | null>(null);

    React.useEffect(() => {
        if (galerieId) {
            navigation.navigate('Galerie', { id: galerieId });
        }
    }, [galerieId]);

    const disableButton = React.useMemo(() => {
        const clientHasError =
            formik.submitCount > 0 &&
            (!!formik.errors.description || !!formik.errors.name);
        const serverHasError =
            !!serverErrors.description || !!serverErrors.name;
        return clientHasError || serverHasError;
    }, [formik.submitCount, formik.errors, serverErrors]);

    const handlePressReturn = React.useCallback(() => {
        if (!loading) {
            if (navigation.canGoBack()) navigation.goBack();
            else navigation.navigate('Home');
        }
    }, [loading, navigation]);

    return (
        <PageTransition
            render={({ handleClose }) => (
                <FormScreen
                    body={
                        <View>
                            <TextInputsContainer>
                                <CustomTextInput
                                    error={
                                        formik.errors.name || serverErrors.name
                                    }
                                    label="name"
                                    loading={loading}
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
                                    touched={
                                        formik.touched.description || false
                                    }
                                    value={formik.values.description}
                                />
                            </TextInputsContainer>
                            <CustomButton
                                disable={disableButton}
                                loading={loading}
                                mb="smallest"
                                onPress={formik.handleSubmit}
                                title="create galerie"
                            />
                            <CustomButton
                                loading={loading}
                                onPress={() => {
                                    handleClose();
                                    handlePressReturn();
                                }}
                                title="cancel"
                                variant="stroke"
                            />
                        </View>
                    }
                    title="create galerie"
                    handleOnPressReturn={() => {
                        handleClose();
                        handlePressReturn();
                    }}
                />
            )}
        />
    );
};

export default CreateGalerieScreen;
