import {
    interpolate,
    useAnimatedScrollHandler,
    useAnimatedStyle,
    useSharedValue,
} from 'react-native-reanimated';

import clamp from '#helpers/clamp';

const useHideHeaderOnScroll = (headerHeight: number) => {
    const translateY = useSharedValue(0);
    const containerStyle = useAnimatedStyle(() => {
        const transform = interpolate(
            translateY.value,
            [0, headerHeight],
            [0, -headerHeight]
        );
        return { transform: [{ translateY: transform }] };
    }, []);
    const headerStyle = useAnimatedStyle(() => {
        const opacity = interpolate(
            translateY.value,
            [0, headerHeight],
            [1, 0]
        );
        return { opacity };
    });

    const scrollHandler = useAnimatedScrollHandler({
        onBeginDrag: (e, ctx: { translate: number; position: number }) => {
            ctx.position = e.contentOffset.y;
            ctx.translate = translateY.value;
        },
        onScroll: (e, ctx) => {
            const diff = e.contentOffset.y - ctx.position;
            const newTranslateY = clamp(ctx.translate + diff, 0, headerHeight);
            if (!Number.isNaN(newTranslateY)) translateY.value = newTranslateY;
        },
    });

    return {
        containerStyle,
        headerStyle,
        scrollHandler,
        translateY,
    };
};

export default useHideHeaderOnScroll;
