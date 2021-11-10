import { useFocusEffect } from '@react-navigation/native';
import * as React from 'react';
import {
    FlatList,
    InteractionManager,
    ListRenderItemInfo,
    RefreshControl,
    StatusBar,
    StyleProp,
    StyleSheet,
    useWindowDimensions,
    ViewStyle,
} from 'react-native';
import Animated from 'react-native-reanimated';
import { useDispatch, useSelector } from 'react-redux';
import { useTheme } from 'styled-components/native';

import { BottomLoader, DefaultHeader, FullScreenLoader } from '#components';
import { GLOBAL_STYLE } from '#helpers/constants';
import { useHideHeaderOnScroll } from '#hooks';
import {
    getFrameLikes,
    refreshFrameLikes,
    selectCurrentFrameLikesStatus,
} from '#store/likes';

import RenderItem from './RenderItem';

import { Container, Header } from './styles';

type Props = {
    allIds?: string[];
    frameId: string;
};

const AnimatedFlatList = Animated.createAnimatedComponent<any>(FlatList);
const renderItem = ({ index, item }: ListRenderItemInfo<string>) => {
    return <RenderItem index={index} item={item} />;
};

const Likes = ({ allIds, frameId }: Props) => {
    const dimension = useWindowDimensions();
    const dispatch = useDispatch();
    const theme = useTheme();

    const { containerStyle, scrollHandler } = useHideHeaderOnScroll(
        GLOBAL_STYLE.HEADER_TAB_HEIGHT
    );

    const status = useSelector(selectCurrentFrameLikesStatus);

    const [refreshing, setRefreshing] = React.useState<boolean>(false);

    const colors = React.useMemo(
        () => [
            theme.colors.primary,
            theme.colors['primary-dark'],
            theme.colors['primary-light'],
        ],
        [theme]
    );
    const styleProps = React.useMemo(
        () => ({
            minHeight: dimension.height + GLOBAL_STYLE.HEADER_TAB_HEIGHT,
        }),
        [dimension]
    );

    const handleEndReach = React.useCallback(() => {
        if (status && !status.includes('LOADING') && status !== 'REFRESH')
            InteractionManager.runAfterInteractions(() => {
                dispatch(getFrameLikes(frameId));
            });
    }, [frameId, status]);
    const handleRefresh = React.useCallback(() => {
        setRefreshing(true);
        if (status && !status.includes('LOADING') && status !== 'REFRESH')
            InteractionManager.runAfterInteractions(() => {
                dispatch(refreshFrameLikes(frameId));
            });
    }, [frameId, status]);
    const getItemLayout = React.useCallback(
        (_, index) => ({
            length: GLOBAL_STYLE.USER_CARD_HEIGHT,
            offset: GLOBAL_STYLE.USER_CARD_HEIGHT * index,
            index,
        }),
        []
    );
    const keyExtractor = React.useCallback((item: string) => item, []);

    useFocusEffect(
        React.useCallback(() => {
            if (status === 'SUCCESS' && refreshing) setRefreshing(false);
        }, [status, refreshing])
    );

    useFocusEffect(
        React.useCallback(() => {
            if (!status || status === 'PENDING')
                InteractionManager.runAfterInteractions(() => {
                    dispatch(getFrameLikes(frameId));
                });
        }, [frameId, status])
    );

    if (!allIds) return null;

    return (
        <Container>
            <Header style={containerStyle}>
                <DefaultHeader title="likes" variant="secondary" />
            </Header>
            <AnimatedFlatList
                contentContainerStyle={
                    style(styleProps).animatedFlatListContentContainerStyle
                }
                data={allIds}
                extraData={allIds}
                getItemLayout={getItemLayout}
                initialNumToRender={10}
                keyExtractor={keyExtractor}
                maxToRenderPerBatch={3}
                onEndReached={handleEndReach}
                onEndReachedThreshold={0.2}
                onScroll={scrollHandler}
                refreshControl={
                    <RefreshControl
                        colors={colors}
                        onRefresh={handleRefresh}
                        progressViewOffset={GLOBAL_STYLE.HEADER_TAB_HEIGHT}
                        progressBackgroundColor={
                            theme.colors['secondary-light']
                        }
                        refreshing={refreshing}
                    />
                }
                removeClippedSubviews={true}
                renderItem={renderItem}
                scrollEventThrottle={4}
                showsVerticalScrollIndicator={false}
                updateCellsBatchingPeriod={1}
                windowSize={41}
            />
            <FullScreenLoader show={status === 'INITIAL_LOADING'} />
            <BottomLoader show={status === 'LOADING'} />
        </Container>
    );
};

const style: ({ minHeight }: { minHeight: number }) => {
    animatedFlatListContentContainerStyle: StyleProp<ViewStyle>;
} = StyleSheet.create(({ minHeight }) => ({
    animatedFlatListContentContainerStyle: {
        marginTop: StatusBar.currentHeight || 0,
        minHeight,
        paddingBottom: GLOBAL_STYLE.BOTTOM_TAB_HEIGHT,
        paddingTop: GLOBAL_STYLE.HEADER_TAB_HEIGHT,
    },
}));

export default Likes;
