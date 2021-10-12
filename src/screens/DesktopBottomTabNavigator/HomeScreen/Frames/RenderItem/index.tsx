import * as React from 'react';

import { useSelector } from 'react-redux';
import { FrameCard } from '#components';
import { selectFrame } from '#store/frames';

type Props = {
    item: string;
};

const RenderItem = ({ item }: Props) => {
    const frameSelector = React.useMemo(() => selectFrame(item), [item]);
    const frame = useSelector(frameSelector);

    return <FrameCard frame={frame} showGalerie />;
};

export default React.memo(RenderItem);
