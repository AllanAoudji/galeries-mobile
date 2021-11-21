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
import ProfileTabViewMaxScroll from '#helpers/ProfileTabViewMaxScroll';
import {
    getProfilePictures,
    selectCurrentUserCurrentProfilePictureStatus,
    selectProfilePicturesAllIds,
} from '#store/profilePictures';

import AddProfilePictureButton from './AddProfilePictureButton';
import RenderItem from './RenderItem';

type Props = {
    current: boolean;
    editScrollY: (offsetY: number, withAnimation?: boolean) => void;
    scrollY: Animated.SharedValue<number>;
};

const PADDING_TOP =
    GLOBAL_STYLE.PROFILE_TAB_BAR_INFOS + GLOBAL_STYLE.PROFILE_TAB_BAR_MENU;

const renderItem = ({ item }: ListRenderItemInfo<string>) => (
    <RenderItem item={item} />
);

const ProfilePicturesScreen = ({ current, editScrollY, scrollY }: Props) => {
    const dimension = useWindowDimensions();
    const dispatch = useDispatch();

    const allIds = useSelector(selectProfilePicturesAllIds);
    const status = useSelector(selectCurrentUserCurrentProfilePictureStatus);

    const minHeight = React.useMemo(
        () => dimension.height + ProfileTabViewMaxScroll,
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
        if (!current) return;
        if (!status) return;
        if (status.includes('LOADING')) return;
        if (status === 'REFRESH') return;
        dispatch(getProfilePictures());
    }, [current, status]);

    useFocusEffect(
        React.useCallback(() => {
            if (!status) return;
            if (status !== 'PENDING') return;
            dispatch(getProfilePictures());
        }, [status])
    );

    return (
        <GalerieTabbarScreenContainer>
            {allIds && allIds.length > 0 ? (
                <CustomFlatList
                    allIds={allIds}
                    editScrollY={editScrollY}
                    isFocus={current}
                    minHeight={minHeight}
                    numColumns={2}
                    onEndReach={handleEndReach}
                    pb={GLOBAL_STYLE.BOTTOM_TAB_HEIGHT}
                    pt={PADDING_TOP}
                    renderItem={renderItem}
                    scrollY={scrollY}
                    status={status || 'PENDING'}
                />
            ) : (
                <EmptyMessage
                    editScrollY={editScrollY}
                    height={dimension.height + ProfileTabViewMaxScroll}
                    isFocus={current}
                    scrollY={scrollY}
                    text="You don't have any profile picture yet. Click on the + button to post a new one"
                />
            )}
            <AddProfilePictureButton />
            <FullScreenLoader show={showFullScreenLoader} />
            <BottomLoader bottom="huge" show={showBottomLoader} />
        </GalerieTabbarScreenContainer>
    );
};

export default React.memo(ProfilePicturesScreen);
