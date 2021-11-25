import * as React from 'react';
import { useSelector } from 'react-redux';

import { BetaKeyCard } from '#components';
import { selectBetaKey } from '#store/betaKeys';

type Props = {
    item: string;
};

const RenderItem = ({ item }: Props) => {
    const betaKeySelector = React.useMemo(() => selectBetaKey(item), [item]);
    const betaKey = useSelector(betaKeySelector);

    return <BetaKeyCard betaKey={betaKey} />;
};

export default React.memo(RenderItem);
