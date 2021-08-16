import 'react-native-gesture-handler';

import { NavigationContainer } from '@react-navigation/native';
import { StatusBar } from 'expo-status-bar';
import * as React from 'react';
import { Provider } from 'react-redux';

import { Notification } from '#components';
import ThemeProvider from '#contexts/ThemeContext';
import Loader from '#helpers/Loader';
import RootStack from '#screens/RootStack';
import store from '#store';

export default function App() {
    return (
        <ThemeProvider>
            <Provider store={store}>
                <Loader>
                    <NavigationContainer>
                        <RootStack />
                        <Notification />
                        <StatusBar style="auto" />
                    </NavigationContainer>
                </Loader>
            </Provider>
        </ThemeProvider>
    );
}
