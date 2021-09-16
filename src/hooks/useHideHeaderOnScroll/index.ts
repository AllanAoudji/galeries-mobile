import * as React from 'react';
import { StatusBar } from 'react-native';
import {
    interpolate,
    useAnimatedScrollHandler,
    useAnimatedStyle,
    useSharedValue,
} from 'react-native-reanimated';

import clamp from '#helpers/clamp';

const useHideHeaderOnScroll = (
    headerHeight: number,
    addStatusBar?: boolean
) => {
    const translateY = useSharedValue(0);

    const scrollHandler = useAnimatedScrollHandler({
        onBeginDrag: (e, ctx: { translate: number; position: number }) => {
            ctx.position = e.contentOffset.y;
            ctx.translate = translateY.value;
        },
        onScroll: (e, ctx) => {
            const diff = e.contentOffset.y - ctx.position;
            translateY.value = clamp(ctx.translate + diff, 0, headerHeight);
        },
    });

    const statusBar = React.useMemo(
        () => (addStatusBar ? StatusBar.currentHeight || 0 : 0),
        [addStatusBar]
    );

    const containerStyle = useAnimatedStyle(() => {
        const transform = interpolate(
            translateY.value,
            [0, headerHeight],
            [0, -(headerHeight - statusBar)]
        );
        return {
            transform: [{ translateY: transform }],
        };
    }, []);
    const headerStyle = useAnimatedStyle(() => {
        const opacity = interpolate(
            translateY.value,
            [0, headerHeight - (StatusBar.currentHeight || 0)],
            [1, 0]
        );
        return {
            opacity,
        };
    });

    return {
        containerStyle,
        headerStyle,
        scrollHandler,
        translateY,
    };
};

export default useHideHeaderOnScroll;
