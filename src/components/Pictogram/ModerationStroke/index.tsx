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
    large: 36,
    normal: 18,
    small: 12,
};

const ModerationStroke = ({
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
        <Svg fill="none" height={height} viewBox="0 0 18 22" width={width}>
            <Path
                d="M9 2.4585L15.6738 4.906V13.7555C15.6738 15.2185 14.8985 16.5385 13.7077 17.1215L9 19.4205L4.29231 17.1215C3.10154 16.5385 2.32615 15.2185 2.32615 13.7555V4.906L9 2.4585ZM9 0L0 3.3V13.7555C0 16.0985 1.27938 18.2215 3.26769 19.195L9 22L14.7323 19.195C16.7206 18.2215 18 16.0985 18 13.7555V3.3L9 0Z"
                fill={theme.colors[color]}
            />
            <Path
                d="M12.7716 13.9205L9.00547 14.146C8.98331 14.146 8.9667 14.146 8.94454 14.146L5.17839 13.9205C4.99008 13.9095 4.84054 13.794 4.82393 13.6565L4.36424 9.3225C4.33654 9.075 4.71316 8.921 4.97901 9.064L6.24731 9.757C6.42454 9.8505 6.66824 9.823 6.79562 9.691L8.65654 7.711C8.81162 7.546 9.13839 7.546 9.29347 7.711L11.1101 9.6855C11.2319 9.8175 11.4812 9.8505 11.6529 9.757L12.9821 9.0475C13.2479 8.9045 13.619 9.0585 13.5913 9.306L13.1316 13.651C13.1095 13.794 12.9599 13.9095 12.7716 13.9205Z"
                fill={theme.colors[color]}
            />
        </Svg>
    );
};

export default ModerationStroke;
