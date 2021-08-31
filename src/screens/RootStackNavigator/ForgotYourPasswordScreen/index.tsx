import { AxiosError } from 'axios';
import * as React from 'react';
import { useDispatch } from 'react-redux';
import { useFormik } from 'formik';

import {
    CustomButton,
    CustomTextInput,
    FormScreen,
    TextInputsContainer,
    Typography,
} from '#components';
import { END_POINT, ERROR_MESSAGE } from '#helpers/constants';
import request from '#helpers/request';
import { forgotPassworSchema } from '#helpers/schemas';
import { setNotification } from '#store/actions';

import { TextContainer } from './styles';

type Props = {
    navigation: Screen.RootStack.ForgotYourPasswordNavigationProp;
};

const initialValues = {
    email: '',
};

const ForgotYourPasswordScreen = ({ navigation }: Props) => {
    const dispatch = useDispatch();
    const formik = useFormik({
        initialValues,
        onSubmit: async (values) => {
            setLoading(true);
            request({
                body: values,
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
                                    text: err.response.data.errors,
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
        validateOnBlur: true,
        validateOnChange: false,
        validationSchema: forgotPassworSchema,
    });

    const [loading, setLoading] = React.useState<boolean>(false);
    const [serverErrors, setServerErrors] = React.useState<{
        email: string;
    }>({
        email: '',
    });

    const disableButton = React.useMemo(() => {
        const clientHasError = formik.submitCount > 0 && !!formik.errors.email;
        const serverHasError = !!serverErrors.email;
        return clientHasError || serverHasError;
    }, [formik.submitCount, formik.errors, serverErrors]);

    const handleOnPressReturn = React.useCallback(() => {
        if (!loading) navigation.navigate('Login');
    }, []);

    return (
        <FormScreen
            handleOnPressReturn={handleOnPressReturn}
            renderBottom={
                <>
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
                </>
            }
            renderTop={
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
            }
            title="forgot your password"
        />
    );
};

export default ForgotYourPasswordScreen;
