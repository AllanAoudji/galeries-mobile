import * as React from 'react';
import { useSharedValue, withTiming } from 'react-native-reanimated';
import {
    NavigationState,
    Route,
    SceneRendererProps,
    TabView,
} from 'react-native-tab-view';

import clamp from '#helpers/clamp';
import ProfileTabViewMaxScroll from '#helpers/ProfileTabViewMaxScroll';

import FramesScreen from './FramesScreen';
import Header from './Header';
import ProfilePicturesScreen from './ProfilePicturesScreen';

import AbsoluteHeader from './AbsoluteHeader';

import { Container } from './styles';
import { ANIMATIONS } from '#helpers/constants';

const routes = [
    { key: 'profilePictures', title: 'Profile Pictures' },
    { key: 'frames', title: 'Frames' },
];

const ProfileTabViewNavigator = () => {
    const scrollY = useSharedValue(0);
    const editScrollY = React.useCallback(
        (offsetY: number, withAnimattion?: boolean) => {
            'worklet';

            if (withAnimattion) {
                scrollY.value = withTiming(
                    clamp(offsetY, 0, ProfileTabViewMaxScroll),
                    ANIMATIONS.TIMING_CONFIG()
                );
            }
            scrollY.value = clamp(offsetY, 0, ProfileTabViewMaxScroll);
        },
        []
    );

    const [currentRoute, setCurrentRoute] =
        React.useState<string>('profilePictures');

    const [navigationState, setNavigationState] = React.useState<
        NavigationState<Route>
    >({
        index: 0,
        routes,
    });

    const getCurrentRoute = React.useCallback((index: number) => {
        switch (index) {
            case 0:
                setCurrentRoute('profilePictures');
                break;
            case 1:
                setCurrentRoute('frames');
                break;
            default:
                setCurrentRoute('frames');
        }
    }, []);

    const onIndexChange = React.useCallback((index: number) => {
        getCurrentRoute(index);
        return setNavigationState({
            index,
            routes,
        });
    }, []);

    const renderScren = React.useCallback(
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
                            scrollY={scrollY}
                        />
                    );
                case 'profilePictures':
                    return (
                        <ProfilePicturesScreen
                            current={currentRoute === 'profilePictures'}
                            editScrollY={editScrollY}
                            scrollY={scrollY}
                        />
                    );
                default:
                    return null;
            }
        },
        [currentRoute, editScrollY]
    );
    const renderTabBar = React.useCallback(
        (
            props: SceneRendererProps & {
                navigationState: NavigationState<Route>;
            }
        ) => <Header scrollY={scrollY} {...props} />,
        []
    );

    return (
        <Container>
            <AbsoluteHeader scrollY={scrollY} />
            <TabView
                navigationState={navigationState}
                onIndexChange={onIndexChange}
                renderScene={renderScren}
                renderTabBar={renderTabBar}
            />
        </Container>
    );
};

export default ProfileTabViewNavigator;
