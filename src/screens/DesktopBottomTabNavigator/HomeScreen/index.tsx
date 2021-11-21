import { useFocusEffect } from '@react-navigation/native';
import * as React from 'react';
import { ListRenderItemInfo, useWindowDimensions } from 'react-native';
import { useDispatch, useSelector } from 'react-redux';

import {
    BottomLoader,
    CustomFlatList,
    EmptyMessage,
    FullScreenContainer,
    FullScreenLoader,
} from '#components';
import { GLOBAL_STYLE } from '#helpers/constants';
import {
    getFrames,
    refreshFrames,
    selectFramesAllIds,
    selectFramesStatus,
} from '#store/frames';

import RenderItem from './RenderItem';

const renderItem = ({ item }: ListRenderItemInfo<string>) => (
    <RenderItem item={item} />
);

const HomeScreen = () => {
    const dimension = useWindowDimensions();
    const dispatch = useDispatch();

    const allIds = useSelector(selectFramesAllIds);
    const status = useSelector(selectFramesStatus);

    const EmptyMessageHeight = React.useMemo(
        () => dimension.height - GLOBAL_STYLE.HEADER_TAB_HEIGHT,
        [dimension]
    );
    const showBottomLoader = React.useMemo(
        () => status === 'LOADING',
        [status]
    );
    const showFullScreenLoader = React.useMemo(
        () => status === 'PENDING' || status === 'INITIAL_LOADING',
        [status]
    );

    const handleRefresh = React.useCallback(() => {
        if (status.includes('LOADING')) return;
        if (status === 'REFRESH') return;
        dispatch(refreshFrames());
    }, [status]);
    const handleEndReach = React.useCallback(() => {
        if (status.includes('LOADING')) return;
        if (status === 'REFRESH') return;
        dispatch(getFrames());
    }, [status]);

    useFocusEffect(
        React.useCallback(() => {
            if (status !== 'PENDING') return;
            dispatch(getFrames());
        }, [status])
    );

    return (
        <FullScreenContainer>
            {allIds.length > 0 ? (
                <CustomFlatList
                    allIds={allIds}
                    onEndReach={handleEndReach}
                    onRefresh={handleRefresh}
                    pb={GLOBAL_STYLE.BOTTOM_TAB_HEIGHT}
                    renderItem={renderItem}
                    status={status}
                />
            ) : (
                <EmptyMessage
                    height={EmptyMessageHeight}
                    onRefresh={handleRefresh}
                    refreshStatus={status}
                    text="No frames found"
                />
            )}
            <FullScreenLoader show={showFullScreenLoader} />
            <BottomLoader bottom="huge" show={showBottomLoader} />
        </FullScreenContainer>
    );
};

export default HomeScreen;
