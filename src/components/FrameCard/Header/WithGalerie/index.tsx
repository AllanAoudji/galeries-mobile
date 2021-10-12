import * as React from 'react';
import { useSelector } from 'react-redux';

import ProfilePicture from '#components/ProfilePicture';
import Typography from '#components/Typography';
import { selectGalerie } from '#store/galeries';

import GalerieCoverPicture from './GalerieCoverPicture';

import {
    Container,
    CoverPictureContainer,
    ProfilePictureContainer,
    TextContainer,
    TextsContainer,
} from './styles';

type Props = {
    galerieId: string;
    user?: Store.Models.User;
};

const WithGalerie = ({ galerieId, user }: Props) => {
    const galerieSelector = React.useMemo(
        () => selectGalerie(galerieId),
        [galerieId]
    );
    const galerie = useSelector(galerieSelector);

    return (
        <>
            <Container>
                {!!galerie && (
                    <CoverPictureContainer>
                        <GalerieCoverPicture galerie={galerie} />
                    </CoverPictureContainer>
                )}
                <ProfilePictureContainer>
                    <ProfilePicture border user={user} />
                </ProfilePictureContainer>
            </Container>
            <TextsContainer>
                <TextContainer pb>
                    <Typography fontFamily="light">Posted on </Typography>
                    <Typography>{galerie ? galerie.name : ''}</Typography>
                </TextContainer>
                <TextContainer>
                    <Typography fontFamily="light">By </Typography>
                    <Typography>
                        {user ? user.pseudonym : 'username'}
                    </Typography>
                </TextContainer>
            </TextsContainer>
        </>
    );
};

export default WithGalerie;
