import { DrawerActions, useNavigation } from '@react-navigation/native';
import * as React from 'react';
import { StatusBar, ViewProps } from 'react-native';

import Logo from '#components/Logo';
import Pictogram from '#components/Pictogram';

import {
    Container,
    LogoContainer,
    LogoInnerContainer,
    PictogramContainer,
} from './styles';

interface Props {
    onPress?: () => void;
    variant?: 'primary' | 'secondary';
}

const DefaultHeader = ({
    onPress,
    variant = 'primary',
    ...rest
}: Props & ViewProps) => {
    const navigation = useNavigation();

    const isArrow = React.useMemo(
        () => variant === 'secondary' && navigation.canGoBack(),
        [navigation, variant]
    );

    const handlePressLogo = React.useCallback(() => {
        if (onPress) onPress();
    }, [onPress]);
    const handlePressPictogram = React.useCallback(() => {
        if (isArrow) navigation.goBack();
        else navigation.dispatch(DrawerActions.openDrawer());
    }, [isArrow, navigation]);

    return (
        <Container {...rest}>
            <PictogramContainer
                currentHeight={StatusBar.currentHeight}
                onPress={handlePressPictogram}
            >
                <Pictogram
                    color="primary"
                    variant={isArrow ? 'arrow-left' : 'hamburger-menu'}
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

export default DefaultHeader;
