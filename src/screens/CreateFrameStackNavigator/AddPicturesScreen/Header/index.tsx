import * as React from 'react';
import { Typography } from '#components';

import { Container, Separator } from './styles';

const Header = () => {
    return (
        <Container>
            <Typography
                color="secondary-light"
                fontFamily="light"
                fontSize={36}
                textAlign="right"
            >
                CREATE A FRAME
            </Typography>
            <Separator />
        </Container>
    );
};

export default React.memo(Header);
