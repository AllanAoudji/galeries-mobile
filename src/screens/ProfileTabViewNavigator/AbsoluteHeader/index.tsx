import { DrawerActions, useNavigation } from '@react-navigation/native';
import * as React from 'react';
import { Keyboard, StatusBar } from 'react-native';
import Animated, {
    interpolate,
    useAnimatedStyle,
} from 'react-native-reanimated';

import { useSelector } from 'react-redux';
import ProfileTabViewMaxScroll from '#helpers/ProfileTabViewMaxScroll';

import { Container, PseudonymContainer } from './styles';
import { GLOBAL_STYLE } from '#helpers/constants';
import { Pictogram, Typography } from '#components';
import { selectMe } from '#store/me';

type Props = {
    scrollY: Animated.SharedValue<number>;
};

const AbsoluteHeader = ({ scrollY }: Props) => {
    const me = useSelector(selectMe);

    const navigation =
        useNavigation<Screen.DesktopBottomTab.ProfileNavigationProp>();

    const style = useAnimatedStyle(() => {
        const opacity = interpolate(
            scrollY.value,
            [0, ProfileTabViewMaxScroll / 2, ProfileTabViewMaxScroll],
            [0, 0, 1]
        );
        return { opacity };
    }, []);

    const handlePress = React.useCallback(() => {
        Keyboard.dismiss();
        navigation.dispatch(DrawerActions.openDrawer());
    }, [navigation]);

    return (
        <Container paddingTop={StatusBar.currentHeight}>
            <PseudonymContainer
                style={style}
                paddingTop={StatusBar.currentHeight}
            >
                <Typography color="primary" fontFamily="bold" fontSize={24}>
                    {me ? me.pseudonym : 'user name'}
                </Typography>
            </PseudonymContainer>
            <Pictogram
                color="primary"
                height={GLOBAL_STYLE.TOP_LEFT_PICTOGRAM_HEIGHT}
                onPress={handlePress}
                pl="small"
                pr="small"
                variant="hamburger-menu"
            />
        </Container>
    );
};

export default AbsoluteHeader;
