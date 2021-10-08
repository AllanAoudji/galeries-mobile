import { useNavigation } from '@react-navigation/native';
import * as React from 'react';
import { useDispatch, useSelector } from 'react-redux';

import { BottomSheetButton, FrameCard } from '#components';
import { BottomSheetContext } from '#contexts/BottomSheetContext';
import { selectFrame, updateFramesCurrent } from '#store/frames';
import { selectGalerie } from '#store/galeries';
import { selectMe } from '#store/me';

type Props = {
    item: string;
};

const RenderItem = ({ item }: Props) => {
    const dispatch = useDispatch();
    const navigation =
        useNavigation<Screen.DesktopBottomTab.HomeNavigationProp>();

    const frameSelector = React.useMemo(() => selectFrame(item), [item]);
    const frame = useSelector(frameSelector);
    const galerieSelector = React.useMemo(
        () => selectGalerie(frame.galerieId),
        [frame]
    );
    const galerie = useSelector(galerieSelector);
    const me = useSelector(selectMe);

    const { closeBottomSheet, openBottomSheet } =
        React.useContext(BottomSheetContext);

    const handlePressUpdateFrame = React.useCallback(() => {
        dispatch(updateFramesCurrent(item));
        navigation.navigate('UpdateFrame');
        closeBottomSheet();
    }, [item]);

    const updateFrameButton = React.useMemo(() => {
        if (me && me.id === frame.userId)
            return (
                <BottomSheetButton
                    onPress={handlePressUpdateFrame}
                    title="update frame"
                />
            );
        return null;
    }, [frame, handlePressUpdateFrame, me]);
    const useAsCoverPicture = React.useMemo(() => {
        if (galerie && galerie.role !== 'user')
            return (
                <BottomSheetButton
                    onPress={() => {}}
                    title="use as cover picture"
                />
            );
        return null;
    }, [galerie]);
    const deleteOrReportFrame = React.useMemo(() => {
        if (
            (me && frame.userId === me.id) ||
            (galerie && galerie.role !== 'user')
        )
            return (
                <BottomSheetButton onPress={() => {}} title="delete frame" />
            );
        return <BottomSheetButton onPress={() => {}} title="report frame..." />;
    }, []);

    const bottomSheetContent = React.useCallback(() => {
        return (
            <>
                {updateFrameButton}
                {useAsCoverPicture}
                {deleteOrReportFrame}
            </>
        );
    }, []);
    const handlePressComments = React.useCallback(() => {
        dispatch(updateFramesCurrent(item));
        navigation.navigate('Comments');
    }, [item]);
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
    const handlePressSlider = React.useCallback(() => {
        dispatch(updateFramesCurrent(item));
        navigation.navigate('Frame');
    }, [item]);

    return (
        <FrameCard
            frame={frame}
            onPressComments={handlePressComments}
            onPressLikes={handlePressLikes}
            onPressOptions={handlePressOption}
            onPressSlider={handlePressSlider}
        />
    );
};

export default React.memo(RenderItem);
