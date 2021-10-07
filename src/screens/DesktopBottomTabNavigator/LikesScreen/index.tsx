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

    React.useEffect(() => {
        if (!currentFrame) {
            if (navigation.canGoBack()) navigation.goBack();
            else navigation.navigate('Home');
        }
    }, [currentFrame, navigation]);

    useFocusEffect(
        React.useCallback(() => {
            if (!currentFrame) {
                if (navigation.canGoBack()) navigation.goBack();
                else navigation.navigate('Home');
            }
        }, [])
    );

    if (!currentFrame) return null;

    return <Likes frameId={currentFrame.id} allIds={currentFrameLikesAllIds} />;
};

export default LikesScreen;
