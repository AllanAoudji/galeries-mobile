import * as React from 'react';
import {
    ListRenderItemInfo,
    StyleProp,
    StyleSheet,
    ViewStyle,
} from 'react-native';
import { useDispatch } from 'react-redux';

import { GLOBAL_STYLE } from '#helpers/constants';
import { AnimatedFlatList } from '#components';
import { getFrames } from '#store/frames';

import RenderItem from './RenderItem';

type Props = {
    allIds: string[];
    paddingTop: number;
    scrollHandler: any;
};

const renderItem = ({ item }: ListRenderItemInfo<string>) => (
    <RenderItem item={item} />
);

const Frames = ({ allIds, paddingTop, scrollHandler }: Props) => {
    const disaptch = useDispatch();

    const paddingTopStyle = React.useMemo(() => ({ paddingTop }), [paddingTop]);

    const handleEndReach = React.useCallback(() => disaptch(getFrames()), []);
    const keyExtractor = React.useCallback((data: string) => data, []);

    return (
        <AnimatedFlatList
            contentContainerStyle={
                style(paddingTopStyle).animatedFlatListContentContainerStyle
            }
            data={allIds}
            initialNumToRender={10}
            keyExtractor={keyExtractor}
            maxToRenderPerBatch={10}
            onEndReached={handleEndReach}
            onEndReachedThreshold={0.2}
            onScroll={scrollHandler}
            renderItem={renderItem}
            scrollEventThrottle={4}
            showsVerticalScrollIndicator={false}
        />
    );
};

const style: ({ paddingTop }: { paddingTop: number }) => {
    animatedFlatListContentContainerStyle: StyleProp<ViewStyle>;
} = StyleSheet.create(({ paddingTop }) => ({
    animatedFlatListContentContainerStyle: {
        paddingBottom: GLOBAL_STYLE.BOTTOM_TAB_HEIGHT,
        paddingTop,
    },
}));

export default Frames;