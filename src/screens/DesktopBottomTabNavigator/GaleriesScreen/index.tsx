import * as React from 'react';
import {
    Keyboard,
    ListRenderItemInfo,
    useWindowDimensions,
} from 'react-native';
import { useDispatch, useSelector } from 'react-redux';

import {
    BottomLoader,
    CustomFlatList,
    EmptyMessage,
    FullScreenContainer,
    FullScreenLoader,
} from '#components';
import { GaleriesSearchContext } from '#contexts/GaleriesSearchContext';
import { GLOBAL_STYLE } from '#helpers/constants';
import {
    getGaleries,
    refreshGaleries,
    selectGaleriesAllIds,
    selectGaleriesFilterName,
    selectGaleriesNameStatus,
} from '#store/galeries';

import RenderItem from './RenderItem';

const renderItem = ({ item }: ListRenderItemInfo<string>) => (
    <RenderItem item={item} />
);

const GaleriesScreen = () => {
    const dimension = useWindowDimensions();
    const dispatch = useDispatch();

    const { searchFinished } = React.useContext(GaleriesSearchContext);

    const allIds = useSelector(selectGaleriesAllIds);
    const filterGaleriesName = useSelector(selectGaleriesFilterName);
    const status = useSelector(selectGaleriesNameStatus);

    const emptyMessageHeight = React.useMemo(
        () => dimension.height - GLOBAL_STYLE.HEADER_TAB_HEIGHT,
        [dimension]
    );

    const showFullScreenLoader = React.useMemo(
        () =>
            status === 'PENDING' ||
            status === 'INITIAL_LOADING' ||
            !searchFinished,
        [status, searchFinished]
    );
    const showBottomLoader = React.useMemo(
        () => status === 'LOADING',
        [status]
    );

    const getItemLayout = React.useCallback(
        (_, index) => ({
            length: GLOBAL_STYLE.GALERIE_CARD_HEIGHT,
            offset: GLOBAL_STYLE.GALERIE_CARD_HEIGHT * index,
            index,
        }),
        []
    );
    const handleEndReach = React.useCallback(() => {
        if (status.includes('LOADING')) return;
        if (status === 'REFRESH') return;
        dispatch(getGaleries(filterGaleriesName));
    }, [filterGaleriesName, status]);
    const handleRefresh = React.useCallback(() => {
        if (status.includes('LOADING') || status === 'REFRESH')
            dispatch(refreshGaleries(filterGaleriesName));
    }, [filterGaleriesName, status]);
    const handleScrollBeginDrag = React.useCallback(
        () => Keyboard.dismiss(),
        []
    );

    return (
        <FullScreenContainer>
            {!!allIds && allIds.length > 0 ? (
                <CustomFlatList
                    allIds={allIds}
                    getItemLayout={getItemLayout}
                    onEndReach={handleEndReach}
                    onRefresh={handleRefresh}
                    onScrollBeginDrag={handleScrollBeginDrag}
                    pb={GLOBAL_STYLE.BOTTOM_TAB_HEIGHT}
                    renderItem={renderItem}
                    status={status || 'PENDING'}
                />
            ) : (
                <EmptyMessage
                    height={emptyMessageHeight}
                    onRefresh={handleRefresh}
                    refreshStatus={status}
                    text="no galerie found"
                />
            )}
            <FullScreenLoader show={showFullScreenLoader} />
            <BottomLoader bottom="huge" show={showBottomLoader} />
        </FullScreenContainer>
    );
};

export default GaleriesScreen;
