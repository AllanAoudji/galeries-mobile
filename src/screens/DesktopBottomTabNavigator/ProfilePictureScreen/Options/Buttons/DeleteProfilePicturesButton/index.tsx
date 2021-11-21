import * as React from 'react';
import { useSelector } from 'react-redux';

import { Typography } from '#components';
import { DeleteProfilePictureModalContext } from '#contexts/DeleteProfilePictureModalContext';
import { selectProfilePicturesLoadingDelete } from '#store/profilePictures';

import { Button } from './styles';

type Props = {
    me?: Store.Models.User;
    profilePicture: Store.Models.ProfilePicture;
};

const DeleteProfilePictureButton = ({ me, profilePicture }: Props) => {
    const { handleOpenModal } = React.useContext(
        DeleteProfilePictureModalContext
    );

    const loading = useSelector(selectProfilePicturesLoadingDelete);

    const handlePress = React.useCallback(() => {
        if (loading.includes('LOADING')) return;
        handleOpenModal(profilePicture.id);
    }, [loading, profilePicture]);

    if (!me) return null;
    if (profilePicture.userId !== me.id) return null;

    return (
        <Button onPress={handlePress}>
            <Typography fontSize={18}>delete profile picture</Typography>
        </Button>
    );
};

export default React.memo(DeleteProfilePictureButton);
