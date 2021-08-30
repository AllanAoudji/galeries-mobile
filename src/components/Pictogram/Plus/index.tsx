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

const Plus = ({ color = 'black', customSize, size = 'normal' }: Props) => {
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
                d="M20.845 9.845H12.155V1.155C12.155 0.517 11.638 0 11 0C10.362 0 9.845 0.517 9.845 1.155V9.845H1.155C0.517 9.845 0 10.362 0 11C0 11.638 0.517 12.155 1.155 12.155H9.845V20.845C9.845 21.483 10.362 22 11 22C11.638 22 12.155 21.483 12.155 20.845V12.155H20.845C21.483 12.155 22 11.638 22 11C22 10.362 21.483 9.845 20.845 9.845Z"
                fill={theme.colors[color]}
            />
        </Svg>
    );
};

export default Plus;
