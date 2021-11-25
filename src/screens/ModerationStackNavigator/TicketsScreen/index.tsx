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
    getTickets,
    refreshTickets,
    selectTicketsAllIds,
    selectTicketsStatus,
} from '#store/tickets';

import RenderItem from './RenderItem';

const renderItem = ({ index, item }: ListRenderItemInfo<string>) => (
    <RenderItem index={index} item={item} />
);

const TicketsScreen = () => {
    const dimension = useWindowDimensions();
    const dispatch = useDispatch();

    const allIds = useSelector(selectTicketsAllIds);
    const status = useSelector(selectTicketsStatus);

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
        dispatch(refreshTickets());
    }, [status]);
    const handleEndReach = React.useCallback(() => {
        if (status.includes('LOADING')) return;
        if (status === 'REFRESH') return;
        dispatch(getTickets());
    }, [status]);

    useFocusEffect(
        React.useCallback(() => {
            if (status !== 'PENDING') return;
            dispatch(getTickets());
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
                    text="No ticket found"
                />
            )}
            <FullScreenLoader show={showFullScreenLoader} />
            <BottomLoader bottom="huge" show={showBottomLoader} />
        </FullScreenContainer>
    );
};

export default TicketsScreen;
