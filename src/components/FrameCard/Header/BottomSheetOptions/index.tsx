import * as React from 'react';

import Pictogram from '#components/Pictogram';
import { BottomSheetContext } from '#contexts/BottomSheetContext';

import DeleteFrameButton from './DeleteFrameButton';
import ReportFrameButton from './ReportFrameButton';
import UpdateFrameButton from './UpdateFrameButton';
import UseAsCoverPictureButton from './UseAsCoverPictureButton';

type Props = {
    frame: Store.Models.Frame;
};

const BottomSheetOptions = ({ frame }: Props) => {
    const { openBottomSheet } = React.useContext(BottomSheetContext);

    const bottomSheetContent = React.useCallback(() => {
        return (
            <>
                <UpdateFrameButton frameId={frame.id} userId={frame.userId} />
                <UseAsCoverPictureButton
                    frameId={frame.id}
                    galerieId={frame.galerieId}
                />
                <DeleteFrameButton
                    frameId={frame.id}
                    galerieId={frame.galerieId}
                    userId={frame.userId}
                />
                <ReportFrameButton
                    galerieId={frame.galerieId}
                    userId={frame.userId}
                />
            </>
        );
    }, [frame]);

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
