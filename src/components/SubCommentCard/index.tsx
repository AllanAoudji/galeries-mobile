import moment from 'moment';
import * as React from 'react';
import { useSelector } from 'react-redux';

import ProfilePicture from '#components/ProfilePicture';
import { selectUserId } from '#store/users';
import Typography from '#components/Typography';

import {
    BodyContainer,
    Container,
    ContentContainer,
    TimeContainer,
} from './styles';

type Props = {
    comment: Store.Models.Comment;
};

const SubCommentCard = ({ comment }: Props) => {
    const selectUser = React.useMemo(
        () => selectUserId(comment.userId),
        [comment]
    );
    const user = useSelector(selectUser);

    return (
        <Container>
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
