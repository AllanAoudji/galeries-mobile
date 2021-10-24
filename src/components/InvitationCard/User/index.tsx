import * as React from 'react';

import Typography from '#components/Typography';
import Pictogram from '#components/Pictogram';

import { Container } from './styles';

type Props = {
    user?: Store.Models.User;
};

const User = ({ user }: Props) => {
    return (
        <Container>
            <Typography>
                posted by{' '}
                <Typography fontFamily="bold">
                    {user ? user.pseudonym : 'user'}
                </Typography>
            </Typography>
            <Pictogram
                ml="smallest"
                mr="smallest"
                size="small"
                variant="option-vertical"
            />
        </Container>
    );
};

export default React.memo(User);
