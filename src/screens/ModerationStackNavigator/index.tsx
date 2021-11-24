import {
    createStackNavigator,
    StackHeaderProps,
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
import { DefaultHeader } from '#components';
import { selectBetaKeysLoadingPost } from '#store/betaKeys';

const Stack = createStackNavigator<Screen.ModeratorStack.ParamList>();

type Props = {
    navigation: Screen.DesktopDrawer.ModerationScreenNavigationProp;
};

const betaKeysNavigationOptions: StackNavigationOptions = {
    header: BetaKeysHeader,
};

const createBetaKeyScreenHeader = ({ navigation }: StackHeaderProps) => {
    const loading = useSelector(selectBetaKeysLoadingPost);
    const handlePress = React.useCallback(() => {
        if (loading.includes('loading')) return;
        navigation.navigate('BetakeysScreen');
    }, [loading]);

    return (
        <DefaultHeader
            color="primary-dark"
            onPress={handlePress}
            textColor="secondary-light"
            title="create beta key"
            variant="secondary"
        />
    );
};
const createBetaKeyNavigationOptions: StackNavigationOptions = {
    header: createBetaKeyScreenHeader,
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
                options={createBetaKeyNavigationOptions}
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
