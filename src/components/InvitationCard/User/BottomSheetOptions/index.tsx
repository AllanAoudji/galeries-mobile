import * as React from 'react';

import Pictogram from '#components/Pictogram';
import { BottomSheetContext } from '#contexts/BottomSheetContext';

import DeleteInvitationButton from './DeleteInvitationButton';
import ShowQRCodeButton from './ShowQRCodeButton';

type Props = {
    invitation: Store.Models.Invitation;
};

const BottomSheetOptions = ({ invitation }: Props) => {
    const { openBottomSheet } = React.useContext(BottomSheetContext);

    const bottomSheetContent = React.useCallback(() => {
        return (
            <>
                <ShowQRCodeButton />
                <DeleteInvitationButton invitation={invitation} />
            </>
        );
    }, [invitation]);

    const handlePress = React.useCallback(() => {
        openBottomSheet(bottomSheetContent);
    }, [bottomSheetContent]);

    return (
        <Pictogram
            onPress={handlePress}
            pl="smallest"
            pr="smallest"
            size="small"
            variant="option-vertical"
        />
    );
};

export default BottomSheetOptions;
