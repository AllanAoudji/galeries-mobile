import * as React from 'react';

import Typography from '#components/Typography';
import ProfilePicture from '#components/ProfilePicture';

import { Container, InfoContainer } from './styles';

type Props = {
    color?: keyof Style.Colors;
    user: Store.Models.User;
};

const UserCard = ({ color = 'secondary-light', user }: Props) => {
    return (
        <Container color={color}>
            <ProfilePicture size="normal" user={user} />
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
