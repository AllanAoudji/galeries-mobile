import 'react-native-gesture-handler';

import { NavigationContainer } from '@react-navigation/native';
import { StatusBar } from 'expo-status-bar';
import * as React from 'react';
import { Provider } from 'react-redux';

import { Notification } from '#components';
import { BottomSheetProvider } from '#contexts/BottomSheetContext';
import ThemeProvider from '#contexts/ThemeContext';
import Loader from '#helpers/Loader';
import RootStackNavigator from '#screens/RootStackNavigator';
import store from '#store';

export default function App() {
    return (
        <ThemeProvider>
            <Provider store={store}>
                <Loader>
                    <NavigationContainer>
                        <BottomSheetProvider>
                            <RootStackNavigator />
                            <Notification />
                            <StatusBar style="auto" />
                        </BottomSheetProvider>
                    </NavigationContainer>
                </Loader>
            </Provider>
        </ThemeProvider>
    );
}

// TODO:
// Clean form when not focused
// Should have a ui.reducer
// with galerieIdSelected
// when click on a galerieModal )>
// dispatch(setGalerieIdSelected(id))
// and a selector
// return byId(state.ui.galerieIdSelector)
// so no need route.params.id
