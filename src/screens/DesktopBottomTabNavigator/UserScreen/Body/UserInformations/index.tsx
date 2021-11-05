import * as React from 'react';

import { Pictogram, Typography } from '#components';

import { Container, UserPseudonymContainer } from './styles';

type Props = {
    role?: Store.Role;
    user: Store.Models.User;
};

const UserInformations = ({ role, user }: Props) => {
    return (
        <Container>
            <UserPseudonymContainer>
                <Typography fontFamily="bold" fontSize={36}>
                    {user.pseudonym}
                </Typography>
                {!!role && role !== 'user' && (
                    <Pictogram
                        color="primary"
                        ml="smallest"
                        size="small"
                        variant={
                            role === 'admin' ? 'admin-role' : 'moderator-role'
                        }
                    />
                )}
            </UserPseudonymContainer>
            <Typography>{user.userName}</Typography>
        </Container>
    );
};

export default UserInformations;
