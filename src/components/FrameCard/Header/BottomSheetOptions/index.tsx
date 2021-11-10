import { useFocusEffect } from '@react-navigation/native';
import * as React from 'react';
import { BackHandler } from 'react-native';
import { useSelector } from 'react-redux';

import Pictogram from '#components/Pictogram';
import { BottomSheetContext } from '#contexts/BottomSheetContext';
import { CurrentGaleriePictureContext } from '#contexts/CurrentGaleriePictureContext';
import { DeleteFrameModalContext } from '#contexts/DeleteFrameModalContext';
import { selectMe } from '#store/me';

import DeleteFrameButton from './DeleteFrameButton';
import ReportFrameButton from './ReportFrameButton';
import UpdateFrameButton from './UpdateFrameButton';
import UseAsCoverPictureButton from './UseAsCoverPictureButton';

type Props = {
    frame: Store.Models.Frame;
};

const BottomSheetOptions = ({ frame }: Props) => {
    const { openBottomSheet } = React.useContext(BottomSheetContext);
    const { currentIndex } = React.useContext(CurrentGaleriePictureContext);
    const { handleCloseModal, openModal } = React.useContext(
        DeleteFrameModalContext
    );

    const me = useSelector(selectMe);

    const bottomSheetContent = React.useCallback(() => {
        return (
            <>
                <UpdateFrameButton frame={frame} me={me} />
                <UseAsCoverPictureButton
                    currentIndex={currentIndex}
                    frame={frame}
                />
                <DeleteFrameButton frame={frame} me={me} />
                <ReportFrameButton frame={frame} me={me} />
            </>
        );
    }, [currentIndex, frame, me]);

    const handlePress = React.useCallback(() => {
        openBottomSheet(bottomSheetContent);
    }, [bottomSheetContent]);

    useFocusEffect(
        React.useCallback(() => () => handleCloseModal(), [handleCloseModal])
    );
    useFocusEffect(
        React.useCallback(() => {
            let BackHandlerListerner: any;
            if (openModal)
                BackHandlerListerner = BackHandler.addEventListener(
                    'hardwareBackPress',
                    () => {
                        handleCloseModal();
                        return true;
                    }
                );
            else if (BackHandlerListerner) BackHandlerListerner.remove();
            return () => {
                if (BackHandlerListerner) BackHandlerListerner.remove();
            };
        }, [handleCloseModal, openModal])
    );

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

export default React.memo(BottomSheetOptions);
