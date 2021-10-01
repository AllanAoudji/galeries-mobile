import moment from 'moment';
import * as React from 'react';
import { View } from 'react-native';
import { useDispatch, useSelector } from 'react-redux';

import ProfilePicture from '#components/ProfilePicture';
import Typography from '#components/Typography';
import { selectUserId } from '#store/users';
import { getCommentComments, updateCommentsCurrent } from '#store/comments';

import SubComments from './SubComments';
import {
    Container,
    ContentContainer,
    ContentContainerFooter,
    ReplyContainer,
    Separator,
    TimeContainer,
    ViewContainer,
} from './styles';

type Props = {
    comment: Store.Models.Comment;
};

const CommentCard = ({ comment }: Props) => {
    const dispatch = useDispatch();
    const selectUser = React.useMemo(
        () => selectUserId(comment.userId),
        [comment]
    );
    const user = useSelector(selectUser);

    const [showComments, setShowComments] = React.useState<boolean>(false);

    const handlePressReply = React.useCallback(() => {
        dispatch(updateCommentsCurrent(comment.id));
    }, [comment]);
    const handlePressView = React.useCallback(() => {
        if (!comment.comments) {
            setShowComments(true);
            dispatch(getCommentComments(comment.id));
        } else setShowComments((prevState) => !prevState);
    }, [comment]);

    const commentFetcherText = React.useMemo(() => {
        if (!showComments || !comment.comments)
            return `View ${comment.numOfComments} replies`;
        if (comment.comments.status.includes('LOADING')) return 'loading';
        return 'hide comments';
    }, [comment, showComments]);

    const topLevel = React.useMemo(() => comment.level < 1, [comment]);
    const profilePictureSize = React.useMemo(
        () => (topLevel ? 'normal' : 'small'),
        [topLevel]
    );

    return (
        <Container topLevel={topLevel}>
            <ProfilePicture
                mr="smallest"
                user={user}
                size={profilePictureSize}
            />
            <View>
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
                <ContentContainerFooter>
                    <TimeContainer>
                        <Typography fontFamily="light" fontSize={12}>
                            {moment(comment.createdAt).fromNow()}
                        </Typography>
                    </TimeContainer>
                    {topLevel && (
                        <ReplyContainer onPress={handlePressReply}>
                            <Typography
                                color="primary"
                                fontFamily="bold"
                                fontSize={12}
                            >
                                Reply
                            </Typography>
                        </ReplyContainer>
                    )}
                </ContentContainerFooter>
                {comment.numOfComments > 0 && (
                    <ViewContainer onPress={handlePressView}>
                        <Separator />
                        <Typography color="primary">
                            {commentFetcherText}
                        </Typography>
                    </ViewContainer>
                )}
                <View>
                    {!!comment.comments && showComments && (
                        <SubComments
                            allIds={comment.comments.allIds}
                            end={comment.comments.end}
                        />
                    )}
                </View>
            </View>
        </Container>
    );
};

export default CommentCard;
