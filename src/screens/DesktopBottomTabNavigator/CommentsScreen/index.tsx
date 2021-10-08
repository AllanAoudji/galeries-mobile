import { useFocusEffect } from '@react-navigation/native';
import * as React from 'react';
import { FlatList } from 'react-native';
import { useDispatch, useSelector } from 'react-redux';

import { DeleteCommentModalProvider } from '#contexts/DeleteCommentModalContext';
import {
    BottomLoader,
    DefaultHeader,
    EmptyMessage,
    FullScreenLoader,
} from '#components';
import { GLOBAL_STYLE } from '#helpers/constants';
import { SelectCommentProvider } from '#contexts/SelectedCommentContext';
import { useComponentSize, useHideHeaderOnScroll } from '#hooks';
import { selectCurrentFrame } from '#store/frames';
import {
    getFrameComments,
    resetCommentsCurrent,
    selectCommentCurrent,
    selectCommentsLoadingPost,
    selectCurrentFrameCommentsAllId,
    selectCurrentFrameCommentsStatus,
} from '#store/comments';

import Comments from './Comments';
import Form from './Form';
import { Container, Header } from './styles';

type Props = {
    navigation: Screen.DesktopBottomTab.CommentsNavigationProp;
};

const CommentScreen = ({ navigation }: Props) => {
    const dispatch = useDispatch();

    const commentsAllIds = useSelector(selectCurrentFrameCommentsAllId);
    const currentComment = useSelector(selectCommentCurrent);
    const currentFrame = useSelector(selectCurrentFrame);
    const currentFrameCommentsStatus = useSelector(
        selectCurrentFrameCommentsStatus
    );
    const loading = useSelector(selectCommentsLoadingPost);

    const { onLayout: headerOnLayout, size: headerSize } = useComponentSize();
    const { onLayout: footerOnLayout, size: footerSize } = useComponentSize();
    const { containerStyle, scrollHandler } = useHideHeaderOnScroll(
        GLOBAL_STYLE.HEADER_TAB_HEIGHT
    );

    const flatListRef = React.useRef<FlatList | null>(null);

    const frameId = React.useMemo(
        () => (currentFrame ? currentFrame.id : undefined),
        [currentFrame]
    );

    const paddingBottom = React.useMemo(
        () => (footerSize ? footerSize.height : 0),
        [footerSize]
    );
    const paddingTop = React.useMemo(
        () => (headerSize ? headerSize.height : 0),
        [headerSize]
    );
    const showBody = React.useMemo(() => !!paddingTop, [paddingTop]);
    const showBottomLoader = React.useMemo(
        () => currentFrameCommentsStatus === 'LOADING',
        [currentFrameCommentsStatus]
    );
    const showComments = React.useMemo(
        () => !!commentsAllIds && commentsAllIds.length > 0 && !!paddingBottom,
        [commentsAllIds, paddingBottom]
    );
    const showFullScreenModal = React.useMemo(
        () =>
            currentFrameCommentsStatus === 'PENDING' ||
            currentFrameCommentsStatus === 'INITIAL_LOADING',
        [currentFrameCommentsStatus]
    );
    const onPressReturn = React.useCallback(() => {
        if (loading && !loading.includes('LOADING')) {
            if (navigation.canGoBack()) navigation.goBack();
            else navigation.navigate('Home');
        }
    }, [loading, navigation]);
    const scrollToTop = React.useCallback(() => {
        if (flatListRef.current && !currentComment)
            flatListRef.current.scrollToOffset({ offset: 0 });
    }, [currentComment]);
    const handleSuccess = React.useCallback(() => scrollToTop(), [scrollToTop]);

    useFocusEffect(
        React.useCallback(() => {
            if (!currentFrame) {
                if (navigation.canGoBack()) navigation.goBack();
                else navigation.navigate('Home');
            }
        }, [currentFrame])
    );

    React.useEffect(() => {
        if (currentFrame && currentFrameCommentsStatus === 'PENDING')
            dispatch(getFrameComments(currentFrame.id));
    }, [currentFrame, currentFrameCommentsStatus]);

    useFocusEffect(
        React.useCallback(() => {
            return () => {
                dispatch(resetCommentsCurrent());
            };
        }, [])
    );

    return (
        <DeleteCommentModalProvider>
            <SelectCommentProvider>
                <Container>
                    <Header onLayout={headerOnLayout} style={containerStyle}>
                        <DefaultHeader
                            onPress={onPressReturn}
                            title="comments"
                            variant="secondary"
                        />
                    </Header>
                    {showBody && (
                        <>
                            {showComments ? (
                                <Comments
                                    allIds={commentsAllIds}
                                    flatListRef={flatListRef}
                                    frameId={frameId}
                                    paddingBottom={paddingBottom}
                                    paddingTop={paddingTop}
                                    scrollHandler={scrollHandler}
                                />
                            ) : (
                                <EmptyMessage text="This frame do not have comment yet..." />
                            )}
                            <Form
                                frameId={frameId}
                                loading={loading}
                                onLayout={footerOnLayout}
                                onSuccess={handleSuccess}
                            />
                        </>
                    )}
                    <FullScreenLoader show={showFullScreenModal} />
                    <BottomLoader show={showBottomLoader} bottom="huge" />
                </Container>
            </SelectCommentProvider>
        </DeleteCommentModalProvider>
    );
};

export default CommentScreen;
