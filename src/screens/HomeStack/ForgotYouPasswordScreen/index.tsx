import axios from 'axios';
import { useNavigation } from '@react-navigation/native';
import * as React from 'react';
import { Keyboard, View } from 'react-native';
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

import { TextContainer, TextInputsContainer } from './styles';

const initialValues = {
    email: '',
};

const ForgotYourPasswordScreen = () => {
    const formik = useFormik({
        initialValues,
        onSubmit: async (values) => {
            Keyboard.dismiss();
            try {
                request({
                    body: values,
                    authToken: '',
                    method: 'POST',
                    url: END_POINT.FORGOT_PASSWORD,
                });
            } catch (err) {
                if (
                    axios.isAxiosError(err) &&
                    err.response &&
                    err.response.data.errors
                ) {
                    if (typeof err.response.data.errors === 'object') {
                        if (err.response.data.errors.email) {
                            setServerErrors({
                                email: err.response.data.errors.email,
                            });
                        } else {
                            console.log(ERROR_MESSAGE.DEFAULT_ERROR_MESSAGE);
                        }
                    } else {
                        console.log(err.response.data.errors);
                    }
                } else {
                    console.log(ERROR_MESSAGE.DEFAULT_ERROR_MESSAGE);
                }
            }
        },
        validateOnBlur: true,
        validateOnChange: false,
        validationSchema: forgotPassworSchema,
    });
    const navigation =
        useNavigation<Screen.Home.ForgotYourPasswordNavigationProp>();
    const [serverErrors, setServerErrors] = React.useState<{
        email: string;
    }>({
        email: '',
    });

    const handleOnPressReturn = () => navigation.navigate('Login');

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
                            label="email or user name"
                            onBlur={formik.handleBlur('email')}
                            onChangeText={(e: string) => {
                                formik.setFieldError('email', '');
                                formik.setFieldValue('email', e);
                            }}
                            touched={formik.touched.email || false}
                            value={formik.values.email}
                        />
                    </TextInputsContainer>
                    <CustomButton
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
