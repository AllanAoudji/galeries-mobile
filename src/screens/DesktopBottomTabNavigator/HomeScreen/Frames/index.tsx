import * as React from 'react';
import { ListRenderItemInfo } from 'react-native';
import { useDispatch, useSelector } from 'react-redux';

import { AnimatedFlatList, FrameCard } from '#components';
import { getFrames, selectFrame } from '#store/frames';
import { GLOBAL_STYLE } from '#helpers/constants';

type Props = {
    frames: string[];
    paddingTop: number;
    scrollHandler: any;
};

const RenderItem = React.memo(({ item }: { item: string }) => {
    const frameSelector = React.useMemo(() => selectFrame(item), [item]);
    const frame = useSelector(frameSelector);

    return (
        <FrameCard
            frame={frame}
            onPressComments={() => {}}
            onPressLikes={() => {}}
        />
    );
});

const renderItem = ({ item }: ListRenderItemInfo<string>) => {
    return <RenderItem item={item} />;
};

const Frames = ({ frames, paddingTop, scrollHandler }: Props) => {
    const disaptch = useDispatch();

    const handleEndReach = React.useCallback(() => {
        disaptch(getFrames());
    }, []);
    const keyExtractor = React.useCallback((data: string) => data, []);

    return (
        <AnimatedFlatList
            contentContainerStyle={{
                paddingBottom: GLOBAL_STYLE.BOTTOM_TAB_HEIGHT,
                paddingTop,
            }}
            data={frames}
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
