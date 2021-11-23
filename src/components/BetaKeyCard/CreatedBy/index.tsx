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
            <ProfilePicture user={user} />
            <Typography>
                created by{' '}
                <Typography fontFamily="bold">
                    {user ? user.pseudonym : 'user not found'}
                </Typography>
            </Typography>
        </Container>
    );
};

export default React.memo(CreatedBy);
