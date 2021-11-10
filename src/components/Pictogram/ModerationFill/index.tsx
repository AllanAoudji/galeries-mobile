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

const ModerationFill = ({
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
                d="M9 0L0 3.3V13.7555C0 16.0985 1.27385 18.2215 3.26769 19.195L9 22L14.7323 19.195C16.7206 18.2215 18 16.0985 18 13.7555V3.3L9 0ZM13.5858 9.3115L13.1262 13.6565C13.1095 13.7995 12.96 13.9095 12.7717 13.9205L9.00554 14.146C8.98339 14.146 8.96123 14.146 8.94462 14.146L5.17846 13.9205C4.99015 13.9095 4.84062 13.794 4.824 13.6565L4.36431 9.3225C4.33662 9.075 4.71323 8.921 4.97908 9.064L6.24738 9.757C6.42462 9.8505 6.66831 9.823 6.79569 9.691L8.65662 7.711C8.81169 7.546 9.13846 7.546 9.29354 7.711L11.1102 9.6855C11.232 9.8175 11.4812 9.8505 11.6529 9.757L12.9822 9.0475C13.2425 8.91 13.6135 9.0695 13.5858 9.3115Z"
                fill={theme.colors[color]}
            />
        </Svg>
    );
};

export default React.memo(ModerationFill);
