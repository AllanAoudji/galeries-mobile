import 'react-native-gesture-handler';

import { NavigationContainer } from '@react-navigation/native';
import { StatusBar } from 'expo-status-bar';
import * as React from 'react';
import { Provider } from 'react-redux';

import { Notification } from '#components';
import ThemeProvider from '#contexts/ThemeContext';
import { BottomSheetProvider } from '#contexts/BottomSheetContext';
import Loader from '#helpers/Loader';
import RootStackNavigator from '#screens/RootStackNavigator';
import store from '#store';

export default function App() {
    return (
        <ThemeProvider>
            <Provider store={store}>
                <Loader>
                    <BottomSheetProvider>
                        <NavigationContainer>
                            <RootStackNavigator />
                            <Notification />
                            <StatusBar style="auto" />
                        </NavigationContainer>
                    </BottomSheetProvider>
                </Loader>
            </Provider>
        </ThemeProvider>
    );
}

// TODO:
// Use HeaderBottomTab on Render components
// Rename Components relative to bottomTabScreen
// Check all files

// Remake header (too large)
// style search bar
// Remake buttons (too large)
// Design galeries Card

// Make create galerie a modal

// Show BottomTab Render Component when Header/+SubHeader layout is calculated
// Hide header on scroll

// Clean form when not focused
// do not allow to type more than 200 chars galerie's description
