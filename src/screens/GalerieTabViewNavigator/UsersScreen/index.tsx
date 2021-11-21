import { useFocusEffect } from '@react-navigation/native';
import * as React from 'react';
import { ListRenderItemInfo, useWindowDimensions } from 'react-native';
import Animated from 'react-native-reanimated';
import { useDispatch, useSelector } from 'react-redux';

import {
    BottomLoader,
    CustomFlatList,
    EmptyMessage,
    FullScreenLoader,
    GalerieTabbarScreenContainer,
} from '#components';
import { GLOBAL_STYLE } from '#helpers/constants';
import GalerieTabViewMaxScroll from '#helpers/GalerieTabViewMaxScroll';
import {
    getGalerieUsers,
    refreshGalerieUsers,
    selectCurrentGalerieUsersAllIds,
    selectCurrentGalerieUsersStatus,
} from '#store/users';

import RenderItem from './RenderItem';

type Props = {
    current: boolean;
    editScrollY: (offsetY: number) => void;
    galerie?: Store.Models.Galerie;
    scrollY: Animated.SharedValue<number>;
};

const renderItem = ({ index, item }: ListRenderItemInfo<string>) => (
    <RenderItem index={index} item={item} />
);

const PADDING_TOP =
    GLOBAL_STYLE.GALERIE_TAB_BAR_COVER_PICTURE +
    GLOBAL_STYLE.GALERIE_TAB_BAR_MENU;

const UsersScreen = ({ current, editScrollY, galerie, scrollY }: Props) => {
    const dimension = useWindowDimensions();
    const dispatch = useDispatch();

    const allIds = useSelector(selectCurrentGalerieUsersAllIds);
    const status = useSelector(selectCurrentGalerieUsersStatus);

    const minHeight = React.useMemo(
        () => dimension.height + GalerieTabViewMaxScroll,
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

    const handleEndReach = React.useCallback(() => {
        if (!galerie) return;
        if (!status) return;
        if (status.includes('LOADING')) return;
        if (status === 'REFRESH') return;
        dispatch(getGalerieUsers(galerie.id));
    }, [galerie, status]);
    const handleRefresh = React.useCallback(() => {
        if (!galerie) return;
        if (!status) return;
        if (status.includes('LOADING')) return;
        if (status === 'REFRESH') return;
        dispatch(refreshGalerieUsers(galerie.id));
    }, [galerie, status]);

    useFocusEffect(
        React.useCallback(() => {
            if (!galerie) return;
            if (!status) return;
            if (status !== 'PENDING') return;
            dispatch(getGalerieUsers(galerie.id));
        }, [galerie, status])
    );

    return (
        <GalerieTabbarScreenContainer>
            {allIds && allIds.length > 0 ? (
                <CustomFlatList
                    allIds={allIds}
                    editScrollY={editScrollY}
                    isFocus={current}
                    minHeight={minHeight}
                    onEndReach={handleEndReach}
                    onRefresh={handleRefresh}
                    pb={GLOBAL_STYLE.BOTTOM_TAB_HEIGHT}
                    progressViewOffset={PADDING_TOP}
                    pt={PADDING_TOP}
                    renderItem={renderItem}
                    scrollY={scrollY}
                    status={status || 'PENDING'}
                />
            ) : (
                <EmptyMessage
                    editScrollY={editScrollY}
                    height={dimension.height + GalerieTabViewMaxScroll}
                    isFocus={current}
                    onRefresh={handleRefresh}
                    progressViewOffset={PADDING_TOP}
                    refreshStatus={status}
                    scrollY={scrollY}
                    text="no other user follow this galerie yet."
                />
            )}
            <FullScreenLoader show={showFullScreenLoader} />
            <BottomLoader show={showBottomLoader} bottom="huge" />
        </GalerieTabbarScreenContainer>
    );
};

export default React.memo(UsersScreen);
