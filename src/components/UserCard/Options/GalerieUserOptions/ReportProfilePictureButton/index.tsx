import * as React from 'react';

import BottomSheetButton from '#components/BottomSheetButton';
import { BottomSheetContext } from '#contexts/BottomSheetContext';

const ReportProfilePictureButton = () => {
    const { closeBottomSheet } = React.useContext(BottomSheetContext);
    const handlePress = React.useCallback(() => {
        closeBottomSheet();
    }, []);

    return (
        <BottomSheetButton
            onPress={handlePress}
            title="report profile picture"
        />
    );
};

export default ReportProfilePictureButton;
