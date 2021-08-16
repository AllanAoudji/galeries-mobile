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

const HeartStroke = ({
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
        <Svg fill="none" height={height} viewBox="0 0 21 22" width={width}>
            <Path
                d="M14.2834 2.31C15.3241 2.31 16.3378 2.684 17.1346 3.366L17.1779 3.4045C19.0154 5.0105 19.2485 7.832 17.682 9.724L17.5302 9.911L10.5 18.414L3.46967 9.9055L3.3179 9.7185C2.55362 8.7945 2.19045 7.6285 2.29344 6.424C2.39643 5.225 2.95473 4.136 3.86536 3.3605C4.66216 2.6785 5.67578 2.3045 6.7165 2.3045C7.61629 2.3045 8.48356 2.574 9.22074 3.08L10.5 3.9655L11.7792 3.08C12.5218 2.5795 13.3836 2.31 14.2834 2.31ZM14.2834 0C12.9554 0 11.6328 0.396001 10.5 1.177C9.37251 0.396001 8.04451 0 6.7165 0C5.19336 0 3.65938 0.5225 2.40185 1.595C-0.443876 4.015 -0.812465 8.316 1.57252 11.2035L1.72429 11.3905L10.5 22L19.2756 11.3905L19.4274 11.2035C21.8124 8.316 21.4438 4.015 18.5981 1.595C17.3405 0.5225 15.8066 0 14.2834 0Z"
                fill={theme.colors[color]}
            />
        </Svg>
    );
};

export default HeartStroke;
