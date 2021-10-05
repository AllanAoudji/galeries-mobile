import * as React from 'react';
import { useDispatch, useSelector } from 'react-redux';

import { Pictogram, Typography } from '#components';
import {
    selectCommentCurrent,
    selectComment,
    resetCommentsCurrent,
} from '#store/comments';
import { selectUser } from '#store/users';

import { Container, TypographyContainer } from './styles';

type CommentProps = {
    commentId: string;
};
type UserProps = {
    userId: string;
};

const Comment = ({ commentId }: CommentProps) => {
    const commentSelector = React.useMemo(
        () => selectComment(commentId),
        [commentId]
    );
    const comment = useSelector(commentSelector);

    if (!comment) return null;

    return <User userId={comment.userId} />;
};
const User = ({ userId }: UserProps) => {
    const dispatch = useDispatch();

    const userSelector = React.useMemo(() => selectUser(userId), [userId]);
    const user = useSelector(userSelector);

    const handlePress = React.useCallback(
        () => dispatch(resetCommentsCurrent()),
        []
    );

    if (!user) return null;

    return (
        <Container onPress={handlePress}>
            <TypographyContainer>
                <Typography fontFamily="light">Answer to </Typography>
                <Typography fontFamily="bold">{user.pseudonym}</Typography>
            </TypographyContainer>
            <Pictogram
                size="small"
                variant="quit"
                customSize={{ height: 12, width: 12 }}
            />
        </Container>
    );
};

const CurrentComment = () => {
    const commentsCurrent = useSelector(selectCommentCurrent);

    if (!commentsCurrent) return null;

    return <Comment commentId={commentsCurrent} />;
};

export default CurrentComment;
