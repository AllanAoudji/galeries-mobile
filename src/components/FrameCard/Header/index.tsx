import * as React from 'react';
import { useSelector } from 'react-redux';

import Pictogram from '#components/Pictogram';
import ProfilePicture from '#components/ProfilePicture';
import Typography from '#components/Typography';
import { selectUserId } from '#store/users';

import { Container, InfoContainer } from './styles';

type Props = {
    userId: string;
};

const Header = ({ userId }: Props) => {
    const selectUser = React.useMemo(() => selectUserId(userId), [userId]);
    const user = useSelector(selectUser);

    return (
        <Container>
            <InfoContainer>
                {user && <ProfilePicture mr="smallest" user={user} />}
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

export default React.memo(Header);
