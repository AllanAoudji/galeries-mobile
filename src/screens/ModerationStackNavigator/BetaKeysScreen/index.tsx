import { useFocusEffect } from '@react-navigation/native';
import * as React from 'react';
import { ListRenderItemInfo, useWindowDimensions } from 'react-native';
import { useDispatch, useSelector } from 'react-redux';

import {
    AddButton,
    BottomLoader,
    CustomFlatList,
    EmptyMessage,
    FullScreenContainer,
    FullScreenLoader,
} from '#components';
import { GLOBAL_STYLE } from '#helpers/constants';
import {
    getBetaKeys,
    refreshBetaKeys,
    selectBetaKeysAllIds,
    selectBetaKeysStatus,
} from '#store/betaKeys';

import RenderItem from './RenderItem';

type Props = {
    navigation: Screen.ModeratorStack.BetaKeysScreenNavigationProp;
};

const renderItem = ({ item }: ListRenderItemInfo<string>) => (
    <RenderItem item={item} />
);

const BetaKeysScreen = ({ navigation }: Props) => {
    const dimension = useWindowDimensions();
    const dispatch = useDispatch();

    const allIds = useSelector(selectBetaKeysAllIds);
    const status = useSelector(selectBetaKeysStatus);

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

    const handlePressAddButton = React.useCallback(() => {
        navigation.navigate('CreateBetakeyScreen');
    }, [navigation]);
    const handleRefresh = React.useCallback(() => {
        if (status.includes('LOADING')) return;
        if (status === 'REFRESH') return;
        dispatch(refreshBetaKeys());
    }, [status]);
    const handleEndReach = React.useCallback(() => {
        if (status.includes('LOADING')) return;
        if (status === 'REFRESH') return;
        dispatch(getBetaKeys());
    }, [status]);

    useFocusEffect(
        React.useCallback(() => {
            if (status !== 'PENDING') return;
            dispatch(getBetaKeys());
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
                    text="No beta key found"
                />
            )}
            <AddButton onPress={handlePressAddButton} />
            <FullScreenLoader show={showFullScreenLoader} />
            <BottomLoader bottom="huge" show={showBottomLoader} />
        </FullScreenContainer>
    );
};

export default BetaKeysScreen;
