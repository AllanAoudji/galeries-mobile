import * as React from 'react';

import Typography from '#components/Typography';

import { Container, InfoContainer, ProfilePicturesContainer } from './styles';
import Pictogram from '#components/Pictogram';

type Props = {
    user?: Store.Models.User;
};

const Header = ({ user }: Props) => {
    return (
        <Container>
            <InfoContainer>
                <ProfilePicturesContainer />
                <Typography>posted by </Typography>
                <Typography fontFamily="bold">
                    {user ? user.pseudonym : 'username'}
                </Typography>
            </InfoContainer>
            {/* TODO: Should open bottomSheet on press */}
            <Pictogram
                pb="smallest"
                pl="small"
                pr="small"
                pt="smallest"
                size="small"
                variant="option-vertical"
            />
        </Container>
    );
};

export default Header;
