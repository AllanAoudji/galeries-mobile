import * as React from 'react';
import {
    ListRenderItemInfo,
    StyleProp,
    StyleSheet,
    ViewStyle,
} from 'react-native';
import { useDispatch, useSelector } from 'react-redux';

import {
    AnimatedFlatList,
    BottomLoader,
    DefaultHeader,
    FullScreenLoader,
} from '#components';
import { GLOBAL_STYLE } from '#helpers/constants';
import { useComponentSize, useHideHeaderOnScroll } from '#hooks';
import { getFrameLikes, selectCurrentFrameLikesStatus } from '#store/likes';

import RenderItem from './RenderItem';

type Props = {
    allIds?: string[];
    frameId: string;
};

const renderItem = ({ item }: ListRenderItemInfo<string>) => {
    return <RenderItem item={item} />;
};

const Likes = ({ allIds, frameId }: Props) => {
    const dispatch = useDispatch();
    const { onLayout, size } = useComponentSize();
    const { containerStyle, scrollHandler } = useHideHeaderOnScroll(
        GLOBAL_STYLE.HEADER_TAB_HEIGHT
    );

    const status = useSelector(selectCurrentFrameLikesStatus);

    const paddingTop = React.useMemo(() => (size ? size.height : 0), [size]);

    const handleEndReach = React.useCallback(() => {
        if (status && !status.includes('LOADING'))
            dispatch(getFrameLikes(frameId));
    }, [frameId]);
    const keyExtractor = React.useCallback((item: string) => item, []);

    React.useEffect(() => {
        if (!status || status === 'PENDING') dispatch(getFrameLikes(frameId));
    }, [frameId, status]);

    return (
        <>
            <DefaultHeader title="likes" variant="secondary" />
            {allIds && (
                <AnimatedFlatList
                    contentContainerStyle={
                        style({ paddingTop })
                            .animatedFlatListContentContainerStyle
                    }
                    data={allIds}
                    keyExtractor={keyExtractor}
                    maxToRenderPerBatch={4}
                    onEndReached={handleEndReach}
                    onEndReachedThreshold={0.2}
                    onScroll={scrollHandler}
                    removeClippedSubviews={true}
                    renderItem={renderItem}
                    scrollEventThrottle={4}
                    showsVerticalScrollIndicator={false}
                />
            )}
            <FullScreenLoader show={status === 'INITIAL_LOADING'} />
            <BottomLoader show={status === 'LOADING'} />
        </>
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

export default Likes;
