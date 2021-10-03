import * as React from 'react';
import { useDispatch, useSelector } from 'react-redux';

import ProfilePicture from '#components/ProfilePicture';
import { getCommentComments } from '#store/comments';
import { selectUserId } from '#store/users';

import Body from './Body';
import Footer from './Footer';
import SubComments from './SubComments';
import ViewMore from './ViewMore';
import { BodyContainer, Container } from './styles';

type Props = {
    comment: Store.Models.Comment;
    onPress: (user: Store.Models.User) => void;
    onPressReply: () => void;
};

const CommentCard = ({ comment, onPress, onPressReply }: Props) => {
    const dispatch = useDispatch();

    const selectUser = React.useMemo(
        () => selectUserId(comment.userId),
        [comment]
    );
    const user = useSelector(selectUser);

    const [showComments, setShowComments] = React.useState<boolean>(false);
    const [numOfComments, setNumOfComments] = React.useState<number>(
        comment.comments ? comment.comments.allIds.length : 0
    );

    const commentFetcherText = React.useMemo(() => {
        if (!showComments || !comment.comments)
            return `View ${comment.numOfComments} replies`;
        if (comment.comments.status.includes('LOADING')) return 'loading';
        return 'hide comments';
    }, [comment, showComments]);

    const handlePress = React.useCallback(() => onPress(user), [user]);
    const handlePressLoadingMore = React.useCallback(
        () => dispatch(getCommentComments(comment.id)),
        [comment]
    );
    const handlePressView = React.useCallback(() => {
        if (!comment.comments) {
            setShowComments(true);
            dispatch(getCommentComments(comment.id));
        } else if (!showComments) {
            if (comment.comments.status === 'PENDING')
                dispatch(getCommentComments(comment.id));
            setShowComments(true);
        } else setShowComments(false);
    }, [comment, numOfComments, showComments]);

    React.useEffect(() => {
        if (
            comment.comments &&
            comment.comments.allIds.length > numOfComments &&
            !showComments
        ) {
            setNumOfComments(comment.comments.allIds.length);
            setShowComments(true);
        }
    }, [comment]);

    return (
        <Container onPress={handlePress}>
            <ProfilePicture mr="smallest" user={user} />
            <BodyContainer>
                <Body body={comment.body} user={user} />
                <Footer createdAt={comment.createdAt} onPress={onPressReply} />
                {comment.numOfComments > 0 && (
                    <ViewMore
                        commentFetcherText={commentFetcherText}
                        onPress={handlePressView}
                    />
                )}
                {!!comment.comments && showComments && (
                    <SubComments
                        allIds={comment.comments.allIds}
                        end={comment.comments.end}
                        onPress={handlePressLoadingMore}
                    />
                )}
            </BodyContainer>
        </Container>
    );
};

export default React.memo(CommentCard);
