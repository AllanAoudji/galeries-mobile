import { useNavigation } from '@react-navigation/native';
import * as React from 'react';
import { View } from 'react-native';

import {
    CustomButton,
    CustomTextInput,
    FormScreen,
    Typography,
} from '#components';

import { CustomLink, TextContainer, TextInputsContainer } from './styles';

const SigninScreen = () => {
    const navigation = useNavigation<Screen.Home.SigninScreenNavigationProp>();

    const handleOnPressLogin = () => navigation.navigate('Login');
    const handleOnPressReturn = () => navigation.navigate('Landing');

    return (
        <FormScreen
            body={
                <View>
                    <TextInputsContainer>
                        <CustomTextInput label="user name" />
                        <CustomTextInput label="email" />
                        <CustomTextInput label="password" />
                        <CustomTextInput label="confirm password" />
                        <CustomTextInput label="beta key" />
                    </TextInputsContainer>
                    <CustomButton title="signin" />
                </View>
            }
            footer={
                <CustomLink onPress={handleOnPressLogin}>
                    <TextContainer>
                        <Typography
                            color="primary-dark"
                            fontFamily="light"
                            fontSize={12}
                        >
                            You already have an account?
                        </Typography>
                        <Typography color="primary-dark" fontSize={12}>
                            Click here.
                        </Typography>
                    </TextContainer>
                </CustomLink>
            }
            handleOnPressReturn={handleOnPressReturn}
            title="signin"
        />
    );
};

export default SigninScreen;
