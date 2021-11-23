import * as React from 'react';
import { CustomButton } from '#components';

type Props = {
    betaKey: Store.Models.BetaKeys;
};

const ResendButton = ({ betaKey }: Props) => {
    if (betaKey.userId) return null;
    if (!betaKey.email) return null;

    return <CustomButton variant="stroke" small title="resend beta key" />;
};

export default ResendButton;
