import * as React from 'react';
import { useDispatch, useSelector } from 'react-redux';

import Typography from '#components/Typography';
import normalizeError from '#helpers/normalizeError';
import { CLOSE_NOTIFICATION_DELAY } from '#helpers/constants';
import { resetNotification } from '#store/actions';
import { notificationSelector } from '#store/selectors';

import { Button, Container, InnerContainer } from './styles';

const Notification = () => {
    const dispatch = useDispatch();
    const timer = React.useRef<ReturnType<typeof setTimeout> | null>(null);
    const notification = useSelector(notificationSelector);

    React.useEffect(() => {
        if (notification) {
            timer.current = setTimeout(() => {
                dispatch(resetNotification());
            }, CLOSE_NOTIFICATION_DELAY);
        }
    }, [notification]);
    React.useEffect(() => () => {
        if (timer.current) clearTimeout(timer.current);
    });

    const handleOnPress = () => {
        if (timer.current) clearTimeout(timer.current);
        dispatch(resetNotification());
    };

    return (
        <Container
            style={{
                bottom: 0,
                position: 'absolute',
                zIndex: 1,
                width: '100%',
            }}
        >
            {notification && (
                <InnerContainer
                    status={notification.status}
                    onPress={handleOnPress}
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
