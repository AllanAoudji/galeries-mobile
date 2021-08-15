import * as React from 'react';
import { Defs, LinearGradient, Path, Stop, Svg } from 'react-native-svg';

type Props = {
    size?: Style.Variant.Logo;
};

const height = {
    large: 182,
    largest: 236,
    normal: 140,
    small: 112,
    smallest: 70,
};
const width = {
    large: 390,
    largest: 507,
    normal: 300,
    small: 240,
    smallest: 150,
};

const LogotypeTextVertical = ({ size = 'normal' }: Props) => (
    <Svg
        fill="none"
        height={height[size]}
        viewBox="0 0 300 140"
        width={width[size]}
    >
        <Path
            d="M29.5803 110.114C29.5803 109.115 29.3804 107.516 28.3811 105.916C26.5823 103.118 23.3844 102.718 21.3857 102.718C11.1925 102.718 9.19387 112.113 9.19387 118.51C9.19387 121.309 9.5936 126.307 12.5916 129.705C14.5903 131.904 17.3884 133.303 22.3851 133.303C26.7821 133.303 28.1812 132.703 29.1805 132.504V123.708H21.1859V116.711H38.1745V137.501C35.5763 138.301 31.3791 139.7 22.9847 139.7C13.5909 139.7 8.59427 137.501 5.3964 134.103C0.799467 129.705 0 123.108 0 118.71C0 104.117 9.19387 96.1212 21.7855 96.1212C27.1819 96.1212 32.5783 97.5205 35.976 101.319C38.7741 104.517 38.974 107.716 38.974 109.915H29.5803V110.114Z"
            fill="url(#paint0_linear)"
        />
        <Path
            d="M71.752 97.3206L86.1424 138.7H77.1484L74.1504 129.705H57.7613L54.7633 138.7H46.3689L61.3589 97.3206H71.752ZM71.9518 123.108L66.1557 105.517L59.9598 123.108H71.9518Z"
            fill="url(#paint1_linear)"
        />
        <Path
            d="M94.7368 97.5205H103.731V131.904H121.519V138.9H94.7368V97.5205Z"
            fill="url(#paint2_linear)"
        />
        <Path
            d="M130.313 97.3206H158.094V104.117H139.307V113.913H156.895V120.709H139.307V131.904H158.894V138.7H130.313V97.3206Z"
            fill="url(#paint3_linear)"
        />
        <Path
            d="M167.888 97.3206H183.877C188.474 97.3206 193.071 97.3206 196.469 100.119C199.067 102.318 200.066 105.317 200.066 108.115C200.066 115.912 193.471 117.711 191.472 118.31C197.668 118.91 198.268 122.508 198.867 127.906C199.467 132.703 199.867 134.702 200.066 135.902C200.466 137.701 200.866 138.101 201.266 138.9H191.472C191.072 136.701 189.873 126.107 189.274 124.507C188.474 122.109 186.276 122.109 184.877 122.109H177.082V138.9H167.888V97.3206ZM176.682 115.512H183.877C184.877 115.512 186.875 115.512 188.474 114.312C189.074 113.913 190.673 112.513 190.673 109.515C190.673 106.716 189.274 105.317 188.474 104.917C187.075 103.917 185.476 103.917 182.678 103.917H176.682V115.512Z"
            fill="url(#paint4_linear)"
        />
        <Path
            d="M209.66 97.3206H218.454V138.9H209.66V97.3206Z"
            fill="url(#paint5_linear)"
        />
        <Path
            d="M229.847 97.3206H257.628V104.117H238.841V113.913H256.429V120.709H238.841V131.904H258.428V138.7H229.847V97.3206Z"
            fill="url(#paint6_linear)"
        />
        <Path
            d="M275.216 125.707C275.216 127.706 275.017 133.503 282.811 133.503C287.608 133.503 290.606 131.304 290.606 127.706C290.606 124.108 288.008 123.308 282.811 122.109C273.018 119.71 267.622 116.711 267.622 109.515C267.622 102.718 272.418 96.7209 284.011 96.7209C288.408 96.7209 293.404 97.7204 296.602 101.519C299.001 104.517 299.001 107.915 299.001 109.115H290.406C290.207 107.716 289.807 102.718 283.611 102.718C279.414 102.718 276.815 104.917 276.815 108.315C276.815 112.113 279.813 112.913 285.809 114.312C293.005 116.111 300 117.911 300 126.107C300 133.503 293.804 139.5 282.412 139.5C266.622 139.5 266.422 129.305 266.422 125.307H275.216V125.707Z"
            fill="url(#paint7_linear)"
        />
        <Path
            d="M131.313 23.7564C130.113 37.5497 141.306 49.7438 156.296 50.9432C158.894 51.1431 161.492 50.9432 163.891 50.5434L167.688 2.36686C165.29 1.56725 162.891 0.967538 160.293 0.767636C145.303 -0.231878 132.312 9.96316 131.313 23.7564Z"
            fill="url(#paint8_linear)"
        />
        <Path
            d="M171.686 29.3537L168.688 64.7365L183.877 63.737L186.875 26.1553L171.686 29.3537Z"
            fill="url(#paint9_linear)"
        />
        <Defs>
            <LinearGradient
                gradientUnits="userSpaceOnUse"
                id="paint0_linear"
                x1="-39.1091"
                x2="262.708"
                y1="90.6745"
                y2="227.567"
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
                x1="-32.7054"
                x2="269.112"
                y1="76.5551"
                y2="213.447"
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
                x1="-25.8468"
                x2="275.97"
                y1="61.4181"
                y2="198.311"
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
                x1="-18.1569"
                x2="283.661"
                y1="44.4789"
                y2="181.371"
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
                x1="-12.1158"
                x2="289.701"
                y1="31.16"
                y2="168.052"
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
                x1="-6.2003"
                x2="295.617"
                y1="18.1176"
                y2="155.01"
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
                x1="-1.16686"
                x2="300.651"
                y1="7.01953"
                y2="143.912"
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
                x1="5.41059"
                x2="307.228"
                y1="-7.48219"
                y2="129.41"
            >
                <Stop stopColor="#23F2FF" />
                <Stop offset="0.1463" stopColor="#2AE9FF" />
                <Stop offset="0.3897" stopColor="#3CCFFF" />
                <Stop offset="0.6979" stopColor="#5AA6FF" />
                <Stop offset="0.9944" stopColor="#7B78FF" />
            </LinearGradient>
            <LinearGradient
                gradientUnits="userSpaceOnUse"
                id="paint8_linear"
                x1="18.8743"
                x2="320.692"
                y1="-37.2243"
                y2="99.6682"
            >
                <Stop stopColor="#23F2FF" />
                <Stop offset="0.1463" stopColor="#2AE9FF" />
                <Stop offset="0.3897" stopColor="#3CCFFF" />
                <Stop offset="0.6979" stopColor="#5AA6FF" />
                <Stop offset="0.9944" stopColor="#7B78FF" />
            </LinearGradient>
            <LinearGradient
                gradientUnits="userSpaceOnUse"
                id="paint9_linear"
                x1="14.9312"
                x2="316.749"
                y1="-28.4723"
                y2="108.42"
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

export default LogotypeTextVertical;
