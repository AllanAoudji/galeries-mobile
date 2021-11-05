import * as React from 'react';

import Pictogram from '#components/Pictogram';
import ProfilePicture from '#components/ProfilePicture';
import Typography from '#components/Typography';

import { Container, InfoContainer, UserNameContainer } from './styles';

type Props = {
    color?: keyof Style.Colors;
    role?: Store.Role;
    user: Store.Models.User;
};

const UserCard = ({ color = 'secondary-light', role, user }: Props) => {
    return (
        <Container color={color}>
            <ProfilePicture size="normal" user={user} />
            <InfoContainer>
                <UserNameContainer>
                    <Typography fontFamily="bold" fontSize={18}>
                        {user.pseudonym}
                    </Typography>
                    {!!role && role !== 'user' && (
                        <Pictogram
                            color="primary"
                            ml="smallest"
                            size="small"
                            variant={
                                role === 'admin'
                                    ? 'admin-role'
                                    : 'moderator-role'
                            }
                        />
                    )}
                </UserNameContainer>
                <Typography fontSize={14}>{user.userName}</Typography>
            </InfoContainer>
        </Container>
    );
};

export default UserCard;
