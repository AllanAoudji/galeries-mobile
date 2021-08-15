import * as React from 'react';

import ArrowLeft from './ArrowLeft';
import ArrowRight from './ArrowRight';

type Props = {
    color?: keyof Style.Colors;
    size?: Style.Variant.Pictogram;
    variant: 'arrow-left' | 'arrow-right';
};

const variants = {
    'arrow-left': ArrowLeft,
    'arrow-right': ArrowRight,
};

const Pictograms = ({ color = 'black', size = 'normal', variant }: Props) => {
    const PictogramVariant = variants[variant];

    return <PictogramVariant color={color} size={size} />;
};

export default Pictograms;
