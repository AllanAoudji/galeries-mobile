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
            width={width[size]}
            height={height[size]}
            viewBox="0 0 25 22"
            fill="none"
        >
            <Path
                d="M25 11.0018C25 11.3318 24.8667 11.6342 24.6612 11.8542C24.4501 12.0742 24.1557 12.2062 23.8336 12.2062H4.28238L11.3142 19.9775C11.5252 20.2084 11.6307 20.5054 11.6307 20.7969C11.6307 21.1159 11.5086 21.4404 11.2586 21.6769C10.7865 22.1279 10.0478 22.1059 9.60898 21.6164L0 11.0018L9.60342 0.381638C10.0422 -0.102345 10.7809 -0.129844 11.2531 0.32114C11.4974 0.557632 11.6252 0.88212 11.6252 1.20111C11.6252 1.4981 11.5197 1.78959 11.3086 2.02058L4.28238 9.79731H23.8336C24.4779 9.79731 25 10.3363 25 11.0018Z"
                fill={theme.colors[color]}
            />
        </Svg>
    );
};

export default ArrowLeft;
