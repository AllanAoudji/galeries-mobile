import { useNavigation } from '@react-navigation/native';
import * as React from 'react';
import { useDispatch, useSelector } from 'react-redux';

import NotificationCardContainer from '#components/NotificationCardContainer';
import Typography from '#components/Typography';
import { selectComment } from '#store/comments';
import { updateFramesCurrent } from '#store/frames';
import { putNotification } from '#store/notifications';

type Props = {
    notification: Store.Models.Notification;
    onLongPress: () => void;
};

const CROP_COMMENT_BODY = 28;

const NotificationCommentCommented = ({ notification, onLongPress }: Props) => {
    const dispatch = useDispatch();
    const navigation =
        useNavigation<Screen.DesktopBottomTab.NotificationNavigationProp>();

    const commentSelector = React.useMemo(
        () => selectComment(notification.commentId),
        [notification]
    );
    const comment = useSelector(commentSelector);

    const handlePress = React.useCallback(() => {
        if (comment) {
            dispatch(putNotification(notification.id));
            dispatch(updateFramesCurrent(comment.frameId));
            navigation.navigate('Comments');
        }
    }, [comment, notification, navigation]);

    return (
        <NotificationCardContainer
            onLongPress={onLongPress}
            onPress={handlePress}
            seen={notification.seen}
        >
            <Typography>
                You have{' '}
                <Typography fontFamily="bold">
                    {notification.num} new answer
                    {notification.num > 1 ? 's' : ''}
                </Typography>{' '}
                on your comment:{' '}
                {comment && (
                    <Typography fontFamily="oblique">
                        "{comment.body.substring(0, CROP_COMMENT_BODY)}
                        {comment.body.length > CROP_COMMENT_BODY && '...'}"
                    </Typography>
                )}
            </Typography>
        </NotificationCardContainer>
    );
};

export default NotificationCommentCommented;
