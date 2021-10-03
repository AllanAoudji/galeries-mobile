import { DrawerActions, useNavigation } from '@react-navigation/native';
import * as React from 'react';
import { StatusBar, ViewProps } from 'react-native';

import Pictogram from '#components/Pictogram';
import Typography from '#components/Typography';
import { GLOBAL_STYLE } from '#helpers/constants';

import { Container } from './styles';

type Props = {
    onPress?: () => void;
    title?: string;
    variant?: 'primary' | 'secondary';
};

const DefaultHeader = ({
    onPress,
    title,
    variant = 'primary',
    ...rest
}: Props & ViewProps) => {
    const navigation = useNavigation();

    const pictogramVariant = React.useMemo(
        () =>
            variant === 'secondary' && navigation.canGoBack()
                ? 'arrow-left'
                : 'hamburger-menu',
        [variant]
    );

    const handlePressPictogram = React.useCallback(() => {
        if (variant === 'secondary' && navigation.canGoBack()) {
            if (onPress) onPress();
            else navigation.goBack();
        } else navigation.dispatch(DrawerActions.openDrawer());
    }, [variant]);

    return (
        <Container paddingTop={StatusBar.currentHeight} {...rest}>
            <Pictogram
                color="primary"
                height={GLOBAL_STYLE.TOP_LEFT_PICTOGRAM_HEIGHT}
                onPress={handlePressPictogram}
                pl="small"
                pr="small"
                variant={pictogramVariant}
            />
            {!!title && (
                <Typography color="primary" fontFamily="light" fontSize={24}>
                    {title.toLowerCase()}
                </Typography>
            )}
        </Container>
    );
};

export default React.memo(DefaultHeader);
