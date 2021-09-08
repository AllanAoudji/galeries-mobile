import {
    CardStyleInterpolators,
    createStackNavigator,
} from '@react-navigation/stack';
import * as React from 'react';

import { CreateFrameProvider } from '#contexts/CreateFrameContext';

import AddDescriptionScreen from './AddDescriptionScreen';
import AddPicturesScreen from './AddPicturesScreen';
import CameraScreen from './CameraScreen';
import CreateFrameGalleryScreen from './CreateFrameGalleryScreen';

const Stack = createStackNavigator<Screen.CreateFrameStack.ParamList>();

const CreateGalerieStackNavigator = () => {
    return (
        <CreateFrameProvider>
            <Stack.Navigator
                initialRouteName="AddPictures"
                screenOptions={{
                    cardStyleInterpolator:
                        CardStyleInterpolators.forHorizontalIOS,
                    headerShown: false,
                }}
            >
                <Stack.Screen
                    component={AddDescriptionScreen}
                    name="AddDescription"
                />
                <Stack.Screen
                    component={AddPicturesScreen}
                    name="AddPictures"
                />
                <Stack.Screen component={CameraScreen} name="Camera" />
                <Stack.Screen
                    component={CreateFrameGalleryScreen}
                    name="CreateFrameGallery"
                />
            </Stack.Navigator>
        </CreateFrameProvider>
    );
};

export default CreateGalerieStackNavigator;
