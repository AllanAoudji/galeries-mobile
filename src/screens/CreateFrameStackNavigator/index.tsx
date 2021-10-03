import {
    CardStyleInterpolators,
    createStackNavigator,
    StackNavigationOptions,
} from '@react-navigation/stack';
import * as React from 'react';

import { CreateFrameProvider } from '#contexts/CreateFrameContext';

import AddDescriptionScreen from './AddDescriptionScreen';
import AddPicturesScreen from './AddPicturesScreen';
import CreateFrameCameraScreen from './CreateFrameCameraScreen';
import CreateFrameGalleryScreen from './CreateFrameGalleryScreen';
import { DefaultHeader } from '#components';

const Stack = createStackNavigator<Screen.CreateFrameStack.ParamList>();

const addDescriptionHeader = () => {
    return (
        <DefaultHeader
            variant="secondary"
            title="add a description (optional)"
        />
    );
};
const addDescriptionOption: StackNavigationOptions = {
    header: addDescriptionHeader,
};
const addPicturesOption: StackNavigationOptions = {
    headerShown: false,
};
const createFrameCameraOption: StackNavigationOptions = {
    headerShown: false,
};
const createFrameGalleryOption: StackNavigationOptions = {
    headerShown: false,
};
const screenOptions: StackNavigationOptions = {
    cardStyleInterpolator: CardStyleInterpolators.forHorizontalIOS,
};

const CreateGalerieStackNavigator = () => {
    return (
        <CreateFrameProvider>
            <Stack.Navigator
                initialRouteName="AddPictures"
                screenOptions={screenOptions}
            >
                <Stack.Screen
                    component={AddDescriptionScreen}
                    name="AddDescription"
                    options={addDescriptionOption}
                />
                <Stack.Screen
                    component={AddPicturesScreen}
                    name="AddPictures"
                    options={addPicturesOption}
                />
                <Stack.Screen
                    component={CreateFrameCameraScreen}
                    name="CreateFrameCamera"
                    options={createFrameCameraOption}
                />
                <Stack.Screen
                    component={CreateFrameGalleryScreen}
                    name="CreateFrameGallery"
                    options={createFrameGalleryOption}
                />
            </Stack.Navigator>
        </CreateFrameProvider>
    );
};

export default CreateGalerieStackNavigator;
