import { useFocusEffect } from '@react-navigation/native';
import * as React from 'react';
import { useDispatch, useSelector } from 'react-redux';

import { DeleteCommentModalProvider } from '#contexts/DeleteCommentModalContext';
import { SelectCommentProvider } from '#contexts/SelectedCommentContext';
import { FullScreenLoader } from '#components';
import {
    getFrameComments,
    resetCommentsCurrent,
    selectCurrentFrameCommentsAllId,
    selectCurrentFrameCommentsStatus,
} from '#store/comments';
import { selectCurrentFrame } from '#store/frames';

import Comments from './Comments';

type Props = {
    navigation: Screen.DesktopBottomTab.CommentsNavigationProp;
};

const CommentScreen = ({ navigation }: Props) => {
    const dispatch = useDispatch();

    const commentsAllIds = useSelector(selectCurrentFrameCommentsAllId);
    const currentFrame = useSelector(selectCurrentFrame);
    const status = useSelector(selectCurrentFrameCommentsStatus);

    useFocusEffect(
        React.useCallback(() => {
            if (!currentFrame) {
                if (navigation.canGoBack()) navigation.goBack();
                else navigation.navigate('Home');
            }
            return () => dispatch(resetCommentsCurrent());
        }, [currentFrame])
    );
    useFocusEffect(
        React.useCallback(() => {
            if (currentFrame && status === 'PENDING')
                dispatch(getFrameComments(currentFrame.id));
        }, [currentFrame, status])
    );

    if (
        !commentsAllIds ||
        !currentFrame ||
        status === 'PENDING' ||
        status === 'INITIAL_LOADING'
    )
        return <FullScreenLoader show />;

    return (
        <DeleteCommentModalProvider>
            <SelectCommentProvider>
                <Comments frameId={currentFrame.id} allIds={commentsAllIds} />
            </SelectCommentProvider>
        </DeleteCommentModalProvider>
    );
};

export default CommentScreen;
