import { DrawerActions, useNavigation } from '@react-navigation/native';
import * as React from 'react';
import { Keyboard, StatusBar } from 'react-native';

import Pictogram from '#components/Pictogram';

import { Container } from './styles';
import { GLOBAL_STYLE } from '#helpers/constants';

type Props = {
    navigationCallBack?: () => void;
    navigationColor?: keyof Style.Colors;
    type: 'drawer' | 'return';
};

const AbsoluteHeader: React.FC<Props> = ({
    children,
    navigationCallBack,
    navigationColor = 'secondary-light',
    type,
}) => {
    const navigation = useNavigation<
        | Screen.DesktopBottomTab.ProfileNavigationProp
        | Screen.DesktopBottomTab.GalerieNavigationProp
    >();

    const variant: Style.Pictograms = React.useMemo(() => {
        switch (type) {
            case 'drawer':
                return 'hamburger-menu';
            case 'return':
            default:
                return 'arrow-left';
        }
    }, [type]);

    const handlePress = React.useCallback(() => {
        switch (type) {
            case 'drawer':
                Keyboard.dismiss();
                navigation.dispatch(DrawerActions.openDrawer());
                if (navigationCallBack) navigationCallBack();
                break;
            case 'return':
            default:
                if (navigation.canGoBack()) navigation.goBack();
                else navigation.navigate('Home');
                if (navigationCallBack) navigationCallBack();
        }
    }, [navigation, navigationCallBack, type]);

    return (
        <Container paddingTop={StatusBar.currentHeight}>
            {children}
            <Pictogram
                color={navigationColor}
                height={GLOBAL_STYLE.TOP_LEFT_PICTOGRAM_HEIGHT}
                onPress={handlePress}
                pl="small"
                pr="small"
                variant={variant}
            />
        </Container>
    );
};

export default AbsoluteHeader;
