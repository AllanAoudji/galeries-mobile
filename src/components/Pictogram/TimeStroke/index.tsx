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

const TimeStroke = ({
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
                d="M11 2.31C13.321 2.31 15.5045 3.212 17.1435 4.8565C18.7825 6.4955 19.69 8.679 19.69 11C19.69 13.321 18.788 15.5045 17.1435 17.1435C15.5045 18.7825 13.321 19.69 11 19.69C8.679 19.69 6.4955 18.788 4.8565 17.1435C3.2175 15.5045 2.31 13.321 2.31 11C2.31 8.679 3.212 6.4955 4.8565 4.8565C6.4955 3.2175 8.679 2.31 11 2.31ZM11 0C4.9225 0 0 4.9225 0 11C0 17.0775 4.9225 22 11 22C17.0775 22 22 17.0775 22 11C22 4.9225 17.0775 0 11 0Z"
                fill={theme.colors[color]}
            />
            <Path
                d="M9.45996 5.94005V12.2321L15.136 14.9491C15.5485 15.1471 16.038 14.9711 16.236 14.5586C16.291 14.4431 16.3185 14.3221 16.3185 14.2011C16.3185 13.8931 16.148 13.5961 15.851 13.4586L11.11 11.1926V5.94005C11.11 5.48355 10.7415 5.11505 10.285 5.11505C10.0595 5.11505 9.85046 5.20855 9.70196 5.35705C9.55346 5.51105 9.45996 5.71455 9.45996 5.94005Z"
                fill={theme.colors[color]}
            />
        </Svg>
    );
};

export default TimeStroke;
