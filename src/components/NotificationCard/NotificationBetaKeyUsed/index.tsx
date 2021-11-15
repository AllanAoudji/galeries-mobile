import * as React from 'react';
import { useSelector } from 'react-redux';

import NotificationCardContainer from '#components/NotificationCardContainer';
import ProfilePicture from '#components/ProfilePicture';
import Typography from '#components/Typography';
import { selectUser } from '#store/users';

type Props = {
    notification: Store.Models.Notification;
    onLongPress: () => void;
};

const onPress = () => {};

const NotificationBetakeyUsed = ({ notification, onLongPress }: Props) => {
    const userSelector = React.useMemo(
        () => selectUser(notification.userId),
        [notification]
    );
    const user = useSelector(userSelector);

    return (
        <NotificationCardContainer
            notification={notification}
            onLongPress={onLongPress}
            onPress={onPress}
            seen={notification.seen}
        >
            <Typography>
                <Typography fontFamily="bold">A new user</Typography>
                use your beta key to create an account
            </Typography>
            <ProfilePicture user={user} size="small" />
        </NotificationCardContainer>
    );
};

export default NotificationBetakeyUsed;
