import moment from 'moment';
import * as React from 'react';
import { Pressable, View } from 'react-native';

import { useDispatch, useSelector } from 'react-redux';
import ProfilePicture from '#components/ProfilePicture';
import Typography from '#components/Typography';

import {
    Container,
    ContentContainer,
    ContentContainerFooter,
    TimeContainer,
} from './styles';
import { selectUserId } from '#store/users';
import { updateCommentsCurrent } from '#store/comments';

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

    const handlePress = React.useCallback(() => {
        dispatch(updateCommentsCurrent(comment.id));
    }, [comment]);

    return (
        <Container>
            <ProfilePicture mr="smallest" user={user} />
            <View>
                <ContentContainer>
                    <Typography>
                        {!!user && (
                            <Typography fontFamily="bold">
                                {user.pseudonym}{' '}
                            </Typography>
                        )}
                        {comment.body} {comment.autoIncrementId}
                    </Typography>
                </ContentContainer>
                <ContentContainerFooter>
                    <TimeContainer>
                        <Typography fontFamily="light" fontSize={12}>
                            {moment(comment.createdAt).fromNow()}
                        </Typography>
                    </TimeContainer>
                    <Pressable onPress={handlePress}>
                        <Typography
                            color="primary"
                            fontFamily="bold"
                            fontSize={12}
                        >
                            Reply
                        </Typography>
                    </Pressable>
                </ContentContainerFooter>
            </View>
        </Container>
    );
};

export default CommentCard;
