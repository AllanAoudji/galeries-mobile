import { useNavigation } from '@react-navigation/native';
import * as React from 'react';
import { Pressable, useWindowDimensions } from 'react-native';
import { useDispatch } from 'react-redux';
import { useTheme } from 'styled-components/native';

import Typography from '#components/Typography';
import { END_POINT } from '#helpers/constants';
import normalizeDefaultCoverPicture from '#helpers/normalizeDefaultCoverPicture';
import request from '#helpers/request';
import {
    setCurrentGalerieId,
    setGaleriePictures,
    setGaleries,
} from '#store/actions';

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
        dispatch(setCurrentGalerieId(galerie.id));
        navigation.navigate('Galerie');
    }, [navigation]);

    // Fetch coverPicture and users.
    React.useEffect(() => {
        if (galerie.currentCoverPicture === undefined) {
            request({
                body: {},
                method: 'GET',
                url: END_POINT.GALERIE_COVER_PICTURE(galerie.id),
            }).then((res) => {
                if (
                    res.data &&
                    res.data.data &&
                    res.data.data.coverPicture &&
                    typeof res.data.data.coverPicture === 'object'
                ) {
                    const { id } = res.data.data.coverPicture;
                    dispatch(
                        setGaleries({
                            data: {
                                byId: {
                                    [galerie.id]: {
                                        ...galerie,
                                        currentCoverPicture:
                                            res.data.data.coverPicture,
                                    },
                                },
                            },
                        })
                    );
                    dispatch(
                        setGaleriePictures({
                            byId: { [id]: res.data.data.coverPicture },
                        })
                    );
                }
            });
        }
        // TODO:
        // Fetch user if galerie.numOfUsers > 0
    }, [galerie]);

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
                    {!galerie.currentCoverPicture && defaultCoverPicture && (
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
                        <UserContainer />
                        <UserContainer />
                        <UserContainer />
                        <UserContainer />
                        <UserContainer />
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

export default React.memo(GalerieModal);
