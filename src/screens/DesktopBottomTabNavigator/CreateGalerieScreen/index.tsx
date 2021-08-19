import * as React from 'react';
import { View } from 'react-native';
import { useFormik } from 'formik';

import {
    CustomButton,
    CustomTextInput,
    FormScreen,
    PageTransition,
} from '#components';
import { END_POINT } from '#helpers/constants';
import request from '#helpers/request';
import { createGaleriesSchema } from '#helpers/schemas';

type Props = {
    navigation: Screen.DesktopBottomTab.CreateGalerieNavigationProp;
};

const initialValues = {
    description: '',
    name: '',
};

const CreateGalerieScreen = ({ navigation }: Props) => {
    const formik = useFormik({
        onSubmit: async (values) => {
            setLoading(true);
            request({
                body: values,
                method: 'POST',
                url: END_POINT.GALERIES,
            })
                .then((res) => {
                    console.log(res);
                })
                .catch((err) => {
                    console.log(err);
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
                            <CustomTextInput
                                error={formik.errors.name || serverErrors.name}
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
                                onBlur={formik.handleBlur('description')}
                                onChangeText={(e: string) => {
                                    setServerErrors((prevState) => ({
                                        ...prevState,
                                        description: '',
                                    }));
                                    formik.setFieldError('description', '');
                                    formik.setFieldValue('description', e);
                                }}
                                touched={formik.touched.description || false}
                                value={formik.values.description}
                            />
                            <CustomButton
                                disable={disableButton}
                                loading={loading}
                                onPress={formik.handleSubmit}
                                title="create galerie"
                            />
                            <CustomButton
                                loading={loading}
                                onPress={handlePressReturn}
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
