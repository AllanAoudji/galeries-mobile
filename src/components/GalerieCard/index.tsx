import { useNavigation } from '@react-navigation/native';
import * as React from 'react';
import { Pressable, useWindowDimensions } from 'react-native';
import { useDispatch, useSelector } from 'react-redux';
import { useTheme } from 'styled-components/native';

import ProfilePicture from '#components/ProfilePicture';
import Typography from '#components/Typography';
import normalizeDefaultCoverPicture from '#helpers/normalizeDefaultCoverPicture';
import { updateGaleriesCurrent } from '#store/galeries';
import {
    getGalerieCurrentCoverPicture,
    selectGalerieCoverPicture,
    selectGalerieCoverPictureStatus,
} from '#store/galeriePictures';

import {
    Container,
    DefaultCoverPicture,
    Informations,
    NumOfUsersContainer,
    PictureContainer,
    UserContainer,
    UsersContainer,
} from './styles';

type Props = {
    galerie: Store.Models.Galerie;
};

const GalerieModal = ({ galerie }: Props) => {
    const dispatch = useDispatch();

    const selectCoverPicture = React.useCallback(
        () => selectGalerieCoverPicture(galerie.id),
        [galerie]
    );
    const coverPicture = useSelector(selectCoverPicture());
    const selectCoverPictureStatus = React.useCallback(
        () => selectGalerieCoverPictureStatus(galerie.id),
        [galerie]
    );
    const coverPictureStatus = useSelector(selectCoverPictureStatus());

    const navigation =
        useNavigation<Screen.DesktopBottomTab.GaleriesNavigationProp>();
    const theme = useTheme();
    const dimension = useWindowDimensions();

    const [defaultCoverPicture, setDefaultCoverPicture] = React.useState<{
        colors: string[];
        endX: number;
        endY: number;
        startX: number;
        startY: number;
    } | null>(null);

    const handlePress = React.useCallback(() => {
        dispatch(updateGaleriesCurrent(galerie.id));
        navigation.navigate('Galerie');
    }, [navigation]);

    // Fetch coverPicture and users.
    React.useEffect(() => {
        if (coverPictureStatus === 'PENDING')
            dispatch(getGalerieCurrentCoverPicture(galerie.id));
        // TODO:
        // Fetch user if galerie.numOfUsers > 0
    }, [coverPictureStatus, galerie]);

    // Get defaultCoverPicture.
    React.useEffect(() => {
        if (galerie && galerie.defaultCoverPicture && !defaultCoverPicture) {
            setDefaultCoverPicture(
                normalizeDefaultCoverPicture(galerie.defaultCoverPicture)
            );
        }
    }, [defaultCoverPicture, galerie]);

    return (
        <Container>
            <Pressable onPress={handlePress}>
                <PictureContainer
                    colors={[theme.colors.primary, theme.colors.tertiary]}
                    end={{ x: 0.8, y: 1 }}
                    start={{ x: 0.2, y: 0 }}
                >
                    {!coverPicture && defaultCoverPicture && (
                        <DefaultCoverPicture
                            colors={defaultCoverPicture.colors}
                            end={{
                                x: defaultCoverPicture.endX,
                                y: defaultCoverPicture.endY,
                            }}
                            size={dimension.width}
                            start={{
                                x: defaultCoverPicture.startX,
                                y: defaultCoverPicture.startY,
                            }}
                        />
                    )}
                </PictureContainer>
                <Informations>
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
                </Informations>
            </Pressable>
        </Container>
    );
};

export default GalerieModal;
