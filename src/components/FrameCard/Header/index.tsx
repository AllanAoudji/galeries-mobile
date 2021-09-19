import * as React from 'react';

import Pictogram from '#components/Pictogram';
import ProfilePicture from '#components/ProfilePicture';
import Typography from '#components/Typography';

import { Container, InfoContainer } from './styles';

type Props = {
    user?: Store.Models.UserPopulated;
};

const Header = ({ user }: Props) => {
    return (
        <Container>
            <InfoContainer>
                <ProfilePicture mr="smallest" user={user} />
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
