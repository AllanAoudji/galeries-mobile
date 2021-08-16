import {
    CardStyleInterpolators,
    createStackNavigator,
} from '@react-navigation/stack';
import * as React from 'react';
import { useDispatch, useSelector } from 'react-redux';

import { fetchUser } from '#store/actions';
import { userSelector } from '#store/selectors';

import DesktopScreen from './DesktopScreen';
import ForgotYourPasswordScreen from './ForgotYourPasswordScreen';
import LangingScreen from './LandingScreen';
import LoginScreen from './LoginScreen';
import SigninScreen from './SigninScreen';
import { SplashScreen } from '#components';

const Stack = createStackNavigator<Screen.Home.HomeStackParamList>();

const HomeStack = () => {
    const [loading, setLoading] = React.useState<boolean>(true);
    const dispatch = useDispatch();
    const user = useSelector(userSelector);

    React.useEffect(() => {
        dispatch(fetchUser());
    }, []);
    React.useEffect(() => {
        if (user.status === 'PENDING' || user.status === 'FETCHING') {
            setLoading(true);
        } else {
            setLoading(false);
        }
    }, [user]);

    if (loading) {
        return <SplashScreen />;
    }

    return (
        <Stack.Navigator
            initialRouteName="Landing"
            screenOptions={{
                cardStyleInterpolator: CardStyleInterpolators.forHorizontalIOS,
                headerShown: false,
            }}
        >
            {user.data ? (
                <Stack.Screen name="Desktop" component={DesktopScreen} />
            ) : (
                <>
                    <Stack.Screen
                        name="ForgotYourPassword"
                        component={ForgotYourPasswordScreen}
                    />
                    <Stack.Screen name="Landing" component={LangingScreen} />
                    <Stack.Screen name="Login" component={LoginScreen} />
                    <Stack.Screen name="Signin" component={SigninScreen} />
                </>
            )}
        </Stack.Navigator>
    );
};

export default HomeStack;
