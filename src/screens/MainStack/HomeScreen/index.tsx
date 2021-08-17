import { DrawerActions, useNavigation } from '@react-navigation/native';
import * as React from 'react';

import { Pressable } from 'react-native';
import { Pictogram } from '#components';

const HomeScreen = () => {
    const navigation = useNavigation();
    return (
        <Pressable
            onPress={() => navigation.dispatch(DrawerActions.openDrawer())}
        >
            <Pictogram variant="home-fill" size="large" />
        </Pressable>
    );
};

export default HomeScreen;
