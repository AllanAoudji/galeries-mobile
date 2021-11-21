import { useNavigation } from '@react-navigation/native';
import * as React from 'react';
import { useDispatch } from 'react-redux';

import { Typography } from '#components';
import { updateProfilePicturesCurrent } from '#store/profilePictures';

import { Button } from './styles';

type Props = {
    me?: Store.Models.User;
    profilePicture: Store.Models.ProfilePicture;
};

const ReportProfilePictureButton = ({ me, profilePicture }: Props) => {
    const dispatch = useDispatch();
    const navigation =
        useNavigation<Screen.DesktopBottomTab.ProfilePictureNavigationProp>();

    const handlePress = React.useCallback(() => {
        dispatch(updateProfilePicturesCurrent(profilePicture.id));
        navigation.navigate('ReportProfilePicture');
    }, [navigation, profilePicture]);

    if (!me) return null;
    if (profilePicture.userId === me.id) return null;

    return (
        <Button onPress={handlePress}>
            <Typography fontSize={18}>report profile picture</Typography>
        </Button>
    );
};

export default React.memo(ReportProfilePictureButton);
