import * as React from 'react';
import { View } from 'react-native';

import { CustomButton, Logo, Typography } from '#components';

import { CatchPhraseContainer, Container, Header } from './styles';

type Props = {
    navigation: Screen.RootStack.LandingScreenNavigationProp;
};

const LandingScreen = ({ navigation }: Props) => {
    const handleOnPressLogin = React.useCallback(
        () => navigation.navigate('Login'),
        [navigation]
    );
    const handleOnPressSignin = React.useCallback(
        () => navigation.navigate('Signin'),
        [navigation]
    );

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
