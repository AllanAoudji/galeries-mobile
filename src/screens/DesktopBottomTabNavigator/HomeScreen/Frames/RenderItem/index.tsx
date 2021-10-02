import { useNavigation } from '@react-navigation/native';
import * as React from 'react';
import { useDispatch, useSelector } from 'react-redux';

import { FrameCard } from '#components';
import { selectFrame, updateFramesCurrent } from '#store/frames';
import { postLike } from '#store/likes';

type Props = {
    item: string;
};

const RenderItem = ({ item }: Props) => {
    const dispatch = useDispatch();
    const navigation =
        useNavigation<Screen.DesktopBottomTab.HomeNavigationProp>();

    const frameSelector = React.useMemo(() => selectFrame(item), [item]);
    const frame = useSelector(frameSelector);

    const handlePressComments = React.useCallback(() => {
        dispatch(updateFramesCurrent(item));
        navigation.navigate('Comments');
    }, [item]);
    const handlePressLike = React.useCallback(
        () => dispatch(postLike(frame.id)),
        [frame]
    );
    const handlePressLikes = React.useCallback(() => {
        if (+frame.numOfLikes > 0) {
            dispatch(updateFramesCurrent(item));
            navigation.navigate('Likes');
        }
    }, [frame]);

    return (
        <FrameCard
            frame={frame}
            onPressComments={handlePressComments}
            onPressLikes={handlePressLikes}
            onPressLike={handlePressLike}
        />
    );
};

export default React.memo(RenderItem);
