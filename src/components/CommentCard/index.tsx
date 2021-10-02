import moment from 'moment';
import * as React from 'react';
import { View } from 'react-native';
import { useDispatch, useSelector } from 'react-redux';

import ProfilePicture from '#components/ProfilePicture';
import SubComments from '#components/SubComments';
import Typography from '#components/Typography';
import { getCommentComments } from '#store/comments';
import { selectUserId } from '#store/users';

import {
    BodyContainer,
    Container,
    ContentContainer,
    ContentContainerFooter,
    Separator,
    TimeContainer,
    ViewContainer,
} from './styles';

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

    const handlePressView = React.useCallback(() => {
        if (!comment.comments) {
            setShowComments(true);
            dispatch(getCommentComments(comment.id));
        } else if (!showComments) {
            if (comment.comments.status === 'PENDING') {
                dispatch(getCommentComments(comment.id));
            }
            setShowComments(true);
        } else {
            setShowComments(false);
        }
    }, [comment, numOfComments, showComments]);

    const commentFetcherText = React.useMemo(() => {
        if (!showComments || !comment.comments)
            return `View ${comment.numOfComments} replies`;
        if (comment.comments.status.includes('LOADING')) return 'loading';
        return 'hide comments';
    }, [comment, showComments]);

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

    const handlePress = React.useCallback(() => onPress(user), [user]);

    return (
        <Container onPress={handlePress}>
            <ProfilePicture mr="smallest" user={user} />
            <BodyContainer>
                <ContentContainer>
                    <Typography>
                        {!!user && (
                            <Typography fontFamily="bold">
                                {user.pseudonym}{' '}
                            </Typography>
                        )}
                        {comment.body}
                    </Typography>
                </ContentContainer>
                <ContentContainerFooter onPress={onPressReply}>
                    <TimeContainer>
                        <Typography fontFamily="light" fontSize={12}>
                            {moment(comment.createdAt).fromNow()}
                        </Typography>
                    </TimeContainer>
                    <Typography color="primary" fontFamily="bold" fontSize={12}>
                        Reply
                    </Typography>
                </ContentContainerFooter>
                {comment.numOfComments > 0 && (
                    <ViewContainer onPress={handlePressView}>
                        <Separator />
                        <Typography fontSize={12} color="primary">
                            {commentFetcherText}
                        </Typography>
                    </ViewContainer>
                )}
                <View>
                    {!!comment.comments && showComments && (
                        <SubComments
                            allIds={comment.comments.allIds}
                            commentId={comment.id}
                            end={comment.comments.end}
                        />
                    )}
                </View>
            </BodyContainer>
        </Container>
    );
};

export default React.memo(CommentCard);
