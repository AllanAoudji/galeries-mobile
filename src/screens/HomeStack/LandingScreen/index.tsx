import { useNavigation } from '@react-navigation/native';
import * as React from 'react';
import { View } from 'react-native';

import { CustomButton, Logo, Typography } from '#components';

import { CatchPhraseContainer, Container, Header } from './styles';

const LandingScreen = () => {
    const navigation = useNavigation<Screen.Home.LandingScreenNavigationProp>();

    const handleOnPressLogin = () => navigation.navigate('Login');
    const handleOnPressSignin = () => navigation.navigate('Signin');

    return (
        <Container>
            <Header>
                <Typography fontFamily="light" fontSize={36}>
                    Welcome to
                </Typography>
                <Logo variant="text" />
                <CatchPhraseContainer>
                    <Typography fontFamily="light" fontSize={18}>
                        An app to share pictures with
                    </Typography>
                    <Typography fontFamily="light" fontSize={18}>
                        your friends and famiy
                    </Typography>
                </CatchPhraseContainer>
            </Header>
            <View>
                <CustomButton
                    mb="smallest"
                    onPress={handleOnPressLogin}
                    title="login"
                />
                <CustomButton
                    onPress={handleOnPressSignin}
                    title="signin"
                    variant="stroke"
                />
            </View>
        </Container>
    );
};

export default LandingScreen;
