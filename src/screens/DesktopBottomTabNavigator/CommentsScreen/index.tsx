import { useFocusEffect } from '@react-navigation/native';
import * as React from 'react';
import {
    FlatList,
    KeyboardAvoidingView,
    ListRenderItemInfo,
    Platform,
    StyleSheet,
    useWindowDimensions,
} from 'react-native';
import { useDispatch, useSelector } from 'react-redux';

import {
    BottomLoader,
    CustomFlatList,
    EmptyMessage,
    FullScreenContainer,
    FullScreenLoader,
} from '#components';
import { SelectCommentProvider } from '#contexts/SelectedCommentContext';
import { GLOBAL_STYLE } from '#helpers/constants';
import { useComponentSize } from '#hooks';
import {
    getFrameComments,
    refreshFrameComments,
    selectCommentCurrent,
    selectCommentsLoadingPost,
    selectCurrentFrameCommentsAllId,
    selectCurrentFrameCommentsStatus,
} from '#store/comments';
import { selectCurrentFrame } from '#store/frames';

import Form from './Form';
import RenderItem from './RenderItem';

type Props = {
    navigation: Screen.DesktopBottomTab.CommentsNavigationProp;
};

const renderItem = ({ item }: ListRenderItemInfo<string>) => (
    <RenderItem item={item} />
);

const CommentScreen = ({ navigation }: Props) => {
    const dispatch = useDispatch();
    const dimension = useWindowDimensions();

    const { onLayout, size } = useComponentSize();

    const flatListRef = React.useRef<FlatList | null>(null);

    const allIds = useSelector(selectCurrentFrameCommentsAllId);
    const currentComment = useSelector(selectCommentCurrent);
    const currentFrame = useSelector(selectCurrentFrame);
    const loading = useSelector(selectCommentsLoadingPost);
    const status = useSelector(selectCurrentFrameCommentsStatus);

    const emptyMessageHeight = React.useMemo(
        () =>
            size
                ? size.height
                : dimension.height - GLOBAL_STYLE.HEADER_TAB_HEIGHT,
        [dimension, size]
    );
    const showBottomLoader = React.useMemo(
        () => status === 'LOADING',
        [status]
    );

    const handleEndReach = React.useCallback(() => {
        if (!currentFrame) return;
        if (!status) return;
        if (status.includes('LOADING')) return;
        if (status === 'REFRESH') return;
        dispatch(getFrameComments(currentFrame.id));
    }, [currentFrame, status]);
    const handlePostSuccess = React.useCallback(() => {
        if (flatListRef.current && !currentComment)
            flatListRef.current.scrollToOffset({ offset: 0 });
    }, [currentComment]);
    const handleRefresh = React.useCallback(() => {
        if (!currentFrame) return;
        if (status && !status.includes('LOADING') && status !== 'REFRESH')
            dispatch(refreshFrameComments(currentFrame.id));
    }, [currentFrame, status]);

    useFocusEffect(
        React.useCallback(() => {
            if (currentFrame) return;
            if (navigation.canGoBack()) navigation.goBack();
            else navigation.navigate('Home');
        }, [currentFrame])
    );
    useFocusEffect(
        React.useCallback(() => {
            if (!currentFrame) return;
            if (status && status !== 'PENDING') return;
            dispatch(getFrameComments(currentFrame.id));
        }, [currentFrame, status])
    );

    if (!currentFrame || status === 'INITIAL_LOADING' || status === 'PENDING')
        return <FullScreenLoader show />;

    return (
        <KeyboardAvoidingView
            behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
            keyboardVerticalOffset={GLOBAL_STYLE.HEADER_TAB_HEIGHT}
            style={styles.keyboardAvoidingViewStyle}
        >
            <SelectCommentProvider>
                <FullScreenContainer onLayout={onLayout}>
                    {!!allIds && allIds.length > 0 ? (
                        <CustomFlatList
                            allIds={allIds}
                            flatListRef={flatListRef}
                            onEndReach={handleEndReach}
                            onRefresh={handleRefresh}
                            pb={GLOBAL_STYLE.COMMENTS_FOOTER_HEIGHT}
                            renderItem={renderItem}
                            status={status || 'PENDING'}
                        />
                    ) : (
                        <EmptyMessage
                            height={emptyMessageHeight}
                            onRefresh={handleRefresh}
                            refreshStatus={status}
                            text="This frame do not have comment yet..."
                        />
                    )}
                    <Form
                        frameId={currentFrame.id}
                        loading={loading}
                        onSuccess={handlePostSuccess}
                    />
                    <BottomLoader bottom="huge" show={showBottomLoader} />
                </FullScreenContainer>
            </SelectCommentProvider>
        </KeyboardAvoidingView>
    );
};

const styles = StyleSheet.create({
    keyboardAvoidingViewStyle: {
        flex: 1,
    },
});

export default CommentScreen;
