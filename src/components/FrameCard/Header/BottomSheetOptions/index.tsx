import { useNavigation } from '@react-navigation/native';
import * as React from 'react';
import { useDispatch, useSelector } from 'react-redux';

import Pictogram from '#components/Pictogram';
import BottomSheetButton from '#components/BottomSheetButton';
import { BottomSheetContext } from '#contexts/BottomSheetContext';
import { selectMe } from '#store/me';
import { selectGalerie } from '#store/galeries';
import { DeleteFrameModalContext } from '#contexts/DeleteFrameModalContext';
import { updateFramesCurrent } from '#store/frames';
import {
    putGaleriePicture,
    selectFrameGaleriePicturesAllIds,
} from '#store/galeriePictures';

type Props = {
    currentIndex: number;
    frame: Store.Models.Frame;
};

const BottomSheetOptions = ({ currentIndex, frame }: Props) => {
    const dispatch = useDispatch();
    const navigation = useNavigation<Screen.DesktopBottomTab.UpdateFrameProp>();
    const { closeBottomSheet, openBottomSheet } =
        React.useContext(BottomSheetContext);
    const { handleOpenModal } = React.useContext(DeleteFrameModalContext);

    const galeriePicturesAllIdsSelector = React.useMemo(
        () => selectFrameGaleriePicturesAllIds(frame.id),
        [frame]
    );
    const galeriePicturesAllIds = useSelector(galeriePicturesAllIdsSelector);

    const galerieSelector = React.useMemo(
        () => selectGalerie(frame.galerieId),
        [frame]
    );
    const galerie = useSelector(galerieSelector);
    const me = useSelector(selectMe);

    const handlePressUseAsCoverPicture = React.useCallback(() => {
        if (galeriePicturesAllIds && galeriePicturesAllIds[currentIndex]) {
            dispatch(
                putGaleriePicture(frame.id, galeriePicturesAllIds[currentIndex])
            );
        }
        closeBottomSheet();
    }, [frame, currentIndex, galeriePicturesAllIds]);
    const handlePressDeleteFrame = React.useCallback(() => {
        handleOpenModal(frame.id);
        closeBottomSheet();
    }, [frame]);
    const handlePressUpdateFrame = React.useCallback(() => {
        dispatch(updateFramesCurrent(frame.id));
        navigation.navigate('UpdateFrame');
        closeBottomSheet();
    }, [frame]);

    const deleteOrReportFrame = React.useMemo(() => {
        if (
            (me && frame.userId === me.id) ||
            (galerie && galerie.role !== 'user')
        )
            return (
                <BottomSheetButton
                    onPress={handlePressDeleteFrame}
                    title="delete frame"
                />
            );
        return <BottomSheetButton onPress={() => {}} title="report frame..." />;
    }, [me, frame, galerie, handlePressDeleteFrame]);
    const useAsCoverPicture = React.useMemo(() => {
        if (galerie && galerie.role !== 'user') {
            return (
                <BottomSheetButton
                    onPress={handlePressUseAsCoverPicture}
                    title="use as cover picture"
                />
            );
        }
        return null;
    }, [galerie, handlePressUseAsCoverPicture]);
    const updateFrameButton = React.useMemo(() => {
        if (me && me.id === frame.userId)
            return (
                <BottomSheetButton
                    onPress={handlePressUpdateFrame}
                    title="update frame"
                />
            );
        return null;
    }, [me, frame]);

    const bottomSheetContent = React.useCallback(() => {
        return (
            <>
                {updateFrameButton}
                {useAsCoverPicture}
                {deleteOrReportFrame}
            </>
        );
    }, [deleteOrReportFrame, updateFrameButton, useAsCoverPicture]);

    const handlePress = React.useCallback(() => {
        openBottomSheet(bottomSheetContent);
    }, [bottomSheetContent]);

    return (
        <Pictogram
            onPress={handlePress}
            pb="smallest"
            pl="small"
            pr="small"
            pt="smallest"
            size="small"
            variant="option-vertical"
        />
    );
};

export default BottomSheetOptions;
