import { useNavigation } from '@react-navigation/native';
import { StatusBar } from 'react-native';
import * as React from 'react';
import { Container } from './styles';

import { Pictogram } from '#components';
import { GLOBAL_STYLE } from '#helpers/constants';

const ReturnButton = () => {
    const navigation =
        useNavigation<Screen.DesktopBottomTab.InvitationNavigationProp>();

    const handlePress = React.useCallback(() => {
        if (navigation.canGoBack()) navigation.goBack();
        else navigation.navigate('Home');
    }, []);

    return (
        <Container paddingTop={StatusBar.currentHeight}>
            <Pictogram
                variant="arrow-left"
                color="white"
                height={GLOBAL_STYLE.TOP_LEFT_PICTOGRAM_HEIGHT}
                onPress={handlePress}
                pl="small"
                pr="small"
            />
        </Container>
    );
};

export default ReturnButton;
