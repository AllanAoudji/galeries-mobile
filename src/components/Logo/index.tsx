import * as React from 'react';

import LogotypeFill from './LogotypeFill';
import LogotypeStroke from './LogotypeStroke';
import LogotypeTextHorizontal from './LogotypeTextHorizontal';
import LogotypeTextVertical from './LogotypeTextVertical';
import Text from './Text';

import { Container, ContainerPressable } from './styles';

type Props = {
    mb?: keyof Style.Spacings;
    ml?: keyof Style.Spacings;
    mr?: keyof Style.Spacings;
    mt?: keyof Style.Spacings;
    onPress?: () => void;
    pb?: keyof Style.Spacings;
    pl?: keyof Style.Spacings;
    pr?: keyof Style.Spacings;
    pt?: keyof Style.Spacings;
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

const Logo = ({
    mb,
    ml,
    mr,
    mt,
    onPress,
    pb,
    pl,
    pr,
    pt,
    size = 'normal',
    variant,
}: Props) => {
    const LogoVariant = React.useMemo(() => variants[variant], [variant]);

    if (onPress)
        return (
            <ContainerPressable
                mb={mb}
                ml={ml}
                mr={mr}
                mt={mt}
                pb={pb}
                pl={pl}
                pr={pr}
                pt={pt}
                onPress={onPress}
            >
                <LogoVariant size={size} />
            </ContainerPressable>
        );

    return (
        <Container
            mb={mb}
            ml={ml}
            mr={mr}
            mt={mt}
            pb={pb}
            pl={pl}
            pr={pr}
            pt={pt}
        >
            <LogoVariant size={size} />
        </Container>
    );
};

export default React.memo(Logo);
