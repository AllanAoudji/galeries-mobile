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

const Quit = ({ color = 'black', customSize, size = 'normal' }: Props) => {
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
        <Svg fill="none" height={height} viewBox="0 0 23 23" width={width}>
            <Path
                d="M12.8694 11.0055L21.6177 2.25718C22.1346 1.74031 22.1346 0.910017 21.6177 0.393146C21.1008 -0.123725 20.2705 -0.123725 19.7537 0.393146L11.0054 9.14146L2.25706 0.393146C1.74569 -0.118226 0.909895 -0.118226 0.393024 0.393146C-0.123847 0.910017 -0.123847 1.74031 0.393024 2.25718L9.14133 11.0055L0.393024 19.7538C-0.123847 20.2707 -0.123847 21.101 0.393024 21.6178C0.909895 22.1347 1.74019 22.1347 2.25706 21.6178L11.0054 12.8695L19.7537 21.6178C20.2705 22.1347 21.1008 22.1347 21.6177 21.6178C22.1346 21.101 22.1346 20.2707 21.6177 19.7538L12.8694 11.0055Z"
                fill={theme.colors[color]}
            />
        </Svg>
    );
};

export default React.memo(Quit);
