import { useNavigation } from '@react-navigation/native';
import * as React from 'react';
import { useDispatch, useSelector } from 'react-redux';

import GalerieCoverPicture from '#components/GalerieCoverPicture';
import NotificationCardContainer from '#components/NotificationCardContainer';
import Typography from '#components/Typography';
import { GLOBAL_STYLE } from '#helpers/constants';
import { selectGalerie, updateGaleriesCurrent } from '#store/galeries';

import Users from './Users';

import { Container } from './styles';
import { putNotification } from '#store/notifications';

type Props = {
    notification: Store.Models.Notification;
    onLongPress: () => void;
};

const NotificationUserSubscribe = ({ notification, onLongPress }: Props) => {
    const dispatch = useDispatch();
    const navigation =
        useNavigation<Screen.DesktopBottomTab.NotificationNavigationProp>();

    const galerieSelector = React.useMemo(
        () => selectGalerie(notification.galerieId),
        [notification]
    );
    const galerie = useSelector(galerieSelector);

    const handlePress = React.useCallback(() => {
        if (!galerie) return;
        dispatch(putNotification(notification.id));
        dispatch(updateGaleriesCurrent(galerie.id));
        navigation.navigate('Galerie');
    }, [galerie, navigation, notification]);

    return (
        <NotificationCardContainer
            notification={notification}
            onLongPress={onLongPress}
            onPress={handlePress}
            seen={notification.seen}
        >
            <Users notification={notification} />
            {galerie && (
                <Container>
                    <Typography>
                        <Typography fontFamily="bold">
                            {notification.num} new user
                            {notification.num > 1 && 's'}{' '}
                        </Typography>
                        subscribe to galerie{' '}
                        <Typography fontFamily="bold">
                            {galerie.name}
                        </Typography>
                    </Typography>
                    <GalerieCoverPicture
                        borderRadius={
                            GLOBAL_STYLE.NOTIFICATION_CARD_IMAGE_BORDER_RADIUS
                        }
                        size={GLOBAL_STYLE.NOTIFICATION_CARD_IMAGE_SIZE}
                        galerie={galerie}
                    />
                </Container>
            )}
        </NotificationCardContainer>
    );
};

export default NotificationUserSubscribe;
