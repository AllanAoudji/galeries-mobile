import { useNavigation } from '@react-navigation/native';
import * as React from 'react';
import { useDispatch, useSelector } from 'react-redux';

import { FrameCard } from '#components';
import { selectFrame, updateFramesCurrent } from '#store/frames';

type Props = {
    item: string;
};

const RenderItem = ({ item }: Props) => {
    const dispatch = useDispatch();
    const navigation =
        useNavigation<Screen.DesktopBottomTab.HomeNavigationProp>();

    const frameSelector = React.useMemo(() => selectFrame(item), [item]);
    const frame = useSelector(frameSelector);

    const handlePresscomments = React.useCallback(() => {
        dispatch(updateFramesCurrent(item));
        navigation.navigate('Comments');
    }, [navigation]);
    const handlePressLikes = React.useCallback(() => {
        dispatch(updateFramesCurrent(item));
        navigation.navigate('Likes');
    }, [navigation]);

    return (
        <FrameCard
            frame={frame}
            onPressComments={handlePresscomments}
            onPressLikes={handlePressLikes}
        />
    );
};

export default RenderItem;
