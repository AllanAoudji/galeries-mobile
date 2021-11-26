import { DrawerActions, useNavigation } from '@react-navigation/native';
import * as React from 'react';
import { Keyboard, StatusBar, ViewProps } from 'react-native';

import Pictogram from '#components/Pictogram';
import Typography from '#components/Typography';
import { GLOBAL_STYLE } from '#helpers/constants';

import { Container } from './styles';

type Props = {
    color?: keyof Style.Colors;
    onPress?: () => void;
    textColor?: keyof Style.Colors;
    title?: string;
    variant?: 'primary' | 'secondary';
};

const DefaultHeader = ({
    color = 'secondary-light',
    onPress,
    textColor = 'primary',
    title,
    variant = 'primary',
    ...rest
}: Props & ViewProps) => {
    const navigation = useNavigation();

    const pictogramVariant = React.useMemo(
        () =>
            navigation.canGoBack() && variant === 'secondary'
                ? 'arrow-left'
                : 'hamburger-menu',
        [navigation, variant]
    );

    const handlePressPictogram = React.useCallback(() => {
        Keyboard.dismiss();
        if (variant === 'secondary') {
            if (navigation.canGoBack()) navigation.goBack();
            else if (onPress) onPress();
        } else navigation.dispatch(DrawerActions.openDrawer());
    }, [navigation, variant]);

    return (
        <Container color={color} paddingTop={StatusBar.currentHeight} {...rest}>
            <Pictogram
                color={textColor}
                height={GLOBAL_STYLE.TOP_LEFT_PICTOGRAM_HEIGHT}
                onPress={handlePressPictogram}
                pl="small"
                pr="small"
                variant={pictogramVariant}
            />
            {!!title && (
                <Typography color={textColor} fontFamily="light" fontSize={24}>
                    {title.toLowerCase()}
                </Typography>
            )}
        </Container>
    );
};

export default React.memo(DefaultHeader);
