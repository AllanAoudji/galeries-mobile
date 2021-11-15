import { useFocusEffect } from '@react-navigation/native';
import * as React from 'react';
import {
    InteractionManager,
    RefreshControl,
    useWindowDimensions,
} from 'react-native';
import { ScrollView } from 'react-native-gesture-handler';
import Animated, {
    runOnJS,
    useAnimatedReaction,
    useAnimatedScrollHandler,
} from 'react-native-reanimated';
import { useDispatch, useSelector } from 'react-redux';
import { useTheme } from 'styled-components/native';

import { EmptyMessage } from '#components';
import { GLOBAL_STYLE } from '#helpers/constants';
import GalerieTabViewMaxScroll from '#helpers/GalerieTabViewMaxScroll';
import {
    refreshGalerieBlackLists,
    selectCurrentGalerieGalerieBlackListsStatus,
} from '#store/galerieBlackLists';

import { InnerContainer, StyledAnimatedScrollView } from './styles';

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

    const loading = useSelector(selectCurrentGalerieGalerieBlackListsStatus);

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
        if (galerie)
            InteractionManager.runAfterInteractions(() => {
                dispatch(refreshGalerieBlackLists(galerie.id));
            });
    }, [galerie]);
    const setInitialScroll = React.useCallback(
        (newScrollY: number) => {
            if (scrollViewRef.current && !current) {
                scrollViewRef.current.scrollTo({ y: newScrollY });
            }
        },
        [current]
    );

    useAnimatedReaction(
        () => scrollY.value,
        (newScrollY) => {
            runOnJS(setInitialScroll)(newScrollY);
        },
        [setInitialScroll]
    );
    const scrollHandler = useAnimatedScrollHandler(
        {
            onScroll: (e) => {
                if (current) editScrollY(e.contentOffset.y);
            },
        },
        [current, editScrollY]
    );

    React.useEffect(() => {
        if (current) editScrollY(0);
    }, []);

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
                <EmptyMessage text="no other has been black listed from this galerie" />
            </InnerContainer>
        </StyledAnimatedScrollView>
    );
};

export default React.memo(EmptyScrollView);
