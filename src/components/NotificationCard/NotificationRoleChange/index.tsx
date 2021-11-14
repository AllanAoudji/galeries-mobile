import * as React from 'react';

import NotificationCardContainer from '#components/NotificationCardContainer';
import Typography from '#components/Typography';

type Props = {
    notification: Store.Models.Notification;
};

const onLongPress = () => {};
const onPress = () => {};

const NotificationRoleChange = ({ notification }: Props) => {
    return (
        <NotificationCardContainer
            onPress={onPress}
            onLongPress={onLongPress}
            seen={notification.seen}
        >
            <Typography>
                you've become a{notification.role === 'admin' && 'n'}{' '}
                <Typography fontFamily="bold">{notification.role}</Typography>
                of galerie
            </Typography>
        </NotificationCardContainer>
    );
};

export default NotificationRoleChange;
