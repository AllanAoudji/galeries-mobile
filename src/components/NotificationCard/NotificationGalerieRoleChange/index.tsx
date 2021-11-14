import { useNavigation } from '@react-navigation/native';
import * as React from 'react';
import { useDispatch, useSelector } from 'react-redux';

import GalerieCoverPicture from '#components/GalerieCoverPicture';
import NotificationCardContainer from '#components/NotificationCardContainer';
import Pictogram from '#components/Pictogram';
import Typography from '#components/Typography';
import { GLOBAL_STYLE } from '#helpers/constants';
import { selectGalerie, updateGaleriesCurrent } from '#store/galeries';
import { putNotification } from '#store/notifications';

import { Container } from './styles';

type Props = {
    notification: Store.Models.Notification;
};

const onLongPress = () => {};

const NotificationGalerieRoleChange = ({ notification }: Props) => {
    const dispatch = useDispatch();
    const navigation =
        useNavigation<Screen.DesktopBottomTab.NotificationNavigationProp>();
    const galerieSelector = React.useMemo(
        () => selectGalerie(notification.galerieId),
        [notification]
    );
    const galerie = useSelector(galerieSelector);

    const handlePress = React.useCallback(() => {
        if (galerie) {
            dispatch(updateGaleriesCurrent(galerie.id));
            dispatch(putNotification(notification.id));
            navigation.navigate('Galerie');
        }
    }, [galerie, notification, navigation]);

    if (!galerie) return null;

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
                mr="smallest"
                size={GLOBAL_STYLE.NOTIFICATION_CARD_IMAGE_SIZE}
                galerie={galerie}
            />
            <Container>
                <Typography>
                    You become {notification.role === 'admin' ? 'the' : 'a'}{' '}
                    <Typography fontFamily="bold">
                        {notification.role}{' '}
                    </Typography>
                    of galerie{' '}
                    <Typography fontFamily="bold">{galerie.name}</Typography>
                </Typography>
                <Pictogram
                    color="secondary-dark"
                    ml="small"
                    variant={
                        notification.role === 'admin'
                            ? 'admin-role'
                            : 'moderator-role'
                    }
                />
            </Container>
        </NotificationCardContainer>
    );
};

export default NotificationGalerieRoleChange;
