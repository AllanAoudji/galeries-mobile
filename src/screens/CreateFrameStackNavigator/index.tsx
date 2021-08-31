import {
    CardStyleInterpolators,
    createStackNavigator,
} from '@react-navigation/stack';
import * as React from 'react';

import AddDescriptionScreen from './AddDescriptionScreen';
import AddPicturesScreen from './AddPicturesScreen';
import CameraScreen from './CameraScreen';

const Stack = createStackNavigator<Screen.CreateFrameStack.ParamList>();

const CreateGalerieStackNavigator = () => {
    return (
        <Stack.Navigator
            initialRouteName="AddPictures"
            screenOptions={{
                cardStyleInterpolator: CardStyleInterpolators.forHorizontalIOS,
                headerShown: false,
            }}
        >
            <Stack.Screen
                component={AddDescriptionScreen}
                name="AddDescription"
            />
            <Stack.Screen component={AddPicturesScreen} name="AddPictures" />
            <Stack.Screen component={CameraScreen} name="Camera" />
        </Stack.Navigator>
    );
};

export default CreateGalerieStackNavigator;
