import { AxiosError } from 'axios';
import { useFormik } from 'formik';
import * as React from 'react';
import { useDispatch } from 'react-redux';

import {
    CustomButton,
    CustomTextInput,
    FormContainer,
    Logo,
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

const initialValues = { email: '' };

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
    const emailError = React.useMemo(
        () => formik.errors.email || serverErrors.email,
        [formik.errors.email, serverErrors.email]
    );

    const handleChangeEmailText = React.useCallback((e: string) => {
        setServerErrors((prevState) => ({
            ...prevState,
            email: '',
        }));
        formik.setFieldError('email', '');
        formik.setFieldValue('email', e);
    }, []);
    const handlePressReturn = React.useCallback(() => {
        if (!loading) navigation.navigate('Login');
    }, []);

    return (
        <FormContainer justifyContent="center">
            <Logo size="smallest" variant="text" />
            <TextContainer>
                <Typography
                    color="primary-dark"
                    fontFamily="light"
                    fontSize={18}
                >
                    Register your email to reset your password.
                </Typography>
            </TextContainer>
            <CustomTextInput
                error={emailError}
                keyboardType="email-address"
                label="email"
                loading={loading}
                onBlur={formik.handleBlur('email')}
                onChangeText={handleChangeEmailText}
                touched={formik.touched.email || false}
                value={formik.values.email}
            />
            <CustomButton
                disable={disableButton}
                loading={loading}
                mb="smallest"
                mt="smallest"
                onPress={formik.handleSubmit}
                title="reset your password"
            />
            <CustomButton
                onPress={handlePressReturn}
                title="cancel"
                variant="stroke"
            />
        </FormContainer>
    );
};

export default ForgotYourPasswordScreen;
