import { useNavigation } from '@react-navigation/native';
import * as React from 'react';
import { View } from 'react-native';

import {
    CustomButton,
    CustomTextInput,
    FormScreen,
    Typography,
} from '#components';

import { TextContainer, TextInputsContainer } from './styles';

const ForgotYourPasswordScreen = () => {
    const navigation =
        useNavigation<Screen.Home.ForgotYourPasswordNavigationProp>();

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
                        <CustomTextInput label="email or user name" />
                    </TextInputsContainer>
                    <CustomButton mb="smallest" title="reset your password" />
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
