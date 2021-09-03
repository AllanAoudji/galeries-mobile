import * as React from 'react';
import { Svg, Path } from 'react-native-svg';
import { useTheme } from 'styled-components/native';

type Props = {
    color?: keyof Style.Colors;
    customSize?: {
        height: number;
        width: number;
    };
    size?: Style.Variant.Pictogram;
};

const defaultWidth = {
    large: 23,
    normal: 12,
    small: 8,
};
const defaultHeight = {
    large: 44,
    normal: 22,
    small: 15,
};

const FlashOn = ({ color = 'black', customSize, size = 'normal' }: Props) => {
    const theme = useTheme();
    const height = React.useMemo(() => {
        if (customSize) return customSize.height;
        return defaultHeight[size];
    }, [customSize, size]);
    const width = React.useMemo(() => {
        if (customSize) return customSize.width;
        return defaultWidth[size];
    }, [customSize, size]);

    return (
        <Svg fill="none" height={height} viewBox="0 0 12 22" width={width}>
            <Path
                d="M11.1243 9.61676H8.09929L9.30378 0.602326C9.36978 0.0468299 8.64929 -0.228168 8.33029 0.233829L0.536848 11.5417C0.28935 11.8992 0.547848 12.3832 0.976845 12.3832H4.00182L2.79733 21.3977C2.73133 21.9532 3.45183 22.2282 3.77082 21.7662L11.5643 10.4583C11.8118 10.1008 11.5533 9.61676 11.1243 9.61676Z"
                fill={theme.colors[color]}
            />
        </Svg>
    );
};

export default FlashOn;
