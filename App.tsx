import 'react-native-gesture-handler';

import { enableScreens } from 'react-native-screens';
import { NavigationContainer } from '@react-navigation/native';
import { StatusBar } from 'expo-status-bar';
import * as React from 'react';
import { Provider } from 'react-redux';

import { Notification } from '#components';
import { BottomSheetProvider } from '#contexts/BottomSheetContext';
import { DeleteCommentModalProvider } from '#contexts/DeleteCommentModalContext';
import { DeleteFrameModalProvider } from '#contexts/DeleteFrameModalContext';
import { DeleteGalerieBlackListModalProvider } from '#contexts/DeleteGalerieBlackListModalContext';
import { DeleteGalerieUserModalProvider } from '#contexts/DeleteGalerieUserModalContext';
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
                            <DeleteGalerieBlackListModalProvider>
                                <DeleteCommentModalProvider>
                                    <DeleteGalerieUserModalProvider>
                                        <DeleteInvitationModalProvider>
                                            <BottomSheetProvider>
                                                <RootStackNavigator />
                                                <Notification />
                                                <StatusBar style="auto" />
                                            </BottomSheetProvider>
                                        </DeleteInvitationModalProvider>
                                    </DeleteGalerieUserModalProvider>
                                </DeleteCommentModalProvider>
                            </DeleteGalerieBlackListModalProvider>
                        </DeleteFrameModalProvider>
                    </NavigationContainer>
                </Loader>
            </Provider>
        </ThemeProvider>
    );
}

// TODO:
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

// If status === 'ERROR' and allIds = [] || undefined
// show error, refresh button
