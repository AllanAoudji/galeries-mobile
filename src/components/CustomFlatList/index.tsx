import { useFocusEffect } from '@react-navigation/native';
import * as React from 'react';
import {
    FlatList,
    InteractionManager,
    ListRenderItemInfo,
    RefreshControl,
    StyleProp,
    StyleSheet,
    ViewStyle,
} from 'react-native';
import Animated, {
    runOnJS,
    useAnimatedReaction,
    useAnimatedScrollHandler,
} from 'react-native-reanimated';
import { useTheme } from 'styled-components/native';

type Props = {
    allIds: string[];
    editScrollY?: (offsetY: number) => void;
    flatListRef?: React.MutableRefObject<FlatList<any> | null>;
    getItemLayout?: (
        _: any,
        index: number
    ) => {
        length: number;
        offset: number;
        index: any;
    };
    isFocus?: boolean;
    minHeight?: number;
    numColumns?: number;
    onEndReach: () => void;
    onRefresh?: () => void;
    onScrollBeginDrag?: () => void;
    pb?: number;
    pt?: number;
    progressViewOffset?: number;
    renderItem: ({ item }: ListRenderItemInfo<string>) => JSX.Element;
    scrollY?: Animated.SharedValue<number>;
    status: Store.Status;
};

const AnimatedFlatList = Animated.createAnimatedComponent<any>(FlatList);

const CustomFlatList = ({
    allIds,
    editScrollY,
    flatListRef,
    getItemLayout,
    isFocus,
    minHeight,
    numColumns,
    onEndReach,
    onRefresh,
    onScrollBeginDrag,
    pb,
    pt,
    progressViewOffset,
    renderItem,
    scrollY,
    status,
}: Props) => {
    const theme = useTheme();

    const ref = React.useRef<FlatList<any> | null>(null);

    const [didFinishInitialAnimation, setDidFinishInitialAnimation] =
        React.useState<boolean>(false);
    const [refreshing, setRefreshing] = React.useState<boolean>(false);

    const colors = React.useMemo(
        () => [
            theme.colors.primary,
            theme.colors['primary-dark'],
            theme.colors['primary-light'],
        ],
        [theme]
    );
    const styleProps = React.useMemo(
        () => ({ minHeight, pb, pt }),
        [minHeight, pb, pt]
    );

    const handleRefresh = React.useCallback(() => {
        if (!onRefresh) return;
        setRefreshing(true);
        onRefresh();
    }, [onRefresh]);
    const keyExtractor = React.useCallback((data: string) => data, []);
    const refreshControl = React.useMemo(() => {
        if (!onRefresh) return undefined;
        return (
            <RefreshControl
                colors={colors}
                onRefresh={handleRefresh}
                progressBackgroundColor={theme.colors['secondary-light']}
                progressViewOffset={progressViewOffset}
                refreshing={refreshing}
            />
        );
    }, [
        colors,
        handleRefresh,
        onRefresh,
        progressViewOffset,
        refreshing,
        theme,
    ]);
    const setInitialScroll = React.useCallback(
        (newScrollY: number) => {
            if (isFocus) return;
            if (flatListRef) {
                if (flatListRef.current)
                    flatListRef.current.scrollToOffset({ offset: newScrollY });
            } else if (ref && ref.current)
                ref.current.scrollToOffset({ offset: newScrollY });
        },
        [isFocus]
    );

    useAnimatedReaction(
        () => (scrollY ? scrollY.value : 0),
        (newScrollY) => {
            if (!scrollY) return;
            runOnJS(setInitialScroll)(newScrollY);
        },
        [setInitialScroll]
    );
    const scrollHandler = useAnimatedScrollHandler(
        {
            onScroll: (e) => {
                if (!isFocus) return;
                if (!editScrollY) return;
                editScrollY(e.contentOffset.y);
            },
        },
        [editScrollY, isFocus]
    );

    useFocusEffect(
        React.useCallback(() => {
            if (!refreshing) return;
            if (status === 'SUCCESS' || status === 'ERROR')
                setRefreshing(false);
        }, [refreshing, status])
    );
    useFocusEffect(React.useCallback(() => () => setRefreshing(false), []));

    React.useEffect(() => {
        InteractionManager.runAfterInteractions(() => {
            setDidFinishInitialAnimation(true);
        });
    }, []);
    React.useEffect(() => () => setDidFinishInitialAnimation(false), []);

    // TODO:
    // need a way to scroll top when a new model is posted

    if (!didFinishInitialAnimation) return null;

    return (
        <AnimatedFlatList
            contentContainerStyle={
                style(styleProps).animatedFlatListContentContainerStyle
            }
            data={allIds}
            extraData={allIds}
            getItemLayout={getItemLayout}
            initialNumToRender={15}
            keyExtractor={keyExtractor}
            maxToRenderPerBatch={15}
            numColumns={numColumns}
            onEndReached={onEndReach}
            onEndReachedThreshold={0.2}
            onScroll={scrollHandler}
            onScrollBeginDrag={onScrollBeginDrag}
            overScrollMode="never"
            ref={flatListRef || ref}
            refreshControl={refreshControl}
            removeClippedSubviews
            renderItem={renderItem}
            scrollEventThrottle={0.01}
            showsVerticalScrollIndicator={false}
            updateCellsBatchingPeriod={1}
            windowSize={41}
        />
    );
};

const style: ({
    minHeight,
    pb,
    pt,
}: {
    minHeight?: number;
    pb?: number;
    pt?: number;
}) => {
    animatedFlatListContentContainerStyle: StyleProp<ViewStyle>;
} = StyleSheet.create(({ minHeight, pb, pt }) => ({
    animatedFlatListContentContainerStyle: {
        minHeight,
        paddingBottom: (pb || 0) + 30,
        paddingTop: pt,
    },
}));

export default React.memo(CustomFlatList);
