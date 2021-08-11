import * as React from 'react';
import { View } from 'react-native';

import {
    CustomButton,
    CustomTextInput,
    FormScreen,
    Typography,
} from '../../../components';
import {
    CustomLink,
    ForgotYourPasswordLink,
    ForgotYourPasswordLinkContainer,
    TextContainer,
    TextInputsContainer,
} from './styles';

const LoginScreen = () => {
    return (
        <FormScreen
            body={
                <View>
                    <TextInputsContainer>
                        <CustomTextInput label="email or user name" />
                        <CustomTextInput label="password" />
                        <ForgotYourPasswordLinkContainer>
                            <ForgotYourPasswordLink
                                to={{ screen: 'ForgotYourPassword' }}
                            >
                                <Typography
                                    color="primary-dark"
                                    fontFamily="bold"
                                >
                                    Forgot your password?
                                </Typography>
                            </ForgotYourPasswordLink>
                        </ForgotYourPasswordLinkContainer>
                    </TextInputsContainer>
                    <CustomButton title="login" />
                </View>
            }
            footer={
                <CustomLink to={{ screen: 'Signin' }}>
                    <TextContainer>
                        <Typography
                            color="primary-dark"
                            fontFamily="light"
                            fontSize={12}
                        >
                            You don't have an account yet?
                        </Typography>
                        <Typography color="primary-dark" fontSize={12}>
                            Click here.
                        </Typography>
                    </TextContainer>
                </CustomLink>
            }
            title="LOGIN"
        />
    );
};

export default LoginScreen;
