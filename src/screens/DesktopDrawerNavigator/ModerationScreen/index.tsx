import * as React from 'react';

import ModerationStackNavigator from '#screens/ModerationStackNavigator';

type Props = {
    navigation: Screen.DesktopDrawer.ModerationScreenNavigationProp;
};

const ModerationScreen = ({ navigation }: Props) => (
    <ModerationStackNavigator navigation={navigation} />
);

export default ModerationScreen;
