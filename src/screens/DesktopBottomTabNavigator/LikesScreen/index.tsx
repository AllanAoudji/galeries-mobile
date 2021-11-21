import { useFocusEffect } from '@react-navigation/native';
import * as React from 'react';
import { ListRenderItemInfo } from 'react-native';
import { useDispatch, useSelector } from 'react-redux';

import {
    BottomLoader,
    CustomFlatList,
    FullScreenContainer,
    FullScreenLoader,
} from '#components';
import { GLOBAL_STYLE } from '#helpers/constants';
import { selectCurrentFrame } from '#store/frames';
import {
    getFrameLikes,
    refreshFrameLikes,
    selectCurrentFrameLikesAllIds,
    selectCurrentFrameLikesStatus,
} from '#store/likes';

import RenderItem from './RenderItem';

type Props = {
    navigation: Screen.DesktopBottomTab.LikesNavigationProp;
};

const renderItem = ({ index, item }: ListRenderItemInfo<string>) => {
    return <RenderItem index={index} item={item} />;
};

const LikesScreen = ({ navigation }: Props) => {
    const dispatch = useDispatch();

    const allIds = useSelector(selectCurrentFrameLikesAllIds);
    const currentFrame = useSelector(selectCurrentFrame);
    const status = useSelector(selectCurrentFrameLikesStatus);

    const showBottomLoader = React.useMemo(
        () => status === 'LOADING',
        [status]
    );
    const showFullScreenLoader = React.useMemo(
        () => status === 'PENDING' || status === 'INITIAL_LOADING',
        [status]
    );

    const getItemLayout = React.useCallback(
        (_, index) => ({
            index,
            length: GLOBAL_STYLE.USER_CARD_HEIGHT,
            offset: GLOBAL_STYLE.USER_CARD_HEIGHT * index,
        }),
        []
    );
    const handleEndReach = React.useCallback(() => {
        if (!currentFrame) return;
        if (!status) return;
        if (status.includes('LOADING')) return;
        if (status === 'REFRESH') return;
        dispatch(getFrameLikes(currentFrame.id));
    }, [currentFrame, status]);
    const handleRefresh = React.useCallback(() => {
        if (!currentFrame) return;
        if (!status) return;
        if (status.includes('LOADING')) return;
        if (status === 'REFRESH') return;
        dispatch(refreshFrameLikes(currentFrame.id));
    }, [currentFrame, status]);

    useFocusEffect(
        React.useCallback(() => {
            if (!currentFrame) return;
            if (status && status !== 'PENDING') return;
            dispatch(getFrameLikes(currentFrame.id));
        }, [currentFrame, status])
    );
    useFocusEffect(
        React.useCallback(() => {
            if (currentFrame) return;
            if (navigation.canGoBack()) navigation.goBack();
            else navigation.navigate('Home');
        }, [currentFrame, navigation])
    );
    useFocusEffect(
        React.useCallback(() => {
            if (!allIds) return;
            if (allIds.length >= 1) return;
            if (navigation.canGoBack()) navigation.goBack();
            else navigation.navigate('Home');
        }, [allIds, navigation])
    );

    if (!currentFrame) return null;

    return (
        <FullScreenContainer>
            {!!allIds && allIds.length > 0 && (
                <CustomFlatList
                    allIds={allIds}
                    getItemLayout={getItemLayout}
                    onEndReach={handleEndReach}
                    onRefresh={handleRefresh}
                    pb={GLOBAL_STYLE.BOTTOM_TAB_HEIGHT}
                    renderItem={renderItem}
                    status={status || 'PENDING'}
                />
            )}
            <FullScreenLoader show={showFullScreenLoader} />
            <BottomLoader show={showBottomLoader} />
        </FullScreenContainer>
    );
};

export default LikesScreen;
