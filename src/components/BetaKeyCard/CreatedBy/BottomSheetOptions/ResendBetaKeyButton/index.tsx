import * as React from 'react';
import { useDispatch, useSelector } from 'react-redux';

import BottomSheetButton from '#components/BottomSheetButton';
import { BottomSheetContext } from '#contexts/BottomSheetContext';
import { selectSendBetaKeyStatus, sendBetaKey } from '#store/sendBetaKey';

type Props = {
    betaKey: Store.Models.BetaKeys;
};

const ResendBetaKeyButton = ({ betaKey }: Props) => {
    const dispatch = useDispatch();

    const { closeBottomSheet } = React.useContext(BottomSheetContext);

    const statusSelector = React.useMemo(
        () => selectSendBetaKeyStatus(betaKey.id),
        [betaKey]
    );
    const status = useSelector(statusSelector);

    const handlePress = React.useCallback(() => {
        if (status && status.includes('LOADING')) return;
        dispatch(sendBetaKey(betaKey.id));
        closeBottomSheet();
    }, [betaKey, status]);

    if (!betaKey.email) return null;
    if (betaKey.userId) return null;

    return (
        <BottomSheetButton onPress={handlePress} title="reset this beta key" />
    );
};

export default ResendBetaKeyButton;
