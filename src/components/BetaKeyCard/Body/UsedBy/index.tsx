import * as React from 'react';

import Typography from '#components/Typography';
import ProfilePicture from '#components/ProfilePicture';

import { Container } from './styles';

type Props = {
    user?: Store.Models.User;
};

const UsedBy = ({ user }: Props) => {
    return (
        <Container>
            <Typography>
                Used by{' '}
                <Typography fontFamily="bold">
                    {user ? user.pseudonym : 'user not found'}
                </Typography>
            </Typography>
            <ProfilePicture ml="smallest" user={user} />
        </Container>
    );
};

export default UsedBy;
