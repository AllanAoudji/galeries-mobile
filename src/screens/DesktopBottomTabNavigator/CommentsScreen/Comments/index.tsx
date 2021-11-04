import { useNavigation } from '@react-navigation/native';
import * as React from 'react';
import {
    FlatList,
    ListRenderItemInfo,
    StyleProp,
    StyleSheet,
    ViewStyle,
} from 'react-native';
import { useDispatch, useSelector } from 'react-redux';

import {
    AnimatedFlatList,
    BottomLoader,
    DefaultHeader,
    EmptyMessage,
} from '#components';
import { GLOBAL_STYLE } from '#helpers/constants';
import { useHideHeaderOnScroll } from '#hooks';
import {
    getFrameComments,
    selectCommentCurrent,
    selectCommentsLoadingPost,
    selectCurrentFrameCommentsStatus,
} from '#store/comments';

import Form from './Form';
import RenderItem from './RenderItem';

import { Container, Header } from './styles';

type CommentsProps = {
    allIds: string[];
    frameId: string;
};

const Comments = ({ allIds, frameId }: CommentsProps) => {
    const dispatch = useDispatch();
    const navigation =
        useNavigation<Screen.DesktopBottomTab.CommentsNavigationProp>();

    const currentComment = useSelector(selectCommentCurrent);
    const currentFrameCommentsStatus = useSelector(
        selectCurrentFrameCommentsStatus
    );
    const loading = useSelector(selectCommentsLoadingPost);

    const flatListRef = React.useRef<FlatList | null>(null);

    const { containerStyle, scrollHandler } = useHideHeaderOnScroll(
        GLOBAL_STYLE.HEADER_TAB_HEIGHT
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
    const handleSuccess = React.useCallback(() => {
        if (flatListRef.current && !currentComment)
            flatListRef.current.scrollToOffset({ offset: 0 });
    }, [currentComment]);
    const keyExtractor = React.useCallback((data: string) => data, []);
    const renderItem = React.useCallback(
        ({ item }: ListRenderItemInfo<string>) => <RenderItem item={item} />,
        []
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
                        style().animatedFlatListContentContainerStyle
                    }
                    data={allIds}
                    extraData={allIds}
                    initialNumToRender={15}
                    keyExtractor={keyExtractor}
                    maxToRenderPerBatch={15}
                    onScroll={scrollHandler}
                    onEndReached={handleEndReach}
                    onEndReachedThreshold={0.2}
                    ref={flatListRef}
                    removeClippedSubviews
                    renderItem={renderItem}
                    scrollEventThrottle={4}
                    showsVerticalScrollIndicator={false}
                />
            ) : (
                <EmptyMessage text="This frame do not have comment yet..." />
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

const style: () => {
    animatedFlatListContentContainerStyle: StyleProp<ViewStyle>;
} = StyleSheet.create(() => ({
    animatedFlatListContentContainerStyle: {
        paddingBottom: GLOBAL_STYLE.COMMENTS_FOOTER_HEIGHT + 15,
        paddingTop: GLOBAL_STYLE.HEADER_TAB_HEIGHT,
    },
}));

export default Comments;
