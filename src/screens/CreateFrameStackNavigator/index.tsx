import {
    CardStyleInterpolators,
    createStackNavigator,
} from '@react-navigation/stack';
import * as React from 'react';

import { CreateFrameProvider } from '#contexts/CreateFrameContext';

import AddDescriptionScreen from './AddDescriptionScreen';
import AddPicturesScreen from './AddPicturesScreen';
import CreateFrameCameraScreen from './CreateFrameCameraScreen';
import CreateFrameGalleryScreen from './CreateFrameGalleryScreen';
import { DefaultHeader } from '#components';

const Stack = createStackNavigator<Screen.CreateFrameStack.ParamList>();

const CreateGalerieStackNavigator = () => {
    const addDescriptionHeader = React.useCallback(
        () => (
            <DefaultHeader
                variant="secondary"
                title="add a description (optional)"
            />
        ),
        []
    );

    return (
        <CreateFrameProvider>
            <Stack.Navigator
                initialRouteName="AddPictures"
                screenOptions={{
                    cardStyleInterpolator:
                        CardStyleInterpolators.forHorizontalIOS,
                }}
            >
                <Stack.Screen
                    component={AddDescriptionScreen}
                    name="AddDescription"
                    options={{ header: addDescriptionHeader }}
                />
                <Stack.Screen
                    component={AddPicturesScreen}
                    name="AddPictures"
                    options={{ headerShown: false }}
                />
                <Stack.Screen
                    component={CreateFrameCameraScreen}
                    name="CreateFrameCamera"
                    options={{ headerShown: false }}
                />
                <Stack.Screen
                    component={CreateFrameGalleryScreen}
                    name="CreateFrameGallery"
                    options={{ headerShown: false }}
                />
            </Stack.Navigator>
        </CreateFrameProvider>
    );
};

export default CreateGalerieStackNavigator;
