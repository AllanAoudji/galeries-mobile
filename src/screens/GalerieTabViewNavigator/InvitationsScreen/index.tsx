import { useFocusEffect, useNavigation } from '@react-navigation/native';
import * as React from 'react';
import { ListRenderItemInfo, useWindowDimensions } from 'react-native';
import Animated from 'react-native-reanimated';
import { useDispatch, useSelector } from 'react-redux';

import {
    AddButton,
    BottomLoader,
    CustomFlatList,
    EmptyMessage,
    FullScreenLoader,
    GalerieTabbarScreenContainer,
} from '#components';
import { GLOBAL_STYLE } from '#helpers/constants';
import GalerieTabViewMaxScroll from '#helpers/GalerieTabViewMaxScroll';
import {
    getGalerieInvitations,
    refreshGalerieInvitations,
    selectCurrentGalerieInvitationsAllIds,
    selectCurrentGalerieInvitationsStatus,
} from '#store/invitations';

import RenderItem from './RenderItem';

type Props = {
    current: boolean;
    editScrollY: (offsetY: number) => void;
    galerie?: Store.Models.Galerie;
    scrollY: Animated.SharedValue<number>;
};

const PADDING_TOP =
    GLOBAL_STYLE.GALERIE_TAB_BAR_COVER_PICTURE +
    GLOBAL_STYLE.GALERIE_TAB_BAR_MENU;

const renderItem = ({ item }: ListRenderItemInfo<string>) => (
    <RenderItem item={item} />
);

const InvitationsScreen = ({
    current,
    editScrollY,
    galerie,
    scrollY,
}: Props) => {
    const dimension = useWindowDimensions();
    const dispatch = useDispatch();
    const navigation =
        useNavigation<Screen.DesktopBottomTab.GalerieNavigationProp>();

    const allIds = useSelector(selectCurrentGalerieInvitationsAllIds);
    const status = useSelector(selectCurrentGalerieInvitationsStatus);

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
        dispatch(getGalerieInvitations(galerie.id));
    }, [galerie]);
    const handlePressAddButton = React.useCallback(() => {
        navigation.navigate('CreateInvitation');
    }, [navigation]);
    const handleRefresh = React.useCallback(() => {
        if (!galerie) return;
        if (!status) return;
        if (status.includes('LOADING')) return;
        if (status === 'REFRESH') return;
        dispatch(refreshGalerieInvitations(galerie.id));
    }, [galerie, status]);

    useFocusEffect(
        React.useCallback(() => {
            if (!galerie) return;
            if (!status) return;
            if (status !== 'PENDING') return;
            dispatch(getGalerieInvitations(galerie.id));
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
                    text="this galerie doesn't have invitation yet. Click on the + button to post a new one"
                />
            )}
            <AddButton
                bottom="largest"
                onPress={handlePressAddButton}
                right="normal"
            />
            <FullScreenLoader show={showFullScreenLoader} />
            <BottomLoader bottom="huge" show={showBottomLoader} />
        </GalerieTabbarScreenContainer>
    );
};

export default React.memo(InvitationsScreen);
