import * as React from 'react';
import { Defs, LinearGradient, Path, Stop, Svg } from 'react-native-svg';

type Props = {
    size?: Style.Variant.Logo;
};

const height = {
    large: 155,
    largest: 155,
    normal: 100,
    small: 40,
    smallest: 40,
};
const width = {
    large: 135,
    largest: 135,
    normal: 88,
    small: 35,
    smallest: 35,
};

const LogotypeFill = ({ size = 'normal' }: Props) => (
    <Svg
        fill="none"
        height={height[size]}
        viewBox="0 0 88 100"
        width={width[size]}
    >
        <Path
            d="M0.124055 35.9547C-1.65498 57.6367 15.913 76.6501 39.1517 78.5404C43.1545 78.8739 47.1574 78.6516 50.9378 77.9844L56.9421 2.59772C53.2728 1.26344 49.4923 0.485112 45.4895 0.151542C22.1396 -1.73868 1.90309 14.2726 0.124055 35.9547Z"
            fill="url(#paint0_linear)"
        />
        <Path
            d="M63.2799 44.6274L58.8323 100L82.4045 98.4433L87.0745 39.5127L63.2799 44.6274Z"
            fill="url(#paint1_linear)"
        />
        <Defs>
            <LinearGradient
                gradientUnits="userSpaceOnUse"
                id="paint0_linear"
                x1="13.6054"
                x2="62.7793"
                y1="10.0908"
                y2="67.837"
            >
                <Stop stopColor="#23F2FF" />
                <Stop offset="0.1463" stopColor="#2AE9FF" />
                <Stop offset="0.3897" stopColor="#3CCFFF" />
                <Stop offset="0.6979" stopColor="#5AA6FF" />
                <Stop offset="0.9944" stopColor="#7B78FF" />
            </LinearGradient>
            <LinearGradient
                gradientUnits="userSpaceOnUse"
                id="paint1_linear"
                x1="56.4988"
                x2="91.056"
                y1="50.43"
                y2="91.0114"
            >
                <Stop stopColor="#23F2FF" />
                <Stop offset="0.1463" stopColor="#2AE9FF" />
                <Stop offset="0.3897" stopColor="#3CCFFF" />
                <Stop offset="0.6979" stopColor="#5AA6FF" />
                <Stop offset="0.9944" stopColor="#7B78FF" />
            </LinearGradient>
        </Defs>
    </Svg>
);

export default LogotypeFill;
