import * as React from 'react';

import { FullScreenContainer, ModerationNavigationButton } from '#components';

import { Container } from './styles';

type Props = {
    navigation: Screen.ModeratorStack.ModerationNavigationScreenNavigationProp;
};

const ModerationNavigationScreen = ({ navigation }: Props) => {
    const handlePressBetaKeys = React.useCallback(() => {
        navigation.navigate('BetakeysScreen');
    }, [navigation]);
    const handlePressTickets = React.useCallback(() => {
        navigation.navigate('Tickets');
    }, [navigation]);

    return (
        <FullScreenContainer>
            <Container>
                <ModerationNavigationButton
                    mb="smallest"
                    mt="small"
                    onPress={handlePressBetaKeys}
                    title="beta keys"
                    pictogram="key-fill"
                />
                <ModerationNavigationButton
                    mb="smallest"
                    mt="small"
                    onPress={handlePressTickets}
                    title="tickets"
                    pictogram="ticket-fill"
                />
            </Container>
        </FullScreenContainer>
    );
};

export default ModerationNavigationScreen;
