import { useNavigation } from '@react-navigation/native';
import { StatusBar } from 'react-native';
import * as React from 'react';

import Pictogram from '#components/Pictogram';
import { GLOBAL_STYLE } from '#helpers/constants';

import { Container } from './styles';

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
                color="white"
                height={GLOBAL_STYLE.TOP_LEFT_PICTOGRAM_HEIGHT}
                onPress={handlePress}
                pl="small"
                pr="small"
                variant="arrow-left"
            />
        </Container>
    );
};

export default ReturnButton;
