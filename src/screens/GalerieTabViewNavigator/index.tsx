import { useFocusEffect, useNavigation } from '@react-navigation/native';
import * as React from 'react';
import { BackHandler } from 'react-native';
import {
    interpolate,
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

import {
    AbsoluteHeader,
    FullScreenContainer,
    FullScreenLoader,
    Typography,
} from '#components';
import { UnsubscribeGalerieProvider } from '#contexts/UnsubscribeGalerieContext';
import clamp from '#helpers/clamp';
import GalerieTabViewMaxScroll from '#helpers/GalerieTabViewMaxScroll';
import {
    getGalerieId,
    resetGaleriesCurrent,
    selectCurrentGalerie,
} from '#store/galeries';

import AboutScreen from './AboutScreen';
import FramesScreen from './FramesScreen';
import GalerieBlackListsScreen from './GalerieBlackListsScreen';
import Header from './Header';
import InvitationsScreen from './InvitationsScreen';
import OptionsScreen from './OptionsScreen';
import UsersScreen from './UsersScreen';

import { PictureHeader, PictureHeaderTextContainer } from './styles';

const adminRoleRoutes = [
    { key: 'frames', title: 'Frames' },
    { key: 'users', title: 'Users' },
    { key: 'galerieBlackLists', title: 'Black Lists' },
    { key: 'invitations', title: 'Invitations' },
    { key: 'about', title: 'About' },
    { key: 'options', title: 'Options' },
];
const userRoleRoutes = [
    { key: 'frames', title: 'Frames' },
    { key: 'users', title: 'Users' },
    { key: 'about', title: 'About' },
    { key: 'options', title: 'Options' },
];

const GalerieTabViewNavigator = () => {
    const dispatch = useDispatch();
    const navigation =
        useNavigation<Screen.DesktopBottomTab.GalerieNavigationProp>();

    const galerie = useSelector(selectCurrentGalerie);

    const [currentRoute, setCurrentRoute] = React.useState<string>('frames');
    const [initialLoading, setInitialLoading] = React.useState<boolean>(true);
    const [navigationState, setNavigationState] =
        React.useState<NavigationState<Route> | null>({
            index: 0,
            routes:
                galerie && galerie.role === 'user'
                    ? userRoleRoutes
                    : adminRoleRoutes,
        });

    const scrollY = useSharedValue(0);
    const editScrollY = React.useCallback((offsetY: number) => {
        'worklet';

        scrollY.value = clamp(offsetY, 0, GalerieTabViewMaxScroll);
    }, []);
    const pictureHeaderStyle = useAnimatedStyle(() => {
        const opacity = interpolate(
            scrollY.value,
            [0, GalerieTabViewMaxScroll / 2, GalerieTabViewMaxScroll],
            [0, 0, 1]
        );
        return { opacity };
    }, []);

    const getCurrentAdminRoute = React.useCallback((index: number) => {
        switch (index) {
            case 0:
                setCurrentRoute('frames');
                break;
            case 1:
                setCurrentRoute('users');
                break;
            case 2:
                setCurrentRoute('galerieBlackLists');
                break;
            case 3:
                setCurrentRoute('invitations');
                break;
            case 4:
                setCurrentRoute('about');
                break;
            case 5:
                setCurrentRoute('options');
                break;
            default:
                setCurrentRoute('frames');
        }
    }, []);
    const getCurrentUserRoute = React.useCallback((index: number) => {
        switch (index) {
            case 0:
                setCurrentRoute('frames');
                break;
            case 1:
                setCurrentRoute('users');
                break;
            case 2:
                setCurrentRoute('about');
                break;
            case 3:
                setCurrentRoute('options');
                break;
            default:
                setCurrentRoute('frames');
        }
    }, []);
    const navigationCallBack = React.useCallback(
        () => dispatch(resetGaleriesCurrent),
        []
    );
    const onIndexChange = React.useCallback(
        (index: number) => {
            if (galerie && galerie.role === 'user') getCurrentUserRoute(index);
            else getCurrentAdminRoute(index);
            return setNavigationState({
                index,
                routes:
                    galerie && galerie.role === 'user'
                        ? userRoleRoutes
                        : adminRoleRoutes,
            });
        },
        [galerie, getCurrentAdminRoute, getCurrentUserRoute]
    );
    const renderScene = React.useCallback(
        ({
            route,
        }: SceneRendererProps & {
            route: Route;
        }) => {
            switch (route.key) {
                case 'about':
                    return (
                        <AboutScreen
                            current={currentRoute === 'about'}
                            editScrollY={editScrollY}
                            galerie={galerie}
                            scrollY={scrollY}
                        />
                    );
                case 'frames':
                    return (
                        <FramesScreen
                            current={currentRoute === 'frames'}
                            editScrollY={editScrollY}
                            galerie={galerie}
                            scrollY={scrollY}
                        />
                    );
                case 'galerieBlackLists':
                    return (
                        <GalerieBlackListsScreen
                            current={currentRoute === 'galerieBlackLists'}
                            editScrollY={editScrollY}
                            galerie={galerie}
                            scrollY={scrollY}
                        />
                    );
                case 'invitations':
                    return (
                        <InvitationsScreen
                            current={currentRoute === 'invitations'}
                            editScrollY={editScrollY}
                            galerie={galerie}
                            scrollY={scrollY}
                        />
                    );
                case 'options':
                    return (
                        <OptionsScreen
                            current={currentRoute === 'options'}
                            editScrollY={editScrollY}
                            galerie={galerie}
                            scrollY={scrollY}
                        />
                    );
                case 'users':
                    return (
                        <UsersScreen
                            current={currentRoute === 'users'}
                            editScrollY={editScrollY}
                            galerie={galerie}
                            scrollY={scrollY}
                        />
                    );
                default:
                    return null;
            }
        },
        [currentRoute, editScrollY, galerie]
    );
    const renderTabBar = React.useCallback(
        (
            props: SceneRendererProps & {
                navigationState: NavigationState<Route>;
            }
        ) => <Header galerie={galerie} scrollY={scrollY} {...props} />,
        [galerie]
    );

    useFocusEffect(
        React.useCallback(() => {
            if (!galerie) return;
            if (!initialLoading) return;
            setInitialLoading(false);
            dispatch(getGalerieId(galerie.id));
        }, [galerie, initialLoading])
    );
    useFocusEffect(
        React.useCallback(() => {
            if (galerie) return;
            if (navigation.canGoBack()) navigation.goBack();
            else navigation.navigate('Home');
        }, [galerie])
    );
    useFocusEffect(
        React.useCallback(() => {
            if (navigationState) return;
            setNavigationState({
                index: 0,
                routes:
                    galerie && galerie.role === 'user'
                        ? userRoleRoutes
                        : adminRoleRoutes,
            });
        }, [galerie, navigationState])
    );
    useFocusEffect(
        React.useCallback(() => {
            const dispatchResetCurrentGalerie = () => {
                dispatch(resetGaleriesCurrent());
                return false;
            };
            BackHandler.addEventListener(
                'hardwareBackPress',
                dispatchResetCurrentGalerie
            );
            return () => {
                BackHandler.removeEventListener(
                    'hardwareBackPress',
                    dispatchResetCurrentGalerie
                );
            };
        }, [])
    );
    useFocusEffect(
        React.useCallback(
            () => () => {
                setInitialLoading(true);
            },
            []
        )
    );

    React.useEffect(() => {
        if (!galerie) {
            scrollY.value = 0;
            setCurrentRoute('frames');
            setNavigationState(null);
        }
    }, [galerie]);

    if (!galerie) return null;
    if (!navigationState) return <FullScreenLoader show />;

    return (
        <UnsubscribeGalerieProvider>
            <FullScreenContainer>
                <AbsoluteHeader
                    navigationCallBack={navigationCallBack}
                    type="return"
                >
                    <PictureHeader style={pictureHeaderStyle}>
                        <PictureHeaderTextContainer>
                            <Typography
                                color="secondary-light"
                                fontFamily="bold"
                                fontSize={24}
                            >
                                {galerie.name}
                            </Typography>
                        </PictureHeaderTextContainer>
                    </PictureHeader>
                </AbsoluteHeader>
                <TabView
                    navigationState={navigationState}
                    onIndexChange={onIndexChange}
                    overScrollMode="never"
                    renderScene={renderScene}
                    renderTabBar={renderTabBar}
                />
            </FullScreenContainer>
        </UnsubscribeGalerieProvider>
    );
};

export default GalerieTabViewNavigator;
