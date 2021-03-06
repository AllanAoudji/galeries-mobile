import * as React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import {
    interpolate,
    runOnJS,
    useAnimatedStyle,
    useSharedValue,
    withTiming,
} from 'react-native-reanimated';

import Typography from '#components/Typography';
import { ANIMATIONS, CLOSE_NOTIFICATION_DELAY } from '#helpers/constants';
import normalizeError from '#helpers/normalizeError';
import { resetNotification, selectNotification } from '#store/notification';

import {
    Button,
    Container,
    InnerContainer,
    NotificationContainer,
} from './styles';

const resetNotificationAction = resetNotification();

const Notification = () => {
    const dispatch = useDispatch();
    const notification = useSelector(selectNotification);

    const [hasNotification, setHasNotification] = React.useState<boolean>(
        !!notification
    );

    const value = useSharedValue(notification ? 1 : 0);
    const style = useAnimatedStyle(() => {
        const bottom = interpolate(value.value, [0, 1], [-100, 0]);
        const scale = interpolate(value.value, [0, 1], [0.95, 1]);
        return {
            bottom,
            opacity: value.value,
            transform: [{ scale }],
        };
    }, []);

    const timer = React.useRef<ReturnType<typeof setTimeout> | null>(null);
    const clearTimer = React.useCallback(() => {
        if (timer.current) {
            clearTimeout(timer.current);
            timer.current = null;
        }
    }, []);

    const closeNotification = React.useCallback(() => {
        'worklet';

        value.value = withTiming(0, ANIMATIONS.TIMING_CONFIG(), () => {
            runOnJS(clearTimer)();
            runOnJS(dispatch)(resetNotificationAction);
            runOnJS(setHasNotification)(false);
        });
    }, [clearTimer]);

    const handlePress = React.useCallback(() => {
        clearTimer();
        closeNotification();
    }, [clearTimer]);

    React.useEffect(() => {
        if (notification) {
            setHasNotification(true);
            value.value = withTiming(1, ANIMATIONS.TIMING_CONFIG());

            if (!timer.current)
                timer.current = setTimeout(() => {
                    closeNotification();
                }, CLOSE_NOTIFICATION_DELAY);
        }
    }, [closeNotification, notification]);

    React.useEffect(
        () => () => {
            clearTimer();
        },
        [clearTimer]
    );

    if (!hasNotification || !notification) return null;

    return (
        <Container style={style}>
            <InnerContainer onPress={handlePress} status={notification.status}>
                <NotificationContainer>
                    <Typography color="secondary-light" fontSize={18}>
                        {normalizeError(notification.text)}
                    </Typography>
                </NotificationContainer>
                <Button>
                    <Typography
                        color="secondary-light"
                        fontFamily="bold"
                        fontSize={18}
                    >
                        hide
                    </Typography>
                </Button>
            </InnerContainer>
        </Container>
    );
};

export default React.memo(Notification);
