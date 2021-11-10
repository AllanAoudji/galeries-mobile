import * as React from 'react';
import { useDispatch, useSelector } from 'react-redux';

import { Pictogram, Typography } from '#components';
import {
    selectCommentCurrent,
    selectComment,
    resetCommentsCurrent,
} from '#store/comments';
import { selectMe } from '#store/me';
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

    const me = useSelector(selectMe);
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
                <Typography fontFamily="bold">
                    {me && me.id === user.id ? 'me' : user.pseudonym}
                </Typography>
            </TypographyContainer>
            <Pictogram
                customSize={{ height: 12, width: 12 }}
                size="small"
                variant="quit"
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
