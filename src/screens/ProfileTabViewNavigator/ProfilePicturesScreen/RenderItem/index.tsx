import { useNavigation } from '@react-navigation/native';
import * as React from 'react';
import { useWindowDimensions } from 'react-native';
import { useDispatch, useSelector } from 'react-redux';

import { BottomSheetContext } from '#contexts/BottomSheetContext';
import {
    selectProfilePicture,
    updateProfilePicturesCurrent,
} from '#store/profilePictures';

import DeleteProfilePictureButton from './DeleteProfilePictureButton';
import PutProfilePictureButton from './PutProfilePictureButton';

import { Container, StyledImage } from './styles';

type Props = {
    item: string;
};

const RenderItem = ({ item }: Props) => {
    const dimension = useWindowDimensions();
    const dispatch = useDispatch();
    const navigation =
        useNavigation<Screen.DesktopBottomTab.ProfileNavigationProp>();

    const { openBottomSheet } = React.useContext(BottomSheetContext);

    const profilePictureSelector = React.useMemo(
        () => selectProfilePicture(item),
        [item]
    );
    const profilePicture = useSelector(profilePictureSelector);

    const source = React.useMemo(
        () => ({
            uri: profilePicture
                ? profilePicture.cropedImage.cachedSignedUrl
                : '',
        }),
        [profilePicture]
    );

    const bottomSheetContent = React.useCallback(() => {
        return (
            <>
                <DeleteProfilePictureButton profilePicture={profilePicture} />
                <PutProfilePictureButton profilePicture={profilePicture} />
            </>
        );
    }, [profilePicture]);

    const handleLongPress = React.useCallback(() => {
        openBottomSheet(bottomSheetContent);
    }, [bottomSheetContent, openBottomSheet]);
    const handlePress = React.useCallback(() => {
        if (!profilePicture) return;
        navigation.navigate('ProfilePicture');
        dispatch(updateProfilePicturesCurrent(profilePicture.id));
    }, [navigation, profilePicture]);

    if (!profilePicture) return null;

    return (
        <Container
            onLongPress={handleLongPress}
            onPress={handlePress}
            size={dimension.width / 2}
        >
            <StyledImage source={source} size={dimension.width / 2} />
        </Container>
    );
};

export default React.memo(RenderItem);
