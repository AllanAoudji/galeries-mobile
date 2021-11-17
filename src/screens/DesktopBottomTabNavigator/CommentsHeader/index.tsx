import { useNavigation } from '@react-navigation/native';
import * as React from 'react';
import { Keyboard, StatusBar } from 'react-native';

import { Pictogram, Typography } from '#components';
import { GLOBAL_STYLE } from '#helpers/constants';

import { Container } from './styles';

const NotificationsHeader = () => {
    const navigation =
        useNavigation<Screen.DesktopBottomTab.CommentsNavigationProp>();

    const handlePress = React.useCallback(() => {
        Keyboard.dismiss();
        if (navigation.canGoBack()) navigation.goBack();
        else navigation.navigate('Home');
    }, [navigation]);

    return (
        <Container paddingTop={StatusBar.currentHeight}>
            <Pictogram
                color="primary"
                height={
                    GLOBAL_STYLE.TOP_LEFT_PICTOGRAM_HEIGHT -
                    (StatusBar.currentHeight || 0)
                }
                onPress={handlePress}
                pl="small"
                pr="small"
                variant="arrow-left"
            />
            <Typography color="primary" fontFamily="light" fontSize={24}>
                comments
            </Typography>
        </Container>
    );
};

export default NotificationsHeader;
