import 'react-native-gesture-handler';

import { enableScreens } from 'react-native-screens';
import { NavigationContainer } from '@react-navigation/native';
import { StatusBar } from 'expo-status-bar';
import * as React from 'react';
import { Provider } from 'react-redux';

import { Notification, PostingProfilePictures } from '#components';
import { BottomSheetProvider } from '#contexts/BottomSheetContext';
import { CreateProfilePictureProvider } from '#contexts/CreateProfilePictureContext';
import { DeleteCommentModalProvider } from '#contexts/DeleteCommentModalContext';
import { DeleteFrameModalProvider } from '#contexts/DeleteFrameModalContext';
import { DeleteGalerieBlackListModalProvider } from '#contexts/DeleteGalerieBlackListModalContext';
import { DeleteGalerieUserModalProvider } from '#contexts/DeleteGalerieUserModalContext';
import { DeleteInvitationModalProvider } from '#contexts/DeleteInvitationModalContext';
import { DeleteNotificationModalProvider } from '#contexts/DeleteNotificationModalContext';
import { DeleteProfilePictureModalProvider } from '#contexts/DeleteProfilePictureModalContext';
import { GaleriesSearchProvider } from '#contexts/GaleriesSearchContext';
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
                        <CreateProfilePictureProvider>
                            <DeleteFrameModalProvider>
                                <DeleteGalerieBlackListModalProvider>
                                    <DeleteCommentModalProvider>
                                        <DeleteGalerieUserModalProvider>
                                            <DeleteInvitationModalProvider>
                                                <DeleteNotificationModalProvider>
                                                    <DeleteProfilePictureModalProvider>
                                                        <GaleriesSearchProvider>
                                                            <BottomSheetProvider>
                                                                <RootStackNavigator />
                                                                <PostingProfilePictures />
                                                                <Notification />
                                                                <StatusBar style="auto" />
                                                            </BottomSheetProvider>
                                                        </GaleriesSearchProvider>
                                                    </DeleteProfilePictureModalProvider>
                                                </DeleteNotificationModalProvider>
                                            </DeleteInvitationModalProvider>
                                        </DeleteGalerieUserModalProvider>
                                    </DeleteCommentModalProvider>
                                </DeleteGalerieBlackListModalProvider>
                            </DeleteFrameModalProvider>
                        </CreateProfilePictureProvider>
                    </NavigationContainer>
                </Loader>
            </Provider>
        </ThemeProvider>
    );
}

// TODO:
// Animate add button
// select camera or galerie to post PP

// Header on Comment/Likes
// Profile Screen
// Change email/password/delete account
// Tickets
// Show ticket
// BetaKey
// Better post frame
// Update galerie
// Forgot password

// If status === 'ERROR' and allIds = [] || undefined
// show error, refresh button
// Change PP status => me/id
