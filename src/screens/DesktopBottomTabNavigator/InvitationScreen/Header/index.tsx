import * as React from 'react';
import { useWindowDimensions } from 'react-native';
import { useSelector } from 'react-redux';

import { GalerieCoverPicture, Typography } from '#components';
import { selectGalerie } from '#store/galeries';
import { selectUser } from '#store/users';

import ReturnButton from './ReturnButton';

import { Container, CoverPictureContainer, TitleContainer } from './style';

type Props = {
    invitation: Store.Models.Invitation;
};

const Header = ({ invitation }: Props) => {
    const dimension = useWindowDimensions();

    const galerieSelector = React.useMemo(
        () => selectGalerie(invitation.galerieId),
        [invitation]
    );
    const galerie = useSelector(galerieSelector);
    const userSelector = React.useMemo(
        () => selectUser(invitation.userId),
        [invitation]
    );
    const user = useSelector(userSelector);

    return (
        <Container>
            <ReturnButton />
            <CoverPictureContainer>
                <GalerieCoverPicture galerie={galerie} />
            </CoverPictureContainer>
            <TitleContainer width={dimension.width}>
                <Typography fontSize={18}>Invitation posted by</Typography>
                <Typography fontSize={36}>
                    {user ? user.pseudonym : 'username'}
                </Typography>
            </TitleContainer>
        </Container>
    );
};

export default Header;
