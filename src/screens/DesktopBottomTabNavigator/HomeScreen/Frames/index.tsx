import * as React from 'react';
import { ListRenderItemInfo } from 'react-native';
import { useDispatch } from 'react-redux';

import { AnimatedFlatList, FrameCard } from '#components';
import { getFrames } from '#store/frames';
import { GLOBAL_STYLE } from '#helpers/constants';

type Props = {
    frames: Store.Models.Frame[];
    paddingTop: number;
    scrollHandler: any;
};

const renderItem = ({ item }: ListRenderItemInfo<Store.Models.Frame>) => (
    <FrameCard
        onPressComments={() => {}}
        onPressLikes={() => {}}
        frame={item}
    />
);

const Frames = ({ frames, paddingTop, scrollHandler }: Props) => {
    const disaptch = useDispatch();

    const handleEndReach = React.useCallback(() => disaptch(getFrames()), []);
    const keyExtractor = React.useCallback(
        (data: Store.Models.Frame) => data.id,
        []
    );

    return (
        <AnimatedFlatList
            contentContainerStyle={{
                paddingBottom: GLOBAL_STYLE.BOTTOM_TAB_HEIGHT,
                paddingTop,
            }}
            data={frames}
            initialNumToRender={4}
            keyExtractor={keyExtractor}
            maxToRenderPerBatch={4}
            onEndReached={handleEndReach}
            onEndReachedThreshold={0.4}
            onScroll={scrollHandler}
            removeClippedSubviews
            renderItem={renderItem}
            scrollEventThrottle={4}
            showsVerticalScrollIndicator={false}
            windowSize={5}
        />
    );
};

export default React.memo(Frames);
