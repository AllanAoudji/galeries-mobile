import * as React from 'react';
import { useSelector } from 'react-redux';

import Pictogram from '#components/Pictogram';
import { BottomSheetContext } from '#contexts/BottomSheetContext';
import { CurrentGaleriePictureContext } from '#contexts/CurrentGaleriePictureContext';
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

    const me = useSelector(selectMe);

    const bottomSheetContent = React.useCallback(() => {
        return (
            <>
                <UpdateFrameButton frame={frame} me={me} />
                <UseAsCoverPictureButton
                    currentIndex={currentIndex}
                    frame={frame}
                />
                <DeleteFrameButton frame={frame} />
                <ReportFrameButton frame={frame} me={me} />
            </>
        );
    }, [currentIndex, frame, me]);

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
