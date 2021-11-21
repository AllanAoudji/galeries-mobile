import { DrawerActions, useNavigation } from '@react-navigation/native';
import * as React from 'react';
import { Keyboard, StatusBar } from 'react-native';

import { Pictogram, Typography } from '#components';
import { GLOBAL_STYLE } from '#helpers/constants';

import { Container } from './styles';

const ModerationNavigationHeader = () => {
    const navigation =
        useNavigation<Screen.ModeratorStack.ModerationNavigationScreenNavigationProp>();

    const handlePress = React.useCallback(() => {
        Keyboard.dismiss();
        navigation.dispatch(DrawerActions.openDrawer());
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
                variant="hamburger-menu"
            />
            <Typography color="primary" fontFamily="bold" fontSize={24}>
                moderation
            </Typography>
        </Container>
    );
};

export default ModerationNavigationHeader;
