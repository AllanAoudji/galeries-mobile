import * as React from 'react';
import { Defs, LinearGradient, Path, Stop, Svg } from 'react-native-svg';

type Props = {
    size?: Variant.Logo;
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

const LogotypeStroke = ({ size = 'normal' }: Props) => (
    <Svg
        width={width[size]}
        height={height[size]}
        viewBox="0 0 88 100"
        fill="none"
    >
        <Path
            d="M41.6795 10.3333C42.5684 10.3333 43.5684 10.3333 44.5684 10.4444C45.0129 10.4444 45.3462 10.5556 45.7906 10.5556L41.124 68.1111C40.6795 68.1111 40.2351 68.1111 39.9017 68C22.3462 66.5556 9.12395 52.5556 10.4573 36.6667C11.5684 22 25.3462 10.3333 41.6795 10.3333ZM41.6795 0C20.0128 0 1.67952 15.4444 0.123967 36C-1.65381 57.6667 15.9018 76.6667 39.124 78.5556C40.3462 78.6667 41.5684 78.6667 42.7906 78.6667C45.5684 78.6667 48.2351 78.4444 50.9017 77.8889L56.9018 2.55556C53.2351 1.22222 49.4573 0.444444 45.4573 0.111111C44.124 -1.07619e-07 42.9017 0 41.6795 0Z"
            fill="url(#paint0_linear)"
        />
        <Path
            d="M76.7906 51.2222L73.6794 89.6667L68.7906 90L71.7906 52.2222L76.7906 51.2222ZM86.9017 39.5555L63.1239 44.6667L58.6794 100L82.235 98.4444L86.9017 39.5555Z"
            fill="url(#paint1_linear)"
        />
        <Defs>
            <LinearGradient
                gradientUnits="userSpaceOnUse"
                id="paint0_linear"
                x1="13.4992"
                x2="62.6387"
                y1="10.1132"
                y2="67.819"
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
                x1="56.3626"
                x2="90.8953"
                y1="50.4244"
                y2="90.977"
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

export default LogotypeStroke;
