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

// Ticket screen
// Web app
// Better transition login/logout/delete
// Issue when not user and AsyncStorage have token
// Issue with login return arrow header (need to reset loginstate ?)
// block navigation when login
// block navigation when signin
// block navigation when delete account
