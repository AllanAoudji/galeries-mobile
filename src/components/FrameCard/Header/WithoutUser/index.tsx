import { useNavigation } from '@react-navigation/native';
import * as React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { selectGalerie, updateGaleriesCurrent } from '#store/galeries';
import { Container } from './styles';
import Typography from '#components/Typography';
import GalerieCoverPicture from '#components/GalerieCoverPicture';
import { GLOBAL_STYLE } from '#helpers/constants';

type Props = {
    frame: Store.Models.Frame;
};

const WithoutUser = ({ frame }: Props) => {
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

    const handlePress = React.useCallback(() => {
        if (galerie) {
            dispatch(updateGaleriesCurrent(galerie.id));
            navigation.navigate('Galerie');
        }
    }, [galerie]);

    return (
        <Container onPress={handlePress}>
            <GalerieCoverPicture
                borderRadius={5}
                galerie={galerie}
                mr="smallest"
                size={GLOBAL_STYLE.FRAME_COVER_PICTURE_SIZE}
            />
            <Typography fontFamily="light">Posted on </Typography>
            <Typography>
                {galerie ? galerie.name : 'galerie not found'}
            </Typography>
        </Container>
    );
};

export default WithoutUser;
