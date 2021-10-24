import * as React from 'react';

import BottomSheetButton from '#components/BottomSheetButton';
import { BottomSheetContext } from '#contexts/BottomSheetContext';

const ShowQRCodeButton = () => {
    const { closeBottomSheet } = React.useContext(BottomSheetContext);

    const handlePress = React.useCallback(() => {
        closeBottomSheet();
    }, []);

    return <BottomSheetButton onPress={handlePress} title="show QRCode" />;
};

export default React.memo(ShowQRCodeButton);
