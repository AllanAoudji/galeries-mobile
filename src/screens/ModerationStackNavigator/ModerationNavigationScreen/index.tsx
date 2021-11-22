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
            </Container>
        </FullScreenContainer>
    );
};

export default ModerationNavigationScreen;
