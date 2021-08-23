import * as React from 'react';

import LogotypeFill from './LogotypeFill';
import LogotypeStroke from './LogotypeStroke';
import LogotypeTextHorizontal from './LogotypeTextHorizontal';
import LogotypeTextVertical from './LogotypeTextVertical';
import Text from './Text';

type Props = {
    size?: Style.Variant.Logo;
    variant:
        | 'logotype-fill'
        | 'logotype-stroke'
        | 'logotype-text-horizontal'
        | 'logotype-text-vertical'
        | 'text';
};

const variants = {
    'logotype-fill': LogotypeFill,
    'logotype-stroke': LogotypeStroke,
    'logotype-text-horizontal': LogotypeTextHorizontal,
    'logotype-text-vertical': LogotypeTextVertical,
    text: Text,
};

const Logo = ({ size = 'normal', variant }: Props) => {
    const LogoVariant = React.useMemo(() => variants[variant], [variant]);

    return <LogoVariant size={size} />;
};

export default React.memo(Logo);
