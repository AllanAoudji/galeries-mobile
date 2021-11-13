import * as React from 'react';
import { useSelector } from 'react-redux';
import { selectUser } from '#store/users';
import Typography from '#components/Typography';
import ProfilePicture from '#components/ProfilePicture';
import NotificationCardContainer from '#components/NotificationCardContainer';

type Props = {
    notification: Store.Models.Notification;
};

const onPress = () => {};
const onLongPress = () => {};

const NotificationBetakeyUsed = ({ notification }: Props) => {
    const userSelector = React.useMemo(
        () => selectUser(notification.userId),
        [notification]
    );
    const user = useSelector(userSelector);

    if (!user) return null;

    return (
        <NotificationCardContainer
            onLongPress={onLongPress}
            onPress={onPress}
            seen={notification.seen}
        >
            <Typography>
                A new user use your beta key to create an account
            </Typography>
            <ProfilePicture user={user} size="small" />
        </NotificationCardContainer>
    );
};

export default NotificationBetakeyUsed;
