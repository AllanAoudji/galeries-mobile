import { useNavigation } from '@react-navigation/native';
import * as React from 'react';
import { Keyboard, StatusBar } from 'react-native';
import { useSelector } from 'react-redux';

import { Pictogram, Typography } from '#components';
import { GLOBAL_STYLE } from '#helpers/constants';
import { selectCurrentTicket } from '#store/tickets';

import { Container } from './styles';

const BetaKeysHeader = () => {
    const navigation =
        useNavigation<Screen.ModeratorStack.BetaKeysScreenNavigationProp>();

    const currentTicket = useSelector(selectCurrentTicket);

    const handlePress = React.useCallback(() => {
        Keyboard.dismiss();
        navigation.navigate('Tickets');
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
                {currentTicket ? currentTicket.header : 'ticket'}
            </Typography>
        </Container>
    );
};

export default BetaKeysHeader;
