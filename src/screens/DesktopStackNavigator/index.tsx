import {
    CardStyleInterpolators,
    createStackNavigator,
    StackHeaderProps,
} from '@react-navigation/stack';
import * as React from 'react';
import { DefaultHeader } from '#components';

import CreateGalerieScreen from './CreateGalerieScreen';
import NavigationScreen from './NavigationScreen';

const Stack = createStackNavigator<Screen.DesktopStack.ParamList>();

const DesktopStackNavigator = () => {
    const CreateGalerieHeader = React.useCallback(
        ({ navigation }: StackHeaderProps) => (
            <DefaultHeader
                onPress={() => {
                    if (navigation.canGoBack()) navigation.goBack();
                    else
                        navigation.navigate('Navigation', {
                            screen: 'Main',
                            params: { screen: 'Home' },
                        });
                }}
                title="create a new galerie"
                variant="secondary"
            />
        ),
        []
    );

    return (
        <Stack.Navigator
            initialRouteName="Navigation"
            screenOptions={{
                cardStyleInterpolator: CardStyleInterpolators.forFadeFromCenter,
            }}
        >
            <Stack.Screen
                component={CreateGalerieScreen}
                name="CreateGalerie"
                options={{ header: CreateGalerieHeader }}
            />
            <Stack.Screen
                component={NavigationScreen}
                name="Navigation"
                options={{ headerShown: false }}
            />
        </Stack.Navigator>
    );
};

export default DesktopStackNavigator;
