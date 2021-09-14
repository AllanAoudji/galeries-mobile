import * as React from 'react';
import { useDispatch, useSelector } from 'react-redux';

import Typography from '#components/Typography';
import normalizeError from '#helpers/normalizeError';
import { CLOSE_NOTIFICATION_DELAY } from '#helpers/constants';
import { resetNotification } from '#store/actions';
import { notificationSelector } from '#store/selectors';

import { Button, Container, InnerContainer } from './styles';

// TODO:
// Need animation
const Notification = () => {
    const dispatch = useDispatch();
    const timer = React.useRef<ReturnType<typeof setTimeout> | null>(null);
    const notification = useSelector(notificationSelector);

    React.useEffect(() => {
        let timeout: NodeJS.Timeout;
        if (notification) {
            timeout = setTimeout(() => {
                dispatch(resetNotification());
            }, CLOSE_NOTIFICATION_DELAY);
        }
        return () => {
            if (timer.current) clearTimeout(timeout);
        };
    }, [notification]);

    const handleOnPress = React.useCallback(() => {
        if (timer.current) clearTimeout(timer.current);
        dispatch(resetNotification());
    }, []);

    return (
        <Container>
            {notification && !!notification.text && (
                <InnerContainer
                    onPress={handleOnPress}
                    status={notification.status}
                >
                    <Typography color="secondary-light" fontSize={18}>
                        {normalizeError(notification.text)}
                    </Typography>
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
            )}
        </Container>
    );
};

export default Notification;
