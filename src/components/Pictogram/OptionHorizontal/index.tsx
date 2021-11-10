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
    large: 11,
    normal: 6,
    small: 4,
};
const defaultWidth = {
    large: 44,
    normal: 22,
    small: 15,
};

const OptionHorizontal = ({
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
        <Svg fill="none" height={height} viewBox="0 0 22 6" width={width}>
            <Path
                d="M19.25 6C17.7312 6 16.5 4.65685 16.5 3C16.5 1.34315 17.7312 0 19.25 0C20.7688 0 22 1.34315 22 3C22 4.65685 20.7688 6 19.25 6Z"
                fill={theme.colors[color]}
            />
            <Path
                d="M2.75 6C1.23122 6 0 4.65685 0 3C0 1.34315 1.23122 0 2.75 0C4.26878 0 5.5 1.34315 5.5 3C5.5 4.65685 4.26878 6 2.75 6Z"
                fill={theme.colors[color]}
            />
            <Path
                d="M11 6C9.48122 6 8.25 4.65685 8.25 3C8.25 1.34315 9.48122 0 11 0C12.5188 0 13.75 1.34315 13.75 3C13.75 4.65685 12.5188 6 11 6Z"
                fill={theme.colors[color]}
            />
        </Svg>
    );
};

export default React.memo(OptionHorizontal);
