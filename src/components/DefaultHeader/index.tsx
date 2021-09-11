import { DrawerActions, useNavigation } from '@react-navigation/native';
import * as React from 'react';
import { StatusBar, ViewProps } from 'react-native';

import Logo from '#components/Logo';
import Pictogram from '#components/Pictogram';
import { GLOBAL_STYLE } from '#helpers/constants';

import { Container, LogoContainer, LogoInnerContainer } from './styles';

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
    const topLeftPictogramVariant = React.useMemo(
        () => (isArrow ? 'arrow-left' : 'hamburger-menu'),
        [isArrow]
    );

    const handlePressLogo = React.useCallback(() => {
        if (onPress) onPress();
    }, [onPress]);
    const handlePressPictogram = React.useCallback(() => {
        if (isArrow) navigation.goBack();
        else navigation.dispatch(DrawerActions.openDrawer());
    }, [isArrow, navigation]);

    return (
        <Container currentHeight={StatusBar.currentHeight} {...rest}>
            <Pictogram
                color="primary"
                height={GLOBAL_STYLE.TOP_LEFT_PICTOGRAM_HEIGHT}
                onPress={handlePressPictogram}
                pl="small"
                pr="small"
                variant={topLeftPictogramVariant}
            />
            <LogoContainer currentHeight={StatusBar.currentHeight}>
                <LogoInnerContainer onPress={handlePressLogo}>
                    <Logo size="small" variant="logotype-stroke" />
                </LogoInnerContainer>
            </LogoContainer>
        </Container>
    );
};

export default DefaultHeader;
