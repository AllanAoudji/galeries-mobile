import { useNavigation } from '@react-navigation/native';
import * as React from 'react';
import { useDispatch, useSelector } from 'react-redux';

import { BottomSheetButton, FrameCard } from '#components';
import { BottomSheetContext } from '#contexts/BottomSheetContext';
import { selectFrame, updateFramesCurrent } from '#store/frames';
import { postLike } from '#store/likes';

type Props = {
    item: string;
};

const bottomSheetOnPress = () => {};

const RenderItem = ({ item }: Props) => {
    const dispatch = useDispatch();
    const navigation =
        useNavigation<Screen.DesktopBottomTab.HomeNavigationProp>();

    const { openBottomSheet } = React.useContext(BottomSheetContext);

    const frameSelector = React.useMemo(() => selectFrame(item), [item]);
    const frame = useSelector(frameSelector);

    const bottomSheetContent = React.useCallback(() => {
        return (
            <>
                <BottomSheetButton
                    onPress={bottomSheetOnPress}
                    title="update frame"
                />
                <BottomSheetButton
                    onPress={bottomSheetOnPress}
                    title="use as cover picture"
                />
                <BottomSheetButton
                    onPress={bottomSheetOnPress}
                    title="delete frame"
                />
            </>
        );
    }, []);
    const handlePressComments = React.useCallback(() => {
        dispatch(updateFramesCurrent(item));
        navigation.navigate('Comments');
    }, [item]);
    const handlePressLike = React.useCallback(() => {
        dispatch(postLike(frame.id));
    }, [frame]);
    const handlePressLikes = React.useCallback(() => {
        if (+frame.numOfLikes > 0) {
            dispatch(updateFramesCurrent(item));
            navigation.navigate('Likes');
        }
    }, [frame]);
    const handlePressOption = React.useCallback(
        () => openBottomSheet(bottomSheetContent),
        []
    );

    return (
        <FrameCard
            frame={frame}
            onPressComments={handlePressComments}
            onPressLikes={handlePressLikes}
            onPressLike={handlePressLike}
            onPressOptions={handlePressOption}
        />
    );
};

export default React.memo(RenderItem);
