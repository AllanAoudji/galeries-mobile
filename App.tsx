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

// Change email/password/pseudonym/delete account
// Ticket screen
// Web app
