import { useNavigation } from '@react-navigation/native';
import * as React from 'react';
import { useDispatch, useSelector } from 'react-redux';

import NotificationCardContainer from '#components/NotificationCardContainer';
import GalerieCoverPicture from '#components/GalerieCoverPicture';
import Typography from '#components/Typography';
import { selectGalerie, updateGaleriesCurrent } from '#store/galeries';
import { putNotification } from '#store/notifications';
import { GLOBAL_STYLE } from '#helpers/constants';

type Props = {
    notification: Store.Models.Notification;
};

const onLongPress = () => {};

const NotificationFramePosted = ({ notification }: Props) => {
    const dispatch = useDispatch();
    const navigation =
        useNavigation<Screen.DesktopBottomTab.NotificationNavigationProp>();
    const galerieSelector = React.useMemo(
        () => selectGalerie(notification.galerieId),
        [notification]
    );
    const galerie = useSelector(galerieSelector);

    const handlePress = React.useCallback(() => {
        dispatch(putNotification(notification.id));
        dispatch(updateGaleriesCurrent(notification.galerieId));
        navigation.navigate('Galerie');
    }, [notification, navigation]);

    return (
        <NotificationCardContainer
            onLongPress={onLongPress}
            onPress={handlePress}
            seen={notification.seen}
        >
            <GalerieCoverPicture
                borderRadius={
                    GLOBAL_STYLE.NOTIFICATION_CARD_IMAGE_BORDER_RADIUS
                }
                size={GLOBAL_STYLE.NOTIFICATION_CARD_IMAGE_SIZE}
                galerie={galerie}
            />
            <Typography>
                {notification.num} frame{notification.num > 1 && 's'} posted on{' '}
                {galerie ? galerie.name : 'galerie not found'}
            </Typography>
        </NotificationCardContainer>
    );
};

export default NotificationFramePosted;
