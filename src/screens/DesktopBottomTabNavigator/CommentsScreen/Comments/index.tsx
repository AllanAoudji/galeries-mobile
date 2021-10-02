import * as React from 'react';
import { FlatList, ListRenderItemInfo } from 'react-native';
import { useDispatch } from 'react-redux';

import { AnimatedFlatList } from '#components';
import { getFrameComments } from '#store/comments';

import RenderItem from './RenderItem';

type CommentsProps = {
    allIds?: string[];
    flatListRef: React.MutableRefObject<FlatList<any> | null>;
    frameId?: string;
    paddingBottom: number;
    paddingTop: number;
    scrollHandler: any;
};
type CommentsListProps = {
    allIds: string[];
    flatListRef: React.MutableRefObject<FlatList<any> | null>;
    frameId: string;
    paddingBottom: number;
    paddingTop: number;
    scrollHandler: any;
};

const renderItem = ({ item }: ListRenderItemInfo<string>) => (
    <RenderItem item={item} />
);

const CommentsList = ({
    allIds,
    flatListRef,
    frameId,
    paddingBottom,
    paddingTop,
    scrollHandler,
}: CommentsListProps) => {
    const dispatch = useDispatch();

    const handleEndReach = React.useCallback(
        () => dispatch(getFrameComments(frameId)),
        []
    );
    const keyExtractor = React.useCallback((data: string) => data, []);

    return (
        <AnimatedFlatList
            contentContainerStyle={{
                paddingBottom: paddingBottom + 15,
                paddingTop: paddingTop + 30,
            }}
            data={allIds}
            initialNumToRender={15}
            keyExtractor={keyExtractor}
            maxToRenderPerBatch={15}
            onScroll={scrollHandler}
            onEndReached={handleEndReach}
            onEndReachedThreshold={0.2}
            ref={flatListRef}
            removeClippedSubviews
            renderItem={renderItem}
            scrollEventThrottle={4}
            showsVerticalScrollIndicator={false}
        />
    );
};

const Comments = ({
    allIds,
    frameId,
    flatListRef,
    paddingBottom,
    paddingTop,
    scrollHandler,
}: CommentsProps) => {
    if (!allIds || !frameId) return null;

    return (
        <CommentsList
            allIds={allIds}
            flatListRef={flatListRef}
            frameId={frameId}
            paddingBottom={paddingBottom}
            paddingTop={paddingTop}
            scrollHandler={scrollHandler}
        />
    );
};

export default Comments;
