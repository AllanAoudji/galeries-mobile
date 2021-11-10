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
    large: 42,
    normal: 21,
    small: 14,
};

const HeartFill = ({ color = 'black', customSize, size = 'normal' }: Props) => {
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
        <Svg fill="none" height={height} viewBox="0 0 21 22" width={width}>
            <Path
                d="M19.4253 11.2035L19.2736 11.3905L10.4984 22L1.72868 11.3905L1.57691 11.2035C-0.813354 8.3215 -0.444787 4.015 2.40077 1.595C3.65824 0.5225 5.19213 0 6.71518 0C8.04311 0 9.37103 0.396 10.4984 1.177C11.6312 0.4015 12.9537 0 14.2817 0C15.8047 0 17.3386 0.5225 18.5961 1.595C21.4416 4.015 21.8156 8.3215 19.4253 11.2035Z"
                fill={theme.colors[color]}
            />
        </Svg>
    );
};

export default React.memo(HeartFill);
