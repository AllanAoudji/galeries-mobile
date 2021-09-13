import { DrawerActions, useNavigation } from '@react-navigation/native';
import * as React from 'react';
import { StatusBar, ViewProps } from 'react-native';

import Pictogram from '#components/Pictogram';
import Typography from '#components/Typography';
import { GLOBAL_STYLE } from '#helpers/constants';

import { Container } from './styles';

type Props = {
    onPress?: () => void;
    onPressBack?: () => void;
    title?: string;
    variant?: 'primary' | 'secondary';
};

const DefaultHeader = ({
    onPressBack,
    title,
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
    const handlePressPictogram = React.useCallback(() => {
        if (isArrow) {
            if (onPressBack) onPressBack();
            else navigation.goBack();
        } else navigation.dispatch(DrawerActions.openDrawer());
    }, [isArrow, navigation]);

    return (
        <Container paddingTop={StatusBar.currentHeight} {...rest}>
            <Pictogram
                color="primary"
                height={GLOBAL_STYLE.TOP_LEFT_PICTOGRAM_HEIGHT}
                onPress={handlePressPictogram}
                pl="small"
                pr="small"
                variant={topLeftPictogramVariant}
            />
            {!!title && (
                <Typography color="primary" fontFamily="light" fontSize={24}>
                    {title.toLowerCase()}
                </Typography>
            )}
        </Container>
    );
};

export default DefaultHeader;
