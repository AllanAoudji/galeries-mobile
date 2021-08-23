import { useNavigation } from '@react-navigation/native';
import * as React from 'react';
import { Pressable, useWindowDimensions } from 'react-native';
import {
    useAnimatedStyle,
    useSharedValue,
    withTiming,
} from 'react-native-reanimated';
import { useDispatch, useSelector } from 'react-redux';
import { useTheme } from 'styled-components/native';

import Typography from '#components/Typography';
import { ANIMATIONS, END_POINT } from '#helpers/constants';
import isValidHexColor from '#helpers/isValidHexColor';
import request from '#helpers/request';
import { GALERIES, normalizeData } from '#store/actions';
import { galerieSelector } from '#store/selectors';

import {
    Container,
    DefaultCoverPicture,
    Informations,
    PictureContainer,
} from './styles';

type Props = {
    animationOnMount?: boolean;
    id: string;
    removeGalerie: (id: string) => void;
};

// TODO:
// Need to trigger opacity animation only when visible
const GalerieModal = ({ animationOnMount, id, removeGalerie }: Props) => {
    const dispatch = useDispatch();
    const navigation =
        useNavigation<Screen.DesktopBottomTab.GaleriesNavigationProp>();
    const galerie = useSelector(galerieSelector(id));
    const theme = useTheme();
    const dimension = useWindowDimensions();

    const [defaultCoverPicture, setDefaultCoverPicture] = React.useState<{
        startX: number;
        startY: number;
        endX: number;
        endY: number;
        colors: string[];
    } | null>(null);

    const opacity = useSharedValue(1);

    const style = useAnimatedStyle(
        () => ({
            opacity: opacity.value,
        }),
        []
    );

    const handlePress = React.useCallback(
        () => navigation.navigate('Galerie', { id }),
        [navigation]
    );

    React.useEffect(() => {
        if (animationOnMount) opacity.value = 0;
    }, []);
    React.useEffect(() => {
        if (!galerie) {
            request({
                body: {},
                method: 'GET',
                url: END_POINT.GALERIE(id),
            })
                .then((res) => {
                    if (res.data.data && res.data.data.galerie) {
                        dispatch(
                            normalizeData({
                                data: {
                                    ...res.data.data.galerie,
                                    frames: [],
                                    users: [],
                                },
                                meta: {
                                    entity: GALERIES,
                                },
                            })
                        );
                    } else {
                        removeGalerie(id);
                    }
                })
                .catch(() => removeGalerie(id));
        } else {
            opacity.value = withTiming(1, ANIMATIONS.TIMING_CONFIG());
            // TODO:
            // fetch users if galerie.numOfUsers > 1
            // fetch coverPicture
        }
    }, [galerie]);
    React.useEffect(() => {
        if (galerie && !defaultCoverPicture) {
            const splitString = galerie.defaultCoverPicture.split(',');
            if (splitString.length >= 6) {
                const colors = splitString
                    .slice(4)
                    .filter((color) => isValidHexColor(color));
                setDefaultCoverPicture({
                    startX: +splitString[0],
                    startY: +splitString[1],
                    endX: +splitString[2],
                    endY: +splitString[3],
                    colors,
                });
            }
        }
    }, [defaultCoverPicture, galerie]);

    if (!galerie) return null;

    return (
        <Container style={style}>
            <Pressable onPress={handlePress}>
                <PictureContainer
                    colors={[theme.colors.primary, theme.colors.tertiary]}
                    end={{ x: 0.8, y: 1 }}
                    start={{ x: 0.2, y: 0 }}
                >
                    {defaultCoverPicture && (
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
                </Informations>
            </Pressable>
        </Container>
    );
};

export default React.memo(GalerieModal);
