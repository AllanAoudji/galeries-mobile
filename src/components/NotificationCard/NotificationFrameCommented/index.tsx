import { useNavigation } from '@react-navigation/native';
import * as React from 'react';
import { useDispatch, useSelector } from 'react-redux';

import NotificationCardContainer from '#components/NotificationCardContainer';
import Typography from '#components/Typography';
import { selectFrame, updateFramesCurrent } from '#store/frames';
import { putNotification } from '#store/notifications';

import FrameContainer from './FrameContainer';

type Props = {
    notification: Store.Models.Notification;
};

const onLongPress = () => {};

const NotificationFrameCommented = ({ notification }: Props) => {
    const dispatch = useDispatch();
    const navigation =
        useNavigation<Screen.DesktopBottomTab.NotificationNavigationProp>();

    const frameSelector = React.useMemo(
        () => selectFrame(notification.frameId),
        [notification]
    );
    const frame = useSelector(frameSelector);

    const handlePress = React.useCallback(() => {
        if (!notification.frameId) return;
        dispatch(putNotification(notification.id));
        dispatch(updateFramesCurrent(notification.frameId));
        navigation.navigate('Comments');
    }, [navigation, notification]);

    return (
        <NotificationCardContainer
            onLongPress={onLongPress}
            onPress={handlePress}
            seen={notification.seen}
        >
            <FrameContainer frame={frame} />
            <Typography>
                You have{' '}
                <Typography fontFamily="bold">
                    {notification.num} new comment
                    {notification.num > 1 ? 's' : ''}{' '}
                </Typography>
                on your frame
            </Typography>
        </NotificationCardContainer>
    );
};

export default NotificationFrameCommented;
