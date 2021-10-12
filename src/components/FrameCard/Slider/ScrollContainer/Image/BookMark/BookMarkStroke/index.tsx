import * as React from 'react';
import { Defs, Svg, Stop, Path, LinearGradient } from 'react-native-svg';
import { useTheme } from 'styled-components/native';

const AddSubscribeStroke = () => {
    const theme = useTheme();

    return (
        <Svg fill="none" height="22" viewBox="0 0 33 44" width="17">
            <Path
                d="M28.38 4.62V35.057L19.36 27.951L16.5 25.696L13.64 27.951L4.62 35.057V4.62H28.38ZM31.35 0H1.65C0.737 0 0 0.737 0 1.65V43.45C0 43.78 0.275 44 0.55 44C0.682 44 0.825 43.945 0.935 43.835L16.5 31.57L32.065 43.835C32.175 43.945 32.318 44 32.45 44C32.736 44 33 43.78 33 43.45V1.65C33 0.737 32.263 0 31.35 0Z"
                fill="url(#paint0_linear)"
            />
            <Defs>
                <LinearGradient
                    gradientUnits="userSpaceOnUse"
                    id="paint0_linear"
                    x1="0"
                    x2="41.2986"
                    y1="0"
                    y2="10.1139"
                >
                    <Stop stopColor={theme.colors.primary} />
                    <Stop offset="1" stopColor={theme.colors.tertiary} />
                </LinearGradient>
            </Defs>
        </Svg>
    );
};

export default AddSubscribeStroke;
