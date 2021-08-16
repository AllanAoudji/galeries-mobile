import { useRoute } from '@react-navigation/native';
import { DrawerHeaderProps } from '@react-navigation/drawer/lib/typescript/src/types';
import * as React from 'react';
import { StatusBar } from 'react-native';

import Pictogram from '#components/Pictogram';
import Logo from '#components/Logo';

import { Container, LogoContainer, PictogramContainer } from './styles';

const Header = ({ navigation }: DrawerHeaderProps) => {
    const route = useRoute();

    const hamburgerMenu = React.useMemo(
        () => route.name === 'Main' || !navigation.canGoBack(),
        [route, navigation]
    );
    const handlePressLogo = React.useCallback(() => {
        navigation.navigate('Main');
    }, [navigation]);
    const handlePressPictogram = React.useCallback(() => {
        if (hamburgerMenu) navigation.openDrawer();
        else navigation.goBack();
    }, [hamburgerMenu]);

    return (
        <Container>
            <PictogramContainer
                currentHeight={StatusBar.currentHeight}
                onPress={handlePressPictogram}
            >
                <Pictogram
                    color="primary"
                    variant={hamburgerMenu ? 'hamburger-menu' : 'arrow-left'}
                />
            </PictogramContainer>
            <LogoContainer onPress={handlePressLogo}>
                <Logo size="small" variant="logotype-stroke" />
            </LogoContainer>
        </Container>
    );
};

export default Header;
