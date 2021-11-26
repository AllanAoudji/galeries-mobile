import * as React from 'react';

import NotificationCardContainer from '#components/NotificationCardContainer';
import Typography from '#components/Typography';

import Users from './Users';

type Props = {
    notification: Store.Models.Notification;
    onLongPress: () => void;
};

const onPress = () => {};

const NotificationBetakeyUsed = ({ notification, onLongPress }: Props) => {
    return (
        <NotificationCardContainer
            notification={notification}
            onLongPress={onLongPress}
            onPress={onPress}
            seen={notification.seen}
        >
            <Users notification={notification} />
            <Typography>
                <Typography fontFamily="bold">
                    {notification.num} new user
                    {notification.num > 1 && 's'}{' '}
                </Typography>
                use your beta key{notification.num > 1 && 's'} to create an
                account
            </Typography>
        </NotificationCardContainer>
    );
};

export default NotificationBetakeyUsed;
