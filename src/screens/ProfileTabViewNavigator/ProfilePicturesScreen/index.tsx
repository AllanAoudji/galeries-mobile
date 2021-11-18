import { useFocusEffect } from '@react-navigation/native';
import * as React from 'react';
import Animated from 'react-native-reanimated';
import { InteractionManager } from 'react-native';
import { useDispatch, useSelector } from 'react-redux';

import {
    BottomLoader,
    FullScreenLoader,
    GalerieTabbarScreenContainer,
} from '#components';
import {
    getProfilePictures,
    selectCurrentUserCurrentProfilePictureStatus,
    selectProfilePicturesAllIds,
} from '#store/profilePictures';

import AddProfilePictureButton from './AddProfilePictureButton';
import ProfilePictures from './ProfilePictures';
import EmptyScrollView from './EmptyScrollView';

type Props = {
    current: boolean;
    editScrollY: (offsetY: number) => void;
    scrollY: Animated.SharedValue<number>;
};

const ProfilePicturesScreen = ({ current, editScrollY, scrollY }: Props) => {
    const dispatch = useDispatch();
    const mounted = React.useRef(false);

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
                    current={current}
                    editScrollY={editScrollY}
                    scrollY={scrollY}
                />
            )}
            <AddProfilePictureButton />
            <FullScreenLoader show={showFullScreenLoader} />
            <BottomLoader bottom="huge" show={showBottomLoader} />
        </GalerieTabbarScreenContainer>
    );
};

export default React.memo(ProfilePicturesScreen);
