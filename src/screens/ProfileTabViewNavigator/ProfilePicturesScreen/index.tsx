import { useFocusEffect, useNavigation } from '@react-navigation/native';
import * as React from 'react';
import Animated from 'react-native-reanimated';
import { useDispatch, useSelector } from 'react-redux';
import { InteractionManager } from 'react-native';
import { Camera } from 'expo-camera';
import {
    AddButton,
    BottomLoader,
    FullScreenLoader,
    GalerieTabbarScreenContainer,
} from '#components';
import {
    getProfilePictures,
    selectCurrentUserCurrentProfilePictureStatus,
    selectProfilePicturesAllIds,
    selectProfilePicturesLoadingPost,
} from '#store/profilePictures';

import ProfilePictures from './ProfilePictures';
import EmptyScrollView from './EmptyScrollView';

type Props = {
    current: boolean;
    editScrollY: (offsetY: number) => void;
    scrollY: Animated.SharedValue<number>;
};

const ProfilePicturesScreen = ({ current, editScrollY, scrollY }: Props) => {
    const dispatch = useDispatch();
    const navigation =
        useNavigation<Screen.DesktopBottomTab.ProfileNavigationProp>();
    const mounted = React.useRef(false);

    const profilePicturesAllIds = useSelector(selectProfilePicturesAllIds);
    const profilePicturesStatus = useSelector(
        selectCurrentUserCurrentProfilePictureStatus
    );
    const loading = useSelector(selectProfilePicturesLoadingPost);

    const showBottomLoader = React.useMemo(
        () => profilePicturesStatus === 'LOADING',
        [profilePicturesStatus]
    );
    const showFullScreenLoader = React.useMemo(
        () =>
            profilePicturesStatus === 'PENDING' ||
            profilePicturesStatus === 'INITIAL_LOADING',
        [profilePicturesStatus]
    );

    const handlePressAddButton = React.useCallback(() => {
        if (loading !== 'PENDING') return;
        (async () => {
            const { status } = await Camera.requestCameraPermissionsAsync();
            if (status === 'granted' && mounted.current)
                navigation.navigate('CreateProfilePictureCamera');
        })();
    }, [loading, navigation]);

    useFocusEffect(
        React.useCallback(() => {
            if (profilePicturesStatus === 'PENDING')
                InteractionManager.runAfterInteractions(() => {
                    dispatch(getProfilePictures());
                });
        }, [profilePicturesStatus])
    );

    React.useEffect(() => {
        mounted.current = true;
        return () => {
            mounted.current = false;
        };
    }, []);

    return (
        <GalerieTabbarScreenContainer>
            {profilePicturesAllIds && profilePicturesAllIds.length > 0 ? (
                <ProfilePictures
                    allIds={profilePicturesAllIds}
                    current={current}
                    editScrollY={editScrollY}
                    scrollY={scrollY}
                />
            ) : (
                <EmptyScrollView
                    scrollY={scrollY}
                    current={current}
                    editScrollY={editScrollY}
                />
            )}
            <AddButton
                bottom="largest"
                onPress={handlePressAddButton}
                right="normal"
            />
            <FullScreenLoader show={showFullScreenLoader} />
            <BottomLoader bottom="huge" show={showBottomLoader} />
        </GalerieTabbarScreenContainer>
    );
};

export default ProfilePicturesScreen;
