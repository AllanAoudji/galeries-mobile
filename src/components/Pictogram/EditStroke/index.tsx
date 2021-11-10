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

const defaultHeight = {
    large: 44,
    normal: 22,
    small: 15,
};
const defaultWidth = {
    large: 44,
    normal: 22,
    small: 15,
};

const EditStroke = ({
    color = 'black',
    customSize,
    size = 'normal',
}: Props) => {
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
        <Svg fill="none" height={height} viewBox="0 0 22 22" width={width}>
            <Path
                d="M21.5943 4.80847L20.5162 5.8864L16.116 1.48669L17.194 0.408759C17.7331 -0.130206 18.5966 -0.135709 19.1246 0.392257L21.6053 2.8726C22.1388 3.40606 22.1278 4.26951 21.5943 4.80847Z"
                fill={theme.colors[color]}
            />
            <Path
                d="M14.8454 6.00188L16.0005 7.15681L4.48277 18.6731L3.00318 18.9975L3.3277 17.5181L14.8454 6.00188ZM14.8454 2.76259L1.23207 16.3742L0 22.0003L5.62684 20.7684L19.2402 7.15681L14.8454 2.76259Z"
                fill={theme.colors[color]}
            />
        </Svg>
    );
};

export default React.memo(EditStroke);
