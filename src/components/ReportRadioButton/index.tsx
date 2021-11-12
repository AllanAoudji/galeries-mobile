import * as React from 'react';

import CustomRadio from '#components/CustomRadio';

type Props = {
    onPress: (reason: ReportReason) => void;
    reason: ReportReason;
    value: boolean;
};

const ReportRadioButton = ({ onPress, reason, value }: Props) => {
    const handlePress = React.useCallback(() => {
        onPress(reason);
    }, [onPress, reason]);

    return (
        <CustomRadio
            onChange={handlePress}
            label={reason}
            labelFontSize={18}
            labelMargin="smallest"
            mt="smallest"
            value={value}
        />
    );
};

export default React.memo(ReportRadioButton);
