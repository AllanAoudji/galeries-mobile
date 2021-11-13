import * as React from 'react';
import { useSelector } from 'react-redux';

import NotificationCardContainer from '#components/NotificationCardContainer';
import Typography from '#components/Typography';
import { selectComment } from '#store/comments';
import { selectNotificationUsersAllIds } from '#store/users';

import ProfilePictureContainer from './ProfilePictureContainer';

type Props = {
    notification: Store.Models.Notification;
};

const onLongPress = () => {};
const onPress = () => {};

const NotificationCommentCommented = ({ notification }: Props) => {
    const commentSelector = React.useMemo(
        () => selectComment(notification.commentId),
        [notification]
    );
    const comment = useSelector(commentSelector);
    const usersAllIdsSelector = React.useMemo(
        () => selectNotificationUsersAllIds(notification.id),
        [notification]
    );
    const usersAllIds = useSelector(usersAllIdsSelector);

    if (!comment) return null;

    return (
        <NotificationCardContainer
            onPress={onPress}
            onLongPress={onLongPress}
            seen={notification.seen}
        >
            <Typography>{notification.num} answer to you</Typography>
            {usersAllIds &&
                usersAllIds.map((id) => (
                    <ProfilePictureContainer key={id} userId={id} />
                ))}
        </NotificationCardContainer>
    );
};

export default NotificationCommentCommented;
