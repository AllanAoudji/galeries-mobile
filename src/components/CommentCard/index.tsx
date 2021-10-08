import * as React from 'react';
import { useDispatch, useSelector } from 'react-redux';

import ProfilePicture from '#components/ProfilePicture';
import {
    getCommentComments,
    selectCommentCommentsAllIds,
    selectCommentCommentsEnd,
    selectCommentCommentsStatus,
} from '#store/comments';

import Body from './Body';
import Footer from './Footer';
import SubComments from './SubComments';
import ViewMore from './ViewMore';

import { BodyContainer, Container } from './styles';

type Props = {
    comment: Store.Models.Comment;
    current: boolean;
    onPress: (commentId: string) => void;
    onPressReply: () => void;
    user: Store.Models.User;
};

const CommentCard = ({
    comment,
    current,
    onPress,
    onPressReply,
    user,
}: Props) => {
    const dispatch = useDispatch();

    const commentCommentsAllIdsSelector = React.useCallback(
        () => selectCommentCommentsAllIds(comment.id),
        [comment]
    );
    const commentsAllIds = useSelector(commentCommentsAllIdsSelector());
    const commentCommentsEndSelector = React.useCallback(
        () => selectCommentCommentsEnd(comment.id),
        [comment]
    );
    const commentsEnd = useSelector(commentCommentsEndSelector());
    const commentCommentsStatusSelector = React.useCallback(
        () => selectCommentCommentsStatus(comment.id),
        [comment]
    );
    const commentsStatus = useSelector(commentCommentsStatusSelector());

    const [showComments, setShowComments] = React.useState<boolean>(false);
    const [numOfComments, setNumOfComments] = React.useState<number>(
        commentsAllIds ? commentsAllIds.length : 0
    );

    const commentFetcherText = React.useMemo(() => {
        if (!commentsAllIds) return `View ${comment.numOfComments} replies`;
        if (!showComments) {
            if (commentsStatus === 'PENDING') return 'loading';
            return `View ${comment.numOfComments} replies`;
        }
        return 'hide comments';
    }, [comment, commentsAllIds, commentsStatus, showComments]);

    const handlePress = React.useCallback(() => onPress(comment.id), [comment]);
    const handlePressLoadingMore = React.useCallback(
        () => dispatch(getCommentComments(comment.id)),
        [comment]
    );
    const handlePressView = React.useCallback(() => {
        if (!commentsAllIds) {
            setShowComments(true);
            dispatch(getCommentComments(comment.id));
        } else if (!showComments) {
            if (commentsStatus === 'PENDING')
                dispatch(getCommentComments(comment.id));
            setShowComments(true);
        } else setShowComments(false);
    }, [comment, commentsAllIds, commentsStatus, showComments]);

    React.useEffect(() => {
        if (
            commentsAllIds &&
            commentsAllIds.length > numOfComments &&
            !showComments
        ) {
            setNumOfComments(commentsAllIds.length);
            setShowComments(true);
        }
    }, [comment, commentsAllIds]);

    return (
        <>
            <Container current={current} onPress={handlePress}>
                <ProfilePicture mr="smallest" user={user} />
                <BodyContainer>
                    <Body body={comment.body} user={user} />
                    <Footer
                        createdAt={comment.createdAt}
                        onPress={onPressReply}
                    />
                    {comment.numOfComments > 0 && (
                        <ViewMore
                            commentFetcherText={commentFetcherText}
                            onPress={handlePressView}
                        />
                    )}
                </BodyContainer>
            </Container>
            {!!commentsAllIds && showComments && (
                <SubComments
                    allIds={commentsAllIds}
                    end={commentsEnd}
                    onPress={handlePressLoadingMore}
                />
            )}
        </>
    );
};

export default React.memo(CommentCard);
