import * as React from 'react';
import { useSelector } from 'react-redux';

import Pictogram from '#components/Pictogram';
import ProfilePicture from '#components/ProfilePicture';
import Typography from '#components/Typography';
import { selectUser } from '#store/users';

import WithGalerie from './WithGalerie';

import { Container, InfoContainer } from './styles';

type Props = {
    galerieId: string;
    onPress: () => void;
    showGalerie: boolean;
    userId: string;
};

const Header = ({ galerieId, onPress, showGalerie, userId }: Props) => {
    const userSelector = React.useCallback(() => selectUser(userId), [userId]);
    const user = useSelector(userSelector());

    return (
        <Container>
            <InfoContainer>
                {showGalerie ? (
                    <WithGalerie galerieId={galerieId} user={user} />
                ) : (
                    <>
                        <ProfilePicture mr="smallest" user={user} />
                        <Typography>posted by </Typography>
                        <Typography fontFamily="bold">
                            {user ? user.pseudonym : 'username'}
                        </Typography>
                    </>
                )}
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
