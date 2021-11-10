import * as React from 'react';

import DeleteGalerieButton from './DeleteGalerieButton';
import UnsubscribeButton from './UnsubscribeButton';

type Props = {
    galerie: Store.Models.Galerie;
};

const RemoveButtons = ({ galerie }: Props) => {
    if (galerie.role === 'admin')
        return <DeleteGalerieButton galerie={galerie} />;
    return <UnsubscribeButton galerie={galerie} />;
};

export default React.memo(RemoveButtons);
