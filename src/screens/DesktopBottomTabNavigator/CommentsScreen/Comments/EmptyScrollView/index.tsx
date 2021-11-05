import { useFocusEffect } from '@react-navigation/native';
import * as React from 'react';
import { RefreshControl, useWindowDimensions } from 'react-native';
import { useDispatch, useSelector } from 'react-redux';
import { useTheme } from 'styled-components/native';

import {
    refreshFrameComments,
    selectFrameCommentsStatus,
} from '#store/comments';
import { GLOBAL_STYLE } from '#helpers/constants';
import { EmptyMessage } from '#components';

import { InnerContainer, StyledAnimatedScrollView } from './styles';

type Props = {
    frameId: string;
    scrollHandler: any;
};

const EmptyScrollView = ({ frameId, scrollHandler }: Props) => {
    const dimension = useWindowDimensions();
    const dispatch = useDispatch();
    const theme = useTheme();

    const loadingSelector = React.useMemo(
        () => selectFrameCommentsStatus(frameId),
        [frameId]
    );
    const loading = useSelector(loadingSelector);

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
        if (!loading.includes('LOADING') && loading !== 'REFRESH') {
            setRefreshing(true);
            dispatch(refreshFrameComments(frameId));
        }
    }, [frameId, loading]);

    useFocusEffect(
        React.useCallback(() => {
            if (loading === 'SUCCESS' && refreshing) setRefreshing(false);
        }, [loading, refreshing])
    );

    return (
        <StyledAnimatedScrollView
            onScroll={scrollHandler}
            refreshControl={
                <RefreshControl
                    colors={colors}
                    onRefresh={handleRefresh}
                    progressViewOffset={GLOBAL_STYLE.HEADER_TAB_HEIGHT}
                    progressBackgroundColor={theme.colors['secondary-light']}
                    refreshing={refreshing}
                />
            }
            showsVerticalScrollIndicator={false}
        >
            <InnerContainer
                height={dimension.height + GLOBAL_STYLE.HEADER_TAB_HEIGHT}
            >
                <EmptyMessage
                    text="this frame do not have comment yet..."
                    pb={GLOBAL_STYLE.COMMENTS_FOOTER_HEIGHT}
                />
            </InnerContainer>
        </StyledAnimatedScrollView>
    );
};

export default EmptyScrollView;
