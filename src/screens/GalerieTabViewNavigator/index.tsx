import { useFocusEffect, useNavigation } from '@react-navigation/native';
import * as React from 'react';
import { StatusBar } from 'react-native';
import {
    interpolate,
    useAnimatedScrollHandler,
    useAnimatedStyle,
    useSharedValue,
} from 'react-native-reanimated';
import {
    NavigationState,
    Route,
    SceneRendererProps,
    TabView,
} from 'react-native-tab-view';
import { useSelector } from 'react-redux';

import { Pictogram } from '#components';
import clamp from '#helpers/clamp';
import { GLOBAL_STYLE } from '#helpers/constants';
import { useComponentSize } from '#hooks';
import { currentGalerieSelector } from '#store/selectors';

import FramesScreen from './FramesScreen';
import Header from './Header';
import InvitationsScreen from './InvitationsScreen';
import OptionsScreen from './OptionsScreen';
import UsersScreen from './UsersScreen';
import {
    AbsoluteCoverPicture,
    AbsoluteTopContainer,
    Container,
} from './styles';

const routes = [
    {
        key: 'frames',
        title: 'Frames',
    },
    {
        key: 'users',
        title: 'Users',
    },
    {
        key: 'invitations',
        title: 'Invitations',
    },
    {
        key: 'options',
        title: 'Options',
    },
];

const GalerieTabViewNavigator = () => {
    const galerie = useSelector(currentGalerieSelector);

    const navigation =
        useNavigation<Screen.DesktopBottomTab.GalerieNavigationProp>();
    const { onLayout: onLayoutContainer, size: sizeContainer } =
        useComponentSize();
    const { onLayout: onLayoutInfo, size: sizeInfo } = useComponentSize();

    const [navigationState, setNavigationState] = React.useState({
        index: 0,
        routes,
    });

    const handleNavigateToCreateGalerieScreen = React.useCallback(() => {
        // @ts-ignore
        navigation.getParent().getParent().getParent().navigate('CreateFrame');
    }, [navigation]);

    const maxScroll = React.useMemo(
        () =>
            (sizeInfo ? sizeInfo.height : 0) -
            (StatusBar.currentHeight || 0) -
            GLOBAL_STYLE.TOP_LEFT_PICTOGRAM_HEIGHT,
        [sizeInfo]
    );

    const scrollY = useSharedValue(0);
    const scrollHandler = useAnimatedScrollHandler({
        onScroll: (e) => {
            scrollY.value = clamp(e.contentOffset.y, 0, maxScroll);
        },
    });
    const style = useAnimatedStyle(() => {
        const translateY = interpolate(
            scrollY.value,
            [0, maxScroll],
            [0, -maxScroll]
        );
        return { transform: [{ translateY }] };
    }, [maxScroll]);
    const informationStyle = useAnimatedStyle(() => {
        const opacity = interpolate(scrollY.value, [0, maxScroll / 2], [1, 0]);
        return { opacity };
    }, [maxScroll]);
    const onIndexChange = React.useCallback((index: number) => {
        setNavigationState({
            index,
            routes,
        });
    }, []);
    const onPressBack = React.useCallback(() => {
        if (navigation.canGoBack()) navigation.goBack();
        else navigation.navigate('Home');
    }, [navigation]);

    const renderScene = React.useCallback(
        ({ route }: { route: Route }) => {
            switch (route.key) {
                case 'frames':
                    return (
                        <FramesScreen
                            galerie={galerie}
                            handleNavigateToCreateGalerieScreen={
                                handleNavigateToCreateGalerieScreen
                            }
                            paddingTop={
                                sizeContainer ? sizeContainer.height : 0
                            }
                            scrollHandler={scrollHandler}
                        />
                    );
                case 'invitations':
                    return (
                        <InvitationsScreen
                            paddingTop={
                                sizeContainer ? sizeContainer.height : 0
                            }
                            scrollHandler={scrollHandler}
                        />
                    );
                case 'options':
                    return (
                        <OptionsScreen
                            paddingTop={
                                sizeContainer ? sizeContainer.height : 0
                            }
                            scrollHandler={scrollHandler}
                        />
                    );
                case 'users':
                    return (
                        <UsersScreen
                            paddingTop={
                                sizeContainer ? sizeContainer.height : 0
                            }
                            scrollHandler={scrollHandler}
                        />
                    );
                default:
                    return null;
            }
        },
        [
            galerie,
            scrollHandler,
            sizeContainer,
            handleNavigateToCreateGalerieScreen,
        ]
    );
    const renderTabBar = React.useCallback(
        (
            props: SceneRendererProps & {
                navigationState: NavigationState<Route>;
            }
        ) => (
            <Header
                containerStyle={style}
                description={galerie ? galerie.description : undefined}
                informationStyle={informationStyle}
                name={galerie ? galerie.name : undefined}
                onLayoutContainer={onLayoutContainer}
                onLayoutInfo={onLayoutInfo}
                {...props}
            />
        ),
        [galerie, onLayoutContainer, onLayoutInfo]
    );

    useFocusEffect(
        React.useCallback(() => {
            return () => {
                scrollY.value = 0;
            };
        }, [])
    );

    return (
        <Container>
            <AbsoluteTopContainer currentHeight={StatusBar.currentHeight}>
                {/* TODO: should be an animated view */}
                {/* Should contain coverpicture and change his opacity */}
                <AbsoluteCoverPicture />
                <Pictogram
                    color="secondary-light"
                    height={GLOBAL_STYLE.TOP_LEFT_PICTOGRAM_HEIGHT}
                    onPress={onPressBack}
                    pl="small"
                    pr="small"
                    variant="arrow-left"
                />
            </AbsoluteTopContainer>
            <TabView
                navigationState={navigationState}
                onIndexChange={onIndexChange}
                renderScene={renderScene}
                renderTabBar={renderTabBar}
            />
        </Container>
    );
};

export default GalerieTabViewNavigator;
