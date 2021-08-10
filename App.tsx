import { NavigationContainer } from '@react-navigation/native';
import { StatusBar } from 'expo-status-bar';
import * as React from 'react';
import 'react-native-gesture-handler';

import HomeStack from './src/screens/HomeStack';

export default function App() {
    return (
        <NavigationContainer>
            <HomeStack />
            <StatusBar style="auto" />
        </NavigationContainer>
    );
}
