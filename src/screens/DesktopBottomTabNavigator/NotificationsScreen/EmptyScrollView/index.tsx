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
    refreshNotifications,
    selectNotificationsStatus,
} from '#store/notifications';

import { InnerContainer, StyledAnimatedScrollView } from './styles';

type Props = {
    scrollHandler: any;
};

const emptyScrollView = ({ scrollHandler }: Props) => {
    const dimension = useWindowDimensions();
    const dispatch = useDispatch();
    const theme = useTheme();

    const status = useSelector(selectNotificationsStatus);

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
            InteractionManager.runAfterInteractions(() => {
                dispatch(refreshNotifications());
            });
        }
    }, [status]);

    useFocusEffect(
        React.useCallback(() => {
            if ((status === 'SUCCESS' || status === 'ERROR') && refreshing)
                setRefreshing(false);
        }, [refreshing, status])
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
                <EmptyMessage text="you don't have any notification yet" />
            </InnerContainer>
        </StyledAnimatedScrollView>
    );
};

export default emptyScrollView;
