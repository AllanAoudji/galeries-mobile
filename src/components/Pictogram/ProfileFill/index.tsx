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

const ProfileFill = ({
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
                d="M11 0C4.9225 0 0 4.9225 0 11C0 14.3055 1.4575 17.27 3.762 19.283C5.698 20.977 8.228 22 11 22C13.772 22 16.302 20.977 18.238 19.283C20.5425 17.27 22 14.3055 22 11C22 4.9225 17.0775 0 11 0ZM11 5.753C12.606 5.753 13.904 7.051 13.904 8.657C13.904 10.263 12.606 11.561 11 11.561C9.394 11.561 8.096 10.263 8.096 8.657C8.096 7.051 9.394 5.753 11 5.753ZM16.7145 17.545C15.1305 18.9255 13.101 19.69 11 19.69C8.899 19.69 6.864 18.9255 5.2855 17.545C5.192 17.4625 5.0985 17.38 5.0105 17.292C6.567 15.301 8.679 14.08 11 14.08C13.321 14.08 15.433 15.301 16.9895 17.292C16.9015 17.38 16.808 17.4625 16.7145 17.545Z"
                fill={theme.colors[color]}
            />
        </Svg>
    );
};

export default React.memo(ProfileFill);
