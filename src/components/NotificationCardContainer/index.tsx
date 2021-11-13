import * as React from 'react';

import { Container } from './styles';

type Props = {
    onPress: () => void;
    onLongPress: () => void;
    seen: boolean;
};

const NotificationCardContainer: React.FC<Props> = ({
    children,
    onLongPress,
    onPress,
    seen,
}) => {
    return (
        <Container seen={seen} onLongPress={onLongPress} onPress={onPress}>
            {children}
        </Container>
    );
};

export default NotificationCardContainer;
