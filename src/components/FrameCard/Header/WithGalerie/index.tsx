import * as React from 'react';
import { useSelector } from 'react-redux';

import ProfilePicture from '#components/ProfilePicture';
import GalerieCoverPicture from '#components/GalerieCoverPicture';
import Typography from '#components/Typography';
import { selectGalerie } from '#store/galeries';
import { selectUser } from '#store/users';

import {
    Container,
    ProfilePictureContainer,
    TextContainer,
    TextsContainer,
} from './styles';
import { GLOBAL_STYLE } from '#helpers/constants';

type Props = {
    frame: Store.Models.Frame;
};

const WithGalerie = ({ frame }: Props) => {
    const galerieSelector = React.useMemo(
        () => selectGalerie(frame.galerieId),
        [frame]
    );
    const galerie = useSelector(galerieSelector);

    const userSelector = React.useMemo(() => selectUser(frame.userId), [frame]);
    const user = useSelector(userSelector);

    return (
        <>
            <Container>
                <GalerieCoverPicture
                    borderRadius={5}
                    galerie={galerie}
                    size={GLOBAL_STYLE.FRAME_COVER_PICTURE_SIZE}
                />
                <ProfilePictureContainer>
                    <ProfilePicture border user={user} />
                </ProfilePictureContainer>
            </Container>
            <TextsContainer>
                {!!galerie && (
                    <TextContainer pb>
                        <Typography fontFamily="light">Posted on </Typography>
                        <Typography>
                            {galerie ? galerie.name : 'galerie not found'}
                        </Typography>
                    </TextContainer>
                )}
                <TextContainer>
                    <Typography fontFamily="light">By </Typography>
                    <Typography>
                        {user ? user.pseudonym : 'user not found'}
                    </Typography>
                </TextContainer>
            </TextsContainer>
        </>
    );
};

export default WithGalerie;
