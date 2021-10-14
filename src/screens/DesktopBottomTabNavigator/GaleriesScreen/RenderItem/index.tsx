import * as React from 'react';
import { useSelector } from 'react-redux';

import { selectGalerie } from '#store/galeries';
import { GalerieCard } from '#components';

type Props = {
    item: string;
};

const RenderItem = ({ item }: Props) => {
    const galerieSelector = React.useMemo(() => selectGalerie(item), [item]);
    const galerie = useSelector(galerieSelector);

    return <GalerieCard galerie={galerie} />;
};

export default RenderItem;
