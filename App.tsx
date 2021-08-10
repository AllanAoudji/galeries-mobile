import { NavigationContainer } from '@react-navigation/native';
import { useFonts } from 'expo-font';
import { StatusBar } from 'expo-status-bar';
import * as React from 'react';
import 'react-native-gesture-handler';

import HomeStack from './src/screens/HomeStack';

export default function App() {
    const [loaded] = useFonts({
        HelveticaLtStBold: require('./assets/fonts/HelveticaLTStd-Bold.otf'),
        HelveticaLtStLight: require('./assets/fonts/HelveticaLTStd-Light.otf'),
        HelveticaLtStObl: require('./assets/fonts/HelveticaLTStd-Obl.otf'),
        HelveticaLtStRoman: require('./assets/fonts/HelveticaLTStd-Roman.otf'),
    });

    if (!loaded) {
        return null;
    }

    return (
        <NavigationContainer>
            <HomeStack />
            <StatusBar style="auto" />
        </NavigationContainer>
    );
}
