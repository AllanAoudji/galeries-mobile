import * as React from 'react';
import { useSelector } from 'react-redux';

import NotificationCardContainer from '#components/NotificationCardContainer';
import Typography from '#components/Typography';
import { selectFrame } from '#store/frames';
import { selectNotificationUsersAllIds } from '#store/users';

import ProfilePictureContainer from './ProfilePictureContainer';
import FrameContainer from './FrameContainer';

const onLongPress = () => {};
const onPress = () => {};

type Props = {
    notification: Store.Models.Notification;
};

const NotificationFrameLiked = ({ notification }: Props) => {
    const frameSelector = React.useMemo(
        () => selectFrame(notification.frameId),
        [notification]
    );
    const frame = useSelector(frameSelector);
    const usersAllIdsSelector = React.useMemo(
        () => selectNotificationUsersAllIds(notification.id),
        [notification]
    );
    const usersAllIds = useSelector(usersAllIdsSelector);

    return (
        <NotificationCardContainer
            onLongPress={onLongPress}
            onPress={onPress}
            seen={notification.seen}
        >
            <FrameContainer frame={frame} />
            <Typography>
                {notification.num} user
                {notification.num > 1 ? 's' : ''} like your frame
            </Typography>
            {usersAllIds &&
                usersAllIds.map((id) => (
                    <ProfilePictureContainer key={id} userId={id} />
                ))}
        </NotificationCardContainer>
    );
};

export default NotificationFrameLiked;
