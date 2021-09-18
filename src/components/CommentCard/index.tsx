import moment from 'moment';
import * as React from 'react';
import { View } from 'react-native';

import ProfilePicture from '#components/ProfilePicture';
import Typography from '#components/Typography';

import {
    Container,
    ContentContainer,
    ContentContainerFooter,
    TimeContainer,
} from './styles';

type Props = {
    comment: Store.Models.Comments & {
        user: Store.Models.User & {
            currentProfilePicture: Store.Models.ProfilePicture;
        };
    };
};

const CommentCard = ({ comment }: Props) => {
    return (
        <Container>
            <ProfilePicture mr="smallest" user={comment.user} />
            <View>
                <ContentContainer>
                    <Typography>
                        <Typography fontFamily="bold">
                            {comment.user.pseudonym}{' '}
                        </Typography>
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
