import * as React from 'react';
import { useDispatch, useSelector } from 'react-redux';

import { BottomSheetButton } from '#components';
import { BottomSheetContext } from '#contexts/BottomSheetContext';
import {
    putProfilePicture,
    selectCurrentUserCurrentProfilePictureId,
    selectProfilePicturesLoadingPut,
} from '#store/profilePictures';

type Props = {
    profilePicture?: Store.Models.ProfilePicture;
};

const PutProfilePictureButton = ({ profilePicture }: Props) => {
    const dispatch = useDispatch();

    const { closeBottomSheet } = React.useContext(BottomSheetContext);

    const loading = useSelector(selectProfilePicturesLoadingPut);
    const currentProfilePicture = useSelector(
        selectCurrentUserCurrentProfilePictureId
    );

    const title = React.useMemo(() => {
        if (!profilePicture || profilePicture.id !== currentProfilePicture)
            return 'use as current profile picture';
        return 'remove this current profile picture';
    }, [currentProfilePicture, profilePicture]);

    const handlePress = React.useCallback(() => {
        closeBottomSheet();
        if (!profilePicture) return;
        if (loading.includes('LOADING')) return;
        dispatch(putProfilePicture(profilePicture.id));
    }, [loading, profilePicture]);

    if (!profilePicture) return null;

    return <BottomSheetButton onPress={handlePress} title={title} />;
};

export default React.memo(PutProfilePictureButton);
