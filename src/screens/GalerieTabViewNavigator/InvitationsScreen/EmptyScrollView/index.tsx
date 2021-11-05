import { useFocusEffect } from '@react-navigation/native';
import * as React from 'react';
import { RefreshControl, useWindowDimensions } from 'react-native';
import { ScrollView } from 'react-native-gesture-handler';
import Animated, {
    runOnJS,
    useAnimatedReaction,
    useAnimatedScrollHandler,
} from 'react-native-reanimated';
import { useDispatch, useSelector } from 'react-redux';
import { useTheme } from 'styled-components/native';

import {
    refreshGalerieInvitations,
    selectCurrentGalerieInvitationsStatus,
} from '#store/invitations';

import { EmptyMessage } from '#components';

import { InnerContainer, StyledAnimatedScrollView } from './styles';
import GalerieTabViewMaxScroll from '#helpers/GalerieTabViewMaxScroll';
import { GLOBAL_STYLE } from '#helpers/constants';

type Props = {
    current: boolean;
    editScrollY: (offsetY: number) => void;
    galerie?: Store.Models.Galerie;
    scrollY: Animated.SharedValue<number>;
};

const EmptyScrollView = ({ current, editScrollY, galerie, scrollY }: Props) => {
    const dimension = useWindowDimensions();
    const dispatch = useDispatch();
    const theme = useTheme();

    const scrollViewRef = React.useRef<ScrollView | null>(null);

    const loading = useSelector(selectCurrentGalerieInvitationsStatus);

    const [refreshing, setRefreshing] = React.useState<boolean>(false);

    const colors = React.useMemo(
        () => [
            theme.colors.primary,
            theme.colors['primary-dark'],
            theme.colors['primary-light'],
        ],
        []
    );

    const handleRefresh = React.useCallback(() => {
        setRefreshing(true);
        if (galerie) dispatch(refreshGalerieInvitations(galerie.id));
    }, [galerie]);
    const setInitialScroll = React.useCallback(
        (newScrollY: number) => {
            if (scrollViewRef.current && !current) {
                scrollViewRef.current.scrollTo({
                    animated: false,
                    y: newScrollY,
                });
            }
        },
        [current]
    );

    useAnimatedReaction(
        () => scrollY.value,
        (newScrollY) => {
            runOnJS(setInitialScroll)(newScrollY);
        },
        [current]
    );
    const scrollHandler = useAnimatedScrollHandler(
        {
            onScroll: (e) => {
                if (current) editScrollY(e.contentOffset.y);
            },
        },
        [editScrollY, current]
    );

    useFocusEffect(
        React.useCallback(() => {
            if (loading === 'SUCCESS' && refreshing) setRefreshing(false);
        }, [loading, refreshing])
    );

    return (
        <StyledAnimatedScrollView
            onScroll={scrollHandler}
            ref={scrollViewRef}
            refreshControl={
                <RefreshControl
                    colors={colors}
                    onRefresh={handleRefresh}
                    progressViewOffset={
                        GLOBAL_STYLE.GALERIE_TAB_BAR_COVER_PICTURE +
                        GLOBAL_STYLE.GALERIE_TAB_BAR_MENU
                    }
                    progressBackgroundColor={theme.colors['secondary-light']}
                    refreshing={refreshing}
                />
            }
            showsVerticalScrollIndicator={false}
        >
            <InnerContainer height={dimension.height + GalerieTabViewMaxScroll}>
                <EmptyMessage text="this galerie doesn't have invitation yet. Click on the + button to post a new one" />
            </InnerContainer>
        </StyledAnimatedScrollView>
    );
};

export default EmptyScrollView;
