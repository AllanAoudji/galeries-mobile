import { useFocusEffect } from '@react-navigation/native';
import * as React from 'react';
import {
    RefreshControl,
    ScrollView,
    useWindowDimensions,
    View,
} from 'react-native';
import Animated from 'react-native-reanimated';
import { useDispatch, useSelector } from 'react-redux';
import { useTheme } from 'styled-components';

import {
    refreshGaleries,
    selectGaleriesFilterName,
    selectGaleriesNameStatus,
} from '#store/galeries';
import { EmptyMessage } from '#components';

type Props = {
    innerPaddingTop: number;
    outerPaddingTop: number;
    scrollHandler: any;
};

const AnimatedScrollView = Animated.createAnimatedComponent<any>(ScrollView);

const EmptyScrollView = ({
    innerPaddingTop,
    outerPaddingTop,
    scrollHandler,
}: Props) => {
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
        <AnimatedScrollView
            style={{ flex: 1, paddingTop: outerPaddingTop - innerPaddingTop }}
            onScroll={scrollHandler}
            showsVerticalScrollIndicator={false}
            refreshControl={
                <RefreshControl
                    colors={colors}
                    onRefresh={handleRefresh}
                    progressViewOffset={outerPaddingTop}
                    progressBackgroundColor={theme.colors['secondary-light']}
                    refreshing={refreshing}
                />
            }
        >
            <View style={{ height: dimension.height + innerPaddingTop }}>
                <EmptyMessage text="no galerie found" />
            </View>
        </AnimatedScrollView>
    );
};

export default EmptyScrollView;
