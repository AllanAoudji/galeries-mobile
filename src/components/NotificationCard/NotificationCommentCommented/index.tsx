import { useNavigation } from '@react-navigation/native';
import * as React from 'react';
import { useDispatch, useSelector } from 'react-redux';

import NotificationCardContainer from '#components/NotificationCardContainer';
import Typography from '#components/Typography';
import { selectComment } from '#store/comments';
import { updateFramesCurrent } from '#store/frames';
import { putNotification } from '#store/notifications';

import { Container } from './styles';

type Props = {
    notification: Store.Models.Notification;
};

const onLongPress = () => {};

const CROP_COMMENT_BODY = 30;

const NotificationCommentCommented = ({ notification }: Props) => {
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

    if (!comment) return null;

    return (
        <NotificationCardContainer
            onLongPress={onLongPress}
            onPress={handlePress}
            seen={notification.seen}
        >
            <Container>
                <Typography>
                    You have{' '}
                    <Typography fontFamily="bold">
                        {notification.num} answer
                        {notification.num > 1 ? 's' : ''}
                    </Typography>{' '}
                    on your comment:{' '}
                    <Typography fontFamily="light">
                        "{comment.body.substring(0, CROP_COMMENT_BODY)}
                        {comment.body.length > CROP_COMMENT_BODY && '...'}"
                    </Typography>
                </Typography>
            </Container>
        </NotificationCardContainer>
    );
};

export default NotificationCommentCommented;
