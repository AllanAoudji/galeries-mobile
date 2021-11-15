import * as React from 'react';
import { useSelector } from 'react-redux';

import { selectNotificationUsersAllIds } from '#store/users';

import List from './List';
import User from './User';

type Props = {
    notification: Store.Models.Notification;
};

const ProfilePictureContainer = ({ notification }: Props) => {
    const usersAllIdsSelector = React.useMemo(
        () => selectNotificationUsersAllIds(notification.id),
        [notification]
    );
    const usersAllIds = useSelector(usersAllIdsSelector);

    if (!usersAllIds || usersAllIds.length === 0) return null;

    return (
        <List>
            {usersAllIds.map((id) => (
                <User key={id} seen={notification.seen} userId={id} />
            ))}
        </List>
    );
};

export default ProfilePictureContainer;
