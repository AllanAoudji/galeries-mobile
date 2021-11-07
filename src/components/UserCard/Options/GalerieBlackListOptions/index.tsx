import * as React from 'react';

import Pictogram from '#components/Pictogram';
import { BottomSheetContext } from '#contexts/BottomSheetContext';

import ReportProfilePictureButton from './ReportProfilePictureButton';
import UnBlackListsButton from './UnBlackListsButton';

type Props = {
    galerieBlackList: Store.Models.GalerieBlackList;
    user: Store.Models.User;
};

const GalerieBlackListOptions = ({ galerieBlackList, user }: Props) => {
    const { openBottomSheet } = React.useContext(BottomSheetContext);

    const bottomSheetContent = React.useCallback(() => {
        return (
            <>
                <UnBlackListsButton galerieBlackList={galerieBlackList} />
                <ReportProfilePictureButton user={user} />
            </>
        );
    }, [galerieBlackList, user]);

    const handlePress = React.useCallback(() => {
        openBottomSheet(bottomSheetContent);
    }, [bottomSheetContent, openBottomSheet]);

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

export default React.memo(GalerieBlackListOptions);
