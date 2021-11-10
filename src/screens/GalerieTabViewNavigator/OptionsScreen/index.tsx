import * as React from 'react';
import {
    ScrollView,
    StyleProp,
    StyleSheet,
    useWindowDimensions,
    ViewStyle,
} from 'react-native';
import Animated, {
    runOnJS,
    useAnimatedReaction,
    useAnimatedScrollHandler,
} from 'react-native-reanimated';

import { GalerieTabbarScreenContainer } from '#components';
import { GLOBAL_STYLE } from '#helpers/constants';
import GalerieTabViewMaxScroll from '#helpers/GalerieTabViewMaxScroll';

import AllowNotification from './AllowNotification';
import RemoveButtons from './RemoveButtons';

import { Container } from './styles';

type Props = {
    current: boolean;
    editScrollY: (offsetY: number) => void;
    galerie?: Store.Models.Galerie;
    scrollY: Animated.SharedValue<number>;
};

const OptionsScreen = ({ current, editScrollY, galerie, scrollY }: Props) => {
    const dimension = useWindowDimensions();

    const scrollViewRef = React.useRef<ScrollView | null>(null);

    const styleProps = React.useMemo(
        () => ({
            minHeight: dimension.height + GalerieTabViewMaxScroll,
        }),
        [dimension]
    );

    const setInitialScroll = React.useCallback(
        (newScrollY: number) => {
            if (scrollViewRef.current && !current) {
                scrollViewRef.current.scrollTo({
                    animated: false,
                    y: newScrollY,
                });
            }
        },
        [current]
    );

    useAnimatedReaction(
        () => scrollY.value,
        (newScrollY) => {
            runOnJS(setInitialScroll)(newScrollY);
        },
        [current]
    );
    const scrollHandler = useAnimatedScrollHandler(
        {
            onScroll: (e) => {
                if (current) editScrollY(e.contentOffset.y);
            },
        },
        [editScrollY, current]
    );

    if (!galerie) return null;

    return (
        <GalerieTabbarScreenContainer>
            <Animated.ScrollView
                contentContainerStyle={
                    style(styleProps).scrollViewContentContainerStyle
                }
                onScroll={scrollHandler}
                // @ts-ignore
                ref={scrollViewRef}
                showsVerticalScrollIndicator={false}
            >
                <Container>
                    <AllowNotification galerie={galerie} />
                    <RemoveButtons galerie={galerie} />
                </Container>
            </Animated.ScrollView>
        </GalerieTabbarScreenContainer>
    );
};

const style: ({ minHeight }: { minHeight: number }) => {
    scrollViewContentContainerStyle: StyleProp<ViewStyle>;
} = StyleSheet.create(({ minHeight }) => ({
    scrollViewContentContainerStyle: {
        minHeight,
        paddingBottom: GLOBAL_STYLE.BOTTOM_TAB_HEIGHT,
        paddingTop:
            GLOBAL_STYLE.GALERIE_TAB_BAR_COVER_PICTURE +
            GLOBAL_STYLE.GALERIE_TAB_BAR_MENU,
    },
}));

export default React.memo(OptionsScreen);
