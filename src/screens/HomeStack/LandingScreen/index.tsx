import { useNavigation } from '@react-navigation/native';
import * as React from 'react';
import { View } from 'react-native';
import styled from 'styled-components/native';

import { CustomButton, Logo, Typography } from '#components';

const CatchPhraseContainer = styled.View`
    margin: ${({ theme }) =>
        `${theme.spacings.normal} ${theme.spacings.small} 0 ${theme.spacings.normal}`};
`;
const Container = styled.View`
    background-color: ${({ theme }) => theme.colors['secondary-light']};
    flex: 1;
    justify-content: space-between;
    padding: ${({ theme }) =>
        `0 ${theme.spacings.small} ${theme.spacings.large}`};
`;
const TextContainer = styled.View`
    flex: 1;
    justify-content: center;
`;

const LandingScreen = () => {
    const navigation = useNavigation<Screen.Home.LandingScreenNavigationProp>();

    const handleOnPressLogin = () => navigation.navigate('Login');
    const handleOnPressSignin = () => navigation.navigate('Signin');

    return (
        <Container>
            <TextContainer>
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
            </TextContainer>
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
