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

const Upload = ({ color = 'black', customSize, size = 'normal' }: Props) => {
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
                d="M0 9.71377L10.329 0.259859C10.7085 -0.0866196 11.286 -0.0866196 11.6655 0.259859L22 9.71377H14.3V15.3234C14.3 16.0824 13.684 16.6983 12.925 16.6983H9.075C8.316 16.6983 7.7 16.0824 7.7 15.3234V9.71377H0Z"
                fill={theme.colors[color]}
            />
            <Path
                d="M18.2875 22H3.7125C2.7995 22 2.0625 21.263 2.0625 20.3501C2.0625 19.4372 2.7995 18.7002 3.7125 18.7002H18.2875C19.2005 18.7002 19.9375 19.4372 19.9375 20.3501C19.9375 21.263 19.2005 22 18.2875 22Z"
                fill={theme.colors[color]}
            />
        </Svg>
    );
};

export default Upload;
