import * as React from 'react';
import { useSelector } from 'react-redux';

import { selectCurrentNotifications } from '#store/notifications';

import { Container } from './styles';

type Props = {
    notification: Store.Models.Notification;
    onPress: () => void;
    onLongPress: () => void;
    seen: boolean;
};

const NotificationCardContainer: React.FC<Props> = ({
    notification,
    children,
    onLongPress,
    onPress,
    seen,
}) => {
    const currentNotification = useSelector(selectCurrentNotifications);

    const current = React.useMemo(() => {
        if (!currentNotification) return false;
        return currentNotification.id === notification.id;
    }, [currentNotification, notification]);

    return (
        <Container
            current={current}
            seen={seen}
            onLongPress={onLongPress}
            onPress={onPress}
        >
            {children}
        </Container>
    );
};

export default NotificationCardContainer;
