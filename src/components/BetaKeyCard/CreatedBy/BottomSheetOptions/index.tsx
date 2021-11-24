import { useFocusEffect } from '@react-navigation/native';
import * as React from 'react';
import { BackHandler } from 'react-native';

import { useSelector } from 'react-redux';
import Pictogram from '#components/Pictogram';
import { BottomSheetContext } from '#contexts/BottomSheetContext';
import { DeleteBetaKeyModalContext } from '#contexts/DeleteBetaKeyModalContext';
import { selectMeId } from '#store/me';

import DeleteBetaKeyButton from './DeleteBetaKeyButton';
import ResendBetaKeyButton from './ResendBetaKeyButton';

type Props = {
    betaKey: Store.Models.BetaKeys;
};

const BottomSheetOptions = ({ betaKey }: Props) => {
    const { openBottomSheet } = React.useContext(BottomSheetContext);
    const { handleCloseModal, openModal } = React.useContext(
        DeleteBetaKeyModalContext
    );

    const meId = useSelector(selectMeId);

    const bottomSheetContent = React.useCallback(() => {
        return (
            <>
                <DeleteBetaKeyButton meId={meId} betaKey={betaKey} />
                <ResendBetaKeyButton betaKey={betaKey} />
            </>
        );
    }, [betaKey, Pictogram]);

    const handlePress = React.useCallback(() => {
        openBottomSheet(bottomSheetContent);
    }, [bottomSheetContent, openBottomSheet]);

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

    if (
        (!meId || meId !== betaKey.createdById) &&
        (!betaKey.email || betaKey.userId)
    )
        return null;

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
