import { useFocusEffect, useNavigation } from '@react-navigation/native';
import * as React from 'react';
import Animated from 'react-native-reanimated';
import { useDispatch, useSelector } from 'react-redux';
import { InteractionManager } from 'react-native';
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

    const profilePicturesAllIds = useSelector(selectProfilePicturesAllIds);
    const profilePicturesStatus = useSelector(
        selectCurrentUserCurrentProfilePictureStatus
    );

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
        navigation.navigate('CreateProfilePictureCamera');
    }, [navigation]);

    useFocusEffect(
        React.useCallback(() => {
            if (profilePicturesStatus === 'PENDING')
                InteractionManager.runAfterInteractions(() => {
                    dispatch(getProfilePictures());
                });
        }, [profilePicturesStatus])
    );

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
