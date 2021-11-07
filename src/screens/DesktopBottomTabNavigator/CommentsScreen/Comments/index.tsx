import { useFocusEffect, useNavigation } from '@react-navigation/native';
import * as React from 'react';
import {
    FlatList,
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

import { BottomLoader, DefaultHeader } from '#components';
import { GLOBAL_STYLE } from '#helpers/constants';
import { useHideHeaderOnScroll } from '#hooks';
import {
    getFrameComments,
    refreshFrameComments,
    selectCommentCurrent,
    selectCommentsLoadingPost,
    selectCurrentFrameCommentsStatus,
    selectFrameCommentsStatus,
} from '#store/comments';

import EmptyScrollView from './EmptyScrollView';
import Form from './Form';
import RenderItem from './RenderItem';

import { Container, Header } from './styles';

type CommentsProps = {
    allIds: string[];
    frameId: string;
};

const AnimatedFlatList = Animated.createAnimatedComponent<any>(FlatList);

const Comments = ({ allIds, frameId }: CommentsProps) => {
    const dimension = useWindowDimensions();
    const dispatch = useDispatch();
    const navigation =
        useNavigation<Screen.DesktopBottomTab.CommentsNavigationProp>();
    const theme = useTheme();

    const { containerStyle, scrollHandler } = useHideHeaderOnScroll(
        GLOBAL_STYLE.HEADER_TAB_HEIGHT
    );

    const currentComment = useSelector(selectCommentCurrent);
    const currentFrameCommentsStatus = useSelector(
        selectCurrentFrameCommentsStatus
    );
    const loading = useSelector(selectCommentsLoadingPost);
    const statusSelector = React.useMemo(
        () => selectFrameCommentsStatus(frameId),
        [frameId]
    );
    const status = useSelector(statusSelector);

    const flatListRef = React.useRef<FlatList | null>(null);

    const [refreshing, setRefreshing] = React.useState<boolean>(false);

    const colors = React.useMemo(
        () => [
            theme.colors.primary,
            theme.colors['primary-dark'],
            theme.colors['primary-light'],
        ],
        []
    );
    const styleProps = React.useMemo(
        () => ({
            minHeight: dimension.height + GLOBAL_STYLE.HEADER_TAB_HEIGHT,
        }),
        []
    );

    const handleEndReach = React.useCallback(
        () => dispatch(getFrameComments(frameId)),
        []
    );
    const handlePress = React.useCallback(() => {
        if (loading && !loading.includes('LOADING')) {
            if (navigation.canGoBack()) navigation.goBack();
            else navigation.navigate('Home');
        }
    }, [loading, navigation]);
    const handleRefresh = React.useCallback(() => {
        setRefreshing(true);
        console.log('test');
        dispatch(refreshFrameComments(frameId));
    }, [frameId]);
    const handleSuccess = React.useCallback(() => {
        if (flatListRef.current && !currentComment)
            flatListRef.current.scrollToOffset({ offset: 0 });
    }, [currentComment]);
    const keyExtractor = React.useCallback((data: string) => data, []);
    const renderItem = React.useCallback(
        ({ item }: ListRenderItemInfo<string>) => <RenderItem item={item} />,
        []
    );

    useFocusEffect(
        React.useCallback(() => {
            if (status === 'SUCCESS' && refreshing) setRefreshing(false);
        }, [status, refreshing])
    );

    return (
        <Container>
            <Header style={containerStyle}>
                <DefaultHeader
                    onPress={handlePress}
                    title="comments"
                    variant="secondary"
                />
            </Header>
            {allIds.length > 0 ? (
                <AnimatedFlatList
                    contentContainerStyle={
                        style(styleProps).animatedFlatListContentContainerStyle
                    }
                    data={allIds}
                    extraData={allIds}
                    initialNumToRender={15}
                    keyExtractor={keyExtractor}
                    maxToRenderPerBatch={15}
                    onEndReached={handleEndReach}
                    onEndReachedThreshold={0.2}
                    onScroll={scrollHandler}
                    ref={flatListRef}
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
                    removeClippedSubviews
                    renderItem={renderItem}
                    scrollEventThrottle={4}
                    showsVerticalScrollIndicator={false}
                    updateCellsBatchingPeriod={1}
                    windowSize={41}
                />
            ) : (
                <EmptyScrollView
                    frameId={frameId}
                    scrollHandler={scrollHandler}
                />
            )}
            <Form
                frameId={frameId}
                loading={loading}
                onSuccess={handleSuccess}
            />
            <BottomLoader
                bottom="huge"
                show={currentFrameCommentsStatus === 'LOADING'}
            />
        </Container>
    );
};

const style: ({ minHeight }: { minHeight: number }) => {
    animatedFlatListContentContainerStyle: StyleProp<ViewStyle>;
} = StyleSheet.create(({ minHeight }) => ({
    animatedFlatListContentContainerStyle: {
        marginTop: StatusBar.currentHeight || 0,
        minHeight,
        paddingBottom: GLOBAL_STYLE.COMMENTS_FOOTER_HEIGHT,
        paddingTop: GLOBAL_STYLE.HEADER_TAB_HEIGHT,
    },
}));

export default Comments;
