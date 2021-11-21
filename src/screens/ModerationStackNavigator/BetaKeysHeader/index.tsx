import { useNavigation } from '@react-navigation/native';
import * as React from 'react';
import { Keyboard, StatusBar } from 'react-native';

import { Pictogram, Typography } from '#components';
import { GLOBAL_STYLE } from '#helpers/constants';

import { Container } from './styles';

const BetaKeysHeader = () => {
    const navigation =
        useNavigation<Screen.ModeratorStack.BetaKeyScreenNavigationProp>();

    const handlePress = React.useCallback(() => {
        Keyboard.dismiss();
        if (navigation.canGoBack()) navigation.goBack();
        else navigation.navigate('ModerationNavigationScreen');
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
            <Typography color="primary" fontFamily="bold" fontSize={24}>
                beta keys
            </Typography>
        </Container>
    );
};

export default BetaKeysHeader;
