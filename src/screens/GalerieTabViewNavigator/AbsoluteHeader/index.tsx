import { useNavigation } from '@react-navigation/native';
import * as React from 'react';
import { StatusBar } from 'react-native';
import Animated, {
    interpolate,
    useAnimatedStyle,
} from 'react-native-reanimated';
import { useDispatch } from 'react-redux';

import { Pictogram } from '#components';
import { GLOBAL_STYLE } from '#helpers/constants';
import { updateGaleriesCurrent } from '#store/galeries';

import { Container } from './styles';

import CoverPicture from './CoverPicture';

type Props = {
    maxScroll: number;
    scrollY: Animated.SharedValue<number>;
};

const AbsoluteHeader = ({ maxScroll, scrollY }: Props) => {
    const dispatch = useDispatch();
    const navigation =
        useNavigation<Screen.DesktopBottomTab.GalerieNavigationProp>();

    const handlePress = React.useCallback(() => {
        dispatch(updateGaleriesCurrent(null));
        if (navigation.canGoBack()) {
            navigation.goBack();
        } else navigation.navigate('Home');
    }, [navigation]);

    const style = useAnimatedStyle(() => {
        const opacity = interpolate(scrollY.value, [0, maxScroll], [0, 0.8]);
        return { opacity };
    }, [maxScroll]);

    return (
        <Container paddingTop={StatusBar.currentHeight}>
            <CoverPicture style={style} />
            <Pictogram
                color="secondary-light"
                height={GLOBAL_STYLE.TOP_LEFT_PICTOGRAM_HEIGHT}
                onPress={handlePress}
                pl="small"
                pr="small"
                variant="arrow-left"
            />
        </Container>
    );
};

export default AbsoluteHeader;
