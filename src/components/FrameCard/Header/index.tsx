import * as React from 'react';
import { useSelector } from 'react-redux';

import ProfilePicture from '#components/ProfilePicture';
import Typography from '#components/Typography';
import { selectUser } from '#store/users';

import BottomSheetOptions from './BottomSheetOptions';
import WithGalerie from './WithGalerie';

import { Container, InfoContainer } from './styles';

type Props = {
    currentIndex: number;
    frame: Store.Models.Frame;
    showGalerie: boolean;
};

const Header = ({ currentIndex, frame, showGalerie }: Props) => {
    const userSelector = React.useCallback(
        () => selectUser(frame.userId),
        [frame]
    );
    const user = useSelector(userSelector());

    return (
        <Container>
            <InfoContainer>
                {showGalerie ? (
                    <WithGalerie galerieId={frame.galerieId} user={user} />
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
            <BottomSheetOptions currentIndex={currentIndex} frame={frame} />
        </Container>
    );
};

export default Header;
