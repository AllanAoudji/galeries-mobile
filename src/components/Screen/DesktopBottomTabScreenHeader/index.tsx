import { DrawerActions, useNavigation } from '@react-navigation/native';
import * as React from 'react';
import { StatusBar } from 'react-native';

import Logo from '#components/Logo';
import Pictogram from '#components/Pictogram';

import {
    Container,
    LogoContainer,
    LogoInnerContainer,
    PictogramContainer,
} from './styles';

interface Props {
    variant?: 'primary' | 'secondary';
}

const DesktopBottomTabScreenHeader = ({ variant = 'primary' }: Props) => {
    const navigation =
        useNavigation<Screen.DesktopBottomTab.CommentsNavigationProp>();
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
            <LogoContainer currentHeight={StatusBar.currentHeight}>
                <LogoInnerContainer onPress={handlePressLogo}>
                    <Logo size="small" variant="logotype-stroke" />
                </LogoInnerContainer>
            </LogoContainer>
        </Container>
    );
};

export default DesktopBottomTabScreenHeader;
