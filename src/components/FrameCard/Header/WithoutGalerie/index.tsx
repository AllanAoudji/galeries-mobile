import { useNavigation } from '@react-navigation/native';
import * as React from 'react';
import { useDispatch, useSelector } from 'react-redux';

import ProfilePicture from '#components/ProfilePicture';
import Typography from '#components/Typography';
import { selectUser, updateUserCurrent } from '#store/users';
import { selectCurrentGalerie } from '#store/galeries';

import { Container } from './styles';

type Props = {
    frame: Store.Models.Frame;
};

const WithoutGalerie = ({ frame }: Props) => {
    const dispatch = useDispatch();
    const navigation = useNavigation<
        | Screen.DesktopBottomTab.FrameProp
        | Screen.DesktopBottomTab.HomeNavigationProp
        | Screen.DesktopBottomTab.GalerieNavigationProp
    >();

    const currentGalerie = useSelector(selectCurrentGalerie);
    const userSelector = React.useMemo(() => selectUser(frame.userId), [frame]);
    const user = useSelector(userSelector);

    const handlePress = React.useCallback(() => {
        if (currentGalerie) {
            dispatch(updateUserCurrent(frame.userId));
            navigation.navigate('UserScreen');
        }
    }, [currentGalerie, frame]);

    return (
        <Container onPress={handlePress}>
            <ProfilePicture mr="smallest" user={user} />
            <Typography fontFamily="light">posted by </Typography>
            <Typography>{user ? user.pseudonym : 'user not found'}</Typography>
        </Container>
    );
};

export default React.memo(WithoutGalerie);
