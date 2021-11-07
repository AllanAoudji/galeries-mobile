import * as React from 'react';

import BottomSheetButton from '#components/BottomSheetButton';
import { BottomSheetContext } from '#contexts/BottomSheetContext';

type Props = {
    hide: boolean;
};

const ReportProfilePictureButton = ({ hide }: Props) => {
    const { closeBottomSheet } = React.useContext(BottomSheetContext);
    const handlePress = React.useCallback(() => {
        closeBottomSheet();
    }, []);

    if (hide) return null;

    return (
        <BottomSheetButton
            onPress={handlePress}
            title="report profile picture"
        />
    );
};

export default React.memo(ReportProfilePictureButton);
