import 'react-native-gesture-handler';

import { enableScreens } from 'react-native-screens';
import { NavigationContainer } from '@react-navigation/native';
import { StatusBar } from 'expo-status-bar';
import * as React from 'react';
import { Provider } from 'react-redux';

import { Notification } from '#components';
import { BottomSheetProvider } from '#contexts/BottomSheetContext';
import { DeleteFrameModalProvider } from '#contexts/DeleteFrameModalContext';
import { DeleteInvitationModalProvider } from '#contexts/DeleteInvitationModalContext';
import ThemeProvider from '#contexts/ThemeContext';
import Loader from '#helpers/Loader';
import RootStackNavigator from '#screens/RootStackNavigator';
import store from '#store';

export default function App() {
    enableScreens();

    return (
        <ThemeProvider>
            <Provider store={store}>
                <Loader>
                    <NavigationContainer>
                        <DeleteFrameModalProvider>
                            <DeleteInvitationModalProvider>
                                <BottomSheetProvider>
                                    <RootStackNavigator />
                                    <Notification />
                                    <StatusBar style="auto" />
                                </BottomSheetProvider>
                            </DeleteInvitationModalProvider>
                        </DeleteFrameModalProvider>
                    </NavigationContainer>
                </Loader>
            </Provider>
        </ThemeProvider>
    );
}

// TODO:
// GalerieCard role and hasNewFrames
// BlackListCard
// UsersBlackList Screen
// Check if delete/blackList user delete all is likes/frame/invitation/comments are deleted
// Check if allow to delete Galerie if user is subscribe to it.
// Reports
// Notifications Screen
// Profile Screen
// Form Scrollable
// Change email/password/delete account
// Tickets
// Show ticket
// BetaKey
// Better post frame
// Update galerie
// Forgot password
