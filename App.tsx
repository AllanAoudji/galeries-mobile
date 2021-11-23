import 'react-native-gesture-handler';

import { enableScreens } from 'react-native-screens';
import { StatusBar } from 'expo-status-bar';
import * as React from 'react';

import { Notification, PostingImageLoader } from '#components';
import RootStackNavigator from '#screens/RootStackNavigator';
import ContextsProvider from '#helpers/ContextsProvider';

export default function App() {
    enableScreens();

    return (
        <ContextsProvider>
            <RootStackNavigator />
            <PostingImageLoader />
            <Notification />
            <StatusBar style="auto" />
        </ContextsProvider>
    );
}

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
