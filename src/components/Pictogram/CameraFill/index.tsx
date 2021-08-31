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

const CameraFill = ({
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
                d="M10.9999 15.455C12.701 15.455 14.0799 14.076 14.0799 12.375C14.0799 10.6739 12.701 9.29498 10.9999 9.29498C9.29888 9.29498 7.91992 10.6739 7.91992 12.375C7.91992 14.076 9.29888 15.455 10.9999 15.455Z"
                fill={theme.colors[color]}
            />
            <Path
                d="M20.0365 2.75H15.565V1.6885C15.565 0.7535 14.8115 0 13.8765 0H8.5635C7.6285 0 6.875 0.7535 6.875 1.6885V2.75H1.9635C0.88 2.75 0 3.63 0 4.7135V20.0365C0 21.12 0.88 22 1.9635 22H20.0365C21.12 22 22 21.12 22 20.0365V4.7135C22 3.63 21.12 2.75 20.0365 2.75ZM11 17.765C8.03 17.765 5.61 15.345 5.61 12.375C5.61 9.405 8.03 6.985 11 6.985C13.97 6.985 16.39 9.405 16.39 12.375C16.39 15.345 13.97 17.765 11 17.765Z"
                fill={theme.colors[color]}
            />
        </Svg>
    );
};

export default CameraFill;
