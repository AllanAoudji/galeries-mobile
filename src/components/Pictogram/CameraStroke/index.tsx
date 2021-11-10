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

const CameraStroke = ({
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
                d="M13.255 2.31V2.75V5.06H15.565H19.69V19.69H2.31V5.06H6.875H9.185V2.75V2.31H13.255ZM13.8765 0H8.5635C7.6285 0 6.875 0.753497 6.875 1.6885V2.75H1.9635C0.88 2.75 0 3.63 0 4.7135V20.0365C0 21.12 0.88 22 1.9635 22H20.0365C21.12 22 22 21.12 22 20.0365V4.7135C22 3.63 21.12 2.75 20.0365 2.75H15.565V1.6885C15.565 0.753497 14.8115 0 13.8765 0Z"
                fill={theme.colors[color]}
            />
            <Path
                d="M10.9999 17.765C8.02986 17.765 5.60986 15.345 5.60986 12.375C5.60986 9.40502 8.02986 6.98502 10.9999 6.98502C13.9699 6.98502 16.3899 9.40502 16.3899 12.375C16.3899 15.345 13.9699 17.765 10.9999 17.765ZM10.9999 9.29502C9.30036 9.29502 7.91986 10.6755 7.91986 12.375C7.91986 14.0745 9.30036 15.455 10.9999 15.455C12.6994 15.455 14.0799 14.0745 14.0799 12.375C14.0799 10.6755 12.6994 9.29502 10.9999 9.29502Z"
                fill={theme.colors[color]}
            />
        </Svg>
    );
};

export default React.memo(CameraStroke);
