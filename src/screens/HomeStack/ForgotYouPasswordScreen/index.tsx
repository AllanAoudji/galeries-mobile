import { AxiosError } from 'axios';
import { useNavigation } from '@react-navigation/native';
import * as React from 'react';
import { View } from 'react-native';
import { useFormik } from 'formik';

import {
    CustomButton,
    CustomTextInput,
    FormScreen,
    Typography,
} from '#components';
import { END_POINT, ERROR_MESSAGE } from '#helpers/constants';
import request from '#helpers/request';
import { forgotPassworSchema } from '#helpers/schemas';
import { setNotification } from '#store/actions';

import { TextContainer, TextInputsContainer } from './styles';

const initialValues = {
    email: '',
};

const ForgotYourPasswordScreen = () => {
    const formik = useFormik({
        initialValues,
        onSubmit: async (values) => {
            setLoading(true);
            request({
                body: values,
                authToken: '',
                method: 'POST',
                url: END_POINT.FORGOT_PASSWORD,
            })
                .then((res) => {
                    console.log(res);
                })
                .catch((err: AxiosError) => {
                    if (err.response && err.response.data.errors) {
                        if (typeof err.response.data.errors === 'object') {
                            if (err.response.data.errors.email) {
                                setServerErrors({
                                    email: err.response.data.errors.email,
                                });
                            } else {
                                setNotification({
                                    text: ERROR_MESSAGE.DEFAULT_ERROR_MESSAGE,
                                    type: 'error',
                                });
                            }
                        } else {
                            setNotification({
                                text: err.response.data.errors,
                                type: 'error',
                            });
                        }
                    } else {
                        setNotification({
                            text: ERROR_MESSAGE.DEFAULT_ERROR_MESSAGE,
                            type: 'error',
                        });
                    }
                })
                .finally(() => {
                    setLoading(false);
                });
        },
        validateOnBlur: true,
        validateOnChange: false,
        validationSchema: forgotPassworSchema,
    });

    const navigation =
        useNavigation<Screen.Home.ForgotYourPasswordNavigationProp>();

    const [loading, setLoading] = React.useState<boolean>(false);
    const [serverErrors, setServerErrors] = React.useState<{
        email: string;
    }>({
        email: '',
    });

    const disableButton = (() => {
        const clientHasError = formik.submitCount > 0 && !!formik.errors.email;
        const serverHasError = !!serverErrors.email;
        return clientHasError || serverHasError;
    })();

    const handleOnPressReturn = () => {
        if (!loading) navigation.navigate('Login');
    };

    return (
        <FormScreen
            body={
                <View>
                    <TextInputsContainer>
                        <TextContainer>
                            <Typography color="primary-dark" fontSize={18}>
                                Register your email to reset your password
                            </Typography>
                        </TextContainer>
                        <CustomTextInput
                            error={formik.errors.email || serverErrors.email}
                            keyboardType="email-address"
                            label="email"
                            loading={loading}
                            onBlur={formik.handleBlur('email')}
                            onChangeText={(e: string) => {
                                setServerErrors((prevState) => ({
                                    ...prevState,
                                    email: '',
                                }));
                                formik.setFieldError('email', '');
                                formik.setFieldValue('email', e);
                            }}
                            touched={formik.touched.email || false}
                            value={formik.values.email}
                        />
                    </TextInputsContainer>
                    <CustomButton
                        disable={disableButton}
                        loading={loading}
                        mb="smallest"
                        onPress={formik.handleSubmit}
                        title="reset your password"
                    />
                    <CustomButton
                        onPress={handleOnPressReturn}
                        title="cancel"
                        variant="stroke"
                    />
                </View>
            }
            handleOnPressReturn={handleOnPressReturn}
            title="forgot your password"
        />
    );
};

export default ForgotYourPasswordScreen;
