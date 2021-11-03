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

import { GLOBAL_STYLE } from '#helpers/constants';
import { GalerieTabbarScreenContainer } from '#components';

type Props = {
    current: boolean;
    editScrollY: (offsetY: number) => void;
    galerie?: Store.Models.Galerie;
    maxScroll: number;
    paddingTop: number;
    scrollY: Animated.SharedValue<number>;
};

const DescriptionScreen = ({
    current,
    editScrollY,
    galerie,
    maxScroll,
    paddingTop,
    scrollY,
}: Props) => {
    const dimension = useWindowDimensions();

    const scrollViewRef = React.useRef<ScrollView | null>(null);

    const styleProps = React.useMemo(
        () => ({
            minHeight: dimension.height + maxScroll,
            paddingTop,
        }),
        []
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
            {!!paddingTop && (
                <Animated.ScrollView
                    contentContainerStyle={
                        style(styleProps).scrollViewContentContainerStyle
                    }
                    onScroll={scrollHandler}
                    // @ts-ignore
                    ref={scrollViewRef}
                    showsVerticalScrollIndicator={false}
                ></Animated.ScrollView>
            )}
        </GalerieTabbarScreenContainer>
    );
};

const style: ({
    minHeight,
    paddingTop,
}: {
    minHeight: number;
    paddingTop: number;
}) => {
    scrollViewContentContainerStyle: StyleProp<ViewStyle>;
} = StyleSheet.create(({ minHeight, paddingTop }) => ({
    scrollViewContentContainerStyle: {
        minHeight,
        paddingBottom: GLOBAL_STYLE.BOTTOM_TAB_HEIGHT,
        paddingTop,
    },
}));

export default DescriptionScreen;
