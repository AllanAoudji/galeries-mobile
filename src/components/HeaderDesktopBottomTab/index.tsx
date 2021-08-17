import { BottomTabHeaderProps } from '@react-navigation/bottom-tabs/lib/typescript/src/types';
import { DrawerActions } from '@react-navigation/native';
import * as React from 'react';
import { StatusBar } from 'react-native';

import Pictogram from '#components/Pictogram';
import Logo from '#components/Logo';

import { Container, LogoContainer, PictogramContainer } from './styles';

interface Props {
    variant?: 'primary' | 'secondary';
}

const HeaderDesktopBottomTab = ({
    navigation,
    variant = 'primary',
}: BottomTabHeaderProps & Props) => {
    const handlePressLogo = React.useCallback(() => {
        navigation.navigate('Home');
    }, [navigation]);

    const handlePressPictogram = React.useCallback(() => {
        if (variant === 'primary')
            navigation.dispatch(DrawerActions.openDrawer());
        else if (navigation.canGoBack()) {
            navigation.goBack();
        } else {
            navigation.navigate('Home');
        }
    }, [variant, navigation]);

    return (
        <Container>
            <PictogramContainer
                currentHeight={StatusBar.currentHeight}
                onPress={handlePressPictogram}
            >
                <Pictogram
                    color="primary"
                    variant={
                        variant === 'primary' ? 'hamburger-menu' : 'arrow-left'
                    }
                />
            </PictogramContainer>
            <LogoContainer onPress={handlePressLogo}>
                <Logo size="small" variant="logotype-stroke" />
            </LogoContainer>
        </Container>
    );
};

export default HeaderDesktopBottomTab;
