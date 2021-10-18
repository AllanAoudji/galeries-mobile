import * as React from 'react';
import { LayoutChangeEvent, StatusBar } from 'react-native';
import {
    NavigationState,
    Route,
    SceneRendererProps,
} from 'react-native-tab-view';
import { useTheme } from 'styled-components/native';

import Animated, {
    interpolate,
    useAnimatedStyle,
} from 'react-native-reanimated';
import { Typography, Pictogram } from '#components';
import convertPixelToNum from '#helpers/convertPixelToNum';

import GalerieCoverPicture from './GalerieCoverPicture';

import {
    Container,
    CoverPictureContainer,
    DarkBackground,
    DescriptionContainer,
    EditPictogramContainer,
    TabbarContainer,
    TabbarStyled,
    TitleContainer,
    TypographyContainer,
} from './styles';

type Props = SceneRendererProps & {
    description?: string;
    maxScroll: number;
    name?: string;
    navigationState: NavigationState<Route>;
    onLayoutContainer: (event: LayoutChangeEvent) => void;
    onLayoutInfo: (event: LayoutChangeEvent) => void;
    scrollY: Animated.SharedValue<number>;
};

const GalerieTabbarNavigator = ({
    description,
    maxScroll,
    name,
    onLayoutContainer,
    onLayoutInfo,
    scrollY,
    ...props
}: Props) => {
    const theme = useTheme();

    const containerStyle = useAnimatedStyle(() => {
        const translateY = interpolate(
            scrollY.value,
            [0, maxScroll],
            [0, -maxScroll]
        );
        return { transform: [{ translateY }] };
    }, [maxScroll]);
    const coverPictureContainerStyle = useAnimatedStyle(() => {
        const borderBottomRightRadius = interpolate(
            scrollY.value,
            [0, -(maxScroll / 2), -maxScroll],
            [45, 45, 0]
        );
        return { borderBottomRightRadius };
    }, [maxScroll]);
    const titleContainerStyle = useAnimatedStyle(() => {
        const opacity = interpolate(
            scrollY.value,
            [0, -(maxScroll / 2), -maxScroll],
            [1, 1, 0]
        );
        return { opacity };
    }, [maxScroll]);

    return (
        <Container onLayout={onLayoutContainer} style={containerStyle}>
            <Animated.View onLayout={onLayoutInfo}>
                <CoverPictureContainer style={coverPictureContainerStyle}>
                    <DarkBackground currentHeight={StatusBar.currentHeight}>
                        <GalerieCoverPicture />
                        <TitleContainer style={titleContainerStyle}>
                            <TypographyContainer>
                                <Typography
                                    color="secondary-light"
                                    fontFamily="bold"
                                    fontSize={36}
                                >
                                    {name}
                                </Typography>
                            </TypographyContainer>
                            <EditPictogramContainer>
                                <Pictogram
                                    color="secondary-light"
                                    variant="edit-fill"
                                />
                            </EditPictogramContainer>
                        </TitleContainer>
                    </DarkBackground>
                </CoverPictureContainer>
                {!!description && (
                    <DescriptionContainer>
                        <Typography fontSize={14}>{description}</Typography>
                    </DescriptionContainer>
                )}
            </Animated.View>
            <TabbarContainer>
                <TabbarStyled
                    indicatorStyle={{
                        backgroundColor: theme.colors.black,
                        height: 3,
                    }}
                    labelStyle={{
                        color: theme.colors.black,
                        fontSize: convertPixelToNum(theme.font.sizes[18]),
                        fontFamily: theme.font.families.roman,
                        textTransform: 'capitalize',
                    }}
                    pressColor="transparent"
                    tabStyle={{
                        justifyContent: 'flex-start',
                        padding: 0,
                    }}
                    {...props}
                />
            </TabbarContainer>
        </Container>
    );
};

export default GalerieTabbarNavigator;
