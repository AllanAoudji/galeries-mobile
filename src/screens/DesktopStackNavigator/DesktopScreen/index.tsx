import * as React from 'react';

import DesktopDrawerNavigator from '#screens/DesktopDrawerNavigator';

type Props = {
    navigation: Screen.DesktopStack.DesktopNavigationProp;
};

const DesktopScreen = ({ navigation }: Props) => (
    <DesktopDrawerNavigator navigation={navigation} />
);

export default DesktopScreen;
