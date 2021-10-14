import { useNavigation } from '@react-navigation/native';
import * as React from 'react';
import { useDispatch } from 'react-redux';
// import { useTheme } from 'styled-components/native';

// import ProfilePicture from '#components/ProfilePicture';
// import Typography from '#components/Typography';
// import normalizeDefaultCoverPicture from '#helpers/normalizeDefaultCoverPicture';
import { updateGaleriesCurrent } from '#store/galeries';
// import { getGalerieCurrentCoverPicture } from '#store/galeriePictures/actionCreators';

import CoverPicture from './CoverPicture';
import Footer from './Footer';

import {
    Container,
    // DefaultCoverPicture,
    // Informations,
    // NumOfUsersContainer,
    // PictureContainer,
    // UserContainer,
    // UsersContainer,
} from './styles';

type Props = {
    galerie?: Store.Models.Galerie;
};

const GalerieModal = ({ galerie }: Props) => {
    const dispatch = useDispatch();
    const navigation =
        useNavigation<Screen.DesktopBottomTab.GaleriesNavigationProp>();

    // const theme = useTheme();
    // const dimension = useWindowDimensions();

    // const selectCoverPicture = React.useCallback(
    //     () => selectGalerieCoverPicture(galerie.id),
    //     [galerie]
    // );
    // const coverPicture = useSelector(selectCoverPicture());
    // const selectCoverPictureStatus = React.useCallback(
    //     () => selectGalerieCoverPictureStatus(galerie.id),
    //     [galerie]
    // );
    // const coverPictureStatus = useSelector(selectCoverPictureStatus());

    // const [defaultCoverPicture, setDefaultCoverPicture] = React.useState<{
    //     colors: string[];
    //     endX: number;
    //     endY: number;
    //     startX: number;
    //     startY: number;
    // } | null>(null);

    // const defaultCoverPictureEnd = React.useMemo(
    //     () =>
    //         defaultCoverPicture
    //             ? {
    //                   x: defaultCoverPicture.endX,
    //                   y: defaultCoverPicture.endY,
    //               }
    //             : null,
    //     [defaultCoverPicture]
    // );
    // const defaultCoverPictureStart = React.useMemo(
    //     () =>
    //         defaultCoverPicture
    //             ? {
    //                   x: defaultCoverPicture.startX,
    //                   y: defaultCoverPicture.startY,
    //               }
    //             : null,
    //     [defaultCoverPicture]
    // );
    // const pictureContainerColors = React.useMemo(
    //     () => [theme.colors.primary, theme.colors.tertiary],
    //     []
    // );
    // const pictureContainerEnd = React.useMemo(() => ({ x: 0.8, y: 1 }), []);
    // const pictureContainerStart = React.useMemo(() => ({ x: 0.2, y: 0 }), []);

    const handlePress = React.useCallback(() => {
        if (galerie) {
            dispatch(updateGaleriesCurrent(galerie.id));
            navigation.navigate('Galerie');
        }
    }, [galerie]);

    // // Fetch coverPicture and users.
    // React.useEffect(() => {
    //     // TODO: May be in the Middleware.
    //     if (coverPictureStatus === 'PENDING')
    //         dispatch(getGalerieCurrentCoverPicture(galerie.id));
    //     // TODO:
    //     // Fetch user if galerie.numOfUsers > 0
    // }, [coverPictureStatus, galerie]);

    // // Get defaultCoverPicture.
    // React.useEffect(() => {
    //     if (galerie && galerie.defaultCoverPicture && !defaultCoverPicture) {
    //         setDefaultCoverPicture(
    //             normalizeDefaultCoverPicture(galerie.defaultCoverPicture)
    //         );
    //     }
    // }, [defaultCoverPicture, galerie]);

    if (!galerie) return null;

    return (
        <Container onPress={handlePress}>
            <CoverPicture galerie={galerie} />
            <Footer galerie={galerie} />
            {/*    <Informations>
                    <Typography fontSize={18} textAlign="right">
                        {galerie.name}
                    </Typography>
                    <UsersContainer>
                        <UserContainer>
                            <ProfilePicture border size="small" />
                        </UserContainer>
                        <UserContainer>
                            <ProfilePicture border size="small" />
                        </UserContainer>
                        <UserContainer>
                            <ProfilePicture border size="small" />
                        </UserContainer>
                        <UserContainer>
                            <ProfilePicture border size="small" />
                        </UserContainer>
                        <UserContainer>
                            <ProfilePicture border size="small" />
                        </UserContainer>
                        <UserContainer>
                            <ProfilePicture border size="small" />
                        </UserContainer>
                        <NumOfUsersContainer>
                            <Typography fontFamily="light" fontSize={14}>
                                +3 others
                            </Typography>
                        </NumOfUsersContainer>
                    </UsersContainer>
                </Informations> */}
        </Container>
    );
};

export default GalerieModal;
