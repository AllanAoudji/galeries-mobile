import * as React from 'react';
import { Keyboard, Platform } from 'react-native';

import { Container, InnerContainer } from './styles';

type Props = {
    justifyContent?: Style.JustifyContent;
};

const ScreenContainer: React.FC<Props> = ({
    children,
    justifyContent = 'flex-start',
}) => {
    const behavior = React.useMemo(
        () => (Platform.OS === 'ios' ? 'padding' : 'height'),
        []
    );

    return (
        <Container onPress={Keyboard.dismiss}>
            <InnerContainer behavior={behavior} justifyContent={justifyContent}>
                {children}
            </InnerContainer>
        </Container>
    );
};

export default ScreenContainer;
