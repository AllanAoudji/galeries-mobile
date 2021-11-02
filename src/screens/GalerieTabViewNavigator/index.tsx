import { useFocusEffect, useNavigation } from '@react-navigation/native';
import * as React from 'react';
import { BackHandler, StatusBar } from 'react-native';
import { useSharedValue } from 'react-native-reanimated';
import {
    NavigationState,
    Route,
    SceneRendererProps,
    TabView,
} from 'react-native-tab-view';
import { useDispatch, useSelector } from 'react-redux';

import { UnsubscribeGalerieProvider } from '#contexts/UnsubscribeGalerieContext';
import clamp from '#helpers/clamp';
import { GLOBAL_STYLE } from '#helpers/constants';
import { useComponentSize } from '#hooks';
import { resetGaleriesCurrent, selectCurrentGalerie } from '#store/galeries';

import FramesScreen from './FramesScreen';
import GalerieBlackListsScreen from './GalerieBlackListsScreen';
import Header from './Header';
import InvitationsScreen from './InvitationsScreen';
import OptionsScreen from './OptionsScreen';
import UsersScreen from './UsersScreen';
import AbsoluteHeader from './AbsoluteHeader';

import { Container } from './styles';
import { FullScreenLoader } from '#components';

const adminRoleRoutes = [
    { key: 'frames', title: 'Frames' },
    { key: 'users', title: 'Users' },
    { key: 'galerieBlackLists', title: 'Black Lists' },
    { key: 'invitations', title: 'Invitations' },
    { key: 'options', title: 'Options' },
];
const userRoleRoutes = [
    { key: 'frames', title: 'Frames' },
    { key: 'users', title: 'Users' },
    { key: 'options', title: 'Options' },
];

const GalerieTabViewNavigator = () => {
    const dispatch = useDispatch();
    const navigation =
        useNavigation<Screen.DesktopBottomTab.GalerieNavigationProp>();
    const galerie = useSelector(selectCurrentGalerie);

    const { onLayout: onLayoutContainer, size: sizeContainer } =
        useComponentSize();
    const { onLayout: onLayoutInfo, size: sizeInfo } = useComponentSize();

    const maxScroll = React.useMemo(
        () =>
            (sizeInfo ? sizeInfo.height : 0) -
            (StatusBar.currentHeight || 0) -
            GLOBAL_STYLE.TOP_LEFT_PICTOGRAM_HEIGHT,
        [sizeInfo]
    );
    const scrollY = useSharedValue(0);
    const editScrollY = React.useCallback(
        (offsetY: number) => {
            'worklet';

            scrollY.value = clamp(offsetY, 0, maxScroll);
        },
        [maxScroll]
    );

    const [currentRoute, setCurrentRoute] = React.useState<string>('frames');
    const [navigationState, setNavigationState] =
        React.useState<NavigationState<Route> | null>({
            index: 0,
            routes:
                galerie && galerie.role === 'user'
                    ? userRoleRoutes
                    : adminRoleRoutes,
        });

    const onIndexChange = React.useCallback(
        (index: number) => {
            switch (index) {
                case 0:
                    setCurrentRoute('frames');
                    break;
                case 1:
                    setCurrentRoute('users');
                    break;
                case 2:
                    if (galerie && galerie.role === 'user')
                        setCurrentRoute('options');
                    else setCurrentRoute('galerieBlackLists');
                    break;
                case 3:
                    if (galerie && galerie.role === 'admin')
                        setCurrentRoute('invitations');
                    break;
                case 4:
                    if (galerie && galerie.role === 'admin')
                        setCurrentRoute('options');
                    break;
                default:
                    setCurrentRoute('frames');
            }
            return setNavigationState({
                index,
                routes:
                    galerie && galerie.role === 'user'
                        ? userRoleRoutes
                        : adminRoleRoutes,
            });
        },
        [galerie]
    );

    const renderScene = React.useCallback(
        ({
            route,
        }: SceneRendererProps & {
            route: Route;
        }) => {
            switch (route.key) {
                case 'frames':
                    return (
                        <FramesScreen
                            current={currentRoute === 'frames'}
                            editScrollY={editScrollY}
                            galerie={galerie}
                            maxScroll={maxScroll}
                            paddingTop={
                                sizeContainer ? sizeContainer.height : 0
                            }
                            scrollY={scrollY}
                        />
                    );
                case 'galerieBlackLists':
                    return (
                        <GalerieBlackListsScreen
                            current={currentRoute === 'galerieBlackLists'}
                            galerie={galerie}
                            paddingTop={
                                sizeContainer ? sizeContainer.height : 0
                            }
                            scrollY={scrollY}
                        />
                    );
                case 'invitations':
                    return (
                        <InvitationsScreen
                            current={currentRoute === 'invitations'}
                            editScrollY={editScrollY}
                            galerie={galerie}
                            maxScroll={maxScroll}
                            paddingTop={
                                sizeContainer ? sizeContainer.height : 0
                            }
                            scrollY={scrollY}
                        />
                    );
                case 'options':
                    return (
                        <OptionsScreen
                            current={currentRoute === 'options'}
                            editScrollY={editScrollY}
                            maxScroll={maxScroll}
                            galerie={galerie}
                            paddingTop={
                                sizeContainer ? sizeContainer.height : 0
                            }
                            scrollY={scrollY}
                        />
                    );
                case 'users':
                    return (
                        <UsersScreen
                            current={currentRoute === 'users'}
                            editScrollY={editScrollY}
                            maxScroll={maxScroll}
                            paddingTop={
                                sizeContainer ? sizeContainer.height : 0
                            }
                            scrollY={scrollY}
                        />
                    );
                default:
                    return null;
            }
        },
        [currentRoute, editScrollY, galerie, maxScroll, sizeContainer]
    );
    const renderTabBar = React.useCallback(
        (
            props: SceneRendererProps & {
                navigationState: NavigationState<Route>;
            }
        ) => (
            <Header
                galerie={galerie}
                maxScroll={maxScroll}
                onLayoutContainer={onLayoutContainer}
                onLayoutInfo={onLayoutInfo}
                scrollY={scrollY}
                {...props}
            />
        ),
        [galerie, maxScroll, onLayoutContainer, onLayoutInfo]
    );

    useFocusEffect(
        React.useCallback(() => {
            if (!galerie) {
                if (navigation.canGoBack()) navigation.goBack();
                else navigation.navigate('Home');
            }
        }, [galerie])
    );
    useFocusEffect(
        React.useCallback(() => {
            if (!navigationState) {
                setNavigationState({
                    index: 0,
                    routes:
                        galerie && galerie.role === 'user'
                            ? userRoleRoutes
                            : adminRoleRoutes,
                });
            }
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
            <Container>
                <AbsoluteHeader maxScroll={maxScroll} scrollY={scrollY} />
                <TabView
                    navigationState={navigationState}
                    onIndexChange={onIndexChange}
                    renderScene={renderScene}
                    renderTabBar={renderTabBar}
                />
            </Container>
        </UnsubscribeGalerieProvider>
    );
};

export default GalerieTabViewNavigator;
