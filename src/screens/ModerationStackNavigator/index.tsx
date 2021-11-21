import {
    createStackNavigator,
    StackNavigationOptions,
} from '@react-navigation/stack';
import * as React from 'react';
import { useSelector } from 'react-redux';

import { selectMe } from '#store/me';

import BetaKeysHeader from './BetaKeysHeader';
import BetaKeysScreen from './BetaKeysScreen';
import CreateBetakeyScreen from './CreateBetakeyScreen';
import ModerationNavigationScreen from './ModerationNavigationScreen';
import ModerationNavigationHeader from './ModerationNavigationHeader';

const Stack = createStackNavigator<Screen.ModeratorStack.ParamList>();

type Props = {
    navigation: Screen.DesktopDrawer.ModerationScreenNavigationProp;
};

const betaKeysNavigationOptions: StackNavigationOptions = {
    header: BetaKeysHeader,
};
const moderationNavigationOptions: StackNavigationOptions = {
    header: ModerationNavigationHeader,
};

const ModerationStackNavigator = ({ navigation }: Props) => {
    const me = useSelector(selectMe);

    React.useEffect(() => {
        if (!me || me.role === 'user') {
            if (navigation.canGoBack()) navigation.goBack();
            else
                navigation.navigate('Main', {
                    screen: 'Home',
                });
        }
    }, [me, navigation]);

    return (
        <Stack.Navigator initialRouteName="ModerationNavigationScreen">
            <Stack.Screen
                component={BetaKeysScreen}
                name="BetakeysScreen"
                options={betaKeysNavigationOptions}
            />
            <Stack.Screen
                component={CreateBetakeyScreen}
                name="CreateBetakeyScreen"
            />
            <Stack.Screen
                component={ModerationNavigationScreen}
                name="ModerationNavigationScreen"
                options={moderationNavigationOptions}
            />
        </Stack.Navigator>
    );
};

export default ModerationStackNavigator;
