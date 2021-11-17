import { useFocusEffect } from '@react-navigation/native';
import * as React from 'react';
import { useSelector } from 'react-redux';

import { selectCurrentFrame } from '#store/frames';
import {
    selectCurrentFrameLikesAllIds,
    selectCurrentFrameLikesStatus,
} from '#store/likes';

import Likes from './Likes';

import { Container } from './styles';
import { BottomLoader, FullScreenLoader } from '#components';

type Props = {
    navigation: Screen.DesktopBottomTab.LikesNavigationProp;
};

const LikesScreen = ({ navigation }: Props) => {
    const currentFrame = useSelector(selectCurrentFrame);
    const currentFrameLikesAllIds = useSelector(selectCurrentFrameLikesAllIds);
    const status = useSelector(selectCurrentFrameLikesStatus);

    useFocusEffect(
        React.useCallback(() => {
            if (!currentFrame) {
                if (navigation.canGoBack()) navigation.goBack();
                else navigation.navigate('Home');
            }
        }, [currentFrame, navigation])
    );
    useFocusEffect(
        React.useCallback(() => {
            if (currentFrameLikesAllIds && currentFrameLikesAllIds.length < 1)
                if (navigation.canGoBack()) navigation.goBack();
                else navigation.navigate('Home');
        }, [currentFrameLikesAllIds, navigation])
    );

    if (!currentFrame) return null;

    return (
        <Container>
            <Likes frameId={currentFrame.id} allIds={currentFrameLikesAllIds} />
            <FullScreenLoader show={status === 'INITIAL_LOADING'} />
            <BottomLoader show={status === 'LOADING'} />
        </Container>
    );
};

export default LikesScreen;
