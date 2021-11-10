import { useFocusEffect } from '@react-navigation/native';
import * as React from 'react';
import {
    InteractionManager,
    RefreshControl,
    useWindowDimensions,
} from 'react-native';
import { useDispatch, useSelector } from 'react-redux';
import { useTheme } from 'styled-components/native';

import { EmptyMessage } from '#components';
import { GLOBAL_STYLE } from '#helpers/constants';
import {
    refreshFrameComments,
    selectFrameCommentsStatus,
} from '#store/comments';

import { InnerContainer, StyledAnimatedScrollView } from './styles';

type Props = {
    frameId: string;
    scrollHandler: any;
};

const EmptyScrollView = ({ frameId, scrollHandler }: Props) => {
    const dimension = useWindowDimensions();
    const dispatch = useDispatch();
    const theme = useTheme();

    const statusSelector = React.useMemo(
        () => selectFrameCommentsStatus(frameId),
        [frameId]
    );
    const status = useSelector(statusSelector);

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
        if (status && !status.includes('LOADING') && status !== 'REFRESH')
            InteractionManager.runAfterInteractions(() => {
                dispatch(refreshFrameComments(frameId));
            });
    }, [frameId, status]);

    useFocusEffect(
        React.useCallback(() => {
            if (status === 'SUCCESS' && refreshing) setRefreshing(false);
        }, [status, refreshing])
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
                    pb={GLOBAL_STYLE.COMMENTS_FOOTER_HEIGHT}
                    text="this frame do not have comment yet..."
                />
            </InnerContainer>
        </StyledAnimatedScrollView>
    );
};

export default EmptyScrollView;
