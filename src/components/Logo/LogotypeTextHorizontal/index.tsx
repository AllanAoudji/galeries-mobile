import * as React from 'react';
import { Defs, LinearGradient, Path, Stop, Svg } from 'react-native-svg';

type Props = {
    size?: Style.Variant.Logo;
};

const height = {
    large: 84,
    largest: 109,
    normal: 65,
    small: 52,
    smallest: 33,
};
const width = {
    largest: 665,
    large: 511,
    normal: 394,
    small: 315,
    smallest: 197,
};

const LogotypeTextHorizontal = ({ size = 'normal' }: Props) => (
    <Svg
        fill="none"
        height={height[size]}
        viewBox="0 0 394 65"
        width={width[size]}
    >
        <Path
            d="M122.607 24.0786C122.607 23.0792 122.407 21.4803 121.408 19.8813C119.609 17.0831 116.411 16.6834 114.413 16.6834C104.219 16.6834 102.22 26.0773 102.22 32.4731C102.22 35.2713 102.62 40.2681 105.618 43.6659C107.617 45.8644 110.415 47.2635 115.412 47.2635C119.809 47.2635 121.208 46.6639 122.207 46.4641V37.6698H114.213V30.8742H131.202V51.6607C128.603 52.4602 124.406 53.8593 116.012 53.8593C106.618 53.8593 101.621 51.6607 98.4229 48.2629C93.8259 43.6659 92.8265 37.0701 92.8265 32.8729C92.8265 18.2823 102.021 10.2875 114.612 10.2875C120.009 10.2875 125.405 11.6866 128.803 15.4841C131.601 18.6821 131.801 21.88 131.801 24.0786H122.607Z"
            fill="url(#paint0_linear)"
        />
        <Path
            d="M164.78 11.4867L179.17 52.8599H170.176L167.178 43.8657H150.789L147.791 52.8599H139.396L154.387 11.4867H164.78ZM164.98 37.27L159.183 19.6814L152.987 37.27H164.98Z"
            fill="url(#paint1_linear)"
        />
        <Path
            d="M187.765 11.4867H196.759V45.8644H214.548V52.8599H187.765V11.4867Z"
            fill="url(#paint2_linear)"
        />
        <Path
            d="M223.342 11.4867H251.124V18.2823H232.336V28.0759H249.925V34.8715H232.336V46.0643H251.923V52.8599H223.542V11.4867H223.342Z"
            fill="url(#paint3_linear)"
        />
        <Path
            d="M261.117 11.4867H276.907C281.504 11.4867 286.101 11.4867 289.499 14.2849C292.097 16.4834 293.097 19.4815 293.097 22.2797C293.097 30.0746 286.501 31.8735 284.502 32.4731C290.698 33.0727 291.298 36.6704 291.897 42.0669C292.497 46.8638 292.897 48.8625 293.097 50.0617C293.496 51.8605 293.896 52.2603 294.296 53.0597H284.502C284.102 50.8612 282.903 40.268 282.303 38.6691C281.504 36.2706 279.305 36.2706 277.906 36.2706H270.111V53.0597H261.117V11.4867ZM269.712 29.475H276.907C277.906 29.475 279.905 29.475 281.504 28.2758C282.104 27.8761 283.703 26.477 283.703 23.4789C283.703 20.6807 282.303 19.2816 281.504 18.8819C280.105 17.8825 278.506 17.8825 275.708 17.8825H269.712V29.475Z"
            fill="url(#paint4_linear)"
        />
        <Path
            d="M302.69 11.2869H311.485V52.8599H302.69V11.2869Z"
            fill="url(#paint5_linear)"
        />
        <Path
            d="M322.877 11.4867H350.659V18.2823H331.872V28.0759H349.46V34.8715H331.872V46.0643H351.459V52.8599H323.077V11.4867H322.877Z"
            fill="url(#paint6_linear)"
        />
        <Path
            d="M368.248 39.6686C368.248 41.6673 368.048 47.4636 375.843 47.4636C380.64 47.4636 383.638 45.265 383.638 41.6673C383.638 38.0697 381.04 37.2702 375.843 36.071C366.05 33.6725 360.653 30.6744 360.653 23.4791C360.653 16.6835 365.45 10.6874 377.042 10.6874C381.44 10.6874 386.436 11.6868 389.634 15.4843C392.033 18.4824 392.033 21.8801 392.033 23.0794H383.438C383.238 21.6803 382.839 16.6835 376.643 16.6835C372.445 16.6835 369.847 18.8821 369.847 22.2799C369.847 26.0774 372.845 26.8769 378.841 28.276C386.037 30.0748 393.032 31.8737 393.032 40.0684C393.032 47.4636 386.836 53.4597 375.443 53.4597C359.654 53.4597 359.454 43.2663 359.454 39.2689H368.248V39.6686Z"
            fill="url(#paint7_linear)"
        />
        <Path
            d="M0.0866784 23.2792C-1.11254 37.2701 10.2801 49.4622 25.0705 50.6614C27.6688 50.8613 30.2671 50.6614 32.6656 50.2617L36.4631 1.69314C34.0647 0.893662 31.6662 0.294051 29.0679 0.0941802C14.2775 -1.10504 1.2859 9.28822 0.0866784 23.2792Z"
            fill="url(#paint8_linear)"
        />
        <Path
            d="M40.6604 28.8754L37.8622 64.4523L53.0523 63.453L56.0504 25.4776L40.6604 28.8754Z"
            fill="url(#paint9_linear)"
        />
        <Defs>
            <LinearGradient
                gradientUnits="userSpaceOnUse"
                id="paint0_linear"
                x1="-0.371476"
                x2="396.473"
                y1="32.0494"
                y2="32.0494"
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
                x1="-0.371604"
                x2="396.473"
                y1="32.1639"
                y2="32.1639"
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
                x1="-0.371525"
                x2="396.473"
                y1="32.1929"
                y2="32.1929"
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
                x1="-0.371785"
                x2="396.473"
                y1="32.1639"
                y2="32.1639"
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
                x1="-0.371989"
                x2="396.473"
                y1="32.1573"
                y2="32.1573"
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
                x1="-0.371947"
                x2="396.473"
                y1="32.107"
                y2="32.107"
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
                x1="-0.371882"
                x2="396.473"
                y1="32.1639"
                y2="32.1639"
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
                x1="-0.371454"
                x2="396.473"
                y1="32.3078"
                y2="32.3078"
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
                x1="1.52455"
                x2="371.913"
                y1="25.3958"
                y2="25.3958"
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
                x1="1.52453"
                x2="371.913"
                y1="44.9918"
                y2="44.9918"
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

export default LogotypeTextHorizontal;
