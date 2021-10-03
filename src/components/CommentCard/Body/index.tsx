import * as React from 'react';

import Typography from '#components/Typography';

import { Container } from './style';

type Props = {
    body: string;
    user?: Store.Models.User;
};

const Body = ({ body, user }: Props) => {
    return (
        <Container>
            <Typography>
                {!!user && (
                    <Typography fontFamily="bold">{user.pseudonym} </Typography>
                )}
                {body}
            </Typography>
        </Container>
    );
};

export default React.memo(Body);
