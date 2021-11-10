import { useFocusEffect } from '@react-navigation/native';
import * as React from 'react';
import { BackHandler } from 'react-native';

import Pictogram from '#components/Pictogram';
import { BottomSheetContext } from '#contexts/BottomSheetContext';
import { DeleteInvitationModalContext } from '#contexts/DeleteInvitationModalContext';

import DeleteInvitationButton from './DeleteInvitationButton';
import ShowQRCodeButton from './ShowQRCodeButton';

type Props = {
    invitation: Store.Models.Invitation;
};

const BottomSheetOptions = ({ invitation }: Props) => {
    const { openBottomSheet } = React.useContext(BottomSheetContext);
    const { handleCloseModal, openModal } = React.useContext(
        DeleteInvitationModalContext
    );

    const bottomSheetContent = React.useCallback(() => {
        return (
            <>
                <ShowQRCodeButton invitation={invitation} />
                <DeleteInvitationButton invitation={invitation} />
            </>
        );
    }, [invitation]);

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
            pl="smallest"
            pr="smallest"
            size="small"
            variant="option-vertical"
        />
    );
};

export default BottomSheetOptions;
