import { Link } from '@react-navigation/native';
import * as React from 'react';
import { View } from 'react-native';
import styled from 'styled-components/native';

import {
    CustomButton,
    CustomTextInput,
    FormScreen,
    Typography,
} from '../../../components';

const CustomLink = styled(Link)`
    padding: 40px 10px;
`;
const ForgotYourPasswordLinkContainer = styled.View`
    align-items: flex-end;
    margin-top: 5px;
`;
const ForgotYourPasswordLink = styled(Link)`
    padding: 10px 0px 10px 40px;
`;
const TextContainer = styled.View`
    align-items: center;
`;
const TextInputsContainer = styled.View`
    margin: 45px 0 35px 0px;
`;

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
