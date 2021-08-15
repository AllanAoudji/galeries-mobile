import * as React from 'react';
import { Svg, Path } from 'react-native-svg';
import { useTheme } from 'styled-components/native';

type Props = {
    color?: keyof Style.Colors;
    size?: Style.Variant.Pictogram;
};

const height = {
    large: 44,
    normal: 22,
    small: 15,
};
const width = {
    large: 49,
    normal: 25,
    small: 17,
};

const ArrowLeft = ({ color = 'black', size = 'normal' }: Props) => {
    const theme = useTheme();

    return (
        <Svg
            fill="none"
            height={height[size]}
            viewBox="0 0 25 22"
            width={width[size]}
        >
            <Path
                d="M0 11.0011C0 10.6711 0.133304 10.3686 0.338814 10.1486C0.549878 9.92864 0.844257 9.79664 1.16641 9.79664H20.7176L13.6859 2.02542C13.4748 1.79442 13.3693 1.49743 13.3693 1.20594C13.3693 0.886954 13.4914 0.562466 13.7414 0.325974C14.2135 -0.12501 14.9522 -0.103012 15.391 0.38647L25 11.0011L15.3966 21.6212C14.9578 22.1052 14.2191 22.1327 13.7469 21.6817C13.5026 21.4452 13.3748 21.1207 13.3748 20.8018C13.3748 20.5048 13.4803 20.2133 13.6914 19.9823L20.7176 12.2056H1.16641C0.522106 12.2056 0 11.6666 0 11.0011Z"
                fill={theme.colors[color]}
            />
        </Svg>
    );
};

export default ArrowLeft;
