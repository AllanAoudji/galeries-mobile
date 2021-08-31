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

const Download = ({ color = 'black', customSize, size = 'normal' }: Props) => {
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
                d="M22 6.985L11.671 16.4395C11.2915 16.786 10.714 16.786 10.3345 16.4395L0 6.985H7.7V1.375C7.7 0.616 8.316 0 9.075 0H12.925C13.684 0 14.3 0.616 14.3 1.375V6.985H22Z"
                fill={theme.colors[color]}
            />
            <Path
                d="M18.2875 22H3.7125C2.7995 22 2.0625 21.263 2.0625 20.35C2.0625 19.437 2.7995 18.7 3.7125 18.7H18.2875C19.2005 18.7 19.9375 19.437 19.9375 20.35C19.9375 21.263 19.2005 22 18.2875 22Z"
                fill={theme.colors[color]}
            />
        </Svg>
    );
};

export default Download;
