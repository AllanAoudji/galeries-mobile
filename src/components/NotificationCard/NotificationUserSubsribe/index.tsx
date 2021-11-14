import * as React from 'react';

import { useSelector } from 'react-redux';
import NotificationCardContainer from '#components/NotificationCardContainer';
import Typography from '#components/Typography';
import { selectGalerie } from '#store/galeries';

type Props = {
    notification: Store.Models.Notification;
};

const onLongPress = () => {};
const onPress = () => {};

const NotificationUserSubscribe = ({ notification }: Props) => {
    const galerieSelector = React.useMemo(
        () => selectGalerie(notification.galerieId),
        [notification]
    );
    const galerie = useSelector(galerieSelector);

    if (!galerie) return null;

    return (
        <NotificationCardContainer
            onLongPress={onLongPress}
            onPress={onPress}
            seen={notification.seen}
        >
            <Typography>
                {notification.num} new user{notification.num > 1 && 's'}{' '}
                subscribe to galerie{' '}
                <Typography fontFamily="bold">{galerie.name}</Typography>
            </Typography>
        </NotificationCardContainer>
    );
};

export default NotificationUserSubscribe;
