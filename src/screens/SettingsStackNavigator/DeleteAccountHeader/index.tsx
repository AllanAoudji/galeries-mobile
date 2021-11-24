import { useNavigation } from '@react-navigation/native';
import * as React from 'react';
import { Keyboard, StatusBar } from 'react-native';

import { Pictogram, Typography } from '#components';
import { GLOBAL_STYLE } from '#helpers/constants';

import { Container } from './styles';

const BetaKeysHeader = () => {
    const navigation =
        useNavigation<Screen.SettingsStack.DeleteAccountScreenNavigationProp>();

    const handlePress = React.useCallback(() => {
        Keyboard.dismiss();
        navigation.navigate('SettingsFields');
    }, [navigation]);

    return (
        <Container paddingTop={StatusBar.currentHeight}>
            <Pictogram
                color="secondary-light"
                height={
                    GLOBAL_STYLE.TOP_LEFT_PICTOGRAM_HEIGHT -
                    (StatusBar.currentHeight || 0)
                }
                onPress={handlePress}
                pl="small"
                pr="small"
                variant="arrow-left"
            />
            <Typography
                color="secondary-light"
                fontFamily="light"
                fontSize={24}
            >
                delete account
            </Typography>
        </Container>
    );
};

export default BetaKeysHeader;
