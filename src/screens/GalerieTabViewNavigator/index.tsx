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

import clamp from '#helpers/clamp';
import { GLOBAL_STYLE } from '#helpers/constants';
import { useComponentSize } from '#hooks';
import { selectCurrentGalerie } from '#store/galeries';

import FramesScreen from './FramesScreen';
import Header from './Header';
import InvitationsScreen from './InvitationsScreen';
import OptionsScreen from './OptionsScreen';
import UsersScreen from './UsersScreen';
import AbsoluteHeader from './AbsoluteHeader';

import { Container } from './styles';

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
    const galerie = useSelector(selectCurrentGalerie);

    const { onLayout: onLayoutContainer, size: sizeContainer } =
        useComponentSize();
    const { onLayout: onLayoutInfo, size: sizeInfo } = useComponentSize();

    const [navigationState, setNavigationState] = React.useState({
        index: 0,
        routes,
    });

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
    const informationStyle = useAnimatedStyle(() => {
        const opacity = interpolate(scrollY.value, [0, maxScroll / 2], [1, 0]);
        return { opacity };
    }, [maxScroll]);
    const style = useAnimatedStyle(() => {
        const translateY = interpolate(
            scrollY.value,
            [0, maxScroll],
            [0, -maxScroll]
        );
        return { transform: [{ translateY }] };
    }, [maxScroll]);

    const onIndexChange = React.useCallback((index: number) => {
        setNavigationState({
            index,
            routes,
        });
    }, []);
    const renderScene = React.useCallback(
        ({ route }: { route: Route }) => {
            switch (route.key) {
                case 'frames':
                    return (
                        <FramesScreen
                            galerie={galerie}
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
        [galerie, scrollHandler, sizeContainer]
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

    return (
        <Container>
            <AbsoluteHeader maxScroll={maxScroll} scrollY={scrollY} />
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
