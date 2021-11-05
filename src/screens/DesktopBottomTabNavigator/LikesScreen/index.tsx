import { useFocusEffect } from '@react-navigation/native';
import * as React from 'react';
import { useSelector } from 'react-redux';

import Likes from './Likes';
import { selectCurrentFrame } from '#store/frames';
import { selectCurrentFrameLikesAllIds } from '#store/likes';

type Props = {
    navigation: Screen.DesktopBottomTab.LikesNavigationProp;
};

const LikesScreen = ({ navigation }: Props) => {
    const currentFrame = useSelector(selectCurrentFrame);
    const currentFrameLikesAllIds = useSelector(selectCurrentFrameLikesAllIds);

    useFocusEffect(
        React.useCallback(() => {
            if (!currentFrame) {
                if (navigation.canGoBack()) navigation.goBack();
                else navigation.navigate('Home');
            }
        }, [])
    );
    useFocusEffect(
        React.useCallback(() => {
            if (currentFrameLikesAllIds && currentFrameLikesAllIds.length < 1)
                if (navigation.canGoBack()) navigation.goBack();
                else navigation.navigate('Home');
        }, [currentFrameLikesAllIds])
    );

    if (!currentFrame) return null;

    return <Likes frameId={currentFrame.id} allIds={currentFrameLikesAllIds} />;
};

export default LikesScreen;
