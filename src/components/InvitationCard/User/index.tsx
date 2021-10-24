import * as React from 'react';

import Typography from '#components/Typography';

import BottomSheetOptions from './BottomSheetOptions';

import { Container } from './styles';

type Props = {
    invitation: Store.Models.Invitation;
    user?: Store.Models.User;
};

const User = ({ invitation, user }: Props) => {
    return (
        <Container>
            <Typography>
                posted by{' '}
                <Typography fontFamily="bold">
                    {user ? user.pseudonym : 'user'}
                </Typography>
            </Typography>
            <BottomSheetOptions invitation={invitation} />
        </Container>
    );
};

export default React.memo(User);
