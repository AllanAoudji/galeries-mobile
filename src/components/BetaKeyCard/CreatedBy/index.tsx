import * as React from 'react';

import Typography from '#components/Typography';
import ProfilePicture from '#components/ProfilePicture';

import { Container } from './styles';

type Props = {
    user?: Store.Models.User;
};

const CreatedBy = ({ user }: Props) => {
    return (
        <Container>
            <ProfilePicture mr="smallest" user={user} />
            <Typography>
                Created by{' '}
                <Typography fontFamily="bold">
                    {user ? user.pseudonym : 'user not found'}
                </Typography>
            </Typography>
        </Container>
    );
};

export default CreatedBy;
