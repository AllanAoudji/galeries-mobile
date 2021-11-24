import * as React from 'react';

import BottomSheetButton from '#components/BottomSheetButton';
import { BottomSheetContext } from '#contexts/BottomSheetContext';
import { DeleteBetaKeyModalContext } from '#contexts/DeleteBetaKeyModalContext';

type Props = {
    betaKey: Store.Models.BetaKeys;
    meId: string | null;
};

const DeleteBetaKeyButton = ({ betaKey, meId }: Props) => {
    const { closeBottomSheet } = React.useContext(BottomSheetContext);
    const { handleOpenModal } = React.useContext(DeleteBetaKeyModalContext);

    const handlePress = React.useCallback(() => {
        handleOpenModal(betaKey.id);
        closeBottomSheet();
    }, [betaKey]);

    if (!meId) return null;
    if (betaKey.createdById !== meId) return null;

    return (
        <BottomSheetButton
            onPress={handlePress}
            title="delete this beta key..."
        />
    );
};

export default DeleteBetaKeyButton;
