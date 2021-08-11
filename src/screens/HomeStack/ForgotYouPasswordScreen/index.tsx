import * as React from 'react';
import { View } from 'react-native';
import styled from 'styled-components/native';

import {
    CustomButton,
    CustomTextInput,
    FormScreen,
    Typography,
} from '../../../components';

const TextInputsContainer = styled.View`
    margin-bottom: 45px;
`;
const TextContainer = styled.View`
    margin-bottom: 30px;
`;

const ForgotYourPasswordScreen = () => (
    <FormScreen
        body={
            <View>
                <TextInputsContainer>
                    <TextContainer>
                        <Typography color="primary-dark" fontSize={18}>
                            Register your email to reset your password
                        </Typography>
                    </TextContainer>
                    <CustomTextInput label="email or user name" />
                </TextInputsContainer>
                <CustomButton title="reset your password" />
            </View>
        }
        title="FORGOT YOUR PASSWORD"
    />
);

export default ForgotYourPasswordScreen;
