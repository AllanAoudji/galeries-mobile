import { useFocusEffect } from '@react-navigation/native';
import * as React from 'react';
import { RefreshControl, useWindowDimensions } from 'react-native';
import { useDispatch, useSelector } from 'react-redux';
import { useTheme } from 'styled-components';

import { EmptyMessage } from '#components';
import {
    refreshGaleries,
    selectGaleriesFilterName,
    selectGaleriesNameStatus,
} from '#store/galeries';

import { InnerContainer, StyledAnimatedScrollView } from './styles';
import { GLOBAL_STYLE } from '#helpers/constants';

type Props = {
    scrollHandler: any;
};

const EmptyScrollView = ({ scrollHandler }: Props) => {
    const dispatch = useDispatch();
    const dimension = useWindowDimensions();
    const theme = useTheme();

    const filterGaleriesName = useSelector(selectGaleriesFilterName);
    const loading = useSelector(selectGaleriesNameStatus);

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
        dispatch(refreshGaleries(filterGaleriesName));
    }, [filterGaleriesName]);

    useFocusEffect(
        React.useCallback(() => {
            if (loading === 'SUCCESS' && refreshing) setRefreshing(false);
        }, [loading, refreshing])
    );

    return (
        <StyledAnimatedScrollView
            onScroll={scrollHandler}
            showsVerticalScrollIndicator={false}
            refreshControl={
                <RefreshControl
                    colors={colors}
                    onRefresh={handleRefresh}
                    progressViewOffset={GLOBAL_STYLE.HEADER_TAB_HEIGHT}
                    progressBackgroundColor={theme.colors['secondary-light']}
                    refreshing={refreshing}
                />
            }
        >
            <InnerContainer
                height={dimension.height + GLOBAL_STYLE.SEARCH_BAR_HEIGHT}
            >
                <EmptyMessage text="no galerie found" />
            </InnerContainer>
        </StyledAnimatedScrollView>
    );
};

export default EmptyScrollView;
