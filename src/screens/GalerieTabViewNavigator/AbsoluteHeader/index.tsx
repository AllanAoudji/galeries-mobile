import { useNavigation } from '@react-navigation/native';
import * as React from 'react';
import { InteractionManager, StatusBar } from 'react-native';
import Animated, {
    interpolate,
    useAnimatedStyle,
} from 'react-native-reanimated';

import { useDispatch } from 'react-redux';
import { Pictogram } from '#components';
import { GLOBAL_STYLE } from '#helpers/constants';

import { Container } from './styles';

import AbsoluteGalerieCoverPicture from './AbsoluteGalerieCoverPicture';
import { resetGaleriesCurrent } from '#store/galeries';

type Props = {
    maxScroll: number;
    scrollY: Animated.SharedValue<number>;
};

const AbsoluteHeader = ({ maxScroll, scrollY }: Props) => {
    const dispatch = useDispatch();
    const navigation =
        useNavigation<Screen.DesktopBottomTab.GalerieNavigationProp>();

    const handlePress = React.useCallback(() => {
        if (navigation.canGoBack()) navigation.goBack();
        else navigation.navigate('Home');
        InteractionManager.runAfterInteractions(() => {
            dispatch(resetGaleriesCurrent());
        });
    }, [navigation]);

    const style = useAnimatedStyle(() => {
        const opacity = interpolate(
            scrollY.value,
            [0, maxScroll / 2, maxScroll],
            [0, 0, 1]
        );
        return { opacity };
    }, [maxScroll]);

    return (
        <Container paddingTop={StatusBar.currentHeight}>
            <AbsoluteGalerieCoverPicture style={style} />
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
