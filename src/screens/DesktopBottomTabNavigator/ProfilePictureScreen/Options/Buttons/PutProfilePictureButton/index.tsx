import * as React from 'react';
import { useDispatch, useSelector } from 'react-redux';

import { Typography } from '#components';
import {
    putProfilePicture,
    selectUserCurrentProfilePictureId,
} from '#store/profilePictures';

import { Button } from './styles';

type Props = {
    me?: Store.Models.User;
    profilePicture: Store.Models.ProfilePicture;
};

const PutProfilePictureButton = ({ me, profilePicture }: Props) => {
    const dispatch = useDispatch();

    const currentProfilePictureIdSelector = React.useMemo(
        () => selectUserCurrentProfilePictureId(profilePicture.userId),
        [profilePicture]
    );
    const currentProfilePictureId = useSelector(
        currentProfilePictureIdSelector
    );

    const title = React.useMemo(() => {
        if (
            !currentProfilePictureId ||
            profilePicture.id !== currentProfilePictureId
        )
            return 'use as current profile picture';
        return 'remove this current profile picture';
    }, [profilePicture, currentProfilePictureId]);

    const handlePress = React.useCallback(() => {
        dispatch(putProfilePicture(profilePicture.id));
    }, [profilePicture]);

    if (!me) return null;
    if (profilePicture.userId !== me.id) return null;

    return (
        <Button onPress={handlePress}>
            <Typography fontSize={18}>{title}</Typography>
        </Button>
    );
};

export default React.memo(PutProfilePictureButton);
