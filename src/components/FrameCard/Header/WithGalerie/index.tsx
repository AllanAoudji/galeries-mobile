import * as React from 'react';

import { useSelector } from 'react-redux';
import ProfilePicture from '#components/ProfilePicture';
import Typography from '#components/Typography';

import GalerieCoverPicture from './GalerieCoverPicture';

import {
    Container,
    CoverPictureContainer,
    ProfilePictureContainer,
    TextContainer,
    TextsContainer,
} from './styles';
import { selectGalerie } from '#store/galeries';
import { selectUser } from '#store/users';

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
                {!!galerie && (
                    <CoverPictureContainer>
                        <GalerieCoverPicture galerie={galerie} />
                    </CoverPictureContainer>
                )}
                {!!user && (
                    <ProfilePictureContainer>
                        <ProfilePicture border user={user} />
                    </ProfilePictureContainer>
                )}
            </Container>
            <TextsContainer>
                {!!galerie && (
                    <TextContainer pb>
                        <Typography fontFamily="light">Posted on </Typography>
                        <Typography>{galerie ? galerie.name : ''}</Typography>
                    </TextContainer>
                )}
                {!!user && (
                    <TextContainer>
                        <Typography fontFamily="light">By </Typography>
                        <Typography>{user.pseudonym}</Typography>
                    </TextContainer>
                )}
            </TextsContainer>
        </>
    );
};

export default WithGalerie;
