import { useFocusEffect, useNavigation } from '@react-navigation/native';
import * as React from 'react';
import { StatusBar, View } from 'react-native';
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
import { useDispatch, useSelector } from 'react-redux';

import { Pictogram } from '#components';
import { GalerieTabbarScreenHeader } from '#components/Screen';
import clamp from '#helpers/clamp';
import { useComponentSize } from '#hooks';
import { resetCurrentGalerieId } from '#store/actions';
import { currentGalerieSelector } from '#store/selectors';

import FramesScreen from './FramesScreen';
import InvitationsScreen from './InvitationsScreen';
import OptionsScreen from './OptionsScreen';
import UsersScreen from './UsersScreen';
import { Container, PictogramContainer } from './styles';

const BACK_BUTTON_HEIGHT = 55;

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
    const dispatch = useDispatch();
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

    const maxScroll = React.useMemo(
        () =>
            (sizeInfo ? sizeInfo.height : 0) -
            (StatusBar.currentHeight || 0) -
            BACK_BUTTON_HEIGHT,
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
            <GalerieTabbarScreenHeader
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
                dispatch(resetCurrentGalerieId());
                scrollY.value = 0;
            };
        }, [])
    );

    return (
        <>
            <Container>
                <View
                    style={{
                        height:
                            BACK_BUTTON_HEIGHT + (StatusBar.currentHeight || 0),
                        top: 0,
                        left: 0,
                        right: 0,
                        justifyContent: 'flex-start',
                        flexDirection: 'row',
                        position: 'absolute',
                        zIndex: 2,
                        alignItems: 'flex-end',
                    }}
                >
                    {/* TODO: should be an animated view */}
                    {/* Should contain coverpicture and change his opacity */}
                    <View
                        style={{
                            position: 'absolute',
                            top: 0,
                            right: 0,
                            left: 0,
                            bottom: 0,
                        }}
                    />
                    <PictogramContainer onPress={onPressBack}>
                        <Pictogram
                            variant="arrow-left"
                            color="secondary-light"
                        />
                    </PictogramContainer>
                </View>
                <TabView
                    navigationState={navigationState}
                    onIndexChange={onIndexChange}
                    renderScene={renderScene}
                    renderTabBar={renderTabBar}
                />
            </Container>
        </>
    );
};

export default GalerieTabViewNavigator;
