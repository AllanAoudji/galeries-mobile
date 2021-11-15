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

import { Container, TextContainer } from './styles';

type Props = {
    notification: Store.Models.Notification;
    onLongPress: () => void;
};

const NotificationGalerieRoleChange = ({
    notification,
    onLongPress,
}: Props) => {
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
        dispatch(updateGaleriesCurrent(galerie.id));
        dispatch(putNotification(notification.id));
        navigation.navigate('Galerie');
    }, [galerie, notification, navigation]);

    return (
        <NotificationCardContainer
            notification={notification}
            onLongPress={onLongPress}
            onPress={handlePress}
            seen={notification.seen}
        >
            <Pictogram
                color="secondary-dark"
                pr="smallest"
                variant={
                    notification.role === 'admin'
                        ? 'admin-role'
                        : 'moderator-role'
                }
            />
            <Container>
                <TextContainer>
                    {galerie && (
                        <Typography>
                            You become{' '}
                            {notification.role === 'admin' ? 'the' : 'a'}{' '}
                            <Typography fontFamily="bold">
                                {notification.role}{' '}
                            </Typography>
                            of galerie{' '}
                            <Typography fontFamily="bold">
                                {galerie.name}
                            </Typography>
                        </Typography>
                    )}
                </TextContainer>
                <GalerieCoverPicture
                    borderRadius={
                        GLOBAL_STYLE.NOTIFICATION_CARD_IMAGE_BORDER_RADIUS
                    }
                    ml="smallest"
                    size={GLOBAL_STYLE.NOTIFICATION_CARD_IMAGE_SIZE}
                    galerie={galerie}
                />
            </Container>
        </NotificationCardContainer>
    );
};

export default NotificationGalerieRoleChange;
