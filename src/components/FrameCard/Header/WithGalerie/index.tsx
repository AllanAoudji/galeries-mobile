import { useNavigation } from '@react-navigation/native';
import * as React from 'react';
import { useDispatch, useSelector } from 'react-redux';

import GalerieCoverPicture from '#components/GalerieCoverPicture';
import ProfilePicture from '#components/ProfilePicture';
import Typography from '#components/Typography';
import { GLOBAL_STYLE } from '#helpers/constants';
import {
    getGalerieId,
    selectGalerie,
    updateGaleriesCurrent,
} from '#store/galeries';
import { selectUser } from '#store/users';

import {
    Container,
    ProfilePictureContainer,
    TextContainer,
    TextsContainer,
} from './styles';

type Props = {
    frame: Store.Models.Frame;
};

const WithGalerie = ({ frame }: Props) => {
    const dispatch = useDispatch();
    const navigation = useNavigation<
        | Screen.DesktopBottomTab.FrameProp
        | Screen.DesktopBottomTab.HomeNavigationProp
        | Screen.DesktopBottomTab.GalerieNavigationProp
    >();

    const galerieSelector = React.useMemo(
        () => selectGalerie(frame.galerieId),
        [frame]
    );
    const galerie = useSelector(galerieSelector);
    const userSelector = React.useMemo(() => selectUser(frame.userId), [frame]);
    const user = useSelector(userSelector);

    const handlePressGalerie = React.useCallback(() => {
        dispatch(updateGaleriesCurrent(frame.galerieId));
        dispatch(getGalerieId(frame.galerieId));
        navigation.navigate('Galerie');
    }, [navigation]);

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
                    <TextContainer onPress={handlePressGalerie} pb>
                        <Typography fontFamily="light">Posted on </Typography>
                        <Typography>{galerie.name}</Typography>
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
