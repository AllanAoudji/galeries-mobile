import moment from 'moment';
import * as React from 'react';
import { View } from 'react-native';

import { useSelector } from 'react-redux';
import ProfilePicture from '#components/ProfilePicture';
import Typography from '#components/Typography';

import {
    Container,
    ContentContainer,
    ContentContainerFooter,
    TimeContainer,
} from './styles';
import { selectUserId } from '#store/users';

type Props = {
    comment: Store.Models.Comment;
};

const CommentCard = ({ comment }: Props) => {
    const selectUser = React.useMemo(() => selectUserId(comment.id), [comment]);
    const user = useSelector(selectUser);

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
                        {comment.body}
                    </Typography>
                </ContentContainer>
                <ContentContainerFooter>
                    <TimeContainer>
                        <Typography fontFamily="light" fontSize={12}>
                            {moment(comment.createdAt).fromNow()}
                        </Typography>
                    </TimeContainer>
                    <Typography color="primary" fontFamily="bold" fontSize={12}>
                        Reply
                    </Typography>
                </ContentContainerFooter>
            </View>
        </Container>
    );
};

export default CommentCard;
