import moment from 'moment';
import * as React from 'react';

import ProfilePicture from '#components/ProfilePicture';
import Typography from '#components/Typography';

import {
    BodyContainer,
    Container,
    ContentContainer,
    TimeContainer,
} from './styles';

type Props = {
    comment: Store.Models.Comment;
    onPress: () => void;
    user: Store.Models.User;
};

const SubCommentCard = ({ comment, onPress, user }: Props) => {
    return (
        <Container onPress={onPress}>
            <ProfilePicture mr="smallest" size="small" user={user} />
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
                <TimeContainer>
                    <Typography fontFamily="light" fontSize={12}>
                        {moment(comment.createdAt).fromNow()}
                    </Typography>
                </TimeContainer>
            </BodyContainer>
        </Container>
    );
};

export default SubCommentCard;
