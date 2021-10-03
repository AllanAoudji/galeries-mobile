import * as React from 'react';
import { useSelector } from 'react-redux';

import Pictogram from '#components/Pictogram';
import ProfilePicture from '#components/ProfilePicture';
import Typography from '#components/Typography';
import { selectUserId } from '#store/users';

import { Container, InfoContainer } from './styles';

type Props = {
    onPress: () => void;
    userId: string;
};

const Header = ({ onPress, userId }: Props) => {
    const selectUser = React.useMemo(() => selectUserId(userId), [userId]);
    const user = useSelector(selectUser);

    return (
        <Container>
            <InfoContainer>
                <ProfilePicture mr="smallest" user={user} />
                <Typography>posted by </Typography>
                <Typography fontFamily="bold">
                    {user ? user.pseudonym : 'username'}
                </Typography>
            </InfoContainer>
            <Pictogram
                onPress={onPress}
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
