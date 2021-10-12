import * as React from 'react';
import { Defs, Svg, Path, LinearGradient, Stop } from 'react-native-svg';
import { useTheme } from 'styled-components/native';

const AddSubscribeStroke = () => {
    const theme = useTheme();

    return (
        <Svg fill="none" height="22" viewBox="0 0 33 44" width="17">
            <Path
                d="M32.0655 43.8357L16.5002 31.5705L0.935014 43.8357C0.594009 44.1877 0 43.9347 0 43.4507V1.65002C0 0.737011 0.737011 0 1.65003 0H31.3505C32.2635 0 33.0005 0.737011 33.0005 1.65002V43.4507C33.0005 43.9347 32.4065 44.1877 32.0655 43.8357Z"
                fill="url(#paint0_linear)"
            />
            <Defs>
                <LinearGradient
                    gradientUnits="userSpaceOnUse"
                    id="paint0_linear"
                    x1="0"
                    x2="41.2992"
                    y1="0"
                    y2="10.1142"
                >
                    <Stop stopColor={theme.colors.primary} />
                    <Stop offset="1" stopColor={theme.colors.tertiary} />
                </LinearGradient>
            </Defs>
        </Svg>
    );
};

export default React.memo(AddSubscribeStroke);
