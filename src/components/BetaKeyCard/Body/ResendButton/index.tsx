import * as React from 'react';

import { useDispatch, useSelector } from 'react-redux';
import CustomButton from '#components/CustomButton';
import { selectSendBetaKeyStatus, sendBetaKey } from '#store/sendBetaKey';

type Props = {
    betaKey: Store.Models.BetaKeys;
};

const ResendButton = ({ betaKey }: Props) => {
    const dispatch = useDispatch();

    const statusSelector = React.useMemo(
        () => selectSendBetaKeyStatus(betaKey.id),
        [betaKey]
    );
    const status = useSelector(statusSelector);

    const handlePress = React.useCallback(() => {
        if (status && status.includes('LOADING')) return;
        dispatch(sendBetaKey(betaKey.id));
    }, [betaKey, status]);

    if (betaKey.userId) return null;
    if (!betaKey.email) return null;

    return (
        <CustomButton
            loading={(status || 'PENDING').includes('LOADING')}
            mr="normal"
            ml="normal"
            onPress={handlePress}
            small
            title="resend beta key"
        />
    );
};

export default React.memo(ResendButton);
