import * as React from 'react';
import { useSelector } from 'react-redux';

import { AddButton } from '#components';
import { BottomSheetContext } from '#contexts/BottomSheetContext';
import { selectProfilePicturesLoadingPost } from '#store/profilePictures';

import NavigateCameraButton from './NavigateCameraButton';
import NavigateGalleryButton from './NavigateGalleryButton';

const AddProfilePictureButton = () => {
    const { openBottomSheet } = React.useContext(BottomSheetContext);

    const loading = useSelector(selectProfilePicturesLoadingPost);

    const bottomSheetContainer = React.useCallback(() => {
        return (
            <>
                <NavigateCameraButton />
                <NavigateGalleryButton />
            </>
        );
    }, []);
    const handlePress = React.useCallback(() => {
        if (loading.includes('LOADING')) return;
        openBottomSheet(bottomSheetContainer);
    }, [bottomSheetContainer, openBottomSheet, loading]);

    return <AddButton loading={loading} onPress={handlePress} />;
};

export default React.memo(AddProfilePictureButton);
