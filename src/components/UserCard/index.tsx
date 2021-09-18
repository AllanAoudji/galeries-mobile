import * as React from 'react';

import Typography from '#components/Typography';
import ProfilePicture from '#components/ProfilePicture';

import { Container, InfoContainer } from './styles';

type Props = {
    user: Store.Models.User;
};

const UserCard = ({ user }: Props) => {
    return (
        <Container>
            <ProfilePicture size="large" />
            <InfoContainer>
                <Typography fontFamily="bold" fontSize={18}>
                    {user.pseudonym}
                </Typography>
                <Typography fontSize={14}>{user.userName}</Typography>
            </InfoContainer>
        </Container>
    );
};

export default UserCard;
