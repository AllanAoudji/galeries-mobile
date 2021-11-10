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
    large: 11,
    normal: 6,
    small: 4,
};

const OptionVertical = ({
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
        <Svg fill="none" height={height} viewBox="0 0 6 22" width={width}>
            <Path
                d="M3 5.5C1.34315 5.5 0 4.26878 0 2.75C0 1.23122 1.34315 0 3 0C4.65685 0 6 1.23122 6 2.75C6 4.26878 4.65685 5.5 3 5.5Z"
                fill={theme.colors[color]}
            />
            <Path
                d="M3 22C1.34315 22 0 20.7688 0 19.25C0 17.7312 1.34315 16.5 3 16.5C4.65685 16.5 6 17.7312 6 19.25C6 20.7688 4.65685 22 3 22Z"
                fill={theme.colors[color]}
            />
            <Path
                d="M3 13.75C1.34315 13.75 0 12.5188 0 11C0 9.48122 1.34315 8.25 3 8.25C4.65685 8.25 6 9.48122 6 11C6 12.5188 4.65685 13.75 3 13.75Z"
                fill={theme.colors[color]}
            />
        </Svg>
    );
};

export default React.memo(OptionVertical);
