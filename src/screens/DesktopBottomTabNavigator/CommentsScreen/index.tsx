import * as React from 'react';
import { FlatList, Keyboard, ListRenderItemInfo } from 'react-native';
import { useDispatch, useSelector } from 'react-redux';

import {
    AnimatedFlatList,
    CommentCard,
    DefaultHeader,
    EmptyMessage,
    FullScreenLoader,
} from '#components';
import { GLOBAL_STYLE } from '#helpers/constants';
import { useComponentSize, useHideHeaderOnScroll } from '#hooks';
import { fetchComments } from '#store/actions';
import {
    currentFrameCommentsSelector,
    currentFrameCommentsStatusSelector,
    currentFrameSelector,
} from '#store/selectors';

import CreateComment from './CreateComment';

import { Container, Header } from './styles';

type Props = {
    navigation: Screen.DesktopBottomTab.CommentsNavigationProp;
};

const renderItem = ({
    item,
}: ListRenderItemInfo<Store.Models.Comments & { user: Store.Models.User }>) => (
    <CommentCard comment={item} />
);

const CommentScreen = ({ navigation }: Props) => {
    const dispatch = useDispatch();

    const currentFrame = useSelector(currentFrameSelector);
    const currentFrameComments = useSelector(currentFrameCommentsSelector);
    const currentFrameCommentsStatus = useSelector(
        currentFrameCommentsStatusSelector
    );

    const { onLayout: headerOnLayout, size: headerSize } = useComponentSize();
    const { onLayout: footerOnLayout, size: footerSize } = useComponentSize();

    const { containerStyle, scrollHandler } = useHideHeaderOnScroll(
        GLOBAL_STYLE.HEADER_TAB_HEIGHT
    );

    const flatListRef = React.useRef<FlatList | null>(null);

    const [firstFetchFinished, setFirstFetchFinished] =
        React.useState<boolean>(false);

    const frameHasComment = React.useMemo(
        () => currentFrameComments && currentFrameComments.length > 0,
        [currentFrameComments]
    );
    const paddingBottom = React.useMemo(
        () => (footerSize ? footerSize.height : 0),
        [footerSize]
    );
    const paddingTop = React.useMemo(
        () => (headerSize ? headerSize.height : 0),
        [headerSize]
    );

    const handleScrollBeginDrag = React.useCallback(
        () => Keyboard.dismiss(),
        []
    );
    const keyExtractor = React.useCallback((data) => data.id, []);
    const scrollToTop = React.useCallback(() => {
        if (flatListRef.current)
            flatListRef.current.scrollToOffset({ offset: 0 });
    }, []);

    React.useEffect(() => {
        if (!currentFrame) {
            if (navigation.canGoBack()) navigation.goBack();
            else navigation.navigate('Home');
        }
    }, [currentFrame, navigation]);
    React.useEffect(() => {
        if (currentFrame && currentFrameCommentsStatus === 'PENDING') {
            setFirstFetchFinished(false);
            dispatch(fetchComments({ frameId: currentFrame.id }));
        }
    }, [currentFrame, currentFrameCommentsStatus]);
    React.useEffect(() => {
        if (
            (currentFrameCommentsStatus === 'SUCCESS' ||
                currentFrameCommentsStatus === 'ERROR') &&
            !firstFetchFinished
        )
            setFirstFetchFinished(true);
    }, [currentFrameCommentsStatus, firstFetchFinished]);

    if (!currentFrame) return null;

    return (
        <Container>
            <Header onLayout={headerOnLayout} style={containerStyle}>
                <DefaultHeader title="comments" variant="secondary" />
            </Header>
            {firstFetchFinished && (
                <>
                    {frameHasComment ? (
                        <AnimatedFlatList
                            contentContainerStyle={{
                                paddingBottom,
                                paddingTop,
                            }}
                            data={currentFrameComments}
                            keyExtractor={keyExtractor}
                            maxToRenderPerBatch={15}
                            onScroll={scrollHandler}
                            onScrollBeginDrag={handleScrollBeginDrag}
                            ref={flatListRef}
                            renderItem={renderItem}
                            removeClippedSubviews={true}
                            showsVerticalScrollIndicator={false}
                            scrollEventThrottle={4}
                        />
                    ) : (
                        <EmptyMessage text="This frame do not have comment yet..." />
                    )}
                    <CreateComment
                        frame={currentFrame}
                        onLayout={footerOnLayout}
                        scrollToTop={scrollToTop}
                    />
                </>
            )}
            <FullScreenLoader show={!firstFetchFinished} />
        </Container>
    );
};

export default CommentScreen;
