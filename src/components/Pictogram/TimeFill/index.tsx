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

const TimeFill = ({ color = 'black', customSize, size = 'normal' }: Props) => {
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
                d="M11 0C4.9225 0 0 4.9225 0 11C0 17.0775 4.9225 22 11 22C17.0775 22 22 17.0775 22 11C22 4.9225 17.0775 0 11 0ZM16.2415 14.564C16.0435 14.9765 15.554 15.147 15.1415 14.9545L9.46 12.2375V5.94C9.46 5.7145 9.5535 5.5055 9.702 5.357C9.8505 5.2085 10.0595 5.115 10.285 5.115C10.7415 5.115 11.11 5.4835 11.11 5.94V11.1925L15.851 13.4585C16.148 13.6015 16.3185 13.893 16.3185 14.201C16.3185 14.3275 16.2965 14.4485 16.2415 14.564Z"
                fill={theme.colors[color]}
            />
        </Svg>
    );
};

export default TimeFill;
