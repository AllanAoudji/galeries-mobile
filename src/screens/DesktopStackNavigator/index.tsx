import {
    CardStyleInterpolators,
    createStackNavigator,
} from '@react-navigation/stack';
import * as React from 'react';

import CreateFrameScreen from './CreateFrameScreen';
import CreateGalerieScreen from './CreateGalerieScreen';
import NavigationScreen from './NavigationScreen';

const Stack = createStackNavigator<Screen.DesktopStack.ParamList>();

const DesktopStackNavigator = () => {
    return (
        <Stack.Navigator
            initialRouteName="Navigation"
            screenOptions={{
                cardStyleInterpolator: CardStyleInterpolators.forFadeFromCenter,
                headerShown: false,
            }}
        >
            <Stack.Screen name="CreateFrame" component={CreateFrameScreen} />
            <Stack.Screen
                name="CreateGalerie"
                component={CreateGalerieScreen}
            />
            <Stack.Screen name="Navigation" component={NavigationScreen} />
        </Stack.Navigator>
    );
};

export default DesktopStackNavigator;
