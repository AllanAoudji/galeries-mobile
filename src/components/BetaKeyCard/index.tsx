import * as React from 'react';

import Typography from '#components/Typography';

type Props = {
    betaKey?: Store.Models.BetaKeys;
};

const BetaKeyCard = ({ betaKey }: Props) => {
    if (!betaKey) return null;

    return <Typography>{betaKey.code}</Typography>;
};

export default React.memo(BetaKeyCard);
