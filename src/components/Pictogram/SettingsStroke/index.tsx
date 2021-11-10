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

const SettingsStroke = ({
    color = 'black',
    customSize,
    size = 'normal',
}: Props) => {
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
                d="M10.9974 14.3384C9.08629 14.3384 7.53703 12.8001 7.53703 10.9025C7.53703 9.00481 9.08629 7.46646 10.9974 7.46646C12.9085 7.46646 14.4578 9.00481 14.4578 10.9025C14.4578 12.8001 12.9085 14.3384 10.9974 14.3384Z"
                fill={theme.colors[color]}
            />
            <Path
                d="M12.0095 21.8103L12.7357 21.6086C13.8305 21.3031 13.902 21.2868 14.7877 21.0413L15.844 20.7468L15.9265 18.6089L16.7737 18.0089L18.8367 18.6143L19.7444 17.2999C20.025 16.8909 20.1625 16.6945 20.6577 15.9692L21.0813 15.3529L19.7609 13.6621C19.8545 13.3022 19.926 13.0186 20.0195 12.6586L22 11.8023L21.9285 11.0606C21.8185 9.92619 21.8075 9.8662 21.7194 8.92812L21.6149 7.87005L19.5079 7.41737L19.0568 6.48475L20.0195 4.57041L17.1753 1.80526L15.2663 2.80333C14.9252 2.65062 14.6612 2.53063 14.3201 2.37792L13.8195 0.299967L9.85296 0L9.03876 1.97979L8.03751 2.25794L6.30458 0.987164L5.34184 1.67437C4.65967 2.15977 4.57164 2.21976 3.68042 2.85787L3.06977 3.29419L3.72443 5.33397L3.13578 6.18478L0.984747 6.31568L0 10.1443L1.82096 11.2842L1.92548 12.315L0.363091 13.7876L2.08502 17.349L4.21955 17.06C4.48912 17.3217 4.69817 17.5235 4.96224 17.7853L4.72018 19.9124L5.40235 20.2232C6.28257 20.6214 6.46412 20.7032 7.01425 20.9486L8.34009 21.5431L9.78695 19.9615C10.161 19.9887 10.4526 20.0105 10.8267 20.0378L12.0095 21.8103ZM13.836 19.1706C13.4729 19.2688 13.2638 19.3288 12.9007 19.4324L11.982 18.058L11.2558 18.0035C10.5626 17.9489 10.1995 17.9217 9.42936 17.8671L8.92323 17.829L7.80645 19.0506C7.46537 18.8979 7.26732 18.8052 6.92623 18.6525L7.11328 17.0163L6.75019 16.6673C6.14504 16.0782 5.89197 15.8328 5.28132 15.2438L4.91823 14.8947L3.27332 15.1184L2.85521 14.2512L4.06001 13.1167L3.75744 10.0898L2.35459 9.21172L2.59665 8.2791L4.25256 8.18093L5.97999 5.67211L5.47387 4.10137C5.77645 3.88322 5.95799 3.75777 6.26056 3.53961L7.5974 4.52133L10.5461 3.70323L11.1733 2.17613L12.1415 2.24703L12.5266 3.85049L12.9887 4.05774C13.7589 4.40679 14.0835 4.55405 14.8592 4.89765L15.3213 5.1049L16.7902 4.33589L17.4834 5.00673L16.7407 6.48475L18.0775 9.21172L19.7004 9.56078C19.7389 9.93165 19.7609 10.1498 19.7939 10.5207L18.2701 11.1806L18.1435 11.666C17.9345 12.4841 17.8465 12.8277 17.6319 13.6403L17.5054 14.1257L18.5286 15.4292C18.3361 15.7074 18.2151 15.8819 18.039 16.1437L17.984 16.2255L16.3941 15.7565L13.902 17.529L13.836 19.1706Z"
                fill={theme.colors[color]}
            />
        </Svg>
    );
};

export default React.memo(SettingsStroke);
