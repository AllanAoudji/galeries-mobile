import { useFocusEffect } from '@react-navigation/native';
import * as React from 'react';
import { RefreshControl, useWindowDimensions } from 'react-native';
import { useDispatch, useSelector } from 'react-redux';
import { useTheme } from 'styled-components/native';

import { EmptyMessage } from '#components';
import { GLOBAL_STYLE } from '#helpers/constants';
import { refreshFrames, selectFramesStatus } from '#store/frames';

import { InnerContainer, StyledScrollView } from './styles';

const EmptyScrollView = () => {
    const dimension = useWindowDimensions();
    const dispatch = useDispatch();
    const theme = useTheme();

    const status = useSelector(selectFramesStatus);

    const [refreshing, setRefreshing] = React.useState<boolean>(false);

    const colors = React.useMemo(
        () => [
            theme.colors.primary,
            theme.colors['primary-dark'],
            theme.colors['primary-light'],
        ],
        [theme]
    );

    const handleRefresh = React.useCallback(() => {
        setRefreshing(true);
        if (!status.includes('LOADING') && status !== 'REFRESH') {
            dispatch(refreshFrames());
        }
    }, [status]);

    useFocusEffect(
        React.useCallback(() => {
            if (status === 'SUCCESS' && refreshing) setRefreshing(false);
        }, [refreshing, status])
    );

    return (
        <StyledScrollView
            overScrollMode="never"
            refreshControl={
                <RefreshControl
                    colors={colors}
                    onRefresh={handleRefresh}
                    progressBackgroundColor={theme.colors['secondary-light']}
                    refreshing={refreshing}
                />
            }
            showsVerticalScrollIndicator={false}
        >
            <InnerContainer
                height={dimension.height - GLOBAL_STYLE.HEADER_TAB_HEIGHT}
            >
                <EmptyMessage text="no frames found" />
            </InnerContainer>
        </StyledScrollView>
    );
};

export default EmptyScrollView;
