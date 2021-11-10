import { useFocusEffect } from '@react-navigation/native';
import * as React from 'react';
import { BackHandler } from 'react-native';

import Pictogram from '#components/Pictogram';
import { BottomSheetContext } from '#contexts/BottomSheetContext';
import { DeleteGalerieBlackListModalContext } from '#contexts/DeleteGalerieBlackListModalContext';

import ReportProfilePictureButton from './ReportProfilePictureButton';
import UnBlackListsButton from './UnBlackListsButton';

type Props = {
    galerieBlackList: Store.Models.GalerieBlackList;
    user: Store.Models.User;
};

const GalerieBlackListOptions = ({ galerieBlackList, user }: Props) => {
    const { openBottomSheet } = React.useContext(BottomSheetContext);
    const { handleCloseModal, openModal } = React.useContext(
        DeleteGalerieBlackListModalContext
    );

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

export default React.memo(GalerieBlackListOptions);
