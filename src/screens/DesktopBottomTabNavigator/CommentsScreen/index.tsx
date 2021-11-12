import { useFocusEffect } from '@react-navigation/native';
import * as React from 'react';
import {
    FlatList,
    InteractionManager,
    KeyboardAvoidingView,
    Platform,
    StyleSheet,
} from 'react-native';
import { useDispatch, useSelector } from 'react-redux';

import { BottomLoader, DefaultHeader, FullScreenLoader } from '#components';
import { SelectCommentProvider } from '#contexts/SelectedCommentContext';
import {
    getFrameComments,
    selectCommentCurrent,
    selectCommentsLoadingPost,
    selectCurrentFrameCommentsAllId,
    selectCurrentFrameCommentsStatus,
} from '#store/comments';
import { selectCurrentFrame } from '#store/frames';
import { GLOBAL_STYLE } from '#helpers/constants';
import { useHideHeaderOnScroll } from '#hooks';

import Comments from './Comments';
import EmptyScrollView from './EmptyScrollView';
import Form from './Form';

import { Container, Header } from './styles';

type Props = {
    navigation: Screen.DesktopBottomTab.CommentsNavigationProp;
};

const CommentScreen = ({ navigation }: Props) => {
    const dispatch = useDispatch();

    const { containerStyle, scrollHandler } = useHideHeaderOnScroll(
        GLOBAL_STYLE.HEADER_TAB_HEIGHT
    );

    const flatListRef = React.useRef<FlatList | null>(null);

    const commentsAllIds = useSelector(selectCurrentFrameCommentsAllId);
    const currentComment = useSelector(selectCommentCurrent);
    const currentFrame = useSelector(selectCurrentFrame);
    const loading = useSelector(selectCommentsLoadingPost);
    const status = useSelector(selectCurrentFrameCommentsStatus);

    const handlePress = React.useCallback(() => {
        if (navigation.canGoBack()) navigation.goBack();
        else navigation.navigate('Home');
    }, [navigation]);
    const handlePostSuccess = React.useCallback(() => {
        if (flatListRef.current && !currentComment)
            flatListRef.current.scrollToOffset({ offset: 0 });
    }, [currentComment]);

    useFocusEffect(
        React.useCallback(() => {
            if (!currentFrame) {
                if (navigation.canGoBack()) navigation.goBack();
                else navigation.navigate('Home');
            }
        }, [currentFrame])
    );
    useFocusEffect(
        React.useCallback(() => {
            if (currentFrame && status === 'PENDING')
                InteractionManager.runAfterInteractions(() => {
                    dispatch(getFrameComments(currentFrame.id));
                });
        }, [currentFrame, status])
    );

    if (!currentFrame || status === 'INITIAL_LOADING' || status === 'PENDING')
        return <FullScreenLoader show />;

    return (
        <SelectCommentProvider>
            <KeyboardAvoidingView
                behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
                style={styles.keyboardAvoidingViewStyle}
            >
                <Container>
                    <Header style={containerStyle}>
                        <DefaultHeader
                            onPress={handlePress}
                            title="comments"
                            variant="secondary"
                        />
                    </Header>
                    {!!commentsAllIds && commentsAllIds.length > 0 ? (
                        <Comments
                            allIds={commentsAllIds}
                            flatListRef={flatListRef}
                            frameId={currentFrame.id}
                            scrollHandler={scrollHandler}
                        />
                    ) : (
                        <EmptyScrollView
                            frameId={currentFrame.id}
                            scrollHandler={scrollHandler}
                        />
                    )}
                    <Form
                        frameId={currentFrame.id}
                        loading={loading}
                        onSuccess={handlePostSuccess}
                    />
                    <BottomLoader bottom="huge" show={status === 'LOADING'} />
                </Container>
            </KeyboardAvoidingView>
        </SelectCommentProvider>
    );
};

const styles = StyleSheet.create({
    keyboardAvoidingViewStyle: {
        flex: 1,
    },
});

export default CommentScreen;
