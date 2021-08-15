import * as React from 'react';
import { Defs, LinearGradient, Path, Stop, Svg } from 'react-native-svg';

type Props = {
    size?: Style.Variant.Logo;
};

const height = {
    large: 57,
    largest: 75,
    normal: 45,
    small: 36,
    smallest: 22,
};
const width = {
    large: 390,
    largest: 507,
    normal: 300,
    small: 240,
    smallest: 150,
};

const Text = ({ size = 'normal' }: Props) => (
    <Svg
        fill="none"
        height={height[size]}
        viewBox="0 0 300 45"
        width={width[size]}
    >
        <Path
            d="M29.661 14.4767C29.5551 13.4174 29.5551 11.9344 28.4958 10.2394C26.8008 7.48521 23.517 7.06148 21.5042 7.06148C11.4407 7.06148 9.42797 16.4894 9.42797 22.8454C9.42797 25.7055 9.85169 30.6844 12.8178 33.9683C14.8305 36.2988 17.5847 37.5699 22.5636 37.5699C26.9068 37.5699 28.3898 37.0403 29.3432 36.7225V28.036H21.2924V21.1504H38.2415V41.8072C35.6992 42.6547 31.4619 44.1377 23.0932 44.1377C13.6653 44.1377 8.79237 41.8072 5.50847 38.6293C0.847454 34.0742 0 27.5064 0 23.1632C0 8.43861 9.2161 0.599609 21.7161 0.599609C27.0127 0.599609 32.5212 2.08265 35.8051 5.79028C38.5593 8.96825 38.7712 12.2522 38.7712 14.4767H29.661Z"
            fill="url(#paint0_linear)"
        />
        <Path
            d="M71.8222 1.65894L86.2289 43.1844H77.3306L74.3645 34.2861H57.945L54.873 43.1844H46.3984L61.3349 1.65894H71.8222ZM72.034 27.5064L66.3137 9.81573L60.1696 27.5064H72.034Z"
            fill="url(#paint1_linear)"
        />
        <Path
            d="M94.8093 1.76483H103.92V36.0869H121.716V43.1843H94.9153V1.76483H94.8093Z"
            fill="url(#paint2_linear)"
        />
        <Path
            d="M130.403 1.65894H158.157V8.43859H139.301V18.2903H156.992V25.07H139.301V36.2988H158.792V43.1844H130.403V1.65894Z"
            fill="url(#paint3_linear)"
        />
        <Path
            d="M168.114 1.65893H184.004C188.559 1.553 193.22 1.55301 196.61 4.51911C199.153 6.74369 200.212 9.81572 200.212 12.464C200.212 20.1971 193.538 21.9979 191.525 22.6335C197.775 23.1632 198.199 26.7649 198.941 32.1674C199.576 37.0403 199.894 39.053 200.212 40.2182C200.636 42.0191 201.059 42.5488 201.483 43.1844H191.631C191.208 40.8539 189.937 30.3666 189.407 28.7776C188.559 26.4471 186.441 26.4471 184.958 26.4471H177.119V43.1844H168.009V1.65893H168.114ZM176.907 19.8793H184.11C185.17 19.8793 187.182 19.8793 188.665 18.714C189.301 18.2903 190.996 16.8072 190.996 13.9471C190.996 11.0869 189.619 9.81572 188.771 9.28606C187.394 8.33267 185.699 8.33267 182.945 8.33267H176.907V19.8793Z"
            fill="url(#paint4_linear)"
        />
        <Path
            d="M209.746 1.55298H218.644V43.1844H209.746V1.55298Z"
            fill="url(#paint5_linear)"
        />
        <Path
            d="M229.979 1.65894H257.733V8.43859H238.877V18.2903H256.568V25.07H238.877V36.2988H258.369V43.1844H229.979V1.65894Z"
            fill="url(#paint6_linear)"
        />
        <Path
            d="M275.318 29.9428C275.318 31.8496 275.212 37.7818 282.839 37.7818C287.606 37.7818 290.678 35.4513 290.678 31.9555C290.678 28.2479 288.136 27.6123 282.839 26.3411C272.987 23.9047 267.585 20.9386 267.585 13.7352C267.585 6.95553 272.458 0.917419 284.004 0.917419C288.348 0.917419 293.432 1.87078 296.504 5.79027C298.835 8.75638 298.835 12.1462 298.835 13.5233H290.254C290.148 12.0403 289.725 7.16741 283.581 7.16741C279.449 7.16741 276.801 9.39198 276.801 12.7818C276.801 16.5954 279.873 17.3369 285.805 18.82C293.009 20.5149 300 22.5276 300 30.5784C300 37.9937 293.856 44.0318 282.309 44.0318C266.42 44.0318 266.314 33.8623 266.208 29.8369H275.318V29.9428Z"
            fill="url(#paint7_linear)"
        />
        <Defs>
            <LinearGradient
                id="paint0_linear"
                x1="5.61536"
                x2="305.251"
                y1="20.096"
                y2="61.3633"
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
                x1="6.29294"
                x2="305.929"
                y1="15.1772"
                y2="56.4444"
            >
                <Stop stopColor="#23F2FF" />
                <Stop offset="0.1463" stopColor="#2AE9FF" />
                <Stop offset="0.3897" stopColor="#3CCFFF" />
                <Stop offset="0.6979" stopColor="#5AA6FF" />
                <Stop offset="0.9944" stopColor="#7B78FF" />
            </LinearGradient>
            <LinearGradient
                gradientUnits="userSpaceOnUse"
                id="paint2_linear"
                x1="7.03902"
                x2="306.675"
                y1="9.7589"
                y2="51.0261"
            >
                <Stop stopColor="#23F2FF" />
                <Stop offset="0.1463" stopColor="#2AE9FF" />
                <Stop offset="0.3897" stopColor="#3CCFFF" />
                <Stop offset="0.6979" stopColor="#5AA6FF" />
                <Stop offset="0.9944" stopColor="#7B78FF" />
            </LinearGradient>
            <LinearGradient
                gradientUnits="userSpaceOnUse"
                id="paint3_linear"
                x1="7.88036"
                x2="307.516"
                y1="3.65163"
                y2="44.9188"
            >
                <Stop stopColor="#23F2FF" />
                <Stop offset="0.1463" stopColor="#2AE9FF" />
                <Stop offset="0.3897" stopColor="#3CCFFF" />
                <Stop offset="0.6979" stopColor="#5AA6FF" />
                <Stop offset="0.9944" stopColor="#7B78FF" />
            </LinearGradient>
            <LinearGradient
                gradientUnits="userSpaceOnUse"
                id="paint4_linear"
                x1="8.51354"
                x2="308.15"
                y1="-0.947853"
                y2="40.3194"
            >
                <Stop stopColor="#23F2FF" />
                <Stop offset="0.1463" stopColor="#2AE9FF" />
                <Stop offset="0.3897" stopColor="#3CCFFF" />
                <Stop offset="0.6979" stopColor="#5AA6FF" />
                <Stop offset="0.9944" stopColor="#7B78FF" />
            </LinearGradient>
            <LinearGradient
                gradientUnits="userSpaceOnUse"
                id="paint5_linear"
                x1="9.19024"
                x2="308.826"
                y1="-5.85942"
                y2="35.4078"
            >
                <Stop stopColor="#23F2FF" />
                <Stop offset="0.1463" stopColor="#2AE9FF" />
                <Stop offset="0.3897" stopColor="#3CCFFF" />
                <Stop offset="0.6979" stopColor="#5AA6FF" />
                <Stop offset="0.9944" stopColor="#7B78FF" />
            </LinearGradient>
            <LinearGradient
                gradientUnits="userSpaceOnUse"
                id="paint6_linear"
                x1="9.73383"
                x2="309.37"
                y1="-9.80801"
                y2="31.4592"
            >
                <Stop stopColor="#23F2FF" />
                <Stop offset="0.1463" stopColor="#2AE9FF" />
                <Stop offset="0.3897" stopColor="#3CCFFF" />
                <Stop offset="0.6979" stopColor="#5AA6FF" />
                <Stop offset="0.9944" stopColor="#7B78FF" />
            </LinearGradient>
            <LinearGradient
                gradientUnits="userSpaceOnUse"
                id="paint7_linear"
                x1="10.4412"
                x2="310.078"
                y1="-14.9455"
                y2="26.3219"
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

export default Text;
