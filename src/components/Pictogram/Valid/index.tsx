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
    large: 33,
    normal: 17,
    small: 12,
};

const Valid = ({ color = 'black', customSize, size = 'normal' }: Props) => {
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
        <Svg height={height} fill="none" viewBox="0 0 22 17" width={width}>
            <Path
                d="M22.6561 2.25055L9.43582 17.0346L1.40467 9.38711C0.888416 8.89266 0.856483 8.05759 1.33016 7.52468C1.80915 6.99177 2.61812 6.95881 3.13437 7.44777L9.2868 13.3097L20.7774 0.459537C21.2564 -0.0733704 22.0653 -0.111828 22.5816 0.382623C23.1032 0.882567 23.1351 1.71214 22.6561 2.25055Z"
                fill={theme.colors[color]}
            />
        </Svg>
    );
};

export default Valid;
