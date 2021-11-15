import { useNavigation } from '@react-navigation/native';
import * as React from 'react';
import { useDispatch, useSelector } from 'react-redux';

import NotificationCardContainer from '#components/NotificationCardContainer';
import Typography from '#components/Typography';
import { selectFrame, updateFramesCurrent } from '#store/frames';
import { putNotification } from '#store/notifications';

import FrameContainer from './FrameContainer';
import Users from './Users';

import { Container, TextContainer } from './styles';

const onLongPress = () => {};

type Props = {
    notification: Store.Models.Notification;
};

const NotificationFrameLiked = ({ notification }: Props) => {
    const dispatch = useDispatch();
    const navigation =
        useNavigation<Screen.DesktopBottomTab.NotificationNavigationProp>();

    const frameSelector = React.useMemo(
        () => selectFrame(notification.frameId),
        [notification]
    );
    const frame = useSelector(frameSelector);

    const handlePress = React.useCallback(() => {
        if (frame) {
            dispatch(putNotification(notification.id));
            dispatch(updateFramesCurrent(frame.id));
            navigation.navigate('Frame');
        }
    }, [frame, navigation, notification]);

    return (
        <NotificationCardContainer
            onLongPress={onLongPress}
            onPress={handlePress}
            seen={notification.seen}
        >
            <FrameContainer frame={frame} />
            <Container>
                <TextContainer>
                    <Typography>
                        <Typography fontFamily="bold">
                            {notification.num} new user
                            {notification.num > 1 ? 's' : ''}{' '}
                        </Typography>
                        like your frame
                    </Typography>
                </TextContainer>
                <Users notification={notification} />
            </Container>
        </NotificationCardContainer>
    );
};

export default NotificationFrameLiked;
