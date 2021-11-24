import {
    CardStyleInterpolators,
    createStackNavigator,
    StackNavigationOptions,
} from '@react-navigation/stack';
import * as React from 'react';

import DeleteAccountHeader from './DeleteAccountHeader';
import DeleteAccountScreen from './DeleteAccountScreen';
import SettingsFieldsHeader from './SettingsFieldsHeader';
import SettingsFieldsScreen from './SettingsFieldsScreen';

const Stack = createStackNavigator<Screen.SettingsStack.ParamList>();

const deleteAccountOptions: StackNavigationOptions = {
    header: DeleteAccountHeader,
};
const screenOptions: StackNavigationOptions = {
    cardStyleInterpolator: CardStyleInterpolators.forHorizontalIOS,
};
const settingsFieldsOptions: StackNavigationOptions = {
    header: SettingsFieldsHeader,
};

const SettingsStackNavigator = () => {
    return (
        <Stack.Navigator
            initialRouteName="SettingsFields"
            screenOptions={screenOptions}
        >
            <Stack.Screen
                component={DeleteAccountScreen}
                name="DeleteAccount"
                options={deleteAccountOptions}
            />
            <Stack.Screen
                component={SettingsFieldsScreen}
                name="SettingsFields"
                options={settingsFieldsOptions}
            />
        </Stack.Navigator>
    );
};

export default SettingsStackNavigator;
