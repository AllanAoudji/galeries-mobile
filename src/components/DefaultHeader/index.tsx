import { DrawerActions, useNavigation } from '@react-navigation/native';
import * as React from 'react';
import { StatusBar, ViewProps } from 'react-native';
import { useSelector } from 'react-redux';

import Pictogram from '#components/Pictogram';
import Typography from '#components/Typography';
import { GLOBAL_STYLE } from '#helpers/constants';
import { selectLoading } from '#store/loading';

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
    const loading = useSelector(selectLoading);

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
            if (!loading) {
                if (onPress) onPress();
                else navigation.goBack();
            }
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
