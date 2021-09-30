import * as React from 'react';
import { ListRenderItemInfo } from 'react-native';
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

    const handleEndReach = React.useCallback(() => disaptch(getFrames()), []);
    const keyExtractor = React.useCallback((data: string) => data, []);

    return (
        <AnimatedFlatList
            contentContainerStyle={{
                paddingBottom: GLOBAL_STYLE.BOTTOM_TAB_HEIGHT,
                paddingTop,
            }}
            data={allIds}
            initialNumToRender={10}
            keyExtractor={keyExtractor}
            maxToRenderPerBatch={10}
            onEndReached={handleEndReach}
            onEndReachedThreshold={0.2}
            onScroll={scrollHandler}
            removeClippedSubviews
            renderItem={renderItem}
            scrollEventThrottle={4}
            showsVerticalScrollIndicator={false}
        />
    );
};

export default Frames;
